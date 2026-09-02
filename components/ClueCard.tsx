'use client';

import React from 'react';
import { ClueItem } from '@/lib/investigation-data';
import { RealisticPin } from './RealisticPin';
import { 
  Sparkles, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Compass, 
  GraduationCap, 
  Heart, 
  Award, 
  Lock, 
  FileSearch,
  Check
} from 'lucide-react';

interface ClueCardProps {
  clue: ClueItem;
  isSelected: boolean;
  isFocused: boolean;
  isDimmed?: boolean;
  actBadge?: string;
  isConnectingFrom: boolean;
  isConnectingTo: boolean;
  uvMode: boolean;
  boardTheme?: 'dark' | 'light';
  onSelect: (id: string) => void;
  onPinClick: (id: string, e: React.MouseEvent) => void;
  onDragStart: (id: string, e: React.MouseEvent | React.TouchEvent) => void;
}

const ClueCardComponent: React.FC<ClueCardProps> = ({
  clue,
  isSelected,
  isFocused,
  isDimmed = false,
  actBadge,
  isConnectingFrom,
  isConnectingTo,
  uvMode,
  boardTheme = 'dark',
  onSelect,
  onPinClick,
  onDragStart,
}) => {
  const getCategoryIcon = () => {
    switch (clue.category) {
      case 'profile': return <Terminal className="w-3.5 h-3.5 text-amber-400" />;
      case 'skills': return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'experience': return <Award className="w-3.5 h-3.5 text-red-400" />;
      case 'projects': return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      case 'education': return <GraduationCap className="w-3.5 h-3.5 text-blue-400" />;
      case 'leadership': return <Heart className="w-3.5 h-3.5 text-rose-400" />;
      case 'headlines': return <FileSearch className="w-3.5 h-3.5 text-amber-300" />;
      default: return <Compass className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  const renderCardContent = () => {
    const isLight = boardTheme === 'light';
    const cardBgClass = isLight ? 'bg-[#fcfaf4] text-neutral-800 border-neutral-300' : 'bg-[#1a1a1a] text-white border-neutral-700';
    const labelClass = isLight ? 'text-neutral-900' : 'text-white';
    const textMutedClass = isLight ? 'text-neutral-600' : 'text-neutral-400';
    const textSubClass = isLight ? 'text-neutral-700' : 'text-neutral-300';
    const innerBgClass = isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-[#0d0d0d] border-neutral-800';

    switch (clue.type) {
      case 'newspaper':
        return (
          <div className="p-4 bg-[#f9f9f9] text-[#111111] rounded shadow-xl border border-neutral-300 relative overflow-hidden font-serif">
            {/* Newspaper Header Bar */}
            <div className="border-y-2 border-black py-1 mb-2 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase">
              <span className="font-black text-xs font-serif italic tracking-tight">{clue.title || 'THE ENGINEERING TIMES'}</span>
              <span className="font-bold">{clue.date || 'LATEST EDITION'}</span>
            </div>
            
            <div className="text-[10px] font-mono uppercase tracking-wider text-red-600 font-bold mb-1">
              {`// BREAKING INVESTIGATION`}
            </div>
            
            <h3 className="font-serif font-black text-sm sm:text-base leading-tight text-[#111111] mb-2 tracking-tight">
              {clue.headline || clue.subtitle}
            </h3>

            <p className="font-serif text-xs text-[#222222] line-clamp-3 leading-relaxed">
              {clue.summary}
            </p>

            {clue.metrics && (
              <div className="mt-3 pt-2 border-t border-black/15 flex items-center justify-between font-mono text-[9px] text-[#444444]">
                {clue.metrics.slice(0, 2).map((m, idx) => (
                  <span key={idx}><strong>{m.label}:</strong> {m.value}</span>
                ))}
              </div>
            )}
          </div>
        );

      case 'polaroid':
        return (
          <div className={`p-2.5 rounded shadow-2xl border space-y-2 font-mono transition-colors ${
            isLight
              ? 'bg-[#fcfaf4] border-neutral-300 text-neutral-800'
              : 'bg-white border-neutral-200 text-black'
          }`}>
            {/* Image / Graphic Area */}
            <div className={`relative aspect-4/3 w-full rounded-xs overflow-hidden flex flex-col items-center justify-center p-0 border transition-colors ${
              isLight
                ? 'bg-neutral-100 border-neutral-300'
                : 'bg-neutral-900 border-neutral-800'
            }`}>
              {clue.imageUrl ? (
                <img src={clue.imageUrl} alt={clue.title} className="w-full h-full object-cover" />
              ) : clue.id === 'subject-shivam' ? (
                <div className="text-center space-y-1 p-3">
                  <div className={`w-14 h-14 rounded-full border-2 border-red-500 mx-auto flex items-center justify-center font-mono text-xl font-black shadow-inner transition-colors ${
                    isLight ? 'bg-white text-neutral-800' : 'bg-neutral-800 text-white'
                  }`}>
                    SV
                  </div>
                  <div className={`font-mono text-xs font-bold tracking-wider transition-colors ${
                    isLight ? 'text-neutral-800' : 'text-white'
                  }`}>
                    SHIVAM
                  </div>
                  <div className={`text-[9px] font-mono font-semibold transition-colors ${
                    isLight ? 'text-red-650' : 'text-red-400'
                  }`}>
                    FOUNDER & CEO
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-1.5 p-3">
                  <Terminal className={`w-7 h-7 mx-auto transition-colors ${
                    isLight ? 'text-red-500' : 'text-red-400'
                  }`} />
                  <span className={`font-mono text-xs font-bold block transition-colors ${
                    isLight ? 'text-neutral-850' : 'text-white'
                  }`}>{clue.title}</span>
                  <span className={`text-[9px] font-mono transition-colors ${
                    isLight ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>{clue.subtitle}</span>
                </div>
              )}

              {/* Red Stamp Overlay */}
              {clue.stamp && (
                <div className={`absolute bottom-2 right-2 px-1.5 py-0.5 border font-mono text-[8px] font-black uppercase tracking-widest rotate-6 shadow-sm transition-colors ${
                  isLight
                    ? 'border-red-500/50 bg-red-50/80 text-red-650'
                    : 'border-red-500 bg-red-950 text-red-400'
                }`}>
                  {clue.stamp}
                </div>
              )}
            </div>

            {/* Polaroid handwritten caption space */}
            <div className="pt-0.5 text-center font-mono">
              <h4 className={`text-xs font-bold tracking-tight truncate ${
                isLight ? 'text-neutral-900' : 'text-neutral-900'
              }`}>
                {clue.title}
              </h4>
              <p className={`text-[9px] ${
                isLight ? 'text-neutral-550' : 'text-neutral-600'
              }`}>
                ID: SV-2021-25 • &quot;THE PROTAGONIST&quot;
              </p>
            </div>
          </div>
        );

      case 'sticky':
        return (
          <div className="p-4 bg-[#f1f1d4] text-black rounded shadow-lg border-l-4 border-red-500 font-mono space-y-2 relative">
            {/* Top Tape Strip */}
            <div className="absolute -top-2.5 right-2 w-12 h-4 bg-neutral-400/40 rotate-12 pointer-events-none rounded-xs" />

            <div className="text-[9px] uppercase font-bold text-red-600 tracking-wider">
              {`// ${clue.category.toUpperCase()}_RECORD`}
            </div>

            <h4 className="text-xs font-bold text-black font-sans leading-tight">
              {clue.title}
            </h4>

            <p className="text-[10px] text-neutral-700 font-sans font-medium">
              {clue.subtitle}
            </p>

            <p className="text-[10px] text-neutral-800 line-clamp-3 leading-snug">
              {clue.summary}
            </p>

            {clue.metrics && (
              <div className="pt-1.5 border-t border-black/10 text-[9px] font-bold text-red-700">
                ★ {clue.metrics[0]?.label}: {clue.metrics[0]?.value}
              </div>
            )}
          </div>
        );

      case 'arsenal':
        return (
          <div className={`p-4 rounded-lg shadow-2xl font-mono space-y-3 border ${cardBgClass}`}>
            <div className={`p-2 text-center text-xs font-black uppercase tracking-widest rounded-xs ${
              isLight ? 'bg-neutral-200 text-neutral-800' : 'bg-neutral-800 text-white'
            }`}>
              SKILLS MATRIX
            </div>

            <p className={`text-[10px] line-clamp-2 ${textMutedClass}`}>
              {clue.summary}
            </p>

            <ul className={`text-[10px] space-y-1.5 ${textSubClass}`}>
              <li>• <span className={`font-bold ${labelClass}`}>Infra:</span> Docker, Caddy, CI/CD, Nginx</li>
              <li>• <span className={`font-bold ${labelClass}`}>Dev:</span> TypeScript, React, Node, C++</li>
              <li>• <span className={`font-bold ${labelClass}`}>Ops:</span> Ubuntu VPS, PM2, UFW, Reverse Proxy</li>
              <li>• <span className={`font-bold ${labelClass}`}>Data:</span> MongoDB, PostgreSQL, Supabase</li>
            </ul>

            <div className={`pt-2 border-t flex items-center justify-between text-[9px] ${
              isLight ? 'border-neutral-200 text-neutral-500' : 'border-neutral-800 text-neutral-400'
            }`}>
              <span>ACTIVE STACK</span>
              <span className={`font-bold ${isLight ? 'text-red-650' : 'text-red-400'}`}>100% PRODUCTION READY</span>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className={`p-3.5 rounded-lg shadow-2xl font-mono space-y-2 border ${cardBgClass}`}>
            <div className={`flex items-center justify-between border-b pb-1 text-xs ${
              isLight ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <span className={`font-bold flex items-center gap-1.5 ${labelClass}`}>
                <Compass className="w-3.5 h-3.5 text-red-500" />
                {clue.title}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-red-950/80 border border-red-800 text-red-400 uppercase font-bold">
                JURISDICTION
              </span>
            </div>

            {/* Stylized Grid Map View */}
            <div className={`relative h-28 rounded border overflow-hidden p-2.5 flex flex-col justify-between ${innerBgClass}`}>
              {/* Radar Grid Lines */}
              <div className={`absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] opacity-60 ${
                isLight ? 'bg-[radial-gradient(#d1d5db_1px,transparent_1px)]' : ''
              }`} />

              <div className="relative z-10 space-y-1 text-[9px]">
                <div className={`flex items-center gap-1 font-bold ${isLight ? 'text-red-650' : 'text-red-400'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <strong>Ranchi:</strong> BIT Mesra (B.Tech ECE)
                </div>
                <div className={`flex items-center gap-1 ${labelClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <strong>Bhubaneswar:</strong> Trans Ed (Tech Lead)
                </div>
                <div className={`flex items-center gap-1 ${textSubClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <strong>Noida:</strong> Amity Online (MBA Data Sci)
                </div>
                <div className={`flex items-center gap-1 ${textMutedClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  <strong>Bokaro:</strong> Chinmaya Vidyalaya
                </div>
              </div>

              <div className={`relative z-10 flex items-center justify-between text-[8px] border-t pt-1 ${
                isLight ? 'border-neutral-200 text-neutral-500' : 'border-neutral-800/80 text-neutral-500'
              }`}>
                <span>RADAR ACTIVE</span>
                <span>4 STATIONS TRACKED</span>
              </div>
            </div>
          </div>
        );

      case 'dossier':
      default:
        return (
          <div className={`p-4 rounded-lg shadow-2xl font-mono space-y-2.5 relative border ${cardBgClass}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] bg-red-950/90 border border-red-800 text-red-400 px-1.5 py-0.5 rounded font-bold">
                {clue.stamp || 'PRIORITY: HIGH'}
              </span>
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                {clue.category.toUpperCase()}_LOGS
              </span>
            </div>

            <div className={`flex items-center gap-1.5 text-xs font-bold truncate ${labelClass}`}>
              {getCategoryIcon()}
              <span className="truncate">{clue.title}</span>
            </div>

            <div className={`text-[10px] font-sans font-medium line-clamp-1 ${textSubClass}`}>
              {clue.subtitle}
            </div>

            <p className={`text-[10px] line-clamp-2 leading-relaxed ${textMutedClass}`}>
              {clue.summary}
            </p>

            {clue.tags && clue.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {clue.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className={`text-[8px] border px-1.5 py-0.5 font-mono uppercase ${
                    isLight
                      ? 'border-neutral-300 bg-neutral-100 text-neutral-600'
                      : 'border-neutral-600 bg-neutral-900/60 text-neutral-300'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div
      id={`clue-card-${clue.id}`}
      style={{
        transform: `translate3d(${clue.x}px, ${clue.y}px, 0) rotate(${clue.rotation}deg)`,
      }}
      className={`absolute w-64 sm:w-72 select-none cursor-grab active:cursor-grabbing transition-all duration-300 group ${
        isSelected ? 'z-30' : isFocused ? 'z-20' : 'z-10'
      } ${
        isDimmed && !isSelected 
          ? 'opacity-30 hover:opacity-100 filter grayscale-[65%] hover:grayscale-0 scale-95 hover:scale-100 hover:z-25' 
          : 'opacity-100 scale-100'
      }`}
      onMouseDown={(e) => onDragStart(clue.id, e)}
      onTouchStart={(e) => onDragStart(clue.id, e)}
    >
      {/* Realistic Pushpin */}
      <div 
        id={`pin-${clue.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onPinClick(clue.id, e);
        }}
        title="Click pin to attach / tie red strings!"
        className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 cursor-pointer hover:scale-110 transition-transform duration-150 active:scale-95"
      >
        <RealisticPin
          color={
            isConnectingFrom ? 'green' :
            isConnectingTo ? 'white' :
            clue.pinColor === 'brass' ? 'brass' :
            clue.pinColor === 'blue' ? 'blue' :
            'red'
          }
          glowing={isConnectingFrom}
          pulsing={isConnectingTo}
          size={28}
        />
      </div>

      {/* Act Ribbon / Badge at top right */}
      {actBadge && (
        <div 
          className={`absolute -top-2.5 right-2 z-25 px-2 py-0.5 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md transition-all duration-300 ${
            isFocused
              ? 'bg-red-600 border border-white/80 text-white ring-2 ring-red-500/50 animate-pulse'
              : boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-350 text-neutral-600'
              : 'bg-neutral-900/90 border border-neutral-700 text-neutral-400'
          }`}
        >
          {isFocused && <Sparkles className="w-2.5 h-2.5 text-amber-300" />}
          <span>{actBadge}</span>
        </div>
      )}

      {/* Card Outline Wrapper */}
      <div
        onClick={() => {
          onSelect(clue.id);
        }}
        className={`relative rounded-lg transition-all duration-200 ${
          isSelected
            ? 'ring-2 ring-red-500 shadow-[0_0_35px_rgba(255,46,46,0.45)] scale-[1.02]'
            : isFocused
            ? 'ring-2 ring-red-500 shadow-[0_0_25px_rgba(255,46,46,0.35)]'
            : uvMode
            ? 'shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/50 hover:ring-cyan-400'
            : boardTheme === 'light'
            ? 'hover:ring-1 hover:ring-neutral-400 hover:shadow-lg'
            : 'hover:ring-1 hover:ring-neutral-500 hover:shadow-2xl'
        }`}
      >
        {/* Render polymorphic card content */}
        {renderCardContent()}

        {/* UV Secret Glow Reveal if in UV Mode */}
        {uvMode && clue.uvSecret && (
          <div className="mt-1.5 p-2 rounded bg-cyan-950/90 border border-cyan-500/80 text-[10px] font-mono text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-in fade-in">
            <div className="flex items-center gap-1 text-[9px] font-bold text-cyan-400 mb-0.5">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              UV EVIDENCE DECRYPTED:
            </div>
            <p className="italic text-cyan-100">{clue.uvSecret}</p>
          </div>
        )}

        {/* Hover inspect pill */}
        <div className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono flex items-center gap-1 shadow-lg transition-colors ${
            boardTheme === 'light'
              ? 'bg-white border-neutral-300 text-neutral-800'
              : 'bg-black/95 border-red-500/60 text-white'
          }`}>
            <FileSearch className="w-2.5 h-2.5 text-red-500" />
            Inspect Dossier
          </span>
        </div>
      </div>
    </div>
  );
};

export const ClueCard = React.memo(ClueCardComponent);
