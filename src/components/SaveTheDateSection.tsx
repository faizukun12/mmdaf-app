import React from 'react';
import { MapPin } from 'lucide-react';
import { InvitationConfig } from '../utils/invitationData';

interface SaveTheDateSectionProps {
  config: InvitationConfig;
}

export const SaveTheDateSection: React.FC<SaveTheDateSectionProps> = ({
  config,
}) => {
  return (
    <section
      id="section-event"
      className="section-vip-obsidian text-center py-12 px-5 relative"
    >
      <div className="w-[94%] mx-auto">
        <p className="font-averia text-[10.5px] uppercase tracking-[0.28em] text-[#d4af37] mb-1">
          Waktu &amp; Tempat Acara
        </p>
        <h2
          className="font-signature text-[46px] text-[#f5e3b3] mb-5"
          style={{ filter: 'drop-shadow(0 0 0.65rem rgba(212, 175, 55, 0.35))' }}
        >
          Save The Date
        </h2>

        {/* Surah Ar-Rum Ayat 21 dalam Kartu Hitam Emas */}
        <div className="dashboard-black-gold rounded-2xl p-5 font-playfair text-[12.5px] leading-[1.75] text-stone-200 space-y-3 mb-8">
          <p className="text-[14px] leading-[1.95] text-[#f5e3b3]">
            {config.quranArabic}
          </p>
          <p className="italic text-stone-300">{config.quranTranslation}</p>
          <p className="font-bold text-[#d4af37] tracking-wider pt-1">
            {config.quranSource}
          </p>
        </div>

        {/* ARCHED EVENT CARDS IN VIP BLACK & GOLD */}
        <div className="space-y-0">
          {config.events.map((ev, index) => {
            const radiusClass =
              ev.archType === 'top'
                ? 'rounded-t-[160px] rounded-b-[14px] pt-14 pb-10'
                : ev.archType === 'bottom'
                ? 'rounded-b-[160px] rounded-t-[14px] pt-10 pb-14'
                : 'rounded-[14px] pt-10 pb-10';

            return (
              <React.Fragment key={ev.id}>
                <div
                  className={`dashboard-black-gold px-5 ${radiusClass}`}
                >
                  <h3 className="font-signature text-[36px] text-[#f5e3b3] mb-2">
                    {ev.title}
                  </h3>

                  <div className="py-2 px-3">
                    <p className="font-averia text-[20px] text-[#d4af37] mb-2">
                      {ev.month}
                    </p>
                    <div className="grid grid-cols-3 items-center max-w-[270px] mx-auto text-[#f5e3b3]">
                      <div className="text-right pr-3">
                        <span className="font-averia font-bold text-[17px]">
                          {ev.dayName}
                        </span>
                      </div>
                      <div className="text-center border-x border-[#d4af37]/70 px-2">
                        <span className="font-averia font-black text-[44px] leading-none text-[#f5e3b3] tabular-nums">
                          {ev.dateNumber}
                        </span>
                      </div>
                      <div className="text-left pl-3">
                        <span className="font-averia font-bold text-[17px] tabular-nums">
                          {ev.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="font-averia text-[16px] text-[#f5e3b3] mt-3">
                    {ev.timeText}
                  </p>
                  <p className="font-averia text-[13.5px] text-stone-300 mt-1.5 px-2">
                    {ev.venueText}
                  </p>

                  <a
                    href={ev.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 mt-5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold font-averia text-[13px] py-2 px-5 rounded-full shadow-[0_4px_14px_rgba(212,175,55,0.3)] transition-all whitespace-nowrap shrink-0"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Maps Lokasi Acara</span>
                  </a>
                </div>

                {/* Royal Gold Divider Bar between cards */}
                {index < config.events.length - 1 && (
                  <div className="bg-gradient-to-r from-[#9a722c] via-[#d4af37] to-[#9a722c] py-1.5 px-3 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] my-4">
                    <p
                      className="font-signature text-[24px] text-[#0c0a08] font-bold leading-tight"
                      style={{ WebkitTextStroke: '0.1px #0c0a08' }}
                    >
                      {config.coupleTitleOrder === 'bride-first'
                        ? `${config.brideNickname} & ${config.groomNickname}`
                        : `${config.groomNickname} & ${config.brideNickname}`}
                    </p>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Closing Invitation Text */}
        <p className="font-playfair text-[12.5px] leading-[1.7] text-stone-300 mt-8 mb-6 px-2">
          {config.closingGreeting}
        </p>

        {/* Embedded Google Maps in Black & Gold Frame */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-[#d4af37]/50 bg-[#0c0a08] p-1.5">
          <iframe
            title="Lokasi Acara Pernikahan"
            src={config.mapsEmbedUrl}
            className="w-full h-[280px] border-0 rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
