import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import {
  Search,
  ShoppingCart,
  ChevronDown,
  MapPin,
  Phone,
  Settings2,
  X,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currency,
    setCurrency,
    exchangeRate,
    openExchangeRateModal,
    user,
    logout,
    openAuthModal,
    cartCount,
    openCartDrawer,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setViewMode,
    isOutletOnly,
    setIsOutletOnly,
    showToast,
    products,
    isAdminLoggedIn,
    openAdminModal,
    setIsAdminView,
  } = useApp();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOutletClick = () => {
    setIsOutletOnly(!isOutletOnly);
    if (!isOutletOnly) {
      showToast('Filtrando productos de OUTLET y Ofertas de gremio', 'info');
    }
  };

  const handleChecklistClick = () => {
    setViewMode('list');
    setSelectedCategory('ALL');
    setIsOutletOnly(false);
    showToast('Cambiando a vista de Listado Completo / Checklist', 'info');
  };

  const handleDownloadPriceList = () => {
    const headers = [
      'Código SKU',
      'Producto',
      'Marca',
      'Rubro',
      'Precio USD',
      `Precio ARS (T.C. $${exchangeRate})`,
      'Stock Disponible',
    ];
    const rows = products.map((p) => [
      `"${p.sku}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.brand}"`,
      `"${p.category}"`,
      `"u$s ${p.priceUSD.toFixed(2)}"`,
      `"$ ${Math.round(p.priceUSD * exchangeRate).toLocaleString('es-AR')}"`,
      p.stockQuantity,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lista_de_precios_mp_distribuciones_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Lista de precios mayorista descargada con éxito.', 'success');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Utility Ribbon */}
      <div className="w-full bg-[#07245b] text-blue-100 text-[11px] py-1 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-blue-200">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Casa Central: <strong>San Nicolás 2277</strong>, Rosario, Santa Fe</span>
            </span>
            <span className="hidden sm:inline text-blue-700">|</span>
            <a
              href="https://wa.me/5493413408439"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Ventas: <strong>+54 9 341 340-8439</strong></span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Quick Reference */}
            <button
              onClick={openExchangeRateModal}
              title="Click para ajustar tipo de cambio de referencia"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-[11px] border border-blue-700/50 transition-colors"
            >
              <Settings2 className="w-3 h-3 text-blue-300" />
              <span>T.C. Ref: <strong>${exchangeRate.toLocaleString('es-AR')} ARS</strong></span>
            </button>

            {/* Currency Switcher Toggle */}
            <div className="flex items-center rounded-lg bg-blue-950/80 p-0.5 border border-blue-800 text-[11px]">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('ARS')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  currency === 'ARS'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                ARS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Bar (Vibrant MP Royal Blue) */}
      <div className="w-full bg-[#0052cc] text-white px-4 py-2.5 sm:py-3 border-b border-blue-600/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Main Nav Tabs */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/logo.png"
                alt="MP Distribuciones"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full bg-black/40 ring-2 ring-white/30 group-hover:ring-white group-hover:scale-105 transition-all shadow-md"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  MP DISTRIBUCIONES
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                  Mayorista Informática B2B
                </span>
              </div>
            </a>

            {/* Nav Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setIsOutletOnly(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === 'ALL' && !isOutletOnly
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Inicio
              </button>

              {/* Categorías Dropdown */}
              <div className="relative" ref={categoryMenuRef}>
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    isCategoryMenuOpen || selectedCategory !== 'ALL'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>Categorías</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryMenuOpen && (
                  <div className="absolute left-0 mt-2 w-72 max-h-96 overflow-y-auto rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-200 p-2 z-50 animate-fadeIn text-xs">
                    <div className="p-2 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                      Seleccionar Rubro
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory('ALL');
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === 'ALL'
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>Todos los rubros</span>
                      <span className="text-[10px] text-slate-400 font-normal">({products.length})</span>
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setIsCategoryMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
                          selectedCategory === cat.id
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{cat.shortName}</span>
                        <span className="text-[10px] text-slate-400">
                          {products.filter((p) => p.category === cat.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CheckList (count) */}
              <button
                onClick={handleChecklistClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
                title="Ver modo checklist / planilla rápida"
              >
                <span>CheckList</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-extrabold text-[10px]">
                  {products.length}
                </span>
              </button>

              {/* OUTLET Badge */}
              <button
                onClick={handleOutletClick}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm transition-all ${
                  isOutletOnly
                    ? 'bg-red-600 text-white ring-2 ring-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title="Ver artículos en liquidación y promociones especiales"
              >
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>OUTLET 60%</span>
              </button>
            </nav>
          </div>

          {/* Search Bar in Header */}
          <div className="flex-1 max-w-xs sm:max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar producto, marca, SKU..."
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-blue-700/60 focus:bg-white focus:text-slate-900 border border-blue-400/40 text-xs text-white placeholder-blue-200 focus:placeholder-slate-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub Bar (Inspired by Reference Screenshot) */}
      <div className="w-full bg-[#082c71] text-white px-4 py-2 border-b border-blue-950/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* User Status / Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-blue-100">
            <span className="flex items-center gap-1.5 font-medium">
              <span>Hola,</span>
              {user ? (
                <strong className="text-white underline cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  {user.businessName}
                </strong>
              ) : (
                <strong className="text-white">Invitado Gremio</strong>
              )}
              <span className="text-blue-300">
                ({user ? (
                  <button onClick={logout} className="hover:underline text-blue-200 ml-1">
                    Salir
                  </button>
                ) : (
                  <button onClick={() => openAuthModal('login')} className="hover:underline text-white font-bold ml-1">
                    Ingresar
                  </button>
                )})
              </span>
            </span>

            <span className="text-blue-400">|</span>

            {/* Quick utility links */}
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setIsOutletOnly(false);
              }}
              className="hover:text-white transition-colors"
            >
              Inicio
            </button>
            <span className="text-blue-400">|</span>
            <button
              onClick={() => openAuthModal('register')}
              className="hover:text-white transition-colors"
            >
              Datos
            </button>
            <span className="text-blue-400">|</span>
            <button
              onClick={() => showToast('Historial disponible con cuenta B2B activa.', 'info')}
              className="hover:text-white transition-colors hidden sm:inline"
            >
              Historial
            </button>
            <span className="text-blue-400 hidden sm:inline">|</span>
            <button
              onClick={handleDownloadPriceList}
              className="hover:text-white transition-colors hidden sm:inline cursor-pointer"
              title="Descargar lista de precios mayorista en formato Excel / CSV"
            >
              Lista de Precios
            </button>
            <span className="text-blue-400 hidden sm:inline">|</span>
            <span className="text-blue-300 hidden md:inline">Importación Directa</span>
            <span className="text-blue-400">|</span>

            {/* Admin / Owner Panel Button */}
            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setIsAdminView(true);
                } else {
                  openAdminModal();
                }
              }}
              className="flex items-center gap-1 font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
              title="Panel de gestión de stock y precios exclusivo para el dueño"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Panel Dueño</span>
            </button>
          </div>

          {/* Right Action: "Ver Pedido" Button (Matching the Reference Screenshot) */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCartDrawer}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Ver Pedido</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-emerald-800 font-extrabold text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="sm:hidden bg-[#0052cc] px-4 py-2 border-t border-blue-600/40">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto, marca, código..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-blue-700 text-xs text-white placeholder-blue-200 outline-none"
          />
        </div>
      </div>
    </header>
  );
};
