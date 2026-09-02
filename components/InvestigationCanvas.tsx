'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ClueItem, 
  RedStringConnection, 
  StoryChapter, 
  INITIAL_CLUES, 
  INITIAL_CONNECTIONS, 
  STORY_CHAPTERS 
} from '@/lib/investigation-data';
import { CASE_ACTS, CaseActId, getClueActInfo } from '@/lib/story-acts';
import { ClueCard } from './ClueCard';
import { DetailModal } from './DetailModal';
import { StoryNavigator } from './StoryNavigator';
import { StaticFAQDrawer } from './StaticFAQDrawer';
import { NewspaperArchiveModal } from './NewspaperArchiveModal';
import { CustomClueModal } from './CustomClueModal';
import { ActTransitionModal } from './ActTransitionModal';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Newspaper, 
  Terminal, 
  Plus, 
  Link as LinkIcon, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Trophy,
  Filter,
  MapPin,
  FileText,
  Compass,
  ArrowRight,
  ShieldAlert,
  Target,
  Smartphone,
  LayoutGrid
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InvestigationCanvasProps {
  actId?: 'act-1' | 'act-2' | 'act-3' | 'act-4';
  onActComplete?: (actId: string) => void;
  onNavigateView?: (view: CaseActId) => void;
  boardTheme?: 'dark' | 'light';
}

