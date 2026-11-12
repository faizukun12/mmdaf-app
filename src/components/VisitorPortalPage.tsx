import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  Music,
  Layout,
  Copy,
  ExternalLink,
  ArrowRight,
  Sliders,
  Eye,
  Download,
} from 'lucide-react';
import {
  EVENT_CATEGORIES,
  SEVEN_TEMPLATE_PRESETS,
  STUDIO_PACKAGES,
  MUSIC_PRESETS,
  EventCategoryId,
  PackageTierId,
  StudioProjectState,
  getCategoryMeta,
  getTemplatePreset,
  getMusicPreset,
  verifyTiktokFreeClaim,
  applyCategorySwitchToProject,
  generateCustomEventHtml,
} from '../utils/studioTemplates';

interface VisitorPortalPageProps {
  project: StudioProjectState;
  onChangeProject: (next: StudioProjectState) => void;
  onOpenFullEditor: () => void;
  onOpenLiveWeddingInvitation: () => void;
}

export const VisitorPortalPage: React.FC<VisitorPortalPageProps> = ({
  project,
  onChangeProject,
  onOpenFullEditor,
  onOpenLiveWeddingInvitation,
}) => {
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [claimFeedback, setClaimFeedback] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const activeCategoryMeta = getCategoryMeta(project.category);
  const activeTemplate = getTemplatePreset(project.templateId);
  const activeMusic = getMusicPreset(project.musicId);

  const handleSelectCategory = (catId: EventCategoryId) => {
    onChangeProject(applyCategorySwitchToProject(project, catId));
  };

  const handleSelectPackage = (tierId: PackageTierId) => {
    onChangeProject({
      ...project,
      packageTier: tierId,
    });
    const el = document.getElementById('visitor-self-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    onChangeProject({
      ...project,
      templateId,
    });
    const el = document.getElementById('visitor-self-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerifyFreeClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyTiktokFreeClaim(tiktokUsername, secretKey);
    setClaimFeedback({ valid: res.valid, message: res.message });
    if (res.valid) {
      onChangeProject({
        ...project,
        packageTier: 'silver',
      });
      setTimeout(() => {
        const el = document.getElementById('visitor-self-builder');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const handleCopyCustomHtml = () => {
    const html = generateCustomEventHtml(project);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(html).catch(() => {});
    }
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleDownloadCustomHtml = () => {
    const html = generateCustomEventHtml(project);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeCategoryMeta.fileSlug;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyShareLink = () => {
    const shareUrl = `https://mmdaf.my.id/${activeCategoryMeta.fileSlug}?to=${encodeURIComponent(
      project.guestName
    )}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  const previewHeading =
    project.category === 'nikah'
      ? `${project.primaryName.split(',')[0]} & ${project.secondaryName.split(',')[0]}`
      : project.primaryName;

  return (
    <div
      data-testid="visitor-portal-page"
      className="min-h-screen bg-[#0c0a09] text-stone-100 pt-14 pb-20 font-golos"
    >
      {/* HERO SECTION: MMDAF.MY.ID STUDIO PORTAL */}
      <section className="relative border-b border-[#d4af37]/25 bg-gradient-to-b from-[#17120c] via-[#0e0b08] to-[#0c0a09] py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="text-xs tracking-[0.2em] uppercase text-[#d4af37] font-averia">
              mmdaf.my.id · Platform Undangan Digital Multi-Acara · Kota Baubau
            </div>
            <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-[#f5e3b3] leading-tight">
              Rancang Sendiri Undangan Pernikahan, Aqiqah, Khitan &amp; Acara Impian Anda.
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              Selamat datang di portal resmi <strong className="text-[#f5e3b3]">MMDAF Studio (mmdaf.my.id)</strong>.
              Tersedia <strong className="text-[#d4af37]">7 Templat Eksklusif untuk setiap kategori acara</strong>,
              pilihan paket mulai dari <strong className="text-emerald-300">Silver (Gratis Rp 0)</strong>,{' '}
              <strong className="text-[#f5e3b3]">Gold</strong>, <strong className="text-sky-300">Titanium</strong>, hingga{' '}
              <strong className="text-[#d4af37]">VIP Hitam &amp; Emas</strong> lengkap dengan fitur buat undangan mandiri secara langsung.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#visitor-self-builder"
                data-testid="hero-self-build-cta"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all whitespace-nowrap shrink-0"
              >
                <Sliders className="w-4 h-4" />
                <span>Buat Sendiri Undangan Sekarang</span>
              </a>
              <a
                href="#paket-studio"
                className="inline-flex items-center gap-2 bg-[#1c1610] hover:bg-[#271f16] border border-[#d4af37]/45 text-[#f5e3b3] font-medium text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Lihat Paket Silver – VIP</span>
              </a>
              <button
                type="button"
                onClick={onOpenLiveWeddingInvitation}
                className="inline-flex items-center gap-2 bg-black/60 hover:bg-black border border-stone-700 text-stone-200 text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Eye className="w-4 h-4 text-[#d4af37]" />
                <span>Lihat Demo Undangan VIP</span>
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400">
              <span>7 Kategori Acara</span>
              <span aria-hidden="true">·</span>
              <span>7 Templat per Kategori (49 Desain)</span>
              <span aria-hidden="true">·</span>
              <span>Karya : G-Faizu_3.8</span>
              <span aria-hidden="true">·</span>
              <span>TikTok @mmdaf.studio.project</span>
            </div>
          </div>

          {/* RIGHT COLUMN: KOTAK KLAIM UNDANGAN GRATIS (PAKET SILVER RP 0) */}
          <div className="lg:col-span-5">
            <div className="dashboard-black-gold rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-3">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-emerald-300 font-semibold">
                    Promo Paket Silver • Rp 0
                  </p>
                  <h2 className="font-playfair text-xl font-bold text-[#f5e3b3]">
                    Klaim Undangan Gratis (4 Foto)
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#d4af37] tabular-nums">
                  mmdaf.my.id
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                Syarat klaim Paket Silver Gratis: Follow akun TikTok resmi kami, lalu masukkan username TikTok Anda beserta kode kunci dari bio profil:
              </p>

              <a
                href="https://www.tiktok.com/@mmdaf.studio.project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0a0806] border border-[#d4af37]/50 hover:border-[#f5e3b3] text-[#f5e3b3] font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>1. Follow TikTok @mmdaf.studio.project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <form onSubmit={handleVerifyFreeClaim} className="space-y-3 pt-1">
                <div>
                  <label
                    htmlFor="visitor-tiktok-user"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    2. Username Akun TikTok Anda:
                  </label>
                  <input
                    id="visitor-tiktok-user"
                    type="text"
                    value={tiktokUsername}
                    onChange={(e) => setTiktokUsername(e.target.value)}
                    placeholder="Contoh: @nama_akun_anda"
                    className="w-full bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f5e3b3]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="visitor-secret-key"
                    className="block text-xs text-[#f5e3b3] mb-1"
                  >
                    3. Kode Kunci Resmi (Ketik: <code className="text-[#d4af37]">G-Faizu_3.8</code>):
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="visitor-secret-key"
                      type="text"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="Contoh: G-Faizu_3.8"
                      className="flex-1 bg-[#090705] border border-[#d4af37]/40 rounded-xl px-3.5 py-2 text-xs text-[#f5e3b3] font-mono focus:outline-none focus:border-[#f5e3b3]"
                    />
                    <button
                      type="submit"
                      data-testid="verify-free-claim-btn"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold text-xs hover:brightness-110 transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Klaim Gratis
                    </button>
                  </div>
                </div>

                {claimFeedback && (
                  <p
                    data-testid="claim-feedback-msg"
                    className={`text-xs font-medium pt-1 ${
                      claimFeedback.valid ? 'text-emerald-300' : 'text-rose-400'
                    }`}
                  >
                    {claimFeedback.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: DAFTAR PAKET STUDIO MMDAF (SILVER GRATIS, GOLD, TITANIUM, VIP) */}
      <section id="paket-studio" className="max-w-6xl mx-auto py-14 px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37] font-averia">
            Daftar Paket Layanan Studio · mmdaf.my.id
          </p>
          <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#f5e3b3]">
            Pilih Paket Undangan Digital Sesuai Kebutuhan Acara Anda
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Berlaku untuk seluruh jenis undangan: Pernikahan, Aqiqah, Walimatul Khitan, Tasyakuran Wisuda, Ulang Tahun, Syukuran Rumah, dan Halal Bi Halal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {STUDIO_PACKAGES.map((pkg) => {
            const isSelected = project.packageTier === pkg.id;
            return (
              <div
                key={pkg.id}
                data-testid={`package-card-${pkg.id}`}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
                  pkg.isVip
                    ? 'dashboard-black-gold ring-2 ring-[#d4af37]'
                    : isSelected
                    ? 'bg-[#19140e] border-2 border-[#d4af37]'
                    : 'bg-[#13100c] border border-[#d4af37]/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-averia uppercase tracking-wider text-[#d4af37]">
                      {pkg.badgeText}
                    </span>
                    <span className="font-mono text-stone-400 tabular-nums">
                      {pkg.maxTemplates} Templat · {pkg.maxPhotos} Foto
                    </span>
                  </div>

                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="pt-2 pb-3 border-y border-[#d4af37]/20">
                    {pkg.originalPriceText && (
                      <span className="text-xs text-stone-500 line-through mr-2 tabular-nums">
                        {pkg.originalPriceText}
                      </span>
                    )}
                    <div className="font-playfair text-3xl font-bold text-[#f5e3b3] tabular-nums">
                      {pkg.priceText}
                    </div>
                    <p className="text-[11px] text-[#d4af37] mt-0.5">
                      {pkg.periodText.includes(pkg.activeDuration)
                        ? pkg.periodText
                        : `${pkg.periodText} · ${pkg.activeDuration}`}
                    </p>
                  </div>

                  <div className="space-y-2.5 text-left">
                    <p className="text-xs font-semibold text-[#f5e3b3]">
                      Poin-Poin Fitur {pkg.name}:
                    </p>
                    <ul className="space-y-2">
                      {pkg.points.map((pt, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-stone-200 leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#d4af37]/20">
                  <button
                    type="button"
                    data-testid={`select-package-${pkg.id}`}
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      pkg.isVip || isSelected
                        ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08]'
                        : 'bg-[#211b14] hover:bg-[#2c241b] text-[#f5e3b3] border border-[#d4af37]/40'
                    }`}
                  >
                    <span>
                      {isSelected
                        ? `${pkg.name} Terpilih`
                        : `Pilih ${pkg.name} & Buat Undangan`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: KATALOG 7 KATEGORI ACARA x 7 TEMPLAT EKSKLUSIF */}
      <section className="border-y border-[#d4af37]/25 bg-[#110e0a] py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37] font-averia">
                Koleksi 7 Templat di Setiap Kategori Acara
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#f5e3b3]">
                Pilih Kategori Acara &amp; Lihat 7 Templatnya
              </h2>
            </div>
            <p className="text-xs text-stone-300 max-w-md">
              Klik salah satu jenis acara di bawah ini untuk melihat 7 templat khusus yang siap Anda gunakan dan edit sendiri.
            </p>
          </div>

          {/* 7 EVENT CATEGORY TABS */}
          <div
            role="tablist"
            aria-label="Kategori Acara Studio"
            className="flex flex-wrap gap-2 p-1.5 bg-[#090705] border border-[#d4af37]/30 rounded-2xl"
          >
            {EVENT_CATEGORIES.map((cat) => {
              const active = project.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-testid={`visitor-cat-tab-${cat.id}`}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] shadow'
                      : 'text-stone-300 hover:text-[#f5e3b3] hover:bg-white/5'
                  }`}
                >
                  {cat.shortName}
                </button>
              );
            })}
          </div>

          {/* 7 TEMPLATES FOR SELECTED CATEGORY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEVEN_TEMPLATE_PRESETS.map((tpl) => {
              const isSelected = project.templateId === tpl.id;
              const specificName =
                tpl.categoryNames[project.category] || tpl.name;
              return (
                <div
                  key={tpl.id}
                  data-testid={`visitor-tpl-card-${tpl.number}`}
                  className={`rounded-2xl p-4 flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'ring-2 ring-[#d4af37] bg-[#1c1610]'
                      : 'bg-[#14100c] border border-[#d4af37]/25 hover:border-[#d4af37]/60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Color & Theme Preview Header */}
                    <div
                      className="h-24 rounded-xl p-3 flex flex-col justify-between border"
                      style={{
                        background: tpl.cardBg,
                        borderColor: tpl.borderRgba,
                      }}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span
                          className="font-mono font-bold tabular-nums"
                          style={{ color: tpl.accentHex }}
                        >
                          TEMPLAT 0{tpl.number} / 07
                        </span>
                        <span
                          className="uppercase tracking-wider font-semibold"
                          style={{ color: tpl.accentLightHex }}
                        >
                          Paket {tpl.tier.toUpperCase()}
                        </span>
                      </div>
                      <div
                        className="font-signature text-2xl truncate"
                        style={{ color: tpl.accentLightHex }}
                      >
                        {previewHeading}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-playfair text-sm font-bold text-white">
                        0{tpl.number}. {specificName}
                      </h3>
                      <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                        {tpl.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid={`use-template-btn-${tpl.number}`}
                    onClick={() => handleSelectTemplate(tpl.id)}
                    className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08]'
                        : 'bg-[#090705] hover:bg-[#241c14] text-[#f5e3b3] border border-[#d4af37]/40'
                    }`}
                  >
                    {isSelected
                      ? 'Templat Sedang Dipakai'
                      : `Pakai Templat 0${tpl.number}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: FITUR BUAT SENDIRI UNDANGAN UNTUK PENGUNJUNG (SELF-SERVICE BUILDER) */}
      <section
        id="visitor-self-builder"
        className="max-w-6xl mx-auto py-14 px-4 sm:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37] font-averia">
              Fitur Buat Sendiri Undangan Online · mmdaf.my.id
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#f5e3b3]">
              Rancang &amp; Buat Sendiri Undangan Anda Secara Langsung
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Ubah kategori acara, pilih dari 7 templat, ganti musik latar, atur layout, dan sesuaikan kata-kata di bawah ini.
            </p>
          </div>

          <button
            type="button"
            data-testid="switch-to-full-editor-btn"
            onClick={onOpenFullEditor}
            className="inline-flex items-center gap-2 bg-[#211a12] hover:bg-[#2c2218] border border-[#d4af37]/60 text-[#f5e3b3] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Buka Mode Studio Editor Lengkap</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: VISITOR SELF-BUILDER CONTROLS */}
          <div className="lg:col-span-7 dashboard-black-gold rounded-3xl p-6 space-y-6">
            {/* Step 1: Kategori, Paket & 7 Templat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-[#d4af37]/20 pb-5">
              <div>
                <label
                  htmlFor="self-cat-select"
                  className="block text-xs font-semibold text-[#f5e3b3] mb-1.5"
                >
                  1. Kategori Acara
                </label>
                <select
                  id="self-cat-select"
                  value={project.category}
                  onChange={(e) =>
                    handleSelectCategory(e.target.value as EventCategoryId)
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {EVENT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="self-tpl-select"
                  className="block text-xs font-semibold text-[#f5e3b3] mb-1.5"
                >
                  2. Pilih dari 7 Templat
                </label>
                <select
                  id="self-tpl-select"
                  value={project.templateId}
                  onChange={(e) =>
                    onChangeProject({ ...project, templateId: e.target.value })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2 text-xs text-[#f5e3b3]"
                >
                  {SEVEN_TEMPLATE_PRESETS.map((t) => (
                    <option key={t.id} value={t.id}>
                      0{t.number}. {t.categoryNames[project.category]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="self-pkg-select"
                  className="block text-xs font-semibold text-[#f5e3b3] mb-1.5"
                >
                  3. Paket Studio
                </label>
                <select
                  id="self-pkg-select"
                  value={project.packageTier}
                  onChange={(e) =>
                    onChangeProject({
                      ...project,
                      packageTier: e.target.value as PackageTierId,
                    })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {STUDIO_PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.priceText})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Data Utama & Kata-Kata */}
            <div className="space-y-4 border-b border-[#d4af37]/20 pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Data Tokoh Utama, Waktu &amp; Kata-Kata Undangan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="self-primary-name"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    {activeCategoryMeta.primaryFieldLabel}
                  </label>
                  <input
                    id="self-primary-name"
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
                    htmlFor="self-secondary-name"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    {activeCategoryMeta.secondaryFieldLabel}
                  </label>
                  <input
                    id="self-secondary-name"
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
                  htmlFor="self-parents-text"
                  className="block text-xs text-stone-300 mb-1"
                >
                  {activeCategoryMeta.parentsFieldLabel}
                </label>
                <input
                  id="self-parents-text"
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
                    htmlFor="self-date-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Hari &amp; Tanggal Acara
                  </label>
                  <input
                    id="self-date-text"
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
                    htmlFor="self-time-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Waktu Pelaksanaan
                  </label>
                  <input
                    id="self-time-text"
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
                    htmlFor="self-loc-text"
                    className="block text-xs text-stone-300 mb-1"
                  >
                    Tempat / Lokasi Acara
                  </label>
                  <input
                    id="self-loc-text"
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

              <div>
                <label
                  htmlFor="self-greeting-text"
                  className="block text-xs text-stone-300 mb-1"
                >
                  Kata-Kata Sapaan Pembuka
                </label>
                <textarea
                  id="self-greeting-text"
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
            </div>

            {/* Step 3: Musik Latar & Layout Bingkai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#d4af37]/20 pb-5">
              <div>
                <label
                  htmlFor="self-music-select"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#f5e3b3] mb-1.5"
                >
                  <Music className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Pilihan Musik Latar</span>
                </label>
                <select
                  id="self-music-select"
                  value={project.musicId}
                  onChange={(e) =>
                    onChangeProject({ ...project, musicId: e.target.value })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {MUSIC_PRESETS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.artist} — {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="self-layout-select"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#f5e3b3] mb-1.5"
                >
                  <Layout className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Gaya Layout &amp; Bingkai Foto</span>
                </label>
                <select
                  id="self-layout-select"
                  value={project.frameStyle}
                  onChange={(e) =>
                    onChangeProject({
                      ...project,
                      frameStyle: e.target.value as StudioProjectState['frameStyle'],
                    })
                  }
                  className="w-full bg-[#090705] border border-[#d4af37]/45 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="floating-feathered">
                    Floating Feathered (Menyatu Latar VIP)
                  </option>
                  <option value="arch-royal">
                    Arch Kubah Keraton Hitam Emas
                  </option>
                  <option value="oval-medal">Oval Klasik Medali</option>
                  <option value="modern-rounded">Kotak Sudut Halus Modern</option>
                </select>
              </div>
            </div>

            {/* Step 4: Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyCustomHtml}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedHtml ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Script HTML Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Script HTML ({activeCategoryMeta.fileSlug})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadCustomHtml}
                className="inline-flex items-center gap-1.5 bg-[#1b150e] hover:bg-[#282015] border border-[#d4af37]/45 text-[#f5e3b3] font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Unduh File {activeCategoryMeta.fileSlug}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black border border-stone-700 text-stone-200 text-xs px-3.5 py-2.5 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>
                  {copiedShareLink
                    ? 'Link mmdaf.my.id Tersalin!'
                    : 'Salin Link Undangan Tamu'}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: LIVE PHONE PREVIEW OF THE VISITOR'S SELF-MADE INVITATION */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              data-testid="visitor-live-preview-phone"
              className="w-full max-w-[390px] rounded-[36px] overflow-hidden shadow-2xl border-2"
              style={{
                backgroundColor: activeTemplate.bgPrimary,
                borderColor: activeTemplate.accentHex,
              }}
            >
              <div className="bg-black/90 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-[11px]">
                <span
                  className="font-mono font-semibold"
                  style={{ color: activeTemplate.accentHex }}
                >
                  PRATINJAU LIVE • 0{activeTemplate.number}/07
                </span>
                <span className="text-stone-300">
                  {activeCategoryMeta.shortName} · {project.packageTier.toUpperCase()}
                </span>
              </div>

              <div
                className="p-5 text-center space-y-4"
                style={{
                  background: `linear-gradient(180deg, ${activeTemplate.bgSecondary} 0%, ${activeTemplate.bgPrimary} 100%)`,
                  color: activeTemplate.textPrimary,
                }}
              >
                <div>
                  <p
                    className="font-averia text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: activeTemplate.accentHex }}
                  >
                    {project.badgeText}
                  </p>
                  <h3 className="font-signature text-4xl text-white mt-1 leading-tight">
                    {previewHeading}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: activeTemplate.textMuted }}
                  >
                    {project.dateText} • {project.locationText}
                  </p>
                </div>

                {/* Snug Portrait Frame matching chosen FrameStyle */}
                <div
                  className="w-[186px] h-[248px] mx-auto overflow-hidden border"
                  style={{
                    borderColor: activeTemplate.accentHex,
                    borderRadius:
                      project.frameStyle === 'arch-royal'
                        ? '100px 100px 18px 18px'
                        : project.frameStyle === 'oval-medal'
                        ? '9999px'
                        : '20px',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.65)',
                  }}
                >
                  <img
                    src={project.mainPortraitUrl}
                    alt={previewHeading}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div
                  className="rounded-2xl p-3.5 text-xs leading-relaxed border"
                  style={{
                    background: activeTemplate.cardBg,
                    borderColor: activeTemplate.borderRgba,
                    color: activeTemplate.textMuted,
                  }}
                >
                  <p className="font-semibold text-white mb-1">
                    {project.primaryName}
                  </p>
                  <p className="text-[11px] mb-1.5">{project.parentsText}</p>
                  <p className="italic text-[11.5px]">
                    &ldquo;{project.openingGreeting}&rdquo;
                  </p>
                </div>

                <div
                  className="rounded-2xl p-3.5 text-left space-y-1 border"
                  style={{
                    background: 'rgba(0,0,0,0.45)',
                    borderColor: activeTemplate.borderRgba,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] uppercase tracking-wider font-bold"
                      style={{ color: activeTemplate.accentHex }}
                    >
                      Amplop Digital · {project.bankName}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      🎵 {activeMusic.artist} - {activeMusic.title}
                    </span>
                  </div>
                  <p
                    className="font-mono text-sm font-bold tabular-nums"
                    style={{ color: activeTemplate.accentLightHex }}
                  >
                    {project.accountNumber}
                  </p>
                  <p className="text-[11px] text-stone-300">
                    {project.accountHolder}
                  </p>
                </div>
              </div>

              <div className="bg-black/80 px-4 py-2.5 border-t border-white/10 text-center text-[10px] text-stone-400">
                mmdaf.my.id/{activeCategoryMeta.fileSlug} • TikTok @{project.tiktokHandle}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PENUTUP MMDAF STUDIO DENGAN TOMBOL KONTAK HITAM EMAS */}
      <footer className="w-full border-t border-[#d4af37]/30 py-10 px-4 bg-[#0a0806] text-center">
        <div className="max-w-md mx-auto dashboard-black-gold rounded-2xl p-5 space-y-2 font-playfair">
          <p className="text-[#f5e3b3] font-semibold text-sm tracking-wider">
            MMDAF Royal Malige Edition • Kota Baubau
          </p>
          <p className="text-stone-300 text-xs">
            Karya : G-Faizu_3.8 • Ingin buat undangan seperti ini? Hubungi Kami
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2 border-t border-[#d4af37]/30">
            <a
              href="https://wa.me/6281119127082?text=Halo%20MMDAF%20Studio%20(G-Faizu_3.8)%2C%20saya%20tertarik%20ingin%20membuat%20undangan%20digital%20seperti%20ini."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-averia bg-gradient-to-r from-[#1b1610] via-[#292015] to-[#15110a] text-[#ffd700] hover:from-[#b88c42] hover:via-[#d4af37] hover:to-[#9a722c] hover:text-[#0c0a08] border border-[#d4af37]/70 hover:border-[#ffd700] shadow-md hover:shadow-[#d4af37]/35 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 shrink-0 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.16 7.29C8.94 7.29 8.58 7.37 8.28 7.7C7.99 8.02 7.17 8.79 7.17 10.35C7.17 11.91 8.31 13.42 8.47 13.63C8.63 13.84 10.66 16.97 13.77 18.31C14.51 18.63 15.09 18.82 15.54 18.96C16.28 19.2 16.95 19.16 17.48 19.08C18.07 19 19.3 18.33 19.56 17.59C19.82 16.85 19.82 16.22 19.74 16.08C19.66 15.94 19.44 15.86 19.12 15.7C18.8 15.54 17.22 14.76 16.93 14.65C16.64 14.54 16.43 14.49 16.22 14.81C16.01 15.13 15.4 15.86 15.21 16.08C15.02 16.3 14.83 16.33 14.51 16.17C14.19 16.01 13.16 15.67 11.94 14.58C10.98 13.72 10.33 12.67 10.14 12.35C9.95 12.03 10.12 11.85 10.28 11.69C10.42 11.55 10.6 11.32 10.76 11.13C10.92 10.94 10.97 10.81 11.08 10.6C11.19 10.39 11.13 10.2 11.05 10.04C10.97 9.88 10.35 8.35 10.1 7.73C9.84 7.14 9.58 7.22 9.39 7.21C9.21 7.2 9.01 7.29 8.81 7.29L9.16 7.29Z" />
              </svg>
              <span>WhatsApp: 0811-1912-7082</span>
            </a>
            <a
              href="https://www.tiktok.com/@mmdaf.studio.project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-averia bg-[#090705] text-[#f5e3b3] hover:text-[#ffd700] hover:bg-[#1a140d] border border-[#d4af37]/45 hover:border-[#ffd700] shadow-md hover:shadow-[#d4af37]/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 shrink-0 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
              </svg>
              <span>TikTok: @mmdaf.studio.project</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
