import React from 'react';
import { Camera, Mic, ShieldAlert, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

interface BiometricPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  isRequestingMedia?: boolean;
  permissionDeniedError?: string | null;
}

export const BiometricPermissionModal: React.FC<BiometricPermissionModalProps> = ({
  isOpen,
  onAllow,
  isRequestingMedia = false,
  permissionDeniedError = null
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" id="biometric-permission-dialog">
      <div className="max-w-[540px] w-full rounded-2xl p-6 sm:p-7 relative border border-[#0088ff]/40 bg-[#020b18] overflow-hidden shadow-2xl shadow-cyan-950/60">
        {/* Top Rainbow / Tactical Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#00e5ff] to-[#00e5a3]" />

        {/* Header Section */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#02182f] border border-[#0088ff]/60 text-cyan-400 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
            <ShieldAlert className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-mono-code font-black text-white tracking-wider uppercase">
                COMPULSORY HARDWARE ACCESS
              </h2>
              <span className="px-2 py-0.5 rounded text-[9.5px] font-mono-code font-black bg-[#3b1219] text-[#ff6b81] border border-[#ff3b5c]/60 tracking-wider">
                MANDATORY
              </span>
            </div>
            <p className="text-[11px] font-mono-code font-bold text-[#00c8e6] tracking-wider mt-0.5">
              VAJRA MULTI-FACTOR LEVEL 4 AUTHENTICATION PROTOCOL
            </p>
          </div>
        </div>

        {/* Informational Paragraph */}
        <p className="text-xs sm:text-[12.5px] text-slate-300 mb-5 leading-relaxed font-sans">
          Access to the Bharat Command Network requires mandatory live optical and acoustic hardware verification (Iris scanning, 3D face depth analysis, and voice passphrase validation). Camera and microphone access is strictly required to proceed.
        </p>

        {/* Hardware Permission Options */}
        <div className="space-y-3 mb-4">
          {/* 1. Camera Access Card */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#031326] border border-[#0055ff]/40 transition hover:border-[#0099ff]/70">
            <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-2">
              <div className="w-10 h-10 rounded-lg bg-[#012544] text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                <Camera className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono-code font-bold text-white tracking-wide uppercase">
                  CAMERA ACCESS — COMPULSORY
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Required for Iris optical verification & 3D facial depth mapping
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono-code font-black bg-[#012544] text-[#00e5ff] border border-[#0088ff]/60 tracking-wider shrink-0">
              REQUIRED
            </span>
          </div>

          {/* 2. Microphone Access Card */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#031326] border border-[#0055ff]/40 transition hover:border-[#0099ff]/70">
            <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-2">
              <div className="w-10 h-10 rounded-lg bg-[#01293a] text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Mic className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono-code font-bold text-white tracking-wide uppercase">
                  MICROPHONE ACCESS — COMPULSORY
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Required for acoustic voice passphrase frequency recognition
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono-code font-black bg-[#012544] text-[#00e5ff] border border-[#0088ff]/60 tracking-wider shrink-0">
              REQUIRED
            </span>
          </div>
        </div>

        {/* Permission Denied Error Notice if any */}
        {permissionDeniedError && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 mb-4 text-xs text-rose-200 animate-shake">
            <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block font-bold text-rose-300 mb-0.5 font-mono-code uppercase">
                HARDWARE ACCESS NOTICE
              </strong>
              <span>{permissionDeniedError}</span>
            </div>
          </div>
        )}

        {/* Security & Local Processing Notice */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#021833]/90 border border-[#0055ff]/40 mb-6 text-[11px] text-cyan-200/90 leading-normal">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Biometric video and audio streams are processed locally in real-time and cleared immediately after verification.
          </span>
        </div>

        {/* Allow Button */}
        <div>
          <button
            type="button"
            onClick={onAllow}
            disabled={isRequestingMedia}
            className="w-full py-3.5 sm:py-4 px-6 rounded-xl text-xs sm:text-sm font-mono-code font-black tracking-wider text-slate-950 bg-gradient-to-r from-[#00d2ff] via-[#00e5a3] to-[#00f2b8] hover:from-[#00c0ea] hover:to-[#00df99] active:scale-[0.99] transition shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer select-none"
            id="biometric-allow-btn"
          >
            {isRequestingMedia ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>INITIALIZING HARDWARE INTERFACE...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <span>ALLOW CAMERA & MICROPHONE ACCESS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


