import React, { useState, useRef } from 'react';
import {
  Check,
  Copy,
  Download,
  Eye,
  Layout,
  Music,
  Palette,
  FileText,
  CreditCard,
  Volume2,
  VolumeX,
  Upload,
  Code2,
  Smartphone,
  Play,
  Pause,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  Send,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  EVENT_CATEGORIES,
  SEVEN_TEMPLATE_PRESETS,
  STUDIO_PACKAGES,
  MUSIC_PRESETS,
  EventCategoryId,
  PackageTierId,
  FrameStyleId,
  CardLayoutId,
  StudioProjectState,
  StudioEnabledSections,
  getCategoryMeta,
  getTemplatePreset,
  getMusicPreset,
  applyCategorySwitchToProject,
  generateCustomEventHtml,
} from '../utils/studioTemplates';
import { UPLOADED_COUPLE_PHOTOS } from '../utils/invitationData';

interface StudioEditorPageProps {
  project: StudioProjectState;
  onChangeProject: (next: StudioProjectState) => void;
  onApplyToMainInvitation: () => void;
  onOpenScriptModal: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

type EditorTabId = 'templates' | 'layout' | 'music' | 'wording' | 'gift';

export const StudioEditorPage: React.FC<StudioEditorPageProps> = ({
  project,
  onChangeProject,
  onApplyToMainInvitation,
  onOpenScriptModal,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [activeTab, setActiveTab] = useState<EditorTabId>('templates');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [appliedBanner, setAppliedBanner] = useState(false);
  const [previewRsvpCount, setPreviewRsvpCount] = useState(0);
  const [previewMode, setPreviewMode] = useState<'content' | 'cover'>('content');
  const [previewDeviceWidth, setPreviewDeviceWidth] = useState<'normal' | 'wide'>('normal');
  const [copiedRekeningInPreview, setCopiedRekeningInPreview] = useState(false);
  const [previewWishesList, setPreviewWishesList] = useState<
    Array<{ name: string; msg: string; status: string; time: string }>
  >([
    {
      name: 'Keluarga Besar Baubau',
      msg: 'Barakallahu fiik, semoga seluruh rangkaian acara berjalan lancar dan penuh keberkahan.',
      status: 'Hadir',
      time: 'Baru saja',
    },
  ]);
  const [newWishName, setNewWishName] = useState('');
  const [newWishMsg, setNewWishMsg] = useState('');
  const [newWishStatus, setNewWishStatus] = useState<'Hadir' | 'Tidak Hadir'>('Hadir');

  const previewScrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCopyRekInPreview = (num: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num).catch(() => {});
    }
    setCopiedRekeningInPreview(true);
    setTimeout(() => setCopiedRekeningInPreview(false), 2000);
  };

