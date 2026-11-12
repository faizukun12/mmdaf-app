import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  InvitationConfig,
  TimelineItem,
  UPLOADED_COUPLE_PHOTOS,
} from '../utils/invitationData';

interface StoryAndTimelineSectionProps {
  config: InvitationConfig;
}

const TimelineIcon: React.FC<{ type: TimelineItem['iconType'] }> = ({
  type,
}) => {
  switch (type) {
    case 'checklist':
      return (
        <svg
          className="w-8 h-8 text-[#d4af37] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      );
    case 'rings':
      return (
        <svg
          className="w-10 h-10 text-[#d4af37] shrink-0"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <circle cx="18" cy="28" r="10" />
          <circle cx="30" cy="28" r="10" />
          <path d="M24 12l-2.5 3.5h5L24 12z" fill="currentColor" />
        </svg>
      );
    case 'cheers':
      return (
        <svg
          className="w-9 h-9 text-[#d4af37] shrink-0"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="M184.692-180v-30.769h81.693v-234L84.615-720h395.078L297.154-444.769v234h82.462V-180H184.692Zm9.923-426.308h174.308l54.231-82.923h-282l53.461 82.923ZM613.552-180q-42.398 0-70.283-27.794-27.884-27.794-27.884-70.192 0-41.629 27.82-69.514 27.821-27.885 70.257-27.885 16.836 0 33.264 6.077 16.428 6.077 33.274 18.769V-720h155.385v61.308H710.769v380.615q0 42.436-27.794 70.257Q655.181-180 613.552-180Z" />
        </svg>
      );
    case 'party':
      return (
        <svg
          className="w-9 h-9 text-[#d4af37] shrink-0"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <ellipse
            cx="33.16"
            cy="22.61"
            rx="8.88"
            ry="17.08"
            transform="translate(-5.94 13.55) rotate(-21.25)"
          />
          <path d="M37.02 38.83L10.1 37.38c-3.09 0-5.6-2.51-5.6-5.6 0-1.54.77-3.09 1.74-4.15L25.44 7.66" />
        </svg>
      );
  }
};

export const StoryAndTimelineSection: React.FC<
  StoryAndTimelineSectionProps
> = ({ config }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    caption: string;
  } | null>(null);

  const fallbackStoryPhotos = [
    UPLOADED_COUPLE_PHOTOS.goldSilk,
    UPLOADED_COUPLE_PHOTOS.ringShowcase,
    UPLOADED_COUPLE_PHOTOS.royalArch,
  ];

  const galleryPhotos = config.galleryPhotos || [
    {
      id: 'gal-1',
      url: UPLOADED_COUPLE_PHOTOS.royalArch,
      title: 'Singgasana Emas & Janji Suci',
      caption: 'Raminianti & Aliadin dalam balutan adat dan kemewahan Hitam Emas',
    },
    {
      id: 'gal-2',
      url: UPLOADED_COUPLE_PHOTOS.goldSilk,
      title: 'Tatapan Kasih & Ketulusan',
      caption: 'Dua hati yang saling menjaga menuju hari bahagia 23 November 2026',
    },
    {
      id: 'gal-3',
      url: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
      title: 'Harmoni Cinta & Restu Keluarga',
      caption: 'Doa restu keluarga besar mengiringi langkah menuju pelaminan',
    },
    {
      id: 'gal-4',
      url: UPLOADED_COUPLE_PHOTOS.ringShowcase,
      title: 'Ikatan Cincin Pernikahan',
      caption: 'Simbol ikatan suci yang abadi dalam suka maupun duka',
    },
  ];

  return (
    <section
      id="section-story"
      className="section-vip-black-gold text-center py-14 px-5 relative"
    >
      <div className="w-[94%] mx-auto">
        {/* SEBUAH KISAH / OUR STORY DENGAN DASBOR FOTO HITAM EMAS PAS BINGKAI */}
        <h3 className="font-averia text-[22px] font-bold text-[#d4af37] tracking-wide">
          Sebuah Kisah
        </h3>
        <h2 className="font-signature text-[44px] text-[#f5e3b3] -mt-1 mb-6">
          Our Story
        </h2>

        <div className="space-y-6">
          {config.stories.map((st, idx) => {
            const photoSrc =
              st.photoUrl || fallbackStoryPhotos[idx % fallbackStoryPhotos.length];
            const cleanTitle = st.title.replace(/^\d+\.\s*/, '');
            const showPhotos = config.showCouplePhotos ?? false;
            return (
              <div
                key={st.id}
                data-testid={`story-dashboard-${idx + 1}`}
                className="dashboard-black-gold rounded-3xl py-6 px-5 text-stone-100"
              >
                {showPhotos && (
                  <div className="photo-frame-black-gold w-[224px] h-[298px] mx-auto mb-4 rounded-2xl">
                    <img
                      src={photoSrc}
                      alt={cleanTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <h4 className="font-averia text-[19px] font-bold text-[#f5e3b3] mb-2">
                  {cleanTitle}
                </h4>
                <p className="font-playfair text-[13px] leading-[1.7] text-stone-200">
                  {st.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* DASBOR GALERI FOTO HITAM EMAS (HANYA DITAMPILKAN JIKA FOTO DIAKTIFKAN) */}
        {(config.showCouplePhotos ?? false) && (
          <div
            data-testid="black-gold-photo-gallery"
            className="dashboard-black-gold rounded-3xl p-5 mt-10 text-stone-100"
          >
            <p className="font-averia text-[10.5px] uppercase tracking-[0.26em] text-[#d4af37] mb-1">
              Galeri Potret Kebahagiaan
            </p>
            <h3 className="font-signature text-[38px] text-[#f5e3b3] leading-tight mb-4">
              Momen Indah Kami
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              {galleryPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className="group text-left bg-[#0a0806]/95 border border-[#d4af37]/45 rounded-2xl p-2 hover:border-[#f5e3b3] transition-all cursor-pointer"
                >
                  <div className="photo-frame-black-gold w-full aspect-[3/4] mb-2.5 rounded-xl">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-averia text-[11.5px] font-bold text-[#f5e3b3] px-1 leading-snug">
                    {photo.title}
                  </p>
                  <p className="font-playfair text-[10px] text-stone-300 px-1 leading-relaxed mt-1">
                    {photo.caption}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SUSUNAN ACARA TIMELINE (SENTUHAN HITAM & EMAS VIP) */}
        <div className="mt-14 pt-2">
          <p className="font-averia text-[10.5px] uppercase tracking-[0.28em] text-[#d4af37] mb-1">
            Rangkaian Hari Bahagia
          </p>
          <h2 className="font-signature text-[46px] text-[#f5e3b3] mb-8">
            Susunan Acara
          </h2>

          <div className="relative py-4">
            {/* Top Gold Node */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)] mx-auto mb-1" />
            {/* Center Vertical Gold Line */}
            <div className="absolute top-5 bottom-5 left-1/2 -translate-x-1/2 w-[2px] bg-[#d4af37]/55" />

            <div className="space-y-10 relative">
              {config.timeline.map((item) => {
                if (item.textSide === 'left') {
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 gap-6 items-center"
                    >
                      <div className="text-right pr-2">
                        <p className="font-playfair font-bold text-[15px] text-[#f5e3b3] leading-snug">
                          {item.title}
                        </p>
                        <hr className="border-0 border-t border-dashed border-[#d4af37]/50 my-2 ml-4" />
                        <p className="font-playfair text-[12px] leading-[1.4] text-stone-300">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-left pl-2 flex items-center gap-2.5">
                        <span className="font-playfair font-semibold text-[16px] text-[#f5e3b3]">
                          {item.timeText}
                        </span>
                        <TimelineIcon type={item.iconType} />
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-2 gap-6 items-center"
                  >
                    <div className="text-right pr-2 flex items-center justify-end gap-2.5">
                      <span className="font-playfair font-semibold text-[15px] text-[#f5e3b3] leading-tight">
                        {item.timeText}
                      </span>
                      <TimelineIcon type={item.iconType} />
                    </div>
                    <div className="text-left pl-2">
                      <p className="font-playfair font-bold text-[15px] text-[#f5e3b3] leading-snug">
                        {item.title}
                      </p>
                      <hr className="border-0 border-t border-dashed border-[#d4af37]/50 my-2 mr-4" />
                      <p className="font-playfair text-[12px] leading-[1.4] text-stone-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Gold Node */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)] mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Photo View */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="dashboard-black-gold rounded-3xl max-w-sm w-full p-4 relative text-center text-white"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Tutup Foto"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/80 border border-[#d4af37]/60 flex items-center justify-center text-[#f5e3b3] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="photo-frame-black-gold w-full aspect-[3/4] mx-auto mb-3 rounded-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h4 className="font-averia text-[17px] font-bold text-[#f5e3b3]">
              {selectedPhoto.title}
            </h4>
            <p className="font-playfair text-[12px] text-stone-300 mt-1">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
