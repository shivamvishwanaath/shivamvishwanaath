'use client';

import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Terminal, 
  X, 
  ShieldAlert, 
  HelpCircle, 
  Fingerprint,
  Radio,
  Search,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { STATIC_FAQS, FAQItem } from '@/lib/static-faq';

interface StaticFAQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  boardTheme?: 'dark' | 'light';
}

export const StaticFAQDrawer: React.FC<StaticFAQDrawerProps> = ({
  isOpen,
  onClose,
  boardTheme = 'dark'
}) => {
  const isLight = boardTheme === 'light';
  const [selectedFaqId, setSelectedFaqId] = useState<string>(STATIC_FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copied, setCopied] = useState<boolean>(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(STATIC_FAQS.map(f => f.category)));
    return ['ALL', ...cats];
  }, []);

  const filteredFaqs = useMemo(() => {
    return STATIC_FAQS.filter(faq => {
      const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) || 
        faq.label.toLowerCase().includes(q) || 
        faq.answerMarkdown.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedFaq = useMemo(() => {
    return STATIC_FAQS.find(f => f.id === selectedFaqId) || STATIC_FAQS[0];
  }, [selectedFaqId]);

  const handleCopy = () => {
    if (selectedFaq) {
      navigator.clipboard.writeText(selectedFaq.answerMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className={`relative w-full max-w-2xl h-full border-l shadow-2xl flex flex-col z-10 font-mono ${
        isLight
          ? 'bg-[#fcfaf4] border-neutral-300 text-neutral-900 shadow-neutral-100'
          : 'bg-[#0c0c0c] border-neutral-800 text-[#e2e2e2]'
      }`}>
        {/* Top Header */}
        <div className={`p-4 border-b flex items-center justify-between shrink-0 ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#141414] border-neutral-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded border flex items-center justify-center ${
              isLight ? 'bg-red-50 border-red-200 text-red-650' : 'bg-red-950/60 border border-red-500/50 text-red-400'
            }`}>
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className={`text-xs font-bold tracking-wider flex items-center gap-2 ${
                isLight ? 'text-neutral-900' : 'text-white'
              }`}>
                <span>CASE ARCHIVES // INTEL DOSSIER</span>
                <span className={`px-1.5 py-0.5 rounded border text-[10px] ${
                  isLight
                    ? 'bg-red-50 border-red-200 text-red-650'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  VERIFIED RECORD
                </span>
              </div>
              <p className={`text-[11px] font-sans ${
                isLight ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                Forensic records and verified FAQ regarding Tech Lead Shivam Vishwanaath
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg border transition-colors shrink-0 ${
              isLight
                ? 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-800 border-transparent text-neutral-300 hover:text-white hover:bg-neutral-700'
            }`}
            title="Close intel drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar & Category Chips */}
        <div className={`p-3 border-b space-y-2.5 shrink-0 ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#101010] border-neutral-800/80'
        }`}>
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-550" />
            <input
              type="text"
              placeholder="Search case records, technologies, leadership..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded border text-xs placeholder-neutral-450 focus:outline-none focus:border-red-500/60 font-sans ${
                isLight
                  ? 'bg-white border-neutral-300 text-neutral-900'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-200 focus:border-red-500/60'
              }`}
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white font-bold'
                    : isLight
                    ? 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-250 text-neutral-600 hover:text-neutral-800'
                    : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area: Left/Top selector + Right/Bottom Reading view */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* FAQ Item List */}
          <div className={`w-full md:w-5/12 border-b md:border-b-0 md:border-r overflow-y-auto max-h-48 md:max-h-full ${
            isLight ? 'border-neutral-200 bg-neutral-50/50' : 'border-neutral-800 bg-[#0a0a0a]'
          }`}>
            <div className="p-2 space-y-1.5">
              {filteredFaqs.length === 0 ? (
                <div className={`p-4 text-center text-xs font-sans ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  No matching case files found.
                </div>
              ) : (
                filteredFaqs.map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => setSelectedFaqId(faq.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 border ${
                      selectedFaqId === faq.id
                        ? isLight
                          ? 'bg-neutral-100 border-neutral-300 text-neutral-900 shadow-xs'
                          : 'bg-neutral-800/90 border-red-500/50 text-white shadow-sm'
                        : isLight
                        ? 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300'
                        : 'bg-neutral-900/40 hover:bg-neutral-900 border-transparent text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="space-y-1 overflow-hidden">
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${
                        isLight ? 'text-red-650' : 'text-red-400'
                      }`}>
                        {faq.category}
                      </div>
                      <div className="font-sans text-xs line-clamp-2 leading-snug">
                        {faq.label}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 transition-transform ${
                      selectedFaqId === faq.id
                        ? isLight ? 'text-red-600 translate-x-0.5' : 'text-red-400 translate-x-0.5'
                        : 'text-neutral-600'
                    }`} />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Answer Preview Panel */}
          <div className={`flex-1 flex flex-col overflow-hidden ${isLight ? 'bg-white' : 'bg-[#0d0d0d]'}`}>
            {/* Answer Toolbar */}
            <div className={`px-4 py-2.5 border-b flex items-center justify-between shrink-0 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'border-neutral-800/80 bg-[#121212]'
            }`}>
              <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-neutral-550' : 'text-neutral-400'}`}>
                <Fingerprint className="w-3.5 h-3.5 text-red-500" />
                <span className={`text-[11px] font-bold truncate max-w-[200px] sm:max-w-xs ${
                  isLight ? 'text-neutral-800' : 'text-neutral-300'
                }`}>
                  {selectedFaq.label}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className={`px-2 py-1 rounded text-[11px] transition-colors flex items-center gap-1.5 border ${
                  isLight
                    ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700'
                    : 'bg-neutral-800 border-transparent text-neutral-300 hover:text-white'
                }`}
                title="Copy dossier markdown"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-neutral-455" />
                    <span>COPY INTEL</span>
                  </>
                )}
              </button>
            </div>

            {/* Markdown Body */}
            <div className={`flex-1 p-4 sm:p-6 overflow-y-auto font-sans leading-relaxed text-sm ${
              isLight ? 'text-neutral-800' : 'text-neutral-205'
            }`}>
              <div className={`prose max-w-none prose-headings:font-mono ${
                isLight
                  ? 'prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-li:text-neutral-700 prose-strong:text-red-700'
                  : 'prose-invert prose-red prose-headings:text-white prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-red-300'
              }`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedFaq.answerMarkdown}
                </ReactMarkdown>
              </div>
            </div>

            {/* Bottom Docket Footer */}
            <div className={`p-3 border-t flex items-center justify-between text-[10px] shrink-0 font-mono ${
              isLight ? 'border-neutral-200 bg-neutral-50 text-neutral-500' : 'border-neutral-800 bg-[#101010] text-neutral-500'
            }`}>
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-red-500" />
                OFFICIAL RECORD // SHIVAM VISHWANAATH
              </span>
              <span>INDEX: #{selectedFaq.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
