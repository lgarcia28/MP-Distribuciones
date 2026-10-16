import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSupabaseConfig, clearSupabaseConfig } from '../lib/supabase';
import {
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  RefreshCw,
  ExternalLink,
  Key,
  Globe,
} from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const {
    isSupabaseConnected,
    isSyncingSupabase,
    syncWithSupabase,
    uploadAllToSupabase,
    updateSupabaseCredentials,
    showToast,
    products,
  } = useApp();

  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [key, setKey] = useState(currentConfig.key);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !key.trim()) {
      showToast('Por favor completá la URL y la Anon Key de Supabase.', 'warning');
      return;
    }
    setIsTesting(true);
    const success = await updateSupabaseCredentials(url, key);
    setIsTesting(false);
    if (success) {
      onClose();
    }
  };

  const handleDisconnect = () => {
    if (window.confirm('¿Seguro que deseás desconectar Supabase? La web volverá a usar almacenamiento local.')) {
      clearSupabaseConfig();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Conexión Cloud Supabase (PostgreSQL)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sincronizá precios, stock y pedidos en tiempo real entre el celular y la PC
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
            isSupabaseConnected
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-amber-50 border-amber-300 text-amber-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {isSupabaseConnected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <p className="font-bold">
                {isSupabaseConnected ? 'Base de Datos Cloud Conectada y Activa' : 'Modo Almacenamiento Local (Sin Conexión Cloud)'}
              </p>
              <p className="text-[11px] opacity-80 mt-0.5">
                {isSupabaseConnected
                  ? 'Cualquier cambio de precio o stock se refleja al instante en todos los dispositivos.'
                  : 'Ingresá las claves de tu proyecto Supabase para sincronizar automáticamente.'}
              </p>
            </div>
          </div>
          {isSupabaseConnected && (
            <button
              onClick={() => syncWithSupabase()}
              disabled={isSyncingSupabase}
              className="p-1.5 rounded-lg bg-emerald-200/60 hover:bg-emerald-200 text-emerald-900 transition-colors shrink-0"
              title="Forzar actualización ahora"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingSupabase ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {/* Step-by-step Setup Helper */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-600">
          <p className="font-bold text-slate-800 flex items-center justify-between">
            <span>Guía rápida en 3 pasos:</span>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold text-[11px]"
            >
              <span>Abrir panel de Supabase</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
            <li>Creá un proyecto gratuito en Supabase.</li>
            <li>
              En el <strong>SQL Editor</strong> de Supabase, ejecutá el archivo{' '}
              <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">supabase-schema.sql</code> (incluido en el proyecto).
            </li>
            <li>Copiá la <strong>Project URL</strong> y la clave <strong>anon public</strong> de <em>Project Settings → API</em> y pegalas abajo:</li>
          </ol>
        </div>

        {/* Form Credentials */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Project URL:</span>
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs font-mono text-slate-900 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Anon Public Key:</span>
            </label>
            <input
              type="text"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-xs font-mono text-slate-900 outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            {isSupabaseConnected && (
              <button
                type="button"
                onClick={handleDisconnect}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Desconectar
              </button>
            )}

            <button
              type="submit"
              disabled={isTesting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              <span>{isTesting ? 'Verificando...' : 'Conectar y Guardar Claves'}</span>
            </button>
          </div>
        </form>

        {/* Upload Existing Local Catalog Button */}
        {isSupabaseConnected && (
          <div className="pt-4 border-t border-slate-200">
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">Subir Catálogo Actual a Supabase</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Carga los {products.length} productos y precios actuales directamente a la nube.
                </p>
              </div>
              <button
                type="button"
                disabled={isSyncingSupabase}
                onClick={uploadAllToSupabase}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-bold shadow-sm transition-all cursor-pointer shrink-0"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isSyncingSupabase ? 'Subiendo...' : 'Subir Todo'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
