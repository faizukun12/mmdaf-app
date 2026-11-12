import React from 'react';
import { Mail } from 'lucide-react';
import { InvitationConfig } from '../utils/invitationData';

interface CoverOverlayProps {
  config: InvitationConfig;
  guestName: string;
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const CoverOverlay: React.FC<CoverOverlayProps> = ({
  config,
  guestName,
  isOpen,
  onOpenInvitation,
}) => {
  if (isOpen) return null;

  const coupleTitle =
    config.coupleTitleOrder === 'bride-first'
      ? `${config.brideNickname} & ${config.groomNickname}`
      : `${config.groomNickname} & ${config.brideNickname}`;

  const coverPhoto =
    config.coverFloatingPhotoUrl ||
    '/assets/aistudio/IMG_20261112_005818_4df1bf53.jpg';

  const showPhotos = config.showCouplePhotos ?? false;

  return (
    <div
      data-testid="cover-overlay"
      className="fixed inset-0 z-50 flex justify-center bg-[#0c0a09]"
    >
      <div className="relative w-full max-w-[430px] h-full overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-2.5 sm:gap-3 text-center text-white select-none shadow-2xl border-x border-[#d4af37]/25 py-5 px-4">
        {/* Background Image (Architectural Rumah Adat Malige Buton - Tetap Terlihat Jelas) */}
        <img
          src={config.heroImageUrl}
          alt="Latar Undangan Rumah Adat Malige Buton"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover animate-gentle-zoom"
        />
        {/* Measured contrast scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12, 10, 8, 0.68) 0%, rgba(12, 10, 8, 0.34) 46%, rgba(10, 8, 6, 0.90) 100%)',
          }}
        />

        {/* Top Title Block */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {config.editionBadge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mb-1.5 rounded-full bg-black/55 border border-[#d4af37]/55 text-[9.5px] text-[#f5e3b3] font-playfair tracking-widest uppercase">
              <span>{config.editionBadge}</span>
            </div>
          )}
          <p className="font-playfair text-[12px] tracking-[0.14em] uppercase text-[#f5e3b3]/95 mb-0.5">
            The Wedding Celebration Of
          </p>
          <h1
            className="font-signature text-[38px] sm:text-[42px] leading-tight text-white drop-shadow-md"
            style={{ WebkitTextStroke: '0.2px rgba(255,255,255,0.8)' }}
          >
            {coupleTitle}
          </h1>
          {config.eventSummaryLine && (
            <p className="font-playfair text-[11px] text-[#f5e3b3]/95 mt-0.5 tracking-wide">
              {config.eventSummaryLine}
            </p>
          )}
        </div>

        {/* Floating Photo Dashboard (Jika Foto Diaktifkan) atau Monogram Mewah Hitam Emas */}
        {showPhotos ? (
          <div
            data-testid="cover-floating-photo-dashboard"
            className="relative z-10 my-1 flex flex-col items-center animate-float-slow"
          >
            <div className="floating-photo-dashboard w-[190px] h-[250px] sm:w-[205px] sm:h-[268px]">
              <div className="feathered-photo-box w-full h-full">
                <img
                  src={coverPhoto}
                  alt={`Potret Utama ${coupleTitle}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            data-testid="cover-monogram"
            className="relative z-10 my-1 flex flex-col items-center"
          >
            <div className="w-[110px] h-[110px] rounded-full bg-black/70 border-2 border-[#d4af37] flex flex-col items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.3)] backdrop-blur-sm">
              <span className="font-signature text-[48px] text-[#f5e3b3] leading-none select-none">
                {config.brideNickname.charAt(0)} &amp; {config.groomNickname.charAt(0)}
              </span>
              <span className="text-[8.5px] uppercase tracking-widest text-[#d4af37] font-playfair font-semibold mt-0.5">
                Walimatul &apos;Ursy
              </span>
            </div>
          </div>
        )}

        {/* Bottom Guest & Action Block (Dekat dan Terlihat Jelas) */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="dashboard-black-gold rounded-2xl px-4 py-2.5 mb-2.5 max-w-[335px] w-full">
            <p className="font-playfair text-[11px] text-[#e6c687] mb-0.5">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2
              data-testid="cover-guest-name"
              className="font-signature text-[28px] sm:text-[31px] text-[#f5e3b3] leading-tight my-0.5 drop-shadow"
            >
              {guestName}
            </h2>
            <p className="font-playfair text-[9.5px] leading-relaxed text-stone-200/90 max-w-[290px] mx-auto">
              Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i untuk Hadir di Acara Kami.
            </p>
            <p className="font-playfair text-[8.5px] italic text-[#d4af37]/85 mt-0.5">
              Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <button
            type="button"
            data-testid="open-invitation-btn"
            onClick={onOpenInvitation}
            className="font-averia inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 active:scale-[0.99] text-[#0c0a08] font-bold text-[13px] py-2 px-7 rounded-full shadow-[0_6px_20px_rgba(212,175,55,0.35)] border border-[#f5e3b3]/60 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