  const handleAddPreviewWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishName.trim()) return;
    setPreviewWishesList((prev) => [
      {
        name: newWishName.trim(),
        msg: newWishMsg.trim() || 'Selamat dan sukses selalu!',
        status: newWishStatus,
        time: 'Baru saja',
      },
      ...prev,
    ]);
    setPreviewRsvpCount((c) => c + 1);
    setNewWishName('');
    setNewWishMsg('');
  };

  const catMeta = getCategoryMeta(project.category);
  const tpl = getTemplatePreset(project.templateId);
  const music = getMusicPreset(project.musicId);

  const activeMusicLabel =
    project.customMusicTitle.trim() || `${music.artist} — ${music.title}`;

  const handleCategoryChange = (nextCat: EventCategoryId) => {
    onChangeProject(applyCategorySwitchToProject(project, nextCat));
  };

  const handleToggleSection = (key: keyof StudioEnabledSections) => {
    onChangeProject({
      ...project,
      enabledSections: {
        ...project.enabledSections,
        [key]: !project.enabledSections[key],
      },
    });
  };

  const handleUploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'main' | 'secondary' | 'hero'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      if (!dataUrl) return;
      if (target === 'main') {
        onChangeProject({ ...project, mainPortraitUrl: dataUrl });
      } else if (target === 'secondary') {
        onChangeProject({ ...project, secondaryPortraitUrl: dataUrl });
      } else {
        onChangeProject({ ...project, heroBackgroundUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onChangeProject({
      ...project,
      customMusicTitle: file.name.replace(/\.[^/.]+$/, ''),
      customMusicUrl: objectUrl,
    });
  };

  const handleCopyEventHtml = () => {
    const html = generateCustomEventHtml(project);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(html).catch(() => {});
    }
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleDownloadEventHtml = () => {
    const html = generateCustomEventHtml(project);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = catMeta.fileSlug;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyAndNotify = () => {
    setAppliedBanner(true);
    setTimeout(() => setAppliedBanner(false), 2500);
    onApplyToMainInvitation();
  };

  const mainHeading =
    project.category === 'nikah'
      ? `${project.primaryName.split(',')[0]} & ${project.secondaryName.split(',')[0]}`
      : project.primaryName;

  const uploadedPhotosList = [
    {
      label: 'Foto 1 (Singgasana Emas)',
      url: UPLOADED_COUPLE_PHOTOS.royalArch,
    },
    {
      label: 'Foto 2 (Sutra Emas)',
      url: UPLOADED_COUPLE_PHOTOS.goldSilk,
    },
    {
      label: 'Foto 3 (Bingkai Klasik)',
      url: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
    },
    {
      label: 'Foto 4 (Cincin Suci)',
      url: UPLOADED_COUPLE_PHOTOS.ringShowcase,
    },
  ];

  return (
    <div
      data-testid="studio-editor-page"
      className="min-h-screen bg-[#0c0a09] text-stone-100 pt-14 pb-20 font-golos"
    >
      {/* STUDIO SUB-HEADER BAR */}
      <div className="border-b border-[#d4af37]/25 bg-[#13100b] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#d4af37]">
              <span className="font-averia uppercase tracking-widest whitespace-nowrap">
                MMDAF Studio Editor Multi-Acara
              </span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">mmdaf.my.id</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">
                Aktif: {catMeta.shortName} (Templat 0{tpl.number}/07)
              </span>
            </div>
            <h1 className="font-playfair text-xl sm:text-2xl font-bold text-[#f5e3b3] mt-0.5">
              Aplikasi Perancang Undangan, Aqiqah, Khitan &amp; Multi-Acara Lengkap
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              data-testid="editor-apply-main-btn"
              onClick={handleApplyAndNotify}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold text-xs px-3.5 py-2 rounded-xl shadow cursor-pointer whitespace-nowrap shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>
                {appliedBanner
                  ? 'Diterapkan ke Undangan!'
                  : 'Terapkan & Lihat Undangan Utama'}
              </span>
            </button>

            <button
              type="button"
              data-testid="editor-copy-html-btn"
              onClick={handleCopyEventHtml}
              className="inline-flex items-center gap-1.5 bg-[#1e1810] hover:bg-[#2a2116] border border-[#d4af37]/50 text-[#f5e3b3] font-semibold text-xs px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedHtml ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HTML {catMeta.fileSlug} Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Salin HTML ({catMeta.fileSlug})</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadEventHtml}
              className="inline-flex items-center gap-1.5 bg-[#1e1810] hover:bg-[#2a2116] border border-[#d4af37]/40 text-stone-200 text-xs px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Unduh {catMeta.fileSlug}</span>
            </button>

            <button
              type="button"
              onClick={onOpenScriptModal}
              className="inline-flex items-center gap-1.5 bg-black/70 hover:bg-black border border-stone-700 text-stone-300 text-xs px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
            >
              <Code2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Semua Script Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN 2-COLUMN WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* LEFT COLUMN (7 COLS): FULL MULTI-TAB EDITOR */}
        <div className="lg:col-span-7 space-y-5">
          {/* EDITOR SECTION TABS */}
          <div
            role="tablist"
            aria-label="Menu Pengaturan Editor"
            className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 bg-[#14100c] border border-[#d4af37]/30 rounded-2xl"
          >
            {[
              {
                id: 'templates' as EditorTabId,
                label: '1. Kategori & Templat',
                icon: Palette,
              },
              {
                id: 'layout' as EditorTabId,
                label: '2. Layout & Foto',
                icon: Layout,
              },
              {
                id: 'music' as EditorTabId,
                label: '3. Musik Latar',
                icon: Music,
              },
              {
                id: 'wording' as EditorTabId,
                label: '4. Kata & Acara',
                icon: FileText,
              },
              {
                id: 'gift' as EditorTabId,
                label: '5. Amplop & TikTok',
                icon: CreditCard,
              },
            ].map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-testid={`editor-tab-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] shadow'
                      : 'text-stone-300 hover:text-[#f5e3b3] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: KATEGORI ACARA & 7 TEMPLAT PER KATEGORI */}
          {activeTab === 'templates' && (
            <div className="dashboard-black-gold rounded-3xl p-6 space-y-6">
              {/* 1A: Pilih Kategori Acara */}
              <div className="space-y-3 border-b border-[#d4af37]/20 pb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#f5e3b3]">
                    Pilih Kategori Jenis Acara (7 Kategori Lengkap)
                  </h2>
                  <span className="text-xs text-[#d4af37] font-mono">
                    Output: {catMeta.fileSlug}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {EVENT_CATEGORIES.map((cat) => {
                    const active = project.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        data-testid={`editor-cat-btn-${cat.id}`}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold shadow'
                            : 'bg-[#090705] hover:bg-[#1b150e] text-stone-200 border border-[#d4af37]/30'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">
                          {cat.shortName}
                        </div>
                        <div
                          className={`text-[10px] truncate mt-0.5 ${
                            active ? 'text-[#0c0a08]/80' : 'text-stone-400'
                          }`}
                        >
                          7 Templat Tersedia
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1B: Pilih dari 7 Templat untuk Kategori Ini */}
              <div className="space-y-3 border-b border-[#d4af37]/20 pb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#f5e3b3]">
                    Pilih dari 7 Templat {catMeta.shortName}
                  </h2>
                  <span className="text-xs text-stone-400">
                    Klik untuk mengganti suasana &amp; palet undangan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEVEN_TEMPLATE_PRESETS.map((preset) => {
                    const active = project.templateId === preset.id;
                    const catTemplateTitle =
                      preset.categoryNames[project.category] || preset.name;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        data-testid={`editor-tpl-btn-${preset.number}`}
                        onClick={() =>
                          onChangeProject({
                            ...project,
                            templateId: preset.id,
                          })
                        }
                        className={`p-3.5 rounded-2xl text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                          active
                            ? 'ring-2 ring-[#d4af37] bg-[#211a11]'
                            : 'bg-[#090705] hover:bg-[#17120c] border border-[#d4af37]/25'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/30"
                              style={{ backgroundColor: preset.accentHex }}
                            />
                            <span className="text-xs font-bold text-white">
                              0{preset.number}. {catTemplateTitle}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-snug">
                            {preset.subtitle}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono uppercase text-[#d4af37] shrink-0">
                          {preset.tier}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1C: Paket Layanan Studio */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Tingkatan Paket Klien (Silver Gratis / Gold / Titanium / VIP)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {STUDIO_PACKAGES.map((pkg) => {
                    const active = project.packageTier === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() =>
                          onChangeProject({ ...project, packageTier: pkg.id })
                        }
                        className={`p-2.5 rounded-xl text-left cursor-pointer transition-all ${
                          active
                            ? 'bg-[#261e14] border-2 border-[#d4af37] text-[#f5e3b3]'
                            : 'bg-[#090705] border border-[#d4af37]/25 text-stone-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{pkg.name}</div>
                        <div className="text-[11px] text-[#d4af37] font-mono tabular-nums">
                          {pkg.priceText}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LAYOUT DALAM UNDANGAN, SEKSI & BINGKAI FOTO */}
          {activeTab === 'layout' && (
            <div className="dashboard-black-gold rounded-3xl p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#d4af37]/20 pb-5">
                <div>
                  <label
                    htmlFor="editor-frame-style"
                    className="block text-xs font-bold text-[#f5e3b3] mb-1.5"
                  >
                    Gaya Bingkai Foto Dasbor
                  </label>
                  <select
                    id="editor-frame-style"
                    value={project.frameStyle}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        frameStyle: e.target.value as FrameStyleId,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="floating-feathered">
                      Floating Feathered (Mengambang Menyatu Latar)
                    </option>
                    <option value="arch-royal">
                      Arch Lengkung Kubah Keraton
                    </option>
                    <option value="oval-medal">Oval Klasik Medali</option>
                    <option value="modern-rounded">
                      Kotak Sudut Halus Modern
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="editor-card-layout"
                    className="block text-xs font-bold text-[#f5e3b3] mb-1.5"
                  >
                    Gaya Tata Letak Kartu Dalam
                  </label>
                  <select
                    id="editor-card-layout"
                    value={project.cardLayout}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        cardLayout: e.target.value as CardLayoutId,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="arched-vip">
                      Kartu Lengkung Atas-Bawah VIP
                    </option>
                    <option value="modern-grid">
                      Kartu Grid Sudut Modern
                    </option>
                    <option value="editorial-stack">
                      Tumpukan Editorial Klasik
                    </option>
                  </select>
                </div>
              </div>

              {/* Toggle 9 Seksi Undangan */}
              <div className="space-y-3 border-b border-[#d4af37]/20 pb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Atur Seksi yang Ditampilkan di Dalam Undangan
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(
                    [
                      ['cover', 'Sampul Pembuka'],
                      ['countdown', 'Hitung Mundur'],
                      ['quote', 'Kutipan Ayat / Doa'],
                      ['story', 'Kisah / Cerita'],
                      ['gallery', 'Galeri 4 Foto'],
                      ['timeline', 'Susunan Acara'],
                      ['gift', 'Amplop & Kado'],
                      ['rsvp', 'Form Ucapan RSVP'],
                      ['maps', 'Peta Google Maps'],
                    ] as [keyof StudioEnabledSections, string][]
                  ).map(([key, label]) => {
                    const enabled = project.enabledSections[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleToggleSection(key)}
                        className={`p-2.5 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-all ${
                          enabled
                            ? 'bg-[#211a11] border border-[#d4af37] text-[#f5e3b3]'
                            : 'bg-[#090705] border border-stone-800 text-stone-500'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="font-mono text-[10px]">
                          {enabled ? 'ON' : 'OFF'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pilih atau Upload Foto */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Pilih Foto Utama dari Galeri Studio atau Upload Foto Baru
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {uploadedPhotosList.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        onChangeProject({
                          ...project,
                          mainPortraitUrl: item.url,
                        })
                      }
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        project.mainPortraitUrl === item.url
                          ? 'border-[#d4af37] bg-[#211a11]'
                          : 'border-stone-800 bg-[#090705]'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        referrerPolicy="no-referrer"
                        className="w-full aspect-[3/4] object-cover rounded-lg mb-1.5"
                      />
                      <p className="text-[10px] text-[#f5e3b3] truncate">
                        {item.label}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#090705] border border-dashed border-[#d4af37]/50 hover:border-[#f5e3b3] text-xs text-[#f5e3b3] cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload Foto Utama dari Perangkat</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, 'main')}
                      className="hidden"
                    />
                  </label>

                  <label className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#090705] border border-dashed border-[#d4af37]/50 hover:border-[#f5e3b3] text-xs text-[#f5e3b3] cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload Latar Belakang Website</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, 'hero')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MUSIK LATAR (PILIH PRESET ATAU TAMBAH MUSIK SENDIRI) */}
          {activeTab === 'music' && (
            <div className="dashboard-black-gold rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#f5e3b3]">
                    Pengaturan Musik Latar Undangan
                  </h2>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Musik Aktif: <strong className="text-[#d4af37]">{activeMusicLabel}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  data-testid="editor-toggle-music-btn"
                  onClick={onToggleMusic}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  {isPlayingMusic ? (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Hentikan Uji Dengar</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Putar Musik Sekarang</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3 border-b border-[#d4af37]/20 pb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Daftar Musik Pilihan Studio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MUSIC_PRESETS.map((track) => {
                    const active =
                      project.musicId === track.id &&
                      !project.customMusicUrl.trim();
                    return (
                      <button
                        key={track.id}
                        type="button"
                        data-testid={`editor-music-preset-${track.id}`}
                        onClick={() =>
                          onChangeProject({
                            ...project,
                            musicId: track.id,
                            customMusicTitle: '',
                            customMusicUrl: '',
                          })
                        }
                        className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#241c13] border-2 border-[#d4af37] text-[#f5e3b3]'
                            : 'bg-[#090705] border border-[#d4af37]/25 text-stone-300 hover:border-[#d4af37]/50'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">
                          🎵 {track.artist} — {track.title}
                        </div>
                        <div className="text-[10px] text-[#d4af37] mt-0.5">
                          Cocok untuk: {track.categoryTag}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Tambahkan Musik Sendiri (URL MP3 / Upload File Audio)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="custom-music-title"
                      className="block text-xs text-stone-300 mb-1"
                    >
                      Judul Lagu &amp; Penyanyi Kustom
                    </label>
                    <input
                      id="custom-music-title"
                      type="text"
                      value={project.customMusicTitle}
                      onChange={(e) =>
                        onChangeProject({
                          ...project,
                          customMusicTitle: e.target.value,
                        })
                      }
                      placeholder="Contoh: Payung Teduh — Akad"
                      className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="custom-music-url"
                      className="block text-xs text-stone-300 mb-1"
                    >
                      Link File Audio MP3 (Opsional)
                    </label>
                    <input
                      id="custom-music-url"
                      type="text"
                      value={project.customMusicUrl}
                      onChange={(e) =>
                        onChangeProject({
                          ...project,
                          customMusicUrl: e.target.value,
                        })
                      }
                      placeholder="https://.../lagu-pilihan.mp3"
                      className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <label className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#090705] border border-dashed border-[#d4af37]/50 hover:border-[#f5e3b3] text-xs text-[#f5e3b3] cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Upload File Lagu MP3 dari HP / Laptop Anda</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleUploadAudio}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: KATA-KATA, NAMA TOKOH, JADWAL ACARA, AYAT & KISAH */}
          {activeTab === 'wording' && (
            <div className="dashboard-black-gold rounded-3xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-[#f5e3b3] border-b border-[#d4af37]/20 pb-3">
                Edit Seluruh Kata-Kata, Nama, Jadwal, Doa &amp; Kisah ({catMeta.shortName})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="ed-badge-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Judul Kecil Atas (Badge Acara)
                  </label>
                  <input
                    id="ed-badge-text"
                    type="text"
                    value={project.badgeText}
                    onChange={(e) =>
                      onChangeProject({ ...project, badgeText: e.target.value })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-guest-name"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Nama Tamu Undangan Default
                  </label>
                  <input
                    id="ed-guest-name"
                    type="text"
                    value={project.guestName}
                    onChange={(e) =>
                      onChangeProject({ ...project, guestName: e.target.value })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="ed-primary-name"
                    className="block text-xs text-[#f5e3b3] mb-1"
                  >
                    {catMeta.primaryFieldLabel}
                  </label>
                  <input
                    id="ed-primary-name"
                    type="text"
                    value={project.primaryName}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        primaryName: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-secondary-name"
                    className="block text-xs text-[#f5e3b3] mb-1"
                  >
                    {catMeta.secondaryFieldLabel}
                  </label>
                  <input
                    id="ed-secondary-name"
                    type="text"
                    value={project.secondaryName}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        secondaryName: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ed-parents-text"
                  className="block text-xs text-stone-300 mb-1"
                >
                  {catMeta.parentsFieldLabel}
                </label>
                <input
                  id="ed-parents-text"
                  type="text"
                  value={project.parentsText}
                  onChange={(e) =>
                    onChangeProject({ ...project, parentsText: e.target.value })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="ed-date-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Hari &amp; Tanggal
                  </label>
                  <input
                    id="ed-date-text"
                    type="text"
                    value={project.dateText}
                    onChange={(e) =>
                      onChangeProject({ ...project, dateText: e.target.value })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-time-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Waktu Sesi Utama
                  </label>
                  <input
                    id="ed-time-text"
                    type="text"
                    value={project.timeText}
                    onChange={(e) =>
                      onChangeProject({ ...project, timeText: e.target.value })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-location-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Tempat / Lokasi
                  </label>
                  <input
                    id="ed-location-text"
                    type="text"
                    value={project.locationText}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        locationText: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="ed-sec-session-title"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Judul Sesi Kedua (Resepsi / Ramah Tamah)
                  </label>
                  <input
                    id="ed-sec-session-title"
                    type="text"
                    value={project.secondSessionTitle}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        secondSessionTitle: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-sec-session-time"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Waktu Sesi Kedua
                  </label>
                  <input
                    id="ed-sec-session-time"
                    type="text"
                    value={project.secondSessionTime}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        secondSessionTime: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ed-opening-greeting"
                  className="block text-xs text-stone-300 mb-1"
                >
                  Kata-Kata Sapaan Pembuka
                </label>
                <textarea
                  id="ed-opening-greeting"
                  rows={2}
                  value={project.openingGreeting}
                  onChange={(e) =>
                    onChangeProject({
                      ...project,
                      openingGreeting: e.target.value,
                    })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="ed-prayer-quote"
                  className="block text-xs text-stone-300 mb-1"
                >
                  Kutipan Ayat Suci / Doa Keberkahan Acara
                </label>
                <textarea
                  id="ed-prayer-quote"
                  rows={2}
                  value={project.prayerQuote}
                  onChange={(e) =>
                    onChangeProject({
                      ...project,
                      prayerQuote: e.target.value,
                    })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="ed-story-title-1"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Judul Kisah 1
                  </label>
                  <input
                    id="ed-story-title-1"
                    type="text"
                    value={project.storyTitle1}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        storyTitle1: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    aria-label="Isi Kisah 1"
                    value={project.storyContent1}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        storyContent1: e.target.value,
                      })
                    }
                    className="w-full mt-1.5 bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-story-title-2"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Judul Kisah 2
                  </label>
                  <input
                    id="ed-story-title-2"
                    type="text"
                    value={project.storyTitle2}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        storyTitle2: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    aria-label="Isi Kisah 2"
                    value={project.storyContent2}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        storyContent2: e.target.value,
                      })
                    }
                    className="w-full mt-1.5 bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AMPLOP DIGITAL, KADO FISIK & TIKTOK */}
          {activeTab === 'gift' && (
            <div className="dashboard-black-gold rounded-3xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-[#f5e3b3] border-b border-[#d4af37]/20 pb-3">
                Pengaturan Amplop Digital, Alamat Kado &amp; Akun TikTok
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label
                    htmlFor="ed-bank-name"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Nama Bank / E-Wallet
                  </label>
                  <input
                    id="ed-bank-name"
                    type="text"
                    value={project.bankName}
                    onChange={(e) =>
                      onChangeProject({ ...project, bankName: e.target.value })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-acc-num"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Nomor Rekening
                  </label>
                  <input
                    id="ed-acc-num"
                    type="text"
                    value={project.accountNumber}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        accountNumber: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-[#f5e3b3] font-mono"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-acc-holder"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Atas Nama Rekening
                  </label>
                  <input
                    id="ed-acc-holder"
                    type="text"
                    value={project.accountHolder}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        accountHolder: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="ed-gift-addr"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Alamat Pengiriman Kado Fisik
                  </label>
                  <input
                    id="ed-gift-addr"
                    type="text"
                    value={project.physicalGiftAddress}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        physicalGiftAddress: e.target.value,
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ed-tiktok-handle"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Username TikTok (Tanpa @)
                  </label>
                  <input
                    id="ed-tiktok-handle"
                    type="text"
                    value={project.tiktokHandle}
                    onChange={(e) =>
                      onChangeProject({
                        ...project,
                        tiktokHandle: e.target.value.replace(/^@/, ''),
                      })
                    }
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3 py-2 text-xs text-[#f5e3b3]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (5 COLS): INTERACTIVE FULL-SCROLL LIVE PREVIEW */}
        <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-16 lg:self-start w-full">
          {/* LIVE PREVIEW CONTROL TOOLBAR */}
          <div className="w-full max-w-[420px] mb-3 p-2.5 rounded-2xl bg-[#14100c] border border-[#d4af37]/35 shadow-lg flex flex-col gap-2 font-golos">
            <div className="flex items-center justify-between">
              {/* Pulsing Live indicator */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Live Preview Real-Time
                </span>
              </div>

              {/* Music Play/Pause toggle directly in preview */}
              <button
                type="button"
                onClick={onToggleMusic}
                title={isPlayingMusic ? 'Jeda Lagu Latar' : 'Putar Lagu Latar'}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-medium transition cursor-pointer ${
                  isPlayingMusic
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-[#201912] text-stone-300 hover:text-white border border-[#d4af37]/20'
                }`}
              >
                {isPlayingMusic ? (
                  <>
                    <Volume2 className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>Musik Aktif</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3 text-stone-400" />
                    <span>Uji Musik</span>
                  </>
                )}
              </button>
            </div>

            {/* Mode switch: Isi Undangan vs Sampul Depan & Device width toggle */}
            <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-[#d4af37]/15">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  data-testid="preview-mode-content-btn"
                  onClick={() => setPreviewMode('content')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-semibold transition cursor-pointer ${
                    previewMode === 'content'
                      ? 'bg-[#d4af37] text-[#0c0a08]'
                      : 'bg-[#1b150e] text-stone-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Isi Undangan</span>
                </button>
                <button
                  type="button"
                  data-testid="preview-mode-cover-btn"
                  onClick={() => setPreviewMode('cover')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-semibold transition cursor-pointer ${
                    previewMode === 'cover'
                      ? 'bg-[#d4af37] text-[#0c0a08]'
                      : 'bg-[#1b150e] text-stone-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Sampul Depan</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                <button
                  type="button"
                  onClick={() => setPreviewDeviceWidth('normal')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    previewDeviceWidth === 'normal'
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:text-stone-300'
                  }`}
                >
                  390px
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setPreviewDeviceWidth('wide')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    previewDeviceWidth === 'wide'
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:text-stone-300'
                  }`}
                >
                  430px
                </button>
              </div>
            </div>
          </div>

          {/* DEVICE SHELL CONTAINER */}
          <div
            data-testid="studio-live-preview-device"
            className={`w-full ${
              previewDeviceWidth === 'wide' ? 'max-w-[430px]' : 'max-w-[390px]'
            } rounded-[36px] overflow-hidden shadow-2xl border-2 transition-all flex flex-col`}
            style={{
              backgroundColor: tpl.bgPrimary,
              borderColor: tpl.accentHex,
            }}
          >
            {/* Device Status Bar */}
            <div className="bg-black/90 px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] shrink-0">
              <span
                className="font-mono font-bold tabular-nums truncate max-w-[220px]"
                style={{ color: tpl.accentHex }}
              >
                0{tpl.number}/07 • {catMeta.shortName.toUpperCase()}
              </span>
              <span className="text-stone-400 font-mono text-[10px]">
                {previewMode === 'cover' ? 'SAMPUL' : 'LIVE VIEW'}
              </span>
            </div>

            {/* Scrollable Invitation Canvas inside Phone Preview */}
            <div
              ref={previewScrollContainerRef}
              className="max-h-[calc(100vh-210px)] min-h-[520px] overflow-y-auto p-4 text-center space-y-4"
              style={{
                background: `linear-gradient(180deg, ${tpl.bgSecondary} 0%, ${tpl.bgPrimary} 100%)`,
                color: tpl.textPrimary,
              }}
            >
              {/* COVER MODE PREVIEW */}
              {previewMode === 'cover' ? (
                <div className="min-h-[460px] flex flex-col justify-between py-6 px-3 space-y-4">
                  <div className="space-y-2">
                    <p
                      className="font-averia text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: tpl.accentHex }}
                    >
                      {project.badgeText}
                    </p>
                    <h2 className="font-signature text-4xl text-white leading-tight">
                      {mainHeading}
                    </h2>
                    <p className="text-xs" style={{ color: tpl.textMuted }}>
                      {project.dateText} • {project.locationText}
                    </p>
                  </div>

                  {/* Main Portrait with selected Frame Style */}
                  <div
                    className="w-[190px] h-[250px] mx-auto my-2 overflow-hidden border transition-all"
                    style={{
                      borderColor: tpl.accentHex,
                      borderRadius:
                        project.frameStyle === 'arch-royal'
                          ? '110px 110px 18px 18px'
                          : project.frameStyle === 'oval-medal'
                          ? '9999px'
                          : project.frameStyle === 'floating-feathered'
                          ? '24px'
                          : '18px',
                      boxShadow:
                        project.frameStyle === 'floating-feathered'
                          ? `0 0 30px rgba(0,0,0,0.9), 0 0 16px ${tpl.accentHex}40`
                          : '0 14px 30px rgba(0,0,0,0.7)',
                    }}
                  >
                    <img
                      src={project.mainPortraitUrl}
                      alt={mainHeading}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Guest Name & Open Invitation Button */}
                  <div className="space-y-3 pt-2">
                    <div
                      className="p-3 rounded-2xl border text-xs"
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <p className="text-[10px] text-stone-400 mb-0.5">
                        Kepada Yth. Bapak/Ibu/Saudara/i:
                      </p>
                      <p className="font-bold text-white text-sm">
                        {project.guestName || 'Tamu Undangan Terhormat'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewMode('content');
                        if (!isPlayingMusic) onToggleMusic();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{
                        background: tpl.buttonGradient,
                        color: tpl.buttonText,
                      }}
                    >
                      Buka Undangan Sekarang
                    </button>
                    <p className="text-[10px] text-stone-400">
                      Klik untuk melihat isi acara &amp; memutar musik
                    </p>
                  </div>
                </div>
              ) : (
                /* CONTENT MODE (FULL INVITATION SECTIONS) */
                <>
                  {/* Quick Section Jump Pills */}
                  <div className="flex items-center justify-center gap-1.5 pb-2 border-b border-white/10 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('cover')}
                      className="px-2 py-0.5 rounded text-[9.5px] bg-white/10 text-stone-300 hover:text-white cursor-pointer"
                    >
                      ← Sampul
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('pv-sec-acara');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2 py-0.5 rounded text-[9.5px] bg-white/10 text-stone-300 hover:text-white cursor-pointer"
                    >
                      Acara
                    </button>
                    {project.enabledSections.story && (
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('pv-sec-story');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-2 py-0.5 rounded text-[9.5px] bg-white/10 text-stone-300 hover:text-white cursor-pointer"
                      >
                        Kisah
                      </button>
                    )}
                    {project.enabledSections.gift && (
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('pv-sec-gift');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-2 py-0.5 rounded text-[9.5px] bg-white/10 text-stone-300 hover:text-white cursor-pointer"
                      >
                        Amplop
                      </button>
                    )}
                    {project.enabledSections.rsvp && (
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('pv-sec-rsvp');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-2 py-0.5 rounded text-[9.5px] bg-white/10 text-stone-300 hover:text-white cursor-pointer"
                      >
                        Doa &amp; RSVP
                      </button>
                    )}
                  </div>

                  {/* 1. Hero & Foto Utama */}
                  <div className="space-y-2 pt-1">
                    <p
                      className="font-averia text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: tpl.accentHex }}
                    >
                      {project.badgeText}
                    </p>
                    <h2 className="font-signature text-4xl text-white leading-tight">
                      {mainHeading}
                    </h2>
                    <p className="text-xs" style={{ color: tpl.textMuted }}>
                      {project.dateText} • {project.locationText}
                    </p>

                    {/* Main Photo in selected Frame Style */}
                    <div
                      className="w-[196px] h-[255px] mx-auto my-3 overflow-hidden border transition-all"
                      style={{
                        borderColor: tpl.accentHex,
                        borderRadius:
                          project.frameStyle === 'arch-royal'
                            ? '110px 110px 18px 18px'
                            : project.frameStyle === 'oval-medal'
                            ? '9999px'
                            : project.frameStyle === 'floating-feathered'
                            ? '24px'
                            : '18px',
                        boxShadow:
                          project.frameStyle === 'floating-feathered'
                            ? `0 0 30px rgba(0,0,0,0.9), 0 0 16px ${tpl.accentHex}40`
                            : '0 14px 30px rgba(0,0,0,0.7)',
                      }}
                    >
                      <img
                        src={project.mainPortraitUrl}
                        alt={mainHeading}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <p
                      className="font-playfair text-xs leading-relaxed px-2"
                      style={{ color: tpl.textMuted }}
                    >
                      {project.openingGreeting}
                    </p>
                  </div>

                  {/* 2. Countdown Section */}
                  {project.enabledSections.countdown && (
                    <div
                      className="rounded-2xl p-3 border space-y-1.5"
                      style={{
                        background: tpl.cardBg,
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <p
                        className="text-[10px] font-averia uppercase tracking-widest"
                        style={{ color: tpl.accentHex }}
                      >
                        Menghitung Hari Menuju Hari Bahagia
                      </p>
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        <div className="bg-black/50 border border-white/10 rounded-xl p-1.5">
                          <span className="font-playfair text-base font-bold text-white block">
                            12
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-stone-400">
                            Hari
                          </span>
                        </div>
                        <div className="bg-black/50 border border-white/10 rounded-xl p-1.5">
                          <span className="font-playfair text-base font-bold text-white block">
                            08
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-stone-400">
                            Jam
                          </span>
                        </div>
                        <div className="bg-black/50 border border-white/10 rounded-xl p-1.5">
                          <span className="font-playfair text-base font-bold text-white block">
                            45
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-stone-400">
                            Menit
                          </span>
                        </div>
                        <div className="bg-black/50 border border-white/10 rounded-xl p-1.5">
                          <span className="font-playfair text-base font-bold text-white block">
                            20
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-stone-400">
                            Detik
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Quote / Doa Section */}
                  {project.enabledSections.quote && (
                    <div
                      className="rounded-2xl p-4 text-xs leading-relaxed border"
                      style={{
                        background: tpl.cardBg,
                        borderColor: tpl.borderRgba,
                        color: tpl.textMuted,
                      }}
                    >
                      <p className="italic">
                        &ldquo;{project.prayerQuote}&rdquo;
                      </p>
                      <p
                        className="font-bold mt-2 text-[11px]"
                        style={{ color: tpl.accentHex }}
                      >
                        — {project.prayerSource} —
                      </p>
                    </div>
                  )}

                  {/* 4. Tokoh Utama & Jadwal 2 Sesi Acara */}
                  <div
                    id="pv-sec-acara"
                    className="p-4 border space-y-3 transition-all"
                    style={{
                      background: tpl.cardBg,
                      borderColor: tpl.borderRgba,
                      borderRadius:
                        project.cardLayout === 'arched-vip'
                          ? '30px'
                          : project.cardLayout === 'modern-grid'
                          ? '16px'
                          : '22px',
                    }}
                  >
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-widest font-averia"
                        style={{ color: tpl.accentHex }}
                      >
                        {catMeta.primaryFieldLabel}
                      </p>
                      <h3 className="font-playfair text-lg font-bold text-white mt-0.5">
                        {project.primaryName}
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: tpl.accentLightHex }}
                      >
                        {project.secondaryName}
                      </p>
                      <p
                        className="text-[11px] mt-1"
                        style={{ color: tpl.textMuted }}
                      >
                        {project.parentsText}
                      </p>
                    </div>

                    {/* Sesi 1 & Sesi 2 */}
                    <div className="pt-2 border-t border-white/10 text-xs space-y-2">
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-left">
                        <div className="flex items-center gap-1.5 font-bold text-white text-[11.5px]">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Acara Utama / Sesi 1</span>
                        </div>
                        <p className="text-[11px] text-stone-200 mt-1">
                          {project.dateText}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-stone-300 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{project.timeText}</span>
                        </div>
                        <div className="flex items-start gap-1 text-[11px] text-stone-300 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                          <span>{project.locationText}</span>
                        </div>
                      </div>

                      {project.secondSessionTitle && (
                        <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-left">
                          <div className="flex items-center gap-1.5 font-bold text-white text-[11.5px]">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>{project.secondSessionTitle}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-stone-300 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{project.secondSessionTime}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            {project.venueDetail}
                          </p>
                        </div>
                      )}

                      {/* Google Maps Button */}
                      {project.enabledSections.maps && (
                        <a
                          href={project.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-[11px] font-bold border border-[#d4af37]/40 bg-[#1a140d] hover:bg-[#251d13] text-[#f5e3b3] cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Buka Petunjuk Lokasi Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* 5. Story Preview */}
                  {project.enabledSections.story && (
                    <div
                      id="pv-sec-story"
                      className="rounded-2xl p-4 text-left space-y-2.5 border"
                      style={{
                        background: tpl.cardBg,
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-widest font-averia text-center"
                        style={{ color: tpl.accentHex }}
                      >
                        Kisah &amp; Momen Bahagia
                      </p>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-white">
                          {project.storyTitle1}
                        </p>
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: tpl.textMuted }}
                        >
                          {project.storyContent1}
                        </p>
                      </div>
                      <div className="text-xs space-y-1 pt-2 border-t border-white/10">
                        <p className="font-bold text-white">
                          {project.storyTitle2}
                        </p>
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: tpl.textMuted }}
                        >
                          {project.storyContent2}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 6. Galeri Foto */}
                  {project.enabledSections.gallery && (
                    <div
                      className="rounded-2xl p-3 border space-y-2"
                      style={{
                        background: tpl.cardBg,
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-widest font-averia"
                        style={{ color: tpl.accentHex }}
                      >
                        Galeri Kenangan Indah
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {uploadedPhotosList.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            className="aspect-[4/5] rounded-xl overflow-hidden border border-white/10"
                            style={{
                              borderRadius:
                                project.frameStyle === 'oval-medal'
                                  ? '9999px'
                                  : '14px',
                            }}
                          >
                            <img
                              src={photo.url}
                              alt={photo.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 7. Gift & Digital Envelope */}
                  {project.enabledSections.gift && (
                    <div
                      id="pv-sec-gift"
                      className="rounded-2xl p-4 text-left space-y-2.5 border"
                      style={{
                        background: 'rgba(0,0,0,0.55)',
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] uppercase tracking-wider font-bold"
                          style={{ color: tpl.accentHex }}
                        >
                          Tanda Kasih (Amplop Digital)
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {project.bankName}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-gradient-to-r from-[#1c160e] to-[#0c0906] border border-[#d4af37]/40 space-y-1">
                        <p className="text-[10px] text-stone-400">
                          Nomor Rekening / E-Wallet:
                        </p>
                        <p
                          className="font-mono text-base font-bold tabular-nums tracking-wider"
                          style={{ color: tpl.accentLightHex }}
                        >
                          {project.accountNumber}
                        </p>
                        <p className="text-xs text-stone-300">
                          {project.accountHolder}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyRekInPreview(project.accountNumber)
                          }
                          className="mt-2 w-full py-1.5 rounded-lg text-[11px] font-bold bg-[#d4af37] hover:bg-[#e5c158] text-[#0c0a08] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {copiedRekeningInPreview ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>No. Rekening Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Nomor Rekening</span>
                            </>
                          )}
                        </button>
                      </div>

                      {project.physicalGiftAddress && (
                        <div className="text-[11px] text-stone-300 bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                          <span className="font-bold text-white block">
                            Kirim Kado Fisik:
                          </span>
                          <span className="text-stone-400 text-[10.5px]">
                            {project.physicalGiftAddress}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 8. Interactive RSVP & Live Wishes */}
                  {project.enabledSections.rsvp && (
                    <div
                      id="pv-sec-rsvp"
                      className="rounded-2xl p-4 text-left space-y-3 border"
                      style={{
                        background: 'rgba(0,0,0,0.55)',
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <div className="text-center space-y-1">
                        <p
                          className="text-[10px] uppercase tracking-widest font-averia"
                          style={{ color: tpl.accentHex }}
                        >
                          Doa Restu &amp; Kehadiran
                        </p>
                        <div className="text-xs font-semibold text-white tabular-nums">
                          {previewRsvpCount} Total Ucapan · {previewRsvpCount}{' '}
                          Orang Menyatakan Hadir
                        </div>
                      </div>

                      {/* Interactive Form inside Live Preview */}
                      <form
                        onSubmit={handleAddPreviewWish}
                        className="space-y-2 bg-black/40 p-2.5 rounded-xl border border-white/5"
                      >
                        <input
                          type="text"
                          placeholder="Nama Anda..."
                          value={newWishName}
                          onChange={(e) => setNewWishName(e.target.value)}
                          className="w-full bg-[#110e0a] border border-[#d4af37]/30 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                        <textarea
                          rows={2}
                          placeholder="Tuliskan ucapan dan doa restu..."
                          value={newWishMsg}
                          onChange={(e) => setNewWishMsg(e.target.value)}
                          className="w-full bg-[#110e0a] border border-[#d4af37]/30 rounded-lg px-2.5 py-1.5 text-xs text-white resize-none"
                        />
                        <div className="flex gap-2">
                          <select
                            value={newWishStatus}
                            onChange={(e) =>
                              setNewWishStatus(
                                e.target.value as 'Hadir' | 'Tidak Hadir'
                              )
                            }
                            className="bg-[#110e0a] border border-[#d4af37]/30 rounded-lg px-2 py-1 text-[11px] text-white flex-1"
                          >
                            <option value="Hadir">InsyaAllah Hadir</option>
                            <option value="Tidak Hadir">
                              Maaf Berhalangan
                            </option>
                          </select>
                          <button
                            type="submit"
                            className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                            style={{
                              background: tpl.buttonGradient,
                              color: tpl.buttonText,
                            }}
                          >
                            <Send className="w-3 h-3" />
                            <span>Kirim</span>
                          </button>
                        </div>
                      </form>

                      {/* Live Wish Stream */}
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {previewWishesList.map((wish, wIdx) => (
                          <div
                            key={wIdx}
                            className="bg-[#16120b] p-2 rounded-lg border border-[#d4af37]/20 text-[11px] space-y-0.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">
                                {wish.name}
                              </span>
                              <span
                                className="text-[9.5px] px-1.5 py-0.2 rounded font-mono"
                                style={{
                                  background: `${tpl.accentHex}20`,
                                  color: tpl.accentHex,
                                }}
                              >
                                {wish.status}
                              </span>
                            </div>
                            <p className="text-stone-300 text-[10.5px]">
                              {wish.msg}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 9. Penutup & Signature */}
                  <div className="pt-2 pb-1 space-y-1.5 border-t border-white/10">
                    <p className="text-[10px] text-stone-400">
                      Kami yang berbahagia
                    </p>
                    <h3 className="font-signature text-3xl text-white">
                      {mainHeading}
                    </h3>
                    <p
                      className="text-[11px] px-2 italic"
                      style={{ color: tpl.textMuted }}
                    >
                      {project.closingGreeting}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer inside Phone Preview */}
            <div className="bg-black/90 px-4 py-2 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400 shrink-0">
              <span className="truncate max-w-[200px]">
                🎵 {activeMusicLabel}
              </span>
              <a
                href={`https://www.tiktok.com/@${project.tiktokHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white shrink-0"
              >
                @{project.tiktokHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
