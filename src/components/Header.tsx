import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingCart,
  MapPin,
  Phone,
  Settings2,
  X,
  ShieldCheck,
  ChevronDown,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { exportPriceList } from '../utils/exportUtils';

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
    isOutletOnly,
    setIsOutletOnly,
    showToast,
    products,
    isAdminLoggedIn,
    openAdminModal,
    setIsAdminView,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isPriceListMenuOpen, setIsPriceListMenuOpen] = useState(false);
  const priceListMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (priceListMenuRef.current && !priceListMenuRef.current.contains(e.target as Node)) {
        setIsPriceListMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'ALL' && !isOutletOnly
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Inicio
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
            {/* Price List Export Dropdown (XLSX / CSV) */}
            <div className="relative inline-block" ref={priceListMenuRef}>
              <button
                onClick={() => setIsPriceListMenuOpen((prev) => !prev)}
                className="hover:text-white transition-colors hidden sm:inline-flex items-center gap-1 cursor-pointer font-medium"
                title="Descargar lista de precios mayorista en formato Excel (.xlsx) o CSV"
              >
                <span>Lista de Precios</span>
                <ChevronDown className="w-3 h-3 text-blue-300" />
              </button>

              {isPriceListMenuOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1.5 w-52 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Exportar Precios</span>
                    <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">T.C. ${exchangeRate}</span>
                  </div>
                  <button
                    onClick={() => {
                      exportPriceList(products, exchangeRate, 'xlsx');
                      setIsPriceListMenuOpen(false);
                      showToast('Lista de precios exportada exitosamente en Excel (.xlsx)', 'success');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-left cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Excel (.xlsx)</div>
                      <span className="text-[10px] text-slate-400 font-normal">Recomendado para Office</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      exportPriceList(products, exchangeRate, 'csv');
                      setIsPriceListMenuOpen(false);
                      showToast('Lista de precios exportada exitosamente en CSV (.csv)', 'success');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold">CSV (.csv)</div>
                      <span className="text-[10px] text-slate-400 font-normal">Para sistemas y ERP</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
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
