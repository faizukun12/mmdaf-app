/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Code2, Copy, Check, Globe, Sliders, Heart } from 'lucide-react';
import {
  DEFAULT_INVITATION_CONFIG,
  INITIAL_WISHES,
  InvitationConfig,
  WishItem,
} from './utils/invitationData';
import {
  parseGuestNameFromSearch,
  shouldAutoStartFromSearch,
  calculateCountdown,
  addWishAndUpdateStats,
  RsvpSubmissionInput,
} from './utils/invitationLogic';
import { generateStandaloneHtml } from './utils/generateStandaloneHtml';
import {
  StudioProjectState,
  createDefaultStudioProject,
  syncStudioProjectToInvitationConfig,
  getMusicPreset,
} from './utils/studioTemplates';
import { CoverOverlay } from './components/CoverOverlay';
import { CoupleSection } from './components/CoupleSection';
import { SaveTheDateSection } from './components/SaveTheDateSection';
import { StoryAndTimelineSection } from './components/StoryAndTimelineSection';
import { GiftAndRsvpSection } from './components/GiftAndRsvpSection';
import { BottomDockAndModals } from './components/BottomDockAndModals';
import { ScriptHtmlModal } from './components/ScriptHtmlModal';
import { VisitorPortalPage } from './components/VisitorPortalPage';
import { StudioEditorPage } from './components/StudioEditorPage';

export type AppViewMode = 'invitation' | 'visitor-portal' | 'studio-editor';

