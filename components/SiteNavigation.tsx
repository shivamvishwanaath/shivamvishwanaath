'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  Menu, 
  X, 
  Terminal, 
  Sparkles,
  ExternalLink,
  Compass,
  Radar,
  Sun,
  Moon
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Arsenal' },
  { href: '/education', label: 'Education' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const SiteNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load initial theme from localStorage safely after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('site-theme') === 'light' ? 'light' : 'dark';
      setTheme(savedTheme);
    }
  }, []);

  // Update document class list when theme state changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('site-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('site-theme', 'dark');
    }
  }, [theme]);

  if (pathname === '/investigation') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800 text-[#e2e2e2] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group transition-colors"
          title="Shivam Vishwanaath — Home"
        >
          <div className="w-8 h-8 rounded bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-500 font-bold group-hover:scale-105 transition-transform">
            SV
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm text-white tracking-wider group-hover:text-red-400 transition-colors">
              SHIVAM VISHWANAATH
            </span>
            <span className="hidden sm:block text-[10px] text-neutral-400 font-sans tracking-tight">
              Founder &amp; CEO · Systems Architect
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs" aria-label="Main navigation">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  isActive
                    ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* EYE-CATCHING PROMINENT PINBOARD BUTTON */}
          <Link
            href="/investigation"
            className="ml-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] flex items-center gap-2 border border-red-400/40 animate-pulse hover:animate-none"
            title="Launch Interactive Crime Investigation Board"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>PINBOARD (LIVE)</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="ml-2 p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center hover:bg-neutral-800"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>
        </nav>

        {/* Mobile Pinboard CTA + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-350 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          <Link
            href="/investigation"
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>PINBOARD</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e0e] border-b border-neutral-800 px-4 py-3 space-y-1 animate-in slide-in-from-top duration-200">
          <Link
            href="/investigation"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 mb-2 rounded-xl bg-gradient-to-r from-red-950 via-red-900 to-red-950 border border-red-500/60 text-white font-bold text-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>LAUNCH CRIME PINBOARD</span>
            </div>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </Link>

          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-red-950/60 border border-red-500/50 text-red-300 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
