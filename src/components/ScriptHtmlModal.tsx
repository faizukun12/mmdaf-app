import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  X,
  Sparkles,
  Smartphone,
  Globe,
  FolderDown,
} from 'lucide-react';
import {
  InvitationConfig,
  MMDAF_WEDDING_CONFIG,
  JUSTIN_SISCA_CONFIG,
  MANIFEST_JSON_CONFIG,
} from '../utils/invitationData';
import {
  generateStandaloneHtml,
  generateMaligeWeddingHtml,
} from '../utils/generateStandaloneHtml';
import {
  StudioEditorProject,
  createDefaultStudioProject,
  applyCategorySwitchToProject,
  generateCustomEventHtml,
  generateStandaloneVisitorIndexHtml,
  generateStandaloneStudioEditorHtml,
} from '../utils/studioTemplates';

interface ScriptHtmlModalProps {
  config: InvitationConfig;
  guestName: string;
  studioProject?: StudioEditorProject;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (next: InvitationConfig, nextGuest: string) => void;
}

type SyncFileTabId =
  | 'undangan-tanpa-foto'
  | 'undangan-vip'
  | 'index-visitor'
  | 'editor-studio'
  | 'studio-active'
  | 'aqiqah'
  | 'khitan'
  | 'wisuda'
  | 'ultah'
  | 'malige-vip'
  | 'manifest-json';

