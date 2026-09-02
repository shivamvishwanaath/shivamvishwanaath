'use client';

import React, { useState } from 'react';
import { X, Pin, StickyNote, ShieldAlert, Fingerprint } from 'lucide-react';
import { ClueItem } from '@/lib/investigation-data';

interface CustomClueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClue: (newClue: ClueItem) => void;
  boardTheme?: 'dark' | 'light';
}

export const CustomClueModal: React.FC<CustomClueModalProps> = ({
  isOpen,
  onClose,
  onAddClue,
  boardTheme = 'dark'
}) => {
  const isLight = boardTheme === 'light';
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [pinColor, setPinColor] = useState<'red' | 'brass' | 'blue' | 'black'>('red');
  const [stamp, setStamp] = useState<'CONFIDENTIAL' | 'HIGH PRIORITY' | 'VERIFIED'>('CONFIDENTIAL');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newClue: ClueItem = {
      id: `custom-evidence-${Date.now()}`,
      title: title.toUpperCase(),
      subtitle: subtitle || 'Investigator / Field Agent Note',
      category: 'profile',
      type: 'sticky',
      x: 600 + Math.random() * 260,
      y: 350 + Math.random() * 180,
      rotation: Math.floor(Math.random() * 8) - 4,
      pinColor: pinColor,
      stamp: stamp,
      summary: content,
      details: [content, 'Logged during live investigative review session.'],
      tags: ['Field Evidence', stamp, 'User Note'],
      uvSecret: 'SECRET INTEL: Pinned directly by investigating recruiter.'
    };

    onAddClue(newClue);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 touch-auto"
      onTouchStart={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
      onTouchEnd={e => e.stopPropagation()}
    >
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        onMouseDown={e => e.stopPropagation()}
        onMouseMove={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        className={`relative w-full max-w-md max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-xl sm:rounded-2xl border shadow-2xl overflow-hidden z-10 ${
          isLight
            ? 'bg-[#fcfaf4] border-neutral-300 text-neutral-900 shadow-neutral-100'
            : 'bg-[#121212] border-neutral-800 text-[#e2e2e2]'
        }`}
      >
        {/* Crime Tape Strip */}
        <div 
          style={{
            backgroundImage: isLight
              ? 'repeating-linear-gradient(45deg,#dc2626,#dc2626 10px,#f5f1e8 10px,#f5f1e8 20px)'
              : 'repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e 10px,#000 10px,#000 20px)'
          }}
          className="h-1.5 w-full shrink-0"
        />

        <div 
          className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 overscroll-contain touch-auto max-h-[calc(92dvh-120px)] sm:max-h-[calc(90vh-140px)]"
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          <div className={`flex items-center justify-between border-b pb-3 mb-4 gap-2 ${
            isLight ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <div className={`flex items-center gap-2 font-mono text-xs sm:text-sm font-bold min-w-0 ${
              isLight ? 'text-red-650' : 'text-red-400'
            }`}>
              <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
              <span className="truncate">FIELD EVIDENCE // LOG ARTIFACT</span>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isLight
                  ? 'bg-neutral-100 border-neutral-250 text-neutral-700 hover:bg-neutral-200'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 font-mono text-xs">
            <div>
              <label className={`block mb-1 text-[11px] sm:text-xs ${
                isLight ? 'text-neutral-550' : 'text-neutral-400'
              }`}>EVIDENCE HEADING / CASE TITLE:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. RECRUITER VERDICT: STRONG TECH LEAD MATCH"
                className={`w-full px-3 py-2.5 rounded-lg border focus:border-red-500 focus:outline-none text-xs font-mono min-h-[40px] ${
                  isLight
                    ? 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-450'
                    : 'bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600'
                }`}
              />
            </div>

            <div>
              <label className={`block mb-1 text-[11px] sm:text-xs ${
                isLight ? 'text-neutral-550' : 'text-neutral-400'
              }`}>SUBTITLE / FIELD CONTEXT:</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Role recommendation, scheduled interview"
                className={`w-full px-3 py-2.5 rounded-lg border focus:border-red-500 focus:outline-none text-xs font-mono min-h-[40px] ${
                  isLight
                    ? 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-450'
                    : 'bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600'
                }`}
              />
            </div>

            <div>
              <label className={`block mb-1 text-[11px] sm:text-xs ${
                isLight ? 'text-neutral-550' : 'text-neutral-400'
              }`}>INVESTIGATIVE OBSERVATION / TESTIMONY:</label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Log your notes, questions, or verdict to pin onto the board..."
                className={`w-full px-3 py-2 rounded-lg border focus:border-red-500 focus:outline-none text-xs font-mono ${
                  isLight
                    ? 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-450'
                    : 'bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className={`block mb-1 text-[11px] sm:text-xs ${
                  isLight ? 'text-neutral-550' : 'text-neutral-400'
                }`}>SECURITY STAMP:</label>
                <select
                  value={stamp}
                  onChange={(e) => setStamp(e.target.value as typeof stamp)}
                  className={`w-full px-2.5 py-2 rounded-lg border text-xs font-mono outline-none min-h-[38px] ${
                    isLight
                      ? 'bg-white border-neutral-300 text-neutral-800'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-200'
                  }`}
                >
                  <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                  <option value="HIGH PRIORITY">HIGH PRIORITY</option>
                  <option value="VERIFIED">VERIFIED</option>
                </select>
              </div>

              <div>
                <label className={`block mb-1 text-[11px] sm:text-xs ${
                  isLight ? 'text-neutral-550' : 'text-neutral-400'
                }`}>PIN COLOR:</label>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setPinColor('red')}
                    className={`w-7 h-7 rounded-full bg-red-600 transition-transform flex items-center justify-center ${pinColor === 'red' ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setPinColor('brass')}
                    className={`w-7 h-7 rounded-full bg-amber-500 transition-transform flex items-center justify-center ${pinColor === 'brass' ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setPinColor('blue')}
                    className={`w-7 h-7 rounded-full bg-blue-600 transition-transform flex items-center justify-center ${pinColor === 'blue' ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
                  />
                </div>
              </div>
            </div>

            <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
              isLight ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <span className={`text-[10px] flex items-center gap-1 ${
                isLight ? 'text-neutral-450' : 'text-neutral-500'
              }`}>
                <Fingerprint className="w-3.5 h-3.5 shrink-0" />
                <span>SECURE EVIDENCE PIN</span>
              </span>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md hover:shadow-red-600/30 font-mono min-h-[42px] active:scale-95"
              >
                <Pin className="w-4 h-4" />
                <span>PIN TO BOARD</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
