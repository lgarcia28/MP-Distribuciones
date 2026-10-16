import React from 'react';
import { useApp } from '../context/AppContext';
import { SortByOption } from '../types';
import {
  Grid,
  List,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

interface CategoryNavProps {
  onOpenMobileFilters?: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ onOpenMobileFilters }) => {
  const {
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    selectedCategory,
    stockFilter,
    isOutletOnly,
  } = useApp();

  const activeFiltersCount =
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (stockFilter !== 'all' ? 1 : 0) +
    (isOutletOnly ? 1 : 0);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-3.5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left Side: View Mode [ LISTADO ] [ GALERIA DE FOTOS ] + Mobile Filters Trigger */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mobile Filter Button (Visible on screens < lg) */}
          {onOpenMobileFilters && (
            <button
              onClick={onOpenMobileFilters}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>LISTADO</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>GALERIA DE FOTOS</span>
            </button>
          </div>
        </div>

        {/* Right Side: Sorting Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 text-xs justify-end">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Ordenar</span>
          </div>

          {/* Unified Select Dropdown for All Screen Sizes */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortByOption)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xs"
            >
              <option value="featured">⭐ Destacados</option>
              <optgroup label="💵 Por Precio">
                <option value="price_asc">💵 Menor a Mayor Precio</option>
                <option value="price_desc">💵 Mayor a Menor Precio</option>
              </optgroup>
              <optgroup label="🔤 Alfabéticamente">
                <option value="name_asc">🔤 Nombre: A → Z</option>
                <option value="name_desc">🔤 Nombre: Z → A</option>
              </optgroup>
              <optgroup label="📅 Por Fecha">
                <option value="date_desc">📅 Más Nuevo primero</option>
                <option value="date_asc">📅 Más Viejo primero</option>
              </optgroup>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
