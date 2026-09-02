'use client';

import React, { useState, useEffect } from 'react';
import { STORY_CHAPTERS, StoryChapter } from '@/lib/investigation-data';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldAlert, 
  Fingerprint,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryNavigatorProps {
  currentChapterId: number | null;
  onChapterChange: (chapter: StoryChapter | null) => void;
  onExitStoryMode: () => void;
}

export const StoryNavigator: React.FC<StoryNavigatorProps> = ({
  currentChapterId,
  onChapterChange,
  onExitStoryMode
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const activeChapterIndex = currentChapterId 
    ? STORY_CHAPTERS.findIndex(c => c.id === currentChapterId) 
    : 0;

  const currentChapter = STORY_CHAPTERS[activeChapterIndex] || STORY_CHAPTERS[0];

  const handleSelectChapter = React.useCallback((index: number) => {
    const nextChapter = STORY_CHAPTERS[index];
    onChapterChange(nextChapter);
  }, [onChapterChange]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (activeChapterIndex < STORY_CHAPTERS.length - 1) {
          handleSelectChapter(activeChapterIndex + 1);
        } else {
          setIsPlaying(false);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeChapterIndex, handleSelectChapter]);

  const handleNext = () => {
    if (activeChapterIndex < STORY_CHAPTERS.length - 1) {
      handleSelectChapter(activeChapterIndex + 1);
    } else {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      handleSelectChapter(activeChapterIndex - 1);
    }
  };

  return (
    <div className="fixed bottom-2 sm:bottom-6 inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-auto sm:w-[95%] sm:max-w-3xl animate-in slide-in-from-bottom-6 duration-300">
      <div className="rounded-xl bg-[#121212]/95 border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl text-[#e2e2e2] overflow-hidden">
        {/* Crime Tape Strip */}
        <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#ff2e2e,#ff2e2e_10px,#000_10px,#000_20px)] shrink-0" />

        <div className="p-3 sm:p-5 space-y-2.5 sm:space-y-3">
          {/* Top Header & Chapter Stepper */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-red-400 font-mono text-[10px] sm:text-xs font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                <span>CH. {currentChapter.id}/{STORY_CHAPTERS.length}</span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400">
                {currentChapter.timeframe}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-bold transition-all min-h-[32px] ${
                  isPlaying 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                    : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200'
                }`}
              >
                {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span>{isPlaying ? 'PAUSE' : 'AUTOPLAY'}</span>
              </button>

              <button
                onClick={onExitStoryMode}
                className="px-2 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white text-[11px] sm:text-xs font-mono transition-colors min-h-[32px]"
                title="Exit story mode to free pinboard"
              >
                <X className="w-3.5 h-3.5 sm:hidden" />
                <span className="hidden sm:inline">PINBOARD</span>
              </button>
            </div>
          </div>

          {/* Chapter Headline & Narrative Text */}
          <div className="space-y-1">
            <div className="text-[10px] sm:text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5 truncate">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{currentChapter.headline}</span>
            </div>
            <h3 className="text-sm sm:text-xl font-mono font-bold text-white tracking-tight break-words">
              {currentChapter.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
              {currentChapter.narrative}
            </p>
          </div>

          {/* Chapter Steps Visual Breadcrumbs & Controls */}
          <div className="pt-1.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
              {STORY_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeChapterIndex
                      ? 'w-6 sm:w-8 bg-red-500 shadow-[0_0_10px_rgba(255,46,46,0.8)]'
                      : idx < activeChapterIndex
                      ? 'w-3 sm:w-4 bg-red-800/80'
                      : 'w-2 sm:w-3 bg-neutral-800'
                  }`}
                  title={ch.title}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrev}
                disabled={activeChapterIndex === 0}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-900 text-neutral-200 transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
                title="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md min-h-[34px]"
              >
                <span className="text-[11px] sm:text-xs">
                  {activeChapterIndex === STORY_CHAPTERS.length - 1 ? 'SOLVE' : 'NEXT'}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
