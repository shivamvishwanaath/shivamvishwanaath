'use client';

import React, { useState, useEffect } from 'react';
import { InvestigationCanvas } from '@/components/InvestigationCanvas';
import { CaseActSelector } from '@/components/CaseActSelector';
import { IncidentLogView } from '@/components/IncidentLogView';
import { EvidenceVaultView } from '@/components/EvidenceVaultView';
import { VerdictReportView } from '@/components/VerdictReportView';
import { DetailModal } from '@/components/DetailModal';
import { CaseActId } from '@/lib/story-acts';
import { INITIAL_CLUES } from '@/lib/investigation-data';

export const InvestigationBoardContainer: React.FC = () => {
  const [currentView, setCurrentView] = useState<CaseActId>('act-1');
  const [completedActs, setCompletedActs] = useState<string[]>(['act-1']);
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);
  const [boardTheme, setBoardTheme] = useState<'dark' | 'light'>('dark');

  // Load initial theme from localStorage safely after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('site-theme') === 'light' ? 'light' : 'dark';
      setBoardTheme(savedTheme);
    }
  }, []);

  // Update localStorage and document class list when boardTheme state changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (boardTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('site-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('site-theme', 'dark');
    }
  }, [boardTheme]);

  const handleActChange = (actId: CaseActId) => {
    setCurrentView(actId);
  };

  const handleMarkActComplete = (actId: string) => {
    if (!completedActs.includes(actId)) {
      setCompletedActs(prev => [...prev, actId]);
    }
  };

  const selectedClue = INITIAL_CLUES.find(c => c.id === selectedClueId) || null;

  return (
    <div className={`w-full h-screen overflow-hidden flex flex-col relative transition-colors duration-300 ${boardTheme === 'light' ? 'bg-[#e8e4d8] text-neutral-900' : 'bg-[#0c0c0c] text-[#e2e2e2]'}`}>
      {/* Top Universal Casebook Navigation */}
      <CaseActSelector
        currentView={currentView}
        onSelectView={handleActChange}
        completedActs={completedActs}
        boardTheme={boardTheme}
        onToggleTheme={() => setBoardTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />

      {/* Main View Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* ACT 1 / ACT 2 / ACT 3 / ACT 4: Interactive Pinboards */}
        {(currentView === 'act-1' || currentView === 'act-2' || currentView === 'act-3' || currentView === 'act-4') && (
          <InvestigationCanvas
            actId={currentView}
            onActComplete={handleMarkActComplete}
            onNavigateView={handleActChange}
            boardTheme={boardTheme}
          />
        )}

        {/* INCIDENT LOG: Long-Form Briefing */}
        {currentView === 'incident-log' && (
          <div className={`w-full h-full overflow-y-auto transition-colors duration-300 lg:pl-[304px] lg:pr-[240px] p-4 lg:py-6 ${
            boardTheme === 'light' ? 'bg-[#e8e4d8]' : 'bg-[#0a0a0a]'
          }`}>
            <IncidentLogView
              onSelectClue={(clueId) => setSelectedClueId(clueId)}
              onNavigateToAct={(actId) => setCurrentView(actId)}
              boardTheme={boardTheme}
            />
          </div>
        )}

        {/* EVIDENCE VAULT: Master Technical Matrix */}
        {currentView === 'evidence-vault' && (
          <div className={`w-full h-full overflow-y-auto transition-colors duration-300 lg:pl-[304px] lg:pr-[240px] p-4 lg:py-6 ${
            boardTheme === 'light' ? 'bg-[#e8e4d8]' : 'bg-[#0a0a0a]'
          }`}>
            <EvidenceVaultView
              onSelectClue={(clueId) => setSelectedClueId(clueId)}
              boardTheme={boardTheme}
            />
          </div>
        )}

        {/* VERDICT REPORT: Final Assessment & Direct Wire */}
        {currentView === 'verdict' && (
          <div className={`w-full h-full overflow-y-auto transition-colors duration-300 lg:pl-[304px] lg:pr-[240px] p-4 lg:py-6 ${
            boardTheme === 'light' ? 'bg-[#e8e4d8]' : 'bg-[#0a0a0a]'
          }`}>
            <VerdictReportView
              onBackToBoard={(actId) => setCurrentView(actId || 'act-3')}
              onNavigateToView={(view) => setCurrentView(view)}
              boardTheme={boardTheme}
            />
          </div>
        )}
      </div>

      {/* Central Detail Modal if opened from sub-views */}
      {selectedClue && (
        <DetailModal
          clue={selectedClue}
          allClues={INITIAL_CLUES}
          connections={[]}
          onClose={() => setSelectedClueId(null)}
          onSelectClue={(id) => setSelectedClueId(id)}
          uvMode={false}
          boardTheme={boardTheme}
        />
      )}
    </div>
  );
};
