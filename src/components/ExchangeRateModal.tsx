import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  DollarSign,
  Info,
} from 'lucide-react';

export const ExchangeRateModal: React.FC = () => {
  const {
    isExchangeRateModalOpen,
    closeExchangeRateModal,
    exchangeRate,
    setExchangeRate,
    showToast,
  } = useApp();

  const [customRate, setCustomRate] = useState<string>(exchangeRate.toString());

  if (!isExchangeRateModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customRate);
    if (!isNaN(val) && val > 0) {
      setExchangeRate(val);
      showToast(`Cotización de referencia actualizada a $${val.toLocaleString('es-AR')} ARS`, 'success');
      closeExchangeRateModal();
    } else {
      alert('Por favor ingrese un número válido mayor a 0');
    }
  };

  const handlePreset = (rate: number) => {
    setCustomRate(rate.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeExchangeRateModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Cotización USD de Referencia</h3>
            <p className="text-xs text-slate-500">
              Ajustá el tipo de cambio aplicado para el cálculo automático en ARS
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Valor 1 USD en Pesos Argentinos ($ ARS):</span>
              <span className="text-[11px] text-blue-700 font-mono font-bold">Actual: ${exchangeRate}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                step="any"
                min="1"
                required
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="1350"
                className="w-full pl-8 pr-16 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-base font-mono font-bold text-slate-900 outline-none"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">
                ARS
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-500 font-medium">Valores de referencia rápidos:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handlePreset(1350)}
                className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-mono transition-colors font-bold"
              >
                $1.350
              </button>
              <button
                type="button"
                onClick={() => handlePreset(1380)}
                className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-mono transition-colors font-bold"
              >
                $1.380
              </button>
              <button
                type="button"
                onClick={() => handlePreset(1400)}
                className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-mono transition-colors font-bold"
              >
                $1.400
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-800 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Al guardar, todos los precios en ARS en el catálogo, planilla y carrito se recalcularán de inmediato.
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={closeExchangeRateModal}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md transition-all"
            >
              Aplicar Cotización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
