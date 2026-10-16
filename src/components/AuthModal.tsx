import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  Building2,
  Mail,
  KeyRound,
  FileText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    login,
    register,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalTab || 'login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regBusinessName, setRegBusinessName] = useState('');
  const [regCuit, setRegCuit] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  // Sync tab with context when modal opens
  React.useEffect(() => {
    setActiveTab(authModalTab);
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: loginEmail || 'priottimatias@gmail.com',
      businessName: loginEmail ? loginEmail.split('@')[0] : 'priottimatias',
      cuit: '20-38491204-8',
      city: 'Rosario, Santa Fe',
      phone: '+54 9 341 340-8439',
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regBusinessName || !regCuit || !regPhone || !regEmail) {
      alert('Por favor complete los campos obligatorios del registro.');
      return;
    }
    register({
      businessName: regBusinessName,
      cuit: regCuit,
      city: regCity || 'Rosario, Santa Fe',
      phone: regPhone,
      email: regEmail,
    });
  };

  const handleDemoLogin = (business: string, cuit: string, city: string, phone: string) => {
    login({
      businessName: business,
      cuit: cuit,
      city: city,
      phone: phone,
      email: `${business.toLowerCase().replace(/[^a-z0-9]/g, '')}@ejemplo.com`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-[#0052cc] text-white p-6 pb-4 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="MP Distribuciones Logo"
              className="w-11 h-11 object-contain shrink-0 drop-shadow-md rounded-full bg-black/20"
            />
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>Acceso B2B Mayorista</span>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </h3>
              <p className="text-xs text-blue-100">
                MP Distribuciones • Rosario, Santa Fe
              </p>
            </div>
          </div>

          {/* Tabs Switcher */}
          <div className="flex mt-5 p-1 rounded-xl bg-blue-900/40 border border-blue-400/30">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Registro Inmediato
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {activeTab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Usuario o Email</span>
                </label>
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="priottimatias"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>Contraseña</span>
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Ingresar al Catálogo Mayorista</span>
              </button>

              {/* Demo Fast Login Helpers */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Cuentas de prueba rápidas:</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleDemoLogin(
                        'priottimatias',
                        '20-38491204-8',
                        'Rosario, Santa Fe',
                        '+54 9 341 340-8439'
                      )
                    }
                    className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900">priottimatias (Gremio)</p>
                    <p className="text-[10px] text-slate-500">CUIT: 20-38491204-8 • Rosario</p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoLogin(
                        'TecnoRosario SRL',
                        '30-71894520-2',
                        'Rosario, Santa Fe',
                        '+54 9 341 422-9090'
                      )
                    }
                    className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900">TecnoRosario SRL</p>
                    <p className="text-[10px] text-slate-500">CUIT: 30-71894520-2</p>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Nombre del Comercio / Razón Social *</span>
                </label>
                <input
                  type="text"
                  required
                  value={regBusinessName}
                  onChange={(e) => setRegBusinessName(e.target.value)}
                  placeholder="Ej: InfoStore Rosario SRL"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>CUIT o DNI *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regCuit}
                    onChange={(e) => setRegCuit(e.target.value)}
                    placeholder="30-XXXXXXXX-X"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>Localidad / Provincia</span>
                  </label>
                  <input
                    type="text"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    placeholder="Rosario, Santa Fe"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email de Contacto *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="contacto@comercio.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>WhatsApp / Teléfono *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+54 9 341..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white text-sm text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Habilitar Cuenta Mayorista Inmediata</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
