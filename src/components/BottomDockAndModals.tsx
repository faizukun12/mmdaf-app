import React, { useState } from 'react';
import {
  Home,
  Users,
  BookOpen,
  MapPin,
  QrCode,
  ArrowDown,
  Music,
  VolumeX,
  X,
  ShoppingBag,
  Check,
} from 'lucide-react';
import {
  InvitationConfig,
  PHYSICAL_GIFT_CATALOG,
} from '../utils/invitationData';

interface BottomDockAndModalsProps {
  config: InvitationConfig;
  guestName: string;
  isAutoScrolling: boolean;
  onToggleAutoScroll: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isPhysicalGiftOpen: boolean;
  onClosePhysicalGift: () => void;
}

export const BottomDockAndModals: React.FC<BottomDockAndModalsProps> = ({
  config,
  guestName,
  isAutoScrolling,
  onToggleAutoScroll,
  isPlayingMusic,
  onToggleMusic,
  isPhysicalGiftOpen,
  onClosePhysicalGift,
}) => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [selectedGiftIds, setSelectedGiftIds] = useState<number[]>([]);
  const [giftConfirmed, setGiftConfirmed] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleGiftItem = (id: number) => {
    setGiftConfirmed(false);
    setSelectedGiftIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalGiftPrice = PHYSICAL_GIFT_CATALOG.filter((g) =>
    selectedGiftIds.includes(g.id)
  ).reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* FIXED BOTTOM NAVIGATION BAR (.fix-menu) - SENTUHAN HITAM & EMAS VIP */}
      <div className="fixed bottom-3 left-0 right-0 z-40 flex justify-center pointer-events-none px-3">
        <div className="relative w-full max-w-[395px] pointer-events-auto">
          {/* Music Track Callout: Payung Teduh - Akad */}
          {isPlayingMusic && (
            <div
              data-testid="music-now-playing"
              className="absolute -top-8 left-3 bg-[#120f0b]/95 border border-[#d4af37]/55 text-[#f5e3b3] font-playfair text-[10.5px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <Music className="w-3 h-3 text-[#d4af37] animate-spin" />
              <span>
                {config.musicArtist || 'Payung Teduh'} —{' '}
                {config.musicTitle || 'Akad'}
              </span>
            </div>
          )}

          {/* Auto Scroll Status Callout */}
          {isAutoScrolling && (
            <div className="absolute -top-8 right-3 bg-[#d4af37] text-[#0c0a08] font-bold font-playfair text-[10.5px] px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
              Auto Scroll Active
            </div>
          )}

          <nav
            aria-label="Navigasi Undangan"
            className="bg-[#120f0b]/95 backdrop-blur-md rounded-full px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center justify-between border border-[#d4af37]/55"
          >
            <button
              type="button"
              onClick={() => scrollToSection('section-home')}
              aria-label="Beranda Undangan"
              className="w-9 h-8 flex items-center justify-center text-[#f5e3b3] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-couple')}
              aria-label="Profil Mempelai"
              className="w-9 h-8 flex items-center justify-center text-[#f5e3b3] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <Users className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-story')}
              aria-label="Kisah dan Susunan Acara"
              className="w-9 h-8 flex items-center justify-center text-[#f5e3b3] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-event')}
              aria-label="Jadwal dan Lokasi Acara"
              className="w-9 h-8 flex items-center justify-center text-[#f5e3b3] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsQrOpen(true)}
              aria-label="QR Code Tamu"
              className="w-9 h-8 flex items-center justify-center text-[#f5e3b3] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <QrCode className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onToggleAutoScroll}
              aria-label="Toggle Auto Scroll"
              className={`w-9 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isAutoScrolling
                  ? 'bg-[#f5e3b3] text-[#0c0a08]'
                  : 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08] hover:brightness-110'
              }`}
            >
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onToggleMusic}
              aria-label={
                isPlayingMusic
                  ? 'Matikan Musik Payung Teduh Akad'
                  : 'Putar Musik Payung Teduh Akad'
              }
              title={`${config.musicArtist || 'Payung Teduh'} - ${
                config.musicTitle || 'Akad'
              }`}
              className="w-9 h-8 rounded-full bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] flex items-center justify-center transition-all cursor-pointer"
            >
              {isPlayingMusic ? (
                <Music className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* QR CODE TAMU MODAL (HITAM EMAS VIP) */}
      {isQrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="QR Code Kehadiran Tamu"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div className="dashboard-black-gold rounded-2xl max-w-[350px] w-full p-6 text-center shadow-2xl relative text-white">
            <button
              type="button"
              onClick={() => setIsQrOpen(false)}
              aria-label="Tutup QR Modal"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-[#d4af37]/50 flex items-center justify-center text-[#f5e3b3] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="font-averia text-[11px] uppercase tracking-widest text-[#d4af37] mb-1">
              Kartu Akses Tamu VIP
            </p>
            <h3 className="font-signature text-[36px] text-[#f5e3b3]">
              {config.coupleTitleOrder === 'bride-first'
                ? `${config.brideNickname} & ${config.groomNickname}`
                : `${config.groomNickname} & ${config.brideNickname}`}
            </h3>
            <div className="my-4 p-4 bg-[#f5e3b3] border-2 border-[#d4af37] rounded-xl inline-block">
              <QrCode className="w-36 h-36 text-[#0c0a08] mx-auto" />
            </div>
            <p className="font-playfair text-[12px] text-stone-300">
              Tamu Undangan:
            </p>
            <p className="font-playfair font-bold text-[16px] text-[#f5e3b3] mt-0.5">
              {guestName}
            </p>
            <p className="font-playfair text-[11px] text-stone-400 mt-3">
              Tunjukkan QR Code ini pada meja buku tamu saat menghadiri acara.
            </p>
          </div>
        </div>
      )}

      {/* PILIH KADO FISIK MODAL (HITAM EMAS VIP) */}
      {isPhysicalGiftOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pilih Kado Fisik"
          className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div className="dashboard-black-gold rounded-t-2xl sm:rounded-2xl max-w-[420px] w-full max-h-[82vh] flex flex-col shadow-2xl overflow-hidden text-white">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#d4af37]/30">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                <h3 className="font-golos font-semibold text-[14px] text-[#f5e3b3]">
                  Titip Kado Fisik ke Acara
                </h3>
              </div>
              <button
                type="button"
                onClick={onClosePhysicalGift}
                aria-label="Tutup Kado Fisik"
                className="w-7 h-7 rounded-full bg-black/60 border border-[#d4af37]/40 flex items-center justify-center text-[#f5e3b3] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              <p className="font-golos text-[12px] text-stone-300 mb-2">
                Pilih rekomendasi kado fisik yang dibutuhkan oleh{' '}
                {config.brideNickname} &amp; {config.groomNickname}:
              </p>
              {PHYSICAL_GIFT_CATALOG.map((item) => {
                const isSelected = selectedGiftIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? 'border-[#f5e3b3] bg-[#d4af37]/15'
                        : 'border-[#d4af37]/30 bg-[#0a0806]/90'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-golos font-semibold text-[13px] text-[#f5e3b3]">
                        {item.name}
                      </p>
                      <p className="font-golos text-[11px] text-stone-400">
                        {item.category} ·{' '}
                        <span className="font-semibold text-[#d4af37] tabular-nums">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleGiftItem(item.id)}
                      className={`px-3 py-1.5 rounded-full text-[11.5px] font-golos font-bold cursor-pointer whitespace-nowrap shrink-0 transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] text-[#0c0a08]'
                      }`}
                    >
                      {isSelected ? 'Hapus' : 'Pilih Kado'}
                    </button>
                  </div>
                );
              })}

              {giftConfirmed && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-golos text-[12px] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>
                    Pilihan kado fisik berhasil dicatat atas nama {guestName}.
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#d4af37]/30 bg-[#0a0806] flex items-center justify-between">
              <div>
                <p className="font-golos text-[11px] text-stone-400">
                  Total Kado ({selectedGiftIds.length} item)
                </p>
                <p className="font-golos font-bold text-[15px] text-[#f5e3b3] tabular-nums">
                  Rp {totalGiftPrice.toLocaleString('id-ID')}
                </p>
              </div>
              <button
                type="button"
                disabled={selectedGiftIds.length === 0}
                onClick={() => setGiftConfirmed(true)}
                className="bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] disabled:opacity-40 hover:brightness-110 text-[#0c0a08] font-bold font-golos text-[12.5px] py-2 px-5 rounded-full cursor-pointer whitespace-nowrap shrink-0"
              >
                Konfirmasi Kado
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
