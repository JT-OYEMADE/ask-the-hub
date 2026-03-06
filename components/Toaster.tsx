"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type ToastMessage = string;

interface ToastContextValue {
  showToast: (message: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const showToast = useCallback((msg: ToastMessage) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-[10px] border text-[0.85rem] transition-all duration-300"
          style={{
            background: "#111119",
            borderColor: "rgba(255,255,255,0.06)",
            animation: "fadeIn 0.3s ease, slideUp 0.3s ease",
          }}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
