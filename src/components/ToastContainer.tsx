import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
          error: <XCircle className="w-4 h-4 text-red-400 shrink-0" />,
          info: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-500/40 bg-emerald-950/90 text-emerald-100',
          warning: 'border-amber-500/40 bg-amber-950/90 text-amber-100',
          error: 'border-red-500/40 bg-red-950/90 text-red-100',
          info: 'border-blue-500/40 bg-mp-card/95 text-slate-100',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-md text-xs font-medium animate-slideUp ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