function getInitialViewMode(): AppViewMode {
  if (typeof window === 'undefined') return 'invitation';
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const mode = params.get('mode');
  if (view === 'visitor' || view === 'mmdaf') return 'visitor-portal';
  if (view === 'editor' || mode === 'free_unlocked') return 'studio-editor';
  return 'invitation';
}

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>(getInitialViewMode);
  const [config, setConfig] = useState<InvitationConfig>(
    DEFAULT_INVITATION_CONFIG
  );
  const [studioProject, setStudioProject] = useState<StudioProjectState>(() =>
    createDefaultStudioProject()
  );
  const [guestName, setGuestName] = useState<string>(() =>
    typeof window !== 'undefined'
      ? parseGuestNameFromSearch(
          window.location.search,
          DEFAULT_INVITATION_CONFIG.defaultGuestName
        )
      : DEFAULT_INVITATION_CONFIG.defaultGuestName
  );
  const [isInvitationOpen, setIsInvitationOpen] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? shouldAutoStartFromSearch(window.location.search)
      : false
  );

  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);
  const [stats, setStats] = useState({ totalWishes: 0, totalAttending: 0 });
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(
      DEFAULT_INVITATION_CONFIG.targetDateIso || '2026-11-23T10:00:00+09:00',
      Date.now()
    )
  );
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPhysicalGiftOpen, setIsPhysicalGiftOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const targetIso = config.targetDateIso || '2026-11-23T10:00:00+09:00';
    const update = () => {
      setCountdown(calculateCountdown(targetIso, Date.now()));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [config.targetDateIso]);

  const stopAmbientMusic = () => {
    if (audioElRef.current) {
      audioElRef.current.pause();
    }
    if (musicIntervalRef.current) {
      window.clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  // Fallback acoustic melody of Payung Teduh - Akad ("Betapa bahagianya hatiku...")
  const startSynthesizedAkadFallback = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const akadMelody = [
        369.99, 440.0, 493.88, 587.33, 554.37, 493.88, 440.0, 369.99,
        329.63, 369.99, 440.0, 493.88, 440.0, 369.99, 329.63, 293.66,
      ];
      let step = 0;

      const playNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running')
          return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(
          akadMelody[step % akadMelody.length],
          ctx.currentTime
        );
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
        step += 1;
      };

      playNote();
      musicIntervalRef.current = window.setInterval(playNote, 620);
    } catch {
      // Ignore audio autoplay restriction errors
    }
  };

  const startAmbientMusic = (overrideUrl?: string) => {
    stopAmbientMusic();
    const audioEl = audioElRef.current;
    if (audioEl) {
      if (overrideUrl) {
        audioEl.src = overrideUrl;
      }
      audioEl.volume = 0.85;
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          startSynthesizedAkadFallback();
        });
        return;
      }
    }
    startSynthesizedAkadFallback();
  };

  useEffect(() => {
    return () => stopAmbientMusic();
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    if (!isAutoScrolling || !isInvitationOpen || viewMode !== 'invitation')
      return;
    const id = window.setInterval(() => {
      window.scrollBy({ top: 2, behavior: 'auto' });
    }, 30);
    return () => window.clearInterval(id);
  }, [isAutoScrolling, isInvitationOpen, viewMode]);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    setIsPlayingMusic(true);
    startAmbientMusic();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      stopAmbientMusic();
      setIsPlayingMusic(false);
    } else {
      const musicTrack = getMusicPreset(studioProject.musicId);
      const customOrPresetUrl =
        studioProject.customMusicUrl.trim() || musicTrack.url;
      startAmbientMusic(customOrPresetUrl);
      setIsPlayingMusic(true);
    }
  };

  const handleSubmitRsvp = (submission: RsvpSubmissionInput) => {
    const next = addWishAndUpdateStats(wishes, stats, {
      ...submission,
      timestampIso: new Date().toISOString(),
    });
    setWishes(next.wishes);
    setStats(next.stats);
  };

  const handleQuickCopyHtml = () => {
    const htmlCode = generateStandaloneHtml(
      { ...config, showCouplePhotos: false },
      guestName
    );
    if (navigator.clipboard) {
      navigator.clipboard.writeText(htmlCode).catch(() => {});
    }
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2500);
  };

  const handleTogglePhotos = () => {
    setConfig((prev) => ({
      ...prev,
      showCouplePhotos: !prev.showCouplePhotos,
    }));
  };

  const handleApplyStudioToLiveInvitation = () => {
    const syncedConfig = syncStudioProjectToInvitationConfig(
      config,
      studioProject
    );
    setConfig(syncedConfig);
    setGuestName(studioProject.guestName || guestName);
    setViewMode('invitation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPhotosEnabled = config.showCouplePhotos ?? false;

  return (
    <div className="min-h-screen bg-[#0c0a09] flex justify-center relative">
      {/* BACKGROUND MUSIC: PAYUNG TEDUH - AKAD */}
      <audio ref={audioElRef} id="bgMusic" loop preload="auto">
        <source
          src={config.musicFallbackUrl || '/assets/aistudio/payung-teduh-akad.mp3'}
          type="audio/mpeg"
        />
        <source
          src={
            config.musicUrl ||
            'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3'
          }
          type="audio/mpeg"
        />
      </audio>

      {/* GLOBAL TOP NAVIGATION BAR (MMDAF TANPA FOTO, SALIN SCRIPT HTML, MODE SWITCHERS) */}
      <header className="fixed top-0 left-0 right-0 z-[70] flex justify-center pointer-events-none">
        <div
          className={`w-full ${
            viewMode === 'invitation' ? 'max-w-[430px]' : 'max-w-7xl'
          } bg-[#110e0a]/95 border-b border-[#d4af37]/35 backdrop-blur-md px-2 py-1.5 flex flex-wrap items-center justify-between gap-1.5 pointer-events-auto shadow-lg transition-all`}
        >
          {/* Left: Mode Switcher & MMDAF Tanpa Foto Label */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-playfair text-[10.5px] sm:text-[11px] text-[#f5e3b3] font-semibold tracking-wide">
              MMDAF · Tanpa Foto
            </span>

            <button
              type="button"
              data-testid="nav-visitor-portal-btn"
              onClick={() => {
                setViewMode('visitor-portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-[11px] font-medium transition cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'visitor-portal'
                  ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold shadow-sm'
                  : 'bg-[#1d1812] text-stone-300 hover:text-[#f5e3b3] border border-[#d4af37]/25'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>mmdaf.my.id</span>
            </button>

            <button
              type="button"
              data-testid="nav-studio-editor-btn"
              onClick={() => {
                setViewMode('studio-editor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-[11px] font-medium transition cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'studio-editor'
                  ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold shadow-sm'
                  : 'bg-[#1d1812] text-stone-300 hover:text-[#f5e3b3] border border-[#d4af37]/25'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>Editor 7x7</span>
            </button>
          </div>

          {/* Right: Quick Salin Script HTML (Tanpa Foto) & Lihat Script */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              data-testid="quick-copy-html-btn"
              onClick={handleQuickCopyHtml}
              title="Salin Script HTML Undangan (Copyan Tanpa Foto)"
              className="inline-flex items-center gap-1 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-averia font-bold text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded shadow-sm hover:brightness-110 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              {quickCopied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Script Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin Script HTML</span>
                </>
              )}
            </button>

            <button
              type="button"
              data-testid="open-script-modal-btn"
              onClick={() => setIsScriptModalOpen(true)}
              className="inline-flex items-center gap-1 bg-[#262018] hover:bg-[#332b20] border border-[#d4af37]/50 text-[#f5e3b3] font-averia text-[10px] sm:text-[10.5px] px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Code2 className="w-3 h-3 text-[#d4af37]" />
              <span className="hidden sm:inline">Lihat Script HTML</span>
              <span className="sm:hidden">&lt;/&gt;</span>
            </button>
          </div>
        </div>
      </header>

      {/* VIEW 1: VISITOR PORTAL PAGE (mmdaf.my.id - PAKET SILVER GRATIS s/d VIP & SELF-BUILDER) */}
      {viewMode === 'visitor-portal' && (
        <div
          key="view-visitor-portal"
          data-testid="view-container-visitor"
          className="w-full pt-[46px] animate-view-fade-in"
        >
          <VisitorPortalPage
            project={studioProject}
            onChangeProject={setStudioProject}
            onOpenFullEditor={() => {
              setViewMode('studio-editor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLiveWeddingInvitation={() => {
              setViewMode('invitation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* VIEW 2: FULL MULTI-EVENT STUDIO EDITOR (7 KATEGORI x 7 TEMPLAT, MUSIK, LAYOUT, KATA-KATA) */}
      {viewMode === 'studio-editor' && (
        <div
          key="view-studio-editor"
          data-testid="view-container-editor"
          className="w-full pt-[46px] animate-view-fade-in"
        >
          <StudioEditorPage
            project={studioProject}
            onChangeProject={setStudioProject}
            onApplyToMainInvitation={handleApplyStudioToLiveInvitation}
            onOpenScriptModal={() => setIsScriptModalOpen(true)}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={handleToggleMusic}
          />
        </div>
      )}

      {/* VIEW 3: LIVE VIP WEDDING INVITATION (RAMINIANTI & ALIADIN - TANPA FOTO SESUAI PERMINTAAN) */}
      {viewMode === 'invitation' && (
        <div
          key="view-invitation"
          data-testid="view-container-invitation"
          className="w-full flex justify-center"
        >
          <CoverOverlay
            config={config}
            guestName={guestName}
            isOpen={isInvitationOpen}
            onOpenInvitation={handleOpenInvitation}
          />

          <main className="w-full max-w-[430px] bg-[#0c0a09] min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.85)] border-x border-[#d4af37]/20 relative overflow-x-hidden pt-[44px] animate-view-fade-in">
            <CoupleSection config={config} countdown={countdown} />

            <SaveTheDateSection config={config} />

            <StoryAndTimelineSection config={config} />

            <GiftAndRsvpSection
              config={config}
              guestName={guestName}
              wishes={wishes}
              stats={stats}
              onSubmitRsvp={handleSubmitRsvp}
              onOpenPhysicalGiftModal={() => setIsPhysicalGiftOpen(true)}
            />
          </main>

          {isInvitationOpen && (
            <BottomDockAndModals
              config={config}
              guestName={guestName}
              isAutoScrolling={isAutoScrolling}
              onToggleAutoScroll={() => setIsAutoScrolling((prev) => !prev)}
              isPlayingMusic={isPlayingMusic}
              onToggleMusic={handleToggleMusic}
              isPhysicalGiftOpen={isPhysicalGiftOpen}
              onClosePhysicalGift={() => setIsPhysicalGiftOpen(false)}
            />
          )}
        </div>
      )}

      {/* STANDALONE HTML SCRIPT MODAL */}
      <ScriptHtmlModal
        config={config}
        guestName={guestName}
        studioProject={studioProject}
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        onUpdateConfig={(nextConfig, nextGuest) => {
          setConfig(nextConfig);
          setGuestName(nextGuest);
          setIsScriptModalOpen(false);
        }}
      />
    </div>
  );
}
