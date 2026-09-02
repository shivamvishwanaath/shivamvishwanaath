import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Terminal, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-[#0a0a0a] text-center font-mono">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#121212] border border-red-900/60 shadow-2xl space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-500">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold">
            ERROR CODE 404 // EXHIBIT NOT FOUND
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
            CASE FILE MISSING OR MOVED
          </h1>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            The requested case record cannot be located in Subject Shivam Vishwanaath&apos;s active docket. It may have been archived or reassigned.
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO CASE OVERVIEW</span>
          </Link>
          <Link
            href="/projects"
            className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors flex items-center justify-center gap-2 border border-neutral-800"
          >
            <Search className="w-4 h-4 text-red-400" />
            <span>EXPLORE VERIFIED PROJECTS</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