export const InvestigationCanvas: React.FC<InvestigationCanvasProps> = ({
  actId = 'act-1',
  onActComplete,
  onNavigateView,
  boardTheme = 'dark'
}) => {
  const currentActData = CASE_ACTS[actId] || CASE_ACTS['act-1'];

  // Board Data tailored to this Act
  const [clues, setClues] = useState<ClueItem[]>(INITIAL_CLUES);
  const [connections, setConnections] = useState<RedStringConnection[]>(INITIAL_CONNECTIONS);
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);

  // Focus only current act's cards vs show all cards
  const [actFocusMode, setActFocusMode] = useState<boolean>(true);

  // Mobile Field Dossier Deck mode vs 2D Corkboard Canvas
  const [mobileDeckMode, setMobileDeckMode] = useState<boolean>(false);

  // Pan & Zoom Transform State based on active act
  const [zoom, setZoom] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>(() => {
    if (actId === 'act-2') return { x: -280, y: -40 };
    if (actId === 'act-3') return { x: -380, y: -20 };
    if (actId === 'act-4') return { x: -480, y: -20 };
    return { x: -120, y: -40 };
  });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number; startPanX: number; startPanY: number }>({
    x: 0,
    y: 0,
    startPanX: 0,
    startPanY: 0,
  });

  // Multi-touch pinch zoom state
  const touchStateRef = useRef<{
    initialPinchDistance: number | null;
    initialZoom: number;
    initialPan: { x: number; y: number };
  }>({
    initialPinchDistance: null,
    initialZoom: 0.85,
    initialPan: { x: 0, y: 0 },
  });

  // Dragging Card State
  const [draggingClueId, setDraggingClueId] = useState<string | null>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; cardX: number; cardY: number }>({
    mouseX: 0,
    mouseY: 0,
    cardX: 0,
    cardY: 0,
  });

  // Modes & Modals
  const [uvMode, setUvMode] = useState<boolean>(false);
  const [isStoryMode, setIsStoryMode] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<StoryChapter | null>(null);
  const [isFAQOpen, setIsFAQOpen] = useState<boolean>(false);
  const [isHeadlinesOpen, setIsHeadlinesOpen] = useState<boolean>(false);
  const [isCustomNoteOpen, setIsCustomNoteOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [hoveredStringId, setHoveredStringId] = useState<string | null>(null);

  // Dynamic String Creation Tool
  const [isConnectingMode, setIsConnectingMode] = useState<boolean>(false);
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null);

  // Act Transition Breakthrough Modal State
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Smoothly center the canvas camera on an Act's specific cluster of clues
  const centerOnAct = useCallback((targetActId: 'act-1' | 'act-2' | 'act-3' | 'act-4') => {
    const act = CASE_ACTS[targetActId];
    if (!act) return;

    const targetClueIds = [...act.requiredClueIds, 'subject-shivam'];
    const actClues = clues.filter(c => targetClueIds.includes(c.id));
    if (actClues.length === 0) return;

    const minX = Math.min(...actClues.map(c => c.x));
    const maxX = Math.max(...actClues.map(c => c.x + 280));
    const minY = Math.min(...actClues.map(c => c.y));
    const maxY = Math.max(...actClues.map(c => c.y + 260));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const spanX = maxX - minX + 220;
      const spanY = maxY - minY + 220;
      const fitZoom = Math.min(1.1, Math.max(0.55, Math.min(width / spanX, height / spanY)));

      const targetPanX = width / 2 - centerX * fitZoom;
      const targetPanY = height / 2 - centerY * fitZoom;

      setZoom(fitZoom);
      setPan({ x: targetPanX, y: targetPanY });
    }
  }, [clues]);

  // Center camera automatically when active Act changes
  useEffect(() => {
    centerOnAct(actId);
    const raf = requestAnimationFrame(() => {
      centerOnAct(actId);
    });
    return () => cancelAnimationFrame(raf);
  }, [actId, centerOnAct]);

  // Focus zoom when Story Mode chapter changes
  useEffect(() => {
    if (isStoryMode && currentChapter) {
      const targetClues = clues.filter(c => currentChapter.focusedClueIds.includes(c.id));
      if (targetClues.length > 0) {
        const avgX = targetClues.reduce((acc, c) => acc + c.x, 0) / targetClues.length;
        const avgY = targetClues.reduce((acc, c) => acc + c.y, 0) / targetClues.length;

        if (containerRef.current) {
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          const targetPanX = width / 2 - (avgX + 130) * zoom;
          const targetPanY = height / 2 - (avgY + 100) * zoom;

          setPan({ x: targetPanX, y: targetPanY });
        }
      }
    }
  }, [isStoryMode, currentChapter, zoom, clues]);

  // Handle Board Mouse Dragging (Pan)
  const handleBoardMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.clue-card-interactive')) return;

    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
  };

  const handleBoardMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.startPanX + dx,
        y: panStartRef.current.startPanY + dy,
      });
    } else if (draggingClueId) {
      const dx = (e.clientX - dragStartRef.current.mouseX) / zoom;
      const dy = (e.clientY - dragStartRef.current.mouseY) / zoom;

      setClues(prev =>
        prev.map(c => {
          if (c.id === draggingClueId) {
            return {
              ...c,
              x: Math.max(20, Math.min(2200, dragStartRef.current.cardX + dx)),
              y: Math.max(20, Math.min(1600, dragStartRef.current.cardY + dy)),
            };
          }
          return c;
        })
      );
    }
  }, [isPanning, draggingClueId, zoom]);

  const handleBoardMouseUp = () => {
    if (isPanning) setIsPanning(false);
    if (draggingClueId) {
      setDraggingClueId(null);
    }
  };

  // Touch handlers for mobile pan, drag, and 2-finger pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.clue-card-interactive') && e.touches.length === 1) {
      return;
    }

    if (e.touches.length === 1) {
      setIsPanning(true);
      panStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      };
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      touchStateRef.current.initialPinchDistance = dist;
      touchStateRef.current.initialZoom = zoom;
      touchStateRef.current.initialPan = { ...pan };
    }
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning) {
      const dx = e.touches[0].clientX - panStartRef.current.x;
      const dy = e.touches[0].clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.startPanX + dx,
        y: panStartRef.current.startPanY + dy,
      });
    } else if (e.touches.length === 1 && draggingClueId) {
      const dx = (e.touches[0].clientX - dragStartRef.current.mouseX) / zoom;
      const dy = (e.touches[0].clientY - dragStartRef.current.mouseY) / zoom;
      setClues(prev =>
        prev.map(c => {
          if (c.id === draggingClueId) {
            return {
              ...c,
              x: Math.max(20, Math.min(2200, dragStartRef.current.cardX + dx)),
              y: Math.max(20, Math.min(1600, dragStartRef.current.cardY + dy)),
            };
          }
          return c;
        })
      );
    } else if (e.touches.length === 2 && touchStateRef.current.initialPinchDistance) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const scale = currentDist / touchStateRef.current.initialPinchDistance;
      const newZoom = Math.min(1.6, Math.max(0.45, touchStateRef.current.initialZoom * scale));
      setZoom(newZoom);
    }
  }, [isPanning, draggingClueId, zoom]);

  const handleTouchEnd = () => {
    setIsPanning(false);
    setDraggingClueId(null);
    touchStateRef.current.initialPinchDistance = null;
  };

  // Native non-passive wheel listener for buttery-smooth zoom without browser console errors
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;

      setZoom((currentZoom) => {
        const newZoom = Math.min(1.6, Math.max(0.45, currentZoom * zoomFactor));
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setPan((currentPan) => {
          const boardX = (mouseX - currentPan.x) / currentZoom;
          const boardY = (mouseY - currentPan.y) / currentZoom;

          const nextPanX = mouseX - boardX * newZoom;
          const nextPanY = mouseY - boardY * newZoom;
          return { x: nextPanX, y: nextPanY };
        });

        return newZoom;
      });
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

  // Card Dragging
  const handleStartDrag = (id: string, clientX: number, clientY: number) => {
    const targetClue = clues.find(c => c.id === id);
    if (!targetClue) return;

    setDraggingClueId(id);
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      cardX: targetClue.x,
      cardY: targetClue.y,
    };
  };

  // Pin Click for Dynamic Red String Creation
  const handlePinClick = (id: string) => {
    if (!isConnectingMode && !connectingFromId) {
      setIsConnectingMode(true);
      setConnectingFromId(id);
      return;
    }

    if (!connectingFromId) {
      setConnectingFromId(id);
      setIsConnectingMode(true);
    } else if (connectingFromId === id) {
      setConnectingFromId(null);
      setIsConnectingMode(false);
    } else {
      const fromClue = clues.find(c => c.id === connectingFromId);
      const toClue = clues.find(c => c.id === id);

      if (fromClue && toClue) {
        const newConnection: RedStringConnection = {
          id: `custom-str-${Date.now()}`,
          fromId: connectingFromId,
          toId: id,
          label: 'Custom Link',
          narrativeReason: `Investigator linked "${fromClue.title}" to "${toClue.title}"`,
          category: 'custom',
        };

        setConnections(prev => [...prev, newConnection]);
      }
      setConnectingFromId(null);
      setIsConnectingMode(false);
    }
  };

  const handleResetView = () => {
    setZoom(0.85);
    setPan({ x: -100, y: -40 });
  };

  const handleSolveCase = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
    if (onActComplete) {
      onActComplete(actId);
    }
    // Open the cinematic Act Breakthrough & Transition Briefing
    setIsTransitionModalOpen(true);
  };

  const handleProceedToNextAct = (nextView: CaseActId) => {
    setIsTransitionModalOpen(false);
    if (onNavigateView) {
      onNavigateView(nextView);
    }
  };

  const handleAddCustomClue = (newClue: ClueItem) => {
    setClues(prev => [...prev, newClue]);
    setIsCustomNoteOpen(false);
  };

  // Filter clues based on Act highlight and category filter
  const visibleClues = filterCategory === 'all'
    ? clues
    : clues.filter(c => c.category === filterCategory);

  // Clues prioritized for current Act in mobile deck
  const currentActClues = visibleClues.filter(c => {
    const info = getClueActInfo(c.id, actId);
    return info.isCurrentAct || c.id === 'subject-shivam';
  });

  const otherActClues = visibleClues.filter(c => {
    const info = getClueActInfo(c.id, actId);
    return !info.isCurrentAct && c.id !== 'subject-shivam';
  });

  const selectedClue = clues.find(c => c.id === selectedClueId) || null;

  // Calculate string path coordinates with catenary sag
  const calculateCatenaryPath = (fromClue: ClueItem, toClue: ClueItem) => {
    const cardWidth = 270;
    const x1 = fromClue.x + cardWidth / 2;
    const y1 = fromClue.y;
    const x2 = toClue.x + cardWidth / 2;
    const y2 = toClue.y;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const sag = Math.min(90, Math.max(25, dist * 0.14));
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2 + sag;

    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleBoardMouseDown}
      onMouseMove={handleBoardMouseMove}
      onMouseUp={handleBoardMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-full overflow-hidden select-none cursor-default font-mono transition-colors duration-500 touch-none ${
        uvMode 
          ? 'bg-[#060814] text-cyan-100' 
          : boardTheme === 'light'
          ? 'bg-[#f4f0e6] text-neutral-800'
          : 'bg-[#0f0f0f] text-[#e0e0e0]'
      }`}
    >
      {/* Ambient Vignette & Sophisticated Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          backgroundImage: uvMode 
            ? 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1) 0%, rgba(3,7,18,0.98) 100%), linear-gradient(to right, #090e24 1px, transparent 1px), linear-gradient(to bottom, #090e24 1px, transparent 1px)'
            : boardTheme === 'light'
            ? 'radial-gradient(circle at 50% 50%, #fbf9f3 0%, #e8e4d8 100%), linear-gradient(to right, #dedad0 1px, transparent 1px), linear-gradient(to bottom, #dedad0 1px, transparent 1px)'
            : 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%), linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '100% 100%, 36px 36px, 36px 36px'
        }}
      />

      {/* Atmospheric Noir Frame Border */}
      <div className={`absolute inset-0 pointer-events-none border-[4px] sm:border-[6px] transition-colors duration-500 z-20 ${
        boardTheme === 'light'
          ? 'border-[#cdc8be] shadow-[inset_0_0_80px_rgba(0,0,0,0.15)]'
          : 'border-[#161616] shadow-[inset_0_0_100px_rgba(0,0,0,0.95)]'
      }`} />

      {/* Compact Quick Actions Pill Cluster (Mobile/Tablet only) */}
      <div className={`absolute top-2 right-2 z-30 flex lg:hidden items-center gap-1 p-1 rounded-xl shadow-2xl backdrop-blur-md select-none transition-colors ${
        boardTheme === 'light'
          ? 'bg-white/90 border border-neutral-300'
          : 'bg-[#141414]/95 border border-neutral-800'
      }`}>
        {/* Mobile Field Deck Toggle */}
        <button
          onClick={() => setMobileDeckMode(!mobileDeckMode)}
          className={`flex items-center justify-center p-2 rounded-lg transition-all min-h-[34px] min-w-[34px] ${
            mobileDeckMode
              ? 'bg-amber-600 border border-amber-500 text-white shadow-md'
              : boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
              : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
          }`}
          title="Toggle between Pinboard and Mobile Clue Deck"
        >
          {mobileDeckMode ? <LayoutGrid className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-amber-400" />}
        </button>

        {/* Center Act Camera Target */}
        <button
          onClick={() => centerOnAct(actId)}
          className={`flex items-center justify-center p-2 rounded-lg min-h-[34px] min-w-[34px] transition-colors ${
            boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
              : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
          }`}
          title={`Center camera on ${currentActData.actNumber} exhibits`}
        >
          <Target className="w-3.5 h-3.5 text-red-500" />
        </button>

        {/* UV Blacklight Mode Toggle */}
        <button
          onClick={() => setUvMode(!uvMode)}
          className={`flex items-center justify-center p-2 rounded-lg transition-all min-h-[34px] min-w-[34px] ${
            uvMode
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
              : boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-650'
              : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
          }`}
          title="Toggle UV Blacklight"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>

        {/* Case Intel & FAQ Drawer */}
        <button
          onClick={() => setIsFAQOpen(true)}
          className={`flex items-center justify-center p-2 rounded-lg min-h-[34px] min-w-[34px] transition-colors ${
            boardTheme === 'light'
              ? 'bg-red-55/10 border border-red-500/30 hover:bg-red-100 text-red-650'
              : 'bg-red-950/80 border border-red-600/50 hover:bg-red-900 text-red-300'
          }`}
          title="Explore verified FAQ and case intel"
        >
          <Terminal className="w-3.5 h-3.5" />
        </button>

        {/* Act Briefing */}
        <button
          onClick={() => setIsTransitionModalOpen(true)}
          className={`flex items-center justify-center p-2 rounded-lg min-h-[34px] min-w-[34px] transition-all ${
            boardTheme === 'light'
              ? 'bg-amber-55/10 border border-amber-600/30 hover:bg-amber-100 text-amber-650'
              : 'bg-amber-950/80 border border-amber-600/50 hover:bg-amber-900 text-amber-300'
          }`}
          title="Inspect Act briefing"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
        </button>
      </div>

      {/* MOBILE FIELD DOSSIER DECK VIEW (Ultra Touch-Friendly Stream) */}
      {mobileDeckMode ? (
        <div className="absolute inset-0 pt-20 pb-24 px-3 sm:px-6 overflow-y-auto z-10 space-y-4 touch-auto">
          {/* Active Act Mission Banner */}
          <div className={`p-4 rounded-xl shadow-xl space-y-2 border ${
            boardTheme === 'light'
              ? 'bg-white border-red-500/30'
              : 'bg-[#141414] border-red-500/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold uppercase ${
                boardTheme === 'light'
                  ? 'bg-red-55/10 border-red-500/30 text-red-650'
                  : 'bg-red-955/70 border border-red-500 text-red-400'
              }`}>
                {currentActData.actNumber}: {currentActData.codename}
              </span>
              <span className={`text-[10px] font-mono ${
                boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>{currentActData.timeframe}</span>
            </div>
            <h2 className={`text-base font-bold font-mono ${
              boardTheme === 'light' ? 'text-neutral-900' : 'text-white'
            }`}>{currentActData.title}</h2>
            <p className={`text-xs font-sans leading-relaxed ${
              boardTheme === 'light' ? 'text-neutral-750' : 'text-neutral-300'
            }`}>{currentActData.objective}</p>
          </div>

          {/* Primary Act Exhibits List */}
          <div className="space-y-3">
            <div className={`flex items-center justify-between text-xs font-mono font-bold px-1 ${
              boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              <span>ACTIVE EXHIBIT DOSSIERS ({currentActClues.length})</span>
              <span className="text-emerald-500">TAP TO EXAMINE FORENSICS</span>
            </div>

            {currentActClues.map(clue => (
              <div
                key={clue.id}
                onClick={() => setSelectedClueId(clue.id)}
                className={`p-4 rounded-xl border transition-all shadow-lg space-y-3 cursor-pointer group active:scale-[0.99] ${
                  boardTheme === 'light'
                    ? 'bg-white hover:bg-red-55/10 border-neutral-200 hover:border-red-500/60'
                    : 'bg-[#141414] hover:bg-neutral-900 border-neutral-800 hover:border-red-500/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold uppercase ${
                        boardTheme === 'light'
                          ? 'bg-red-55/10 border-red-500/30 text-red-650'
                          : 'bg-red-950/80 border border-red-600/40 text-red-400'
                      }`}>
                        #{clue.id}
                      </span>
                      <span className={`text-xs font-mono uppercase ${
                        boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        [{clue.category}]
                      </span>
                      {clue.stamp && (
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold ${
                          boardTheme === 'light'
                            ? 'bg-amber-55/10 border-amber-500/30 text-amber-650'
                            : 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                        }`}>
                          {clue.stamp}
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold font-mono mt-1 transition-colors ${
                      boardTheme === 'light'
                        ? 'text-neutral-900 group-hover:text-red-650'
                        : 'text-white group-hover:text-red-300'
                    }`}>
                      {clue.title}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClueId(clue.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      boardTheme === 'light'
                        ? 'bg-neutral-105 border border-neutral-300 hover:bg-red-600 text-neutral-700 hover:text-white'
                        : 'bg-neutral-800 border-transparent text-neutral-300 group-hover:bg-red-600 group-hover:text-white'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className={`text-xs font-sans line-clamp-2 ${
                  boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                }`}>
                  {clue.subtitle}
                </p>

                {/* Metrics chips */}
                {clue.metrics && clue.metrics.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pt-1">
                    {clue.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className={`px-2 py-1 rounded border text-[10px] font-mono shrink-0 ${
                        boardTheme === 'light'
                          ? 'bg-neutral-50 border-neutral-200'
                          : 'bg-neutral-900 border-neutral-800'
                      }`}>
                        <span className="text-red-500 font-bold">{m.value}</span>
                        <span className={`ml-1 ${
                          boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Secondary / Contextual Exhibits */}
          {otherActClues.length > 0 && (
            <div className={`space-y-3 pt-4 border-t ${
              boardTheme === 'light' ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <div className={`text-xs font-mono font-bold px-1 ${
                boardTheme === 'light' ? 'text-neutral-450' : 'text-neutral-500'
              }`}>
                OTHER TIMELINE EXHIBITS ({otherActClues.length})
              </div>

              {otherActClues.map(clue => (
                <div
                  key={clue.id}
                  onClick={() => setSelectedClueId(clue.id)}
                  className={`p-3.5 rounded-xl border transition-all space-y-1.5 cursor-pointer ${
                    boardTheme === 'light'
                      ? 'bg-white border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 shadow-neutral-100'
                      : 'bg-[#111111]/80 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-mono ${
                      boardTheme === 'light' ? 'text-neutral-800' : 'text-neutral-300'
                    }`}>{clue.title}</span>
                    <span className={`text-[10px] font-mono ${
                      boardTheme === 'light' ? 'text-neutral-500' : 'text-neutral-500'
                    }`}>[{clue.category}]</span>
                  </div>
                  <p className={`text-xs font-sans line-clamp-1 ${
                    boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>{clue.subtitle}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* MAIN INFINITE CORKBOARD CANVAS */
        <div
          className="absolute inset-0 origin-top-left transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            width: '2600px',
            height: '1800px',
          }}
        >
          {/* SVG RED THREAD / STRINGS LAYER */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <filter id="string-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
              </filter>
              <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#06b6d4" floodOpacity="0.9" />
              </filter>
            </defs>

            {connections.map((conn) => {
              const fromClue = clues.find(c => c.id === conn.fromId);
              const toClue = clues.find(c => c.id === conn.toId);
              if (!fromClue || !toClue) return null;

              const pathD = calculateCatenaryPath(fromClue, toClue);
              const isHovered = hoveredStringId === conn.id;
              const isStoryHighlighted = isStoryMode && currentChapter?.highlightConnections.includes(conn.id);
              const isActHighlighted = (currentActData.requiredClueIds.includes(conn.fromId) && currentActData.requiredClueIds.includes(conn.toId)) ||
                (conn.fromId === 'subject-shivam' && currentActData.requiredClueIds.includes(conn.toId)) ||
                (conn.toId === 'subject-shivam' && currentActData.requiredClueIds.includes(conn.fromId));
              const isDimmedString = actFocusMode && !isActHighlighted && !isStoryHighlighted && !isHovered;

              return (
                <g
                  key={conn.id}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredStringId(conn.id)}
                  onMouseLeave={() => setHoveredStringId(null)}
                  style={{ opacity: isDimmedString ? 0.22 : 1, transition: 'opacity 0.3s ease' }}
                >
                  {/* Thick invisible stroke for easier mouse hovering */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="24"
                  />

                  {/* Visual thread stroke */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={
                      uvMode 
                        ? '#06b6d4' 
                        : isStoryHighlighted || isActHighlighted
                        ? '#ef4444' 
                        : isHovered
                        ? '#f87171' 
                        : conn.category === 'custom'
                        ? '#f59e0b'
                        : '#b91c1c'
                    }
                    strokeWidth={isStoryHighlighted || isActHighlighted ? '3.5' : isHovered ? '3' : '2'}
                    strokeDasharray={conn.style === 'dashed' ? '6,4' : undefined}
                    filter={uvMode ? 'url(#neon-glow)' : 'url(#string-shadow)'}
                    className="transition-all duration-300"
                  />

                  {/* String Label Tag if hovered or story highlighted */}
                  {(isHovered || isStoryHighlighted || isActHighlighted) && conn.label && (
                    <foreignObject
                      x={(fromClue.x + toClue.x) / 2 + 80}
                      y={(fromClue.y + toClue.y) / 2 + 10}
                      width="220"
                      height="60"
                      className="overflow-visible pointer-events-none"
                    >
                      <div className={`px-2.5 py-1 rounded border text-[10px] font-mono shadow-xl max-w-fit animate-in fade-in zoom-in-95 duration-150 ${
                        boardTheme === 'light'
                          ? 'bg-white/95 border-red-500/60 text-neutral-900 shadow-neutral-200'
                          : 'bg-[#111111]/95 border-red-500/80 text-white'
                      }`}>
                        <div className={`font-bold uppercase tracking-wider ${
                          boardTheme === 'light' ? 'text-red-600' : 'text-red-400'
                        }`}>{conn.label}</div>
                        {conn.narrativeReason && (
                          <div className={`text-[9px] leading-tight mt-0.5 ${
                            boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                          }`}>{conn.narrativeReason}</div>
                        )}
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>

          {/* CLUE CARDS RENDERING */}
          {visibleClues.map((clue) => {
            const actInfo = getClueActInfo(clue.id, actId);
            const isActRelevant = actInfo.isCurrentAct;
            const isDimmed = actFocusMode && !isActRelevant && selectedClueId !== clue.id;

            return (
              <ClueCard
                key={clue.id}
                clue={clue}
                isSelected={selectedClueId === clue.id}
                isFocused={isActRelevant}
                isDimmed={isDimmed}
                actBadge={actInfo.actLabel}
                isConnectingFrom={connectingFromId === clue.id}
                isConnectingTo={isConnectingMode && connectingFromId !== null && connectingFromId !== clue.id}
                uvMode={uvMode}
                boardTheme={boardTheme}
                onSelect={id => setSelectedClueId(id)}
                onPinClick={(id) => handlePinClick(id)}
                onDragStart={(id, e) => {
                  const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
                  const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
                  handleStartDrag(id, clientX, clientY);
                }}
              />
            );
          })}
        </div>
      )}

      {/* BOTTOM CONTROL HUD (Mobile/Tablet only) */}
      <div className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-30 flex lg:hidden items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-xl shadow-2xl backdrop-blur-md transition-colors ${
        boardTheme === 'light'
          ? 'bg-white/90 border border-neutral-300'
          : 'bg-[#141414]/95 border border-neutral-800'
      }`}>
        <button
          onClick={() => setZoom(prev => Math.min(1.6, prev + 0.15))}
          className={`p-2 sm:p-2.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
            boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
              : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200'
          }`}
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoom(prev => Math.max(0.45, prev - 0.15))}
          className={`p-2 sm:p-2.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
            boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-205 text-neutral-600'
              : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200'
          }`}
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={() => centerOnAct(actId)}
          className={`p-2 sm:p-2.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
            boardTheme === 'light'
              ? 'bg-red-55/10 border border-red-500/30 hover:bg-red-100 text-red-650'
              : 'bg-red-950/70 border border-red-700/60 hover:bg-red-900 text-red-300'
          }`}
          title={`Center View on ${currentActData.actNumber} Exhibits`}
        >
          <Target className="w-4 h-4" />
        </button>

        <button
          onClick={handleResetView}
          className={`p-2 sm:p-2.5 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
            boardTheme === 'light'
              ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
              : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200'
          }`}
          title="Center Canvas (Full Board)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className={`h-4 w-px mx-0.5 sm:mx-1 hidden xs:block ${
          boardTheme === 'light' ? 'bg-neutral-300' : 'bg-neutral-800'
        }`} />

        <div className={`px-1.5 sm:px-2 font-mono text-[10px] hidden xs:block ${
          boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'
        }`}>
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* BOTTOM RIGHT SOLVE CASE / NEXT ACT BUTTON (Mobile/Tablet only) */}
      <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 z-30 flex lg:hidden items-center gap-2 sm:gap-3">
        <button
          onClick={handleSolveCase}
          className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 min-h-[40px] sm:min-h-[44px]"
        >
          <Trophy className="w-4 h-4 shrink-0" />
          <span className="truncate max-w-[150px] xs:max-w-none">
            {actId === 'act-3' ? 'SOLVE CASE' : 'ADVANCE ACT'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 🖥️ DESKTOP BOTTOM CENTER CONTROL DECK HUD (hidden lg:flex side-by-side)      */}
      {/* ========================================================================= */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-4">
        {/* Island 1: Zoom Controls & Act Advancement HUD */}
        <div className={`flex items-center gap-2 p-2 rounded-xl backdrop-blur-md transition-colors ${
          boardTheme === 'light'
            ? 'bg-white/95 border border-neutral-300 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
            : 'bg-[#141414]/95 border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
        }`}>
          <button
            onClick={() => setZoom(prev => Math.min(1.6, prev + 0.15))}
            className={`p-2 rounded-lg transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-700'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200'
            }`}
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.45, prev - 0.15))}
            className={`p-2 rounded-lg transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-700'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200'
            }`}
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => centerOnAct(actId)}
            className={`p-2 rounded-lg transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-red-55/10 border border-red-500/30 hover:bg-red-100 text-red-650'
                : 'bg-red-950/70 border border-red-700/60 hover:bg-red-900 text-red-300'
            }`}
            title="Center Camera on Active Exhibits"
          >
            <Target className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetView}
            className={`p-2 rounded-lg transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-700'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200'
            }`}
            title="Reset Board View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className={`text-[10px] px-1.5 font-mono min-w-[34px] text-center ${boardTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>{Math.round(zoom * 100)}%</span>

          <div className={`h-5 w-px mx-1 ${boardTheme === 'light' ? 'bg-neutral-300' : 'bg-neutral-800'}`} />

          {/* Action button */}
          <button
            onClick={handleSolveCase}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Trophy className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{actId === 'act-3' ? 'SOLVE CASE' : 'ADVANCE ACT'}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Island 2: Board Tools & Filters HUD */}
        <div className={`flex items-center gap-2 p-2 rounded-xl backdrop-blur-md transition-colors ${
          boardTheme === 'light'
            ? 'bg-white/95 border border-neutral-300 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
            : 'bg-[#141414]/95 border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
        }`}>
          {/* Microfilm / Headlines */}
          <button
            onClick={() => setIsHeadlinesOpen(true)}
            className={`p-2 rounded-lg min-h-[34px] min-w-[34px] flex items-center justify-center transition-colors ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-700'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
            }`}
            title="Microfilm headlines archive"
          >
            <Newspaper className="w-3.5 h-3.5" />
          </button>

          {/* UV Light toggle */}
          <button
            onClick={() => setUvMode(!uvMode)}
            className={`p-2 rounded-lg transition-all min-h-[34px] min-w-[34px] flex items-center justify-center ${
              uvMode
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
            }`}
            title="Toggle UV Blacklight Mode"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Autoplay Story */}
          <button
            onClick={() => {
              setIsStoryMode(!isStoryMode);
              if (!isStoryMode) setCurrentChapter(STORY_CHAPTERS[0]);
            }}
            className={`p-2 rounded-lg transition-all min-h-[34px] min-w-[34px] flex items-center justify-center ${
              isStoryMode
                ? 'bg-red-600 text-white animate-pulse'
                : boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
            }`}
            title="Toggle Autoplay Chapter Mode"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>

          {/* Case Intel FAQ */}
          <button
            onClick={() => setIsFAQOpen(true)}
            className={`p-2 rounded-lg min-h-[34px] min-w-[34px] flex items-center justify-center transition-colors ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-700'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
            }`}
            title="Explore verified FAQ and case intel"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          {/* Act Briefing */}
          <button
            onClick={() => setIsTransitionModalOpen(true)}
            className={`p-2 rounded-lg min-h-[34px] min-w-[34px] flex items-center justify-center transition-colors ${
              boardTheme === 'light'
                ? 'bg-amber-55/10 border border-amber-600/30 hover:bg-amber-100 text-amber-650'
                : 'bg-amber-950/80 border border-amber-600/50 hover:bg-amber-900 text-amber-300'
            }`}
            title="Act briefing & milestones"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
          </button>

          {/* Act Focus toggle */}
          <button
            onClick={() => setActFocusMode(!actFocusMode)}
            className={`p-2 rounded-lg transition-all min-h-[34px] min-w-[34px] flex items-center justify-center ${
              actFocusMode
                ? boardTheme === 'light'
                  ? 'bg-red-55/10 border border-red-500/30 text-red-650'
                  : 'bg-red-950 border border-red-500/60 text-red-300'
                : boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-600'
                : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300'
            }`}
            title="Focus active Act clues"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <div className={`h-5 w-px mx-1 ${boardTheme === 'light' ? 'bg-neutral-300' : 'bg-neutral-800'}`} />

          {/* Category filter dropdown */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`text-[11px] font-mono rounded px-2 py-1.5 outline-none cursor-pointer min-h-[34px] transition-colors ${
              boardTheme === 'light'
                ? 'bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <option value="all">All Evidence</option>
            <option value="experience">Experience</option>
            <option value="projects">Platforms</option>
            <option value="skills">Stack Matrix</option>
            <option value="leadership">Leadership</option>
            <option value="education">Education</option>
          </select>
        </div>
      </div>

      {/* STORY NAVIGATOR OVERLAY */}
      {isStoryMode && (
        <StoryNavigator
          currentChapterId={currentChapter ? currentChapter.id : 1}
          onChapterChange={ch => setCurrentChapter(ch)}
          onExitStoryMode={() => setIsStoryMode(false)}
        />
      )}

      {/* DETAIL MODAL FOR CLICKED CLUE */}
      {selectedClue && (
        <DetailModal
          clue={selectedClue}
          allClues={clues}
          connections={connections}
          onClose={() => setSelectedClueId(null)}
          onSelectClue={(id) => setSelectedClueId(id)}
          uvMode={uvMode}
          boardTheme={boardTheme}
        />
      )}

      {/* NEWSPAPER / HEADLINES ARCHIVE MODAL */}
      {isHeadlinesOpen && (
        <NewspaperArchiveModal
          isOpen={isHeadlinesOpen}
          onClose={() => setIsHeadlinesOpen(false)}
          onSelectClue={id => {
            setSelectedClueId(id);
            const target = clues.find(c => c.id === id);
            if (target && containerRef.current) {
              const width = containerRef.current.clientWidth;
              const height = containerRef.current.clientHeight;
              setPan({
                x: width / 2 - (target.x + 130) * zoom,
                y: height / 2 - (target.y + 100) * zoom,
              });
            }
          }}
        />
      )}

      {/* CUSTOM RECRUITER CLUE / NOTE MODAL */}
      {isCustomNoteOpen && (
        <CustomClueModal
          isOpen={isCustomNoteOpen}
          onClose={() => setIsCustomNoteOpen(false)}
          onAddClue={handleAddCustomClue}
          boardTheme={boardTheme}
        />
      )}

      {/* ACT TRANSITION & CASE BREAKTHROUGH MODAL */}
      {isTransitionModalOpen && (
        <ActTransitionModal
          isOpen={isTransitionModalOpen}
          completedActId={actId}
          onProceed={handleProceedToNextAct}
          onStay={() => setIsTransitionModalOpen(false)}
          onClose={() => setIsTransitionModalOpen(false)}
          boardTheme={boardTheme}
        />
      )}

      {/* CASE INTEL & STATIC FAQ SIDE DRAWER */}
      {isFAQOpen && (
        <StaticFAQDrawer
          isOpen={isFAQOpen}
          onClose={() => setIsFAQOpen(false)}
          boardTheme={boardTheme}
        />
      )}
    </div>
  );
};
