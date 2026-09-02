'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-[#0a0a0a] text-center font-mono">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#121212] border border-red-900/60 shadow-2xl space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-500">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            SYSTEM EXCEPTION // INVESTIGATION INTERRUPTED
          </span>
          <h1 className="text-xl font-bold text-white tracking-wider">
            AN ERROR OCCURRED
          </h1>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            {error.message || 'An unexpected telemetry error occurred while rendering the docket.'}
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
          <button
            onClick={() => reset()}
            className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETRY SYSTEM EXECUTION</span>
          </button>
          <Link
            href="/"
            className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors flex items-center justify-center border border-neutral-800"
          >
            RETURN TO HOME DOCKET
          </Link>
        </div>
      </div>
    </main>
  );
}