export const ScriptHtmlModal: React.FC<ScriptHtmlModalProps> = ({
  config,
  guestName,
  studioProject,
  isOpen,
  onClose,
  onUpdateConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeFileTab, setActiveFileTab] =
    useState<SyncFileTabId>('undangan-tanpa-foto');
  const [groomNick, setGroomNick] = useState(config.groomNickname);
  const [brideNick, setBrideNick] = useState(config.brideNickname);
  const [guestInput, setGuestInput] = useState(guestName);
  const [downloadedAll, setDownloadedAll] = useState(false);

  if (!isOpen) return null;

  const baseProject = studioProject || createDefaultStudioProject();

  const updatedConfig: InvitationConfig = {
    ...config,
    groomNickname: groomNick || config.groomNickname,
    brideNickname: brideNick || config.brideNickname,
  };

  const getFileContentAndName = (
    tab: SyncFileTabId
  ): { filename: string; content: string; mime: string } => {
    const targetGuest = guestInput || 'Tamu Undangan Terhormat';
    switch (tab) {
      case 'undangan-tanpa-foto':
        return {
          filename: 'undangan-tanpa-foto.html',
          content: generateStandaloneHtml(
            { ...updatedConfig, showCouplePhotos: false },
            targetGuest
          ),
          mime: 'text/html;charset=utf-8',
        };
      case 'index-visitor':
        return {
          filename: 'index.html',
          content: generateStandaloneVisitorIndexHtml(),
          mime: 'text/html;charset=utf-8',
        };
      case 'editor-studio':
        return {
          filename: 'editor.html',
          content: generateStandaloneStudioEditorHtml(baseProject),
          mime: 'text/html;charset=utf-8',
        };
      case 'studio-active':
        return {
          filename: `${baseProject.category}.html`,
          content: generateCustomEventHtml({
            ...baseProject,
            guestName: targetGuest,
          }),
          mime: 'text/html;charset=utf-8',
        };
      case 'aqiqah':
        return {
          filename: 'aqiqah.html',
          content: generateCustomEventHtml(
            applyCategorySwitchToProject(baseProject, 'aqiqah')
          ),
          mime: 'text/html;charset=utf-8',
        };
      case 'khitan':
        return {
          filename: 'khitan.html',
          content: generateCustomEventHtml(
            applyCategorySwitchToProject(baseProject, 'khitan')
          ),
          mime: 'text/html;charset=utf-8',
        };
      case 'wisuda':
        return {
          filename: 'wisuda.html',
          content: generateCustomEventHtml(
            applyCategorySwitchToProject(baseProject, 'wisuda')
          ),
          mime: 'text/html;charset=utf-8',
        };
      case 'ultah':
        return {
          filename: 'ultah.html',
          content: generateCustomEventHtml(
            applyCategorySwitchToProject(baseProject, 'ultah')
          ),
          mime: 'text/html;charset=utf-8',
        };
      case 'malige-vip':
        return {
          filename: 'undangan-malige-vip.html',
          content: generateMaligeWeddingHtml(
            { ...updatedConfig, showCouplePhotos: false },
            targetGuest
          ),
          mime: 'text/html;charset=utf-8',
        };
      case 'manifest-json':
        return {
          filename: 'manifest.json',
          content: JSON.stringify(MANIFEST_JSON_CONFIG, null, 2),
          mime: 'application/json;charset=utf-8',
        };
      case 'undangan-vip':
      default:
        return {
          filename: 'undangan.html',
          content: generateStandaloneHtml(
            { ...updatedConfig, showCouplePhotos: false },
            targetGuest
          ),
          mime: 'text/html;charset=utf-8',
        };
    }
  };

  const activeFile = getFileContentAndName(activeFileTab);

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeFile.content).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCode = () => {
    triggerDownload(activeFile.filename, activeFile.content, activeFile.mime);
  };

  const handleDownloadAllSyncFiles = () => {
    const tabsToDownload: SyncFileTabId[] = [
      'undangan-tanpa-foto',
      'undangan-vip',
      'index-visitor',
      'editor-studio',
      'aqiqah',
      'khitan',
      'wisuda',
      'ultah',
      'manifest-json',
    ];
    tabsToDownload.forEach((tabId, idx) => {
      setTimeout(() => {
        const f = getFileContentAndName(tabId);
        triggerDownload(f.filename, f.content, f.mime);
      }, idx * 220);
    });
    setDownloadedAll(true);
    setTimeout(() => setDownloadedAll(false), 3500);
  };

  const handleApplyChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(updatedConfig, guestInput || 'Tamu Undangan Terhormat');
  };

  const handleLoadMmdafPreset = () => {
    setGroomNick(MMDAF_WEDDING_CONFIG.groomNickname);
    setBrideNick(MMDAF_WEDDING_CONFIG.brideNickname);
    setGuestInput(MMDAF_WEDDING_CONFIG.defaultGuestName);
    onUpdateConfig(MMDAF_WEDDING_CONFIG, MMDAF_WEDDING_CONFIG.defaultGuestName);
  };

  const handleLoadDefaultPreset = () => {
    setGroomNick(JUSTIN_SISCA_CONFIG.groomNickname);
    setBrideNick(JUSTIN_SISCA_CONFIG.brideNickname);
    setGuestInput(JUSTIN_SISCA_CONFIG.defaultGuestName);
    onUpdateConfig(
      JUSTIN_SISCA_CONFIG,
      JUSTIN_SISCA_CONFIG.defaultGuestName
    );
  };

  const fileTabs: { id: SyncFileTabId; label: string }[] = [
    { id: 'undangan-tanpa-foto', label: '⭐ Script HTML Copyan (Tanpa Foto)' },
    { id: 'undangan-vip', label: '1. undangan.html (VIP Hitam Emas)' },
    { id: 'index-visitor', label: '2. index.html (Portal mmdaf.my.id)' },
    { id: 'editor-studio', label: '3. editor.html (Aplikasi Editor 7x7)' },
    { id: 'aqiqah', label: '4. aqiqah.html' },
    { id: 'khitan', label: '5. khitan.html' },
    { id: 'wisuda', label: '6. wisuda.html' },
    { id: 'ultah', label: '7. ultah.html' },
    { id: 'manifest-json', label: '8. manifest.json (Install Aplikasi)' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pusat Sinkronisasi Website mmdaf.my.id & Script HTML"
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-4"
    >
      <div className="bg-[#0c0a09] border border-[#d4af37]/50 text-stone-100 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-golos">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#d4af37]/30 bg-[#14100b]">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h2 className="text-[15px] font-semibold text-[#f5e3b3]">
                Pusat Sinkronisasi Website mmdaf.my.id &amp; Instalasi Aplikasi (PWA)
              </h2>
              <p className="text-[11.5px] text-stone-400">
                Unduh 8 File Project Siap Upload (`index.html`, `editor.html`, `undangan.html`, `aqiqah.html`, `khitan.html`, `wisuda.html`, `ultah.html`, `manifest.json`)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Modal Script HTML"
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guide Cards: Sinkronisasi Hosting & Install Aplikasi */}
        <div className="px-5 py-3 bg-[#110d09] border-b border-[#d4af37]/25 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#18130d] border border-[#d4af37]/30 flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-[11.5px] leading-relaxed">
              <strong className="text-[#f5e3b3] block">
                Cara 1: Sinkronisasi ke Website mmdaf.my.id
              </strong>
              <span className="text-stone-300">
                Klik tombol <strong>Unduh Semua 8 File Website</strong> di bawah, lalu upload/timpa ke folder utama hosting atau GitHub Pages <code>mmdaf.my.id</code> Anda.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#18130d] border border-[#d4af37]/30 flex items-start gap-2.5">
            <Smartphone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-[11.5px] leading-relaxed">
              <strong className="text-[#f5e3b3] block">
                Cara 2: Dapatkan Aplikasinya di HP (Android / iOS)
              </strong>
              <span className="text-stone-300">
                Buka <code>mmdaf.my.id</code> di Chrome HP → ketuk menu titik tiga <strong>⋮</strong> → pilih <strong>&ldquo;Tambahkan ke Layar Utama / Install Aplikasi&rdquo;</strong> (otomatis aktif berkat <code>manifest.json</code>).
              </span>
            </div>
          </div>
        </div>

        {/* File Selector Bar */}
        <div className="px-5 py-2.5 bg-[#100d09] border-b border-[#d4af37]/25 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {fileTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveFileTab(t.id)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition whitespace-nowrap ${
                  activeFileTab === t.id
                    ? 'bg-[#d4af37] text-[#0c0a09] font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleDownloadAllSyncFiles}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-bold bg-emerald-500 hover:bg-emerald-400 text-[#041f14] cursor-pointer whitespace-nowrap"
            >
              <FolderDown className="w-3.5 h-3.5" />
              <span>
                {downloadedAll
                  ? 'Mengunduh 8 File Project...'
                  : 'Unduh Semua 8 File Website'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleLoadMmdafPreset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              <span>Data MMDAF</span>
            </button>
            <button
              type="button"
              onClick={handleLoadDefaultPreset}
              className="px-2 py-1 rounded text-[11px] bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer whitespace-nowrap"
            >
              Preset Contoh
            </button>
          </div>
        </div>

        {/* Quick Customizer Bar */}
        <form
          onSubmit={handleApplyChanges}
          className="px-5 py-2.5 bg-[#14100b] border-b border-[#d4af37]/25 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div>
            <label
              htmlFor="custom-groom"
              className="block text-[11px] text-stone-400 mb-1"
            >
              Panggilan Pria
            </label>
            <input
              id="custom-groom"
              type="text"
              value={groomNick}
              onChange={(e) => setGroomNick(e.target.value)}
              className="w-full bg-[#0a0806] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-[12.5px] text-white"
            />
          </div>
          <div>
            <label
              htmlFor="custom-bride"
              className="block text-[11px] text-stone-400 mb-1"
            >
              Panggilan Wanita
            </label>
            <input
              id="custom-bride"
              type="text"
              value={brideNick}
              onChange={(e) => setBrideNick(e.target.value)}
              className="w-full bg-[#0a0806] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-[12.5px] text-white"
            />
          </div>
          <div>
            <label
              htmlFor="custom-guest"
              className="block text-[11px] text-stone-400 mb-1"
            >
              Nama Tamu (Kepada)
            </label>
            <input
              id="custom-guest"
              type="text"
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              className="w-full bg-[#0a0806] border border-[#d4af37]/40 rounded px-2.5 py-1.5 text-[12.5px] text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold text-[12px] py-1.5 px-3 rounded cursor-pointer whitespace-nowrap shrink-0 h-[32px]"
          >
            Terapkan ke Preview
          </button>
        </form>

        {/* Code Preview */}
        <div className="p-4 flex-1 overflow-y-auto flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] text-stone-400 tabular-nums">
              File Aktif: <strong className="text-[#f5e3b3]">{activeFile.filename}</strong> ({activeFile.content.length.toLocaleString('id-ID')} karakter) · Siap Upload ke mmdaf.my.id
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] font-bold text-[12px] py-1.5 px-3 rounded-md transition-all cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{activeFile.filename} Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin {activeFile.filename}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownloadCode}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 border border-[#d4af37]/40 text-[#f5e3b3] text-[12px] font-medium py-1.5 px-3 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh {activeFile.filename}</span>
              </button>
            </div>
          </div>

          <textarea
            aria-label="Kode Sumber HTML"
            readOnly
            value={activeFile.content}
            className="w-full flex-1 min-h-[180px] sm:min-h-[250px] bg-black border border-[#d4af37]/30 rounded-lg p-3 font-mono text-[11px] leading-relaxed text-[#f5e3b3] focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};
