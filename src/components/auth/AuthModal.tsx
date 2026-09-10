import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/react";
import { X, Zap } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, showToast } = useCRM();
  const [mode, setMode] = useState<"login" | "register">("login");
  const isLocalDemoEnabled = Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[440px] overflow-y-auto rounded-2xl border border-[#222a3d] bg-[#111520] shadow-2xl">
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar autenticación"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-3 pt-7">
          {mode === "login" && (
            <p className="mb-3 text-center text-xs font-semibold text-slate-300">
              Ingresa a tu cuenta comercial
            </p>
          )}
          {mode === "login" ? (
            <SignIn
              routing="hash"
              appearance={{ elements: { card: "!bg-transparent !shadow-none !border-0" } }}
            />
          ) : (
            <SignUp
              routing="hash"
              appearance={{ elements: { card: "!bg-transparent !shadow-none !border-0" } }}
            />
          )}
          {mode === "login" && isLocalDemoEnabled && (
            <div className="mt-3 border-t border-[#222a3d] pt-3">
              <button
                type="button"
                onClick={() => {
                  login("alex.morgan@clientum.dev", "secret");
                  showToast("Acceso rápido a ClientumCRM concedido", "success");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#263148] bg-[#141926] px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-[#1a2234]"
              >
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                Entrar con Demo Rápida
              </button>
              <p className="mt-2 text-center text-[10px] text-slate-500">
                Acceso local para revisar la plataforma sin crear una cuenta.
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-[#222a3d] px-6 py-4 text-center text-xs text-slate-400">
          {mode === "login" ? "¿Todavía no tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};