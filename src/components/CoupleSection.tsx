import React from 'react';
import { InvitationConfig } from '../utils/invitationData';

interface CoupleSectionProps {
  config: InvitationConfig;
  countdown: { days: number; hours: number; minutes: number; seconds: number };
}

const TikTokIcon: React.FC<{ className?: string }> = ({
  className = 'w-3.5 h-3.5',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
  </svg>
);

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  config,
  countdown,
}) => {
  const isBrideFirst = config.coupleTitleOrder === 'bride-first';
  const coupleTitle = isBrideFirst
    ? `${config.brideNickname} & ${config.groomNickname}`
    : `${config.groomNickname} & ${config.brideNickname}`;

  const heroFloatingPhoto =
    config.heroFloatingPhotoUrl ||
    '/assets/aistudio/IMG_20261112_005944_22161e8b.jpg';
  const bridePhoto =
    config.bridePhotoUrl ||
    '/assets/aistudio/IMG_20261112_005944_22161e8b.jpg';
  const groomPhoto =
    config.groomPhotoUrl ||
    '/assets/aistudio/lv_0_20261112005653_91461ef9.jpg';
  const middlePhoto =
    config.middleBannerPhotoUrl ||
    '/assets/aistudio/lv_0_20261112004909_4b42dc26.jpg';

  const brideTikTok = config.brideInstagram || 'mmdaf.studio.project';
  const groomTikTok = config.groomInstagram || 'mmdaf.studio.project';

  const showPhotos = config.showCouplePhotos ?? false;

  const brideCard = (
    <div
      data-testid="bride-card"
      className="dashboard-black-gold max-w-[355px] mx-auto pt-8 pb-7 px-5 rounded-t-[175px] rounded-b-[22px] text-stone-100"
    >
      {/* Bingkai Dasbor Foto Mempelai Wanita (Hanya Tampil Jika Foto Diaktifkan) */}
      {showPhotos ? (
        <div className="photo-frame-black-gold w-[236px] h-[314px] mx-auto mb-4 rounded-t-[125px] rounded-b-[20px]">
          <img
            src={bridePhoto}
            alt={`Potret ${config.brideFullName}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="w-[110px] h-[110px] mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1c160e] via-[#0d0a07] to-[#1c160e] border-2 border-[#d4af37] flex flex-col items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.25)]">
          <span className="font-signature text-[44px] text-[#f5e3b3] leading-none select-none">
            {config.brideNickname ? config.brideNickname.charAt(0) : 'R'}
          </span>
          <span className="text-[8.5px] uppercase tracking-widest text-[#d4af37] font-playfair font-semibold">
            Mempelai Wanita
          </span>
        </div>
      )}

      <p className="font-averia text-[11px] uppercase tracking-[0.25em] text-[#d4af37] mb-1">
        The Bride · Mempelai Wanita
      </p>
      <h2 className="font-signature text-[38px] text-[#f5e3b3] leading-tight mb-0.5">
        {config.brideNickname}
      </h2>
      <h3 className="font-averia text-[18px] text-white font-bold">
        {config.brideFullName}
      </h3>
      <p className="font-averia text-[14px] text-[#d4af37]/70 tracking-widest my-1.5">
        ------------
      </p>
      <div className="font-playfair text-[12.5px] leading-[1.65] text-stone-300 space-y-0.5">
        <p className="text-[#e6c687]">Putri dari Pasangan</p>
        <p>{config.brideFather} &amp;</p>
        <p>{config.brideMother}</p>
        <p className="pt-0.5 font-medium text-stone-200">{config.brideAddress}</p>
      </div>
      <p className="font-averia text-[14px] text-[#d4af37]/70 tracking-widest my-1.5">
        ------------
      </p>
      <a
        data-testid="bride-tiktok-link"
        href={`https://www.tiktok.com/@${brideTikTok}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold text-[11px] font-averia py-1.5 px-4 rounded-full mt-1 transition-all whitespace-nowrap shrink-0 shadow"
      >
        <TikTokIcon className="w-3.5 h-3.5" />
        <span>@{brideTikTok}</span>
      </a>
    </div>
  );

  const groomCard = (
    <div
      data-testid="groom-card"
      className="dashboard-black-gold max-w-[355px] mx-auto pt-8 pb-7 px-5 rounded-t-[175px] rounded-b-[22px] text-stone-100"
    >
      {/* Bingkai Dasbor Foto Mempelai Pria (Hanya Tampil Jika Foto Diaktifkan) */}
      {showPhotos ? (
        <div className="photo-frame-black-gold w-[236px] h-[314px] mx-auto mb-4 rounded-t-[125px] rounded-b-[20px]">
          <img
            src={groomPhoto}
            alt={`Potret ${config.groomFullName}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="w-[110px] h-[110px] mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1c160e] via-[#0d0a07] to-[#1c160e] border-2 border-[#d4af37] flex flex-col items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.25)]">
          <span className="font-signature text-[44px] text-[#f5e3b3] leading-none select-none">
            {config.groomNickname ? config.groomNickname.charAt(0) : 'A'}
          </span>
          <span className="text-[8.5px] uppercase tracking-widest text-[#d4af37] font-playfair font-semibold">
            Mempelai Pria
          </span>
        </div>
      )}

      <p className="font-averia text-[11px] uppercase tracking-[0.25em] text-[#d4af37] mb-1">
        The Groom · Mempelai Pria
      </p>
      <h2 className="font-signature text-[38px] text-[#f5e3b3] leading-tight mb-0.5">
        {config.groomNickname}
      </h2>
      <h3 className="font-averia text-[18px] text-white font-bold">
        {config.groomFullName}
      </h3>
      <p className="font-averia text-[14px] text-[#d4af37]/70 tracking-widest my-1.5">
        ------------
      </p>
      <div className="font-playfair text-[12.5px] leading-[1.65] text-stone-300 space-y-0.5">
        <p className="text-[#e6c687]">Putra dari Pasangan</p>
        <p>{config.groomFather} &amp;</p>
        <p>{config.groomMother}</p>
        <p className="pt-0.5 font-medium text-stone-200">{config.groomAddress}</p>
      </div>
      <p className="font-averia text-[14px] text-[#d4af37]/70 tracking-widest my-1.5">
        ------------
      </p>
      <a
        data-testid="groom-tiktok-link"
        href={`https://www.tiktok.com/@${groomTikTok}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold text-[11px] font-averia py-1.5 px-4 rounded-full mt-1 transition-all whitespace-nowrap shrink-0 shadow"
      >
        <TikTokIcon className="w-3.5 h-3.5" />
        <span>@{groomTikTok}</span>
      </a>
    </div>
  );

  return (
    <>
      {/* BOX-1: HERO BANNER DENGAN FOTO MENGAMBANG DI DEPAN LATAR BELAKANG WEBSITE */}
      <section
        id="section-home"
        className="relative w-full min-h-[700px] py-10 overflow-hidden flex flex-col justify-between items-center text-center text-white"
      >
        {/* Latar Belakang Website (Rumah Adat Istana Malige Buton - Tidak Terganggu) */}
        <img
          src={config.heroImageUrl}
          alt="Rumah Adat Istana Malige Buton"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12, 10, 8, 0.58) 0%, rgba(12, 10, 8, 0.34) 48%, rgba(12, 10, 8, 0.94) 100%)',
          }}
        />

        {/* Top Heading */}
        <div className="relative z-10 px-4 flex flex-col items-center">
          {config.editionBadge && (
            <span className="inline-block px-3 py-0.5 mb-2 rounded-full bg-black/50 border border-[#d4af37]/55 text-[10px] text-[#f5e3b3] font-playfair tracking-widest uppercase">
              {config.editionBadge}
            </span>
          )}
          <p className="font-playfair text-[13px] tracking-[0.14em] uppercase text-[#f5e3b3]/95 mb-0.5">
            The Wedding Celebration Of
          </p>
          <h1
            className="font-signature text-[42px] leading-tight text-white"
            style={{ WebkitTextStroke: '0.2px rgba(255,255,255,0.85)' }}
          >
            {coupleTitle}
          </h1>
          {config.eventSummaryLine && (
            <p className="font-playfair text-[12px] text-[#f5e3b3]/95 mt-0.5">
              {config.eventSummaryLine}
            </p>
          )}
        </div>

        {/* Foto Mengambang di Depan Latar Belakang Website (Jika Foto Diaktifkan) atau Monogram Mewah */}
        {showPhotos ? (
          <div
            data-testid="hero-floating-photo-dashboard"
            className="relative z-10 my-4 flex flex-col items-center animate-float-slow"
          >
            <div className="floating-photo-dashboard w-[212px] h-[282px]">
              <div className="feathered-photo-box w-full h-full">
                <img
                  src={heroFloatingPhoto}
                  alt={`Potret Kebahagiaan ${coupleTitle}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            data-testid="hero-monogram-dashboard"
            className="relative z-10 my-4 flex flex-col items-center"
          >
            <div className="w-[124px] h-[124px] rounded-full bg-black/60 border-2 border-[#d4af37]/70 flex flex-col items-center justify-center shadow-[0_0_28px_rgba(212,175,55,0.3)] backdrop-blur-sm">
              <span className="font-signature text-[50px] text-[#f5e3b3] leading-none select-none">
                {config.brideNickname.charAt(0)} &amp; {config.groomNickname.charAt(0)}
              </span>
            </div>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-3" />
          </div>
        )}

        {/* Bottom Countdown Boxes (Hitam Emas) */}
        <div className="relative z-10 pb-6 px-4 w-full">
          <p className="font-playfair text-[10.5px] uppercase tracking-[0.22em] text-[#f5e3b3] mb-2.5">
            Menuju Hari Bahagia
          </p>
          <div className="flex items-center justify-center gap-2.5">
            {[
              { value: String(countdown.days).padStart(2, '0'), label: 'HARI' },
              { value: String(countdown.hours).padStart(2, '0'), label: 'JAM' },
              { value: String(countdown.minutes).padStart(2, '0'), label: 'MENIT' },
              { value: String(countdown.seconds).padStart(2, '0'), label: 'DETIK' },
            ].map((item) => (
              <div
                key={item.label}
                className="dashboard-black-gold w-[74px] h-[74px] rounded-[12px] flex flex-col items-center justify-center text-white shadow-md animate-soft-pulse"
              >
                <span className="font-playfair text-[19px] font-semibold leading-none text-[#f5e3b3] tabular-nums">
                  {item.value}
                </span>
                <span className="font-playfair text-[9.5px] tracking-[0.12em] uppercase text-stone-300 mt-1.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOX-2: OUR WEDDING & DASBOR FOTO MEMPELAI PERPADUAN SENTUHAN HITAM & EMAS VIP */}
      <section
        id="section-couple"
        className="section-vip-black-gold text-center pt-12 pb-12 relative z-10"
      >
        <div className="px-6">
          <p className="font-playfair text-[16px] font-light tracking-[0.2em] text-[#d4af37]">
            OUR
          </p>
          <p className="font-playfair text-[32px] font-semibold tracking-[0.12em] text-[#f5e3b3] -mt-1 mb-1">
            WEDDING
          </p>
          <p className="font-averia text-[11px] uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            Mempelai Yang Berbahagia
          </p>
          <p className="font-playfair text-[13px] leading-[1.75] text-stone-300 max-w-[340px] mx-auto">
            {config.openingGreeting}
          </p>
        </div>

        {/* DASBOR FOTO MEMPELAI PERTAMA (HITAM EMAS) */}
        <div className="mt-8 px-5">
          {isBrideFirst ? brideCard : groomCard}
        </div>

        {/* DASBOR TENGAH HITAM EMAS (DENGAN FOTO CINCIN ATAU MONOGRAM KEDUA MEMPELAI) */}
        <div className="dashboard-black-gold py-7 px-5 my-8 mx-5 rounded-3xl shadow-xl">
          {showPhotos ? (
            <div className="photo-frame-black-gold w-[224px] h-[298px] mx-auto mb-3.5 rounded-2xl">
              <img
                src={middlePhoto}
                alt={`Ikatan Cincin Suci ${coupleTitle}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ) : (
            <div className="w-[88px] h-[88px] mx-auto mb-3 rounded-full bg-black/60 border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] shadow">
              <span className="text-3xl select-none">💍</span>
            </div>
          )}
          <p className="font-averia text-[10.5px] uppercase tracking-[0.28em] text-[#d4af37] mb-1">
            Ikatan Janji Suci
          </p>
          <h2 className="font-signature text-[42px] text-[#f5e3b3] leading-tight">
            {coupleTitle}
          </h2>
        </div>

        {/* DASBOR FOTO MEMPELAI KEDUA (HITAM EMAS) */}
        <div className="px-5 pb-2">
          {isBrideFirst ? groomCard : brideCard}
        </div>
      </section>
    </>
  );
};
