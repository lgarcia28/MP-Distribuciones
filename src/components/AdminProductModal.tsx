import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Save,
  Image as ImageIcon,
  Layers,
  Tag,
  DollarSign,
  Boxes,
  Barcode,
} from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
}) => {
  const { addProduct, updateProduct, exchangeRate } = useApp();

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Category>('NOTEBOOKS');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [specsText, setSpecsText] = useState('');
  const [priceUSD, setPriceUSD] = useState<number>(10);
  const [stockQuantity, setStockQuantity] = useState<number>(10);
  const [minWholesaleQty, setMinWholesaleQty] = useState<number>(1);
  const [badge, setBadge] = useState<'NUEVO' | 'DESTACADO' | 'OFERTA' | 'MÁS VENDIDO' | ''>('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setSku(productToEdit.sku);
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setSubcategory(productToEdit.subcategory || '');
      setDescription(productToEdit.description);
      setSpecsText(productToEdit.specs ? productToEdit.specs.join('\n') : '');
      setPriceUSD(productToEdit.priceUSD);
      setStockQuantity(productToEdit.stockQuantity);
      setMinWholesaleQty(productToEdit.minWholesaleQty || 1);
      setBadge(productToEdit.badge || '');
      setImageUrl(productToEdit.imageUrl);
    } else {
      // Defaults for new product
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setSku(`MP-${randomCode}`);
      setName('');
      setBrand('');
      setCategory('ACCESORIOS, ADAPTADORES Y CABLES');
      setSubcategory('');
      setDescription('');
      setSpecsText('');
      setPriceUSD(10.0);
      setStockQuantity(20);
      setMinWholesaleQty(1);
      setBadge('');
      setImageUrl('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim() || priceUSD <= 0) {
      alert('Por favor complete el nombre, SKU y un precio válido.');
      return;
    }

    const specsArray = specsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const productPayload = {
      sku: sku.trim(),
      name: name.trim(),
      brand: brand.trim() || 'Genérico',
      category,
      subcategory: subcategory.trim() || undefined,
      description: description.trim() || name.trim(),
      specs: specsArray.length > 0 ? specsArray : ['Garantía oficial MP Distribuciones'],
      priceUSD: Number(priceUSD),
      inStock: stockQuantity > 0,
      stockQuantity: Number(stockQuantity),
      minWholesaleQty: Number(minWholesaleQty) || 1,
      badge: badge ? (badge as any) : undefined,
      imageUrl:
        imageUrl.trim() ||
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            {productToEdit ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {productToEdit ? 'Editar Artículo en Catálogo' : 'Crear Nuevo Artículo Mayorista'}
            </h3>
            <p className="text-xs text-slate-500">
              {productToEdit
                ? `Modificando: ${productToEdit.name.slice(0, 45)}...`
                : 'Completá los datos para agregarlo a la lista de precios mayorista'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Name */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>Nombre Completo del Producto (Título Mayorista) *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: REPETIDOR DE WIFI 300 MBPS EN CAJA JG-0548"
              className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 outline-none font-semibold"
            />
          </div>

          {/* Row 2: SKU, Brand, Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Barcode className="w-3.5 h-3.5 text-blue-600" />
                <span>Código SKU *</span>
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="CON-REP-JG0548"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs font-mono font-bold text-slate-800 outline-none uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Marca</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Sony, Lenovo, XAEA, Genérico..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Etiqueta Especial</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none font-semibold"
              >
                <option value="">Ninguna</option>
                <option value="OFERTA">🔥 OFERTA (Sección Outlet)</option>
                <option value="MÁS VENDIDO">⭐ MÁS VENDIDO</option>
                <option value="DESTACADO">💎 DESTACADO</option>
                <option value="NUEVO">✨ NUEVO INGRESO</option>
              </select>
            </div>
          </div>

          {/* Row 3: Category and Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Rubro Oficial ({CATEGORIES.length} rubros) *</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none font-medium"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shortName} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Subcategoría / Tipo</label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="Ej: Repetidores, Auriculares In Ear, Cables..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Row 4: Pricing & Stock (Wholesale Heart) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="space-y-1">
              <label className="font-bold text-blue-900 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                <span>Precio Unitario USD *</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">u$s</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={priceUSD}
                  onChange={(e) => setPriceUSD(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 focus:border-blue-600 text-sm font-mono font-black text-slate-900 outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                ≈ $ {Math.round(priceUSD * exchangeRate).toLocaleString('es-AR')} ARS
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-blue-900 flex items-center gap-1">
                <Boxes className="w-3.5 h-3.5 text-emerald-600" />
                <span>Stock Disponible (Unidades) *</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={stockQuantity}
                onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 focus:border-blue-600 text-sm font-mono font-black text-slate-900 outline-none"
              />
              <p className={`text-[10px] font-bold ${stockQuantity > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                {stockQuantity > 0 ? '● En Stock para venta' : '○ Sin Stock (Pausado)'}
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-blue-900">Mínimo Mayorista</label>
              <input
                type="number"
                min="1"
                value={minWholesaleQty}
                onChange={(e) => setMinWholesaleQty(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 focus:border-blue-600 text-sm font-mono font-bold text-slate-800 outline-none"
              />
              <p className="text-[10px] text-slate-500">Mínimo de compra x bulto</p>
            </div>
          </div>

          {/* Row 5: Image URL & Preview */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>URL de la Imagen del Producto</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... o enlace directo a imagen"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none font-mono"
              />
              {imageUrl && (
                <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Row 6: Specs */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">
              Especificaciones Técnicas (una por línea):
            </label>
            <textarea
              rows={3}
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
              placeholder="Ej:&#10;Velocidad 300 Mbps 2.4GHz&#10;Puerto RJ45 10/100&#10;Enchufe directo 220V"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none"
            />
          </div>

          {/* Row 7: Description */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Descripción / Detalles para el Gremio:</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción detallada del artículo..."
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{productToEdit ? 'Guardar Cambios' : 'Publicar Producto en Catálogo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
