import {
  InvitationConfig,
  UPLOADED_COUPLE_PHOTOS,
} from './invitationData';

const TIKTOK_SVG_INLINE = `<svg style="width:13px;height:13px;vertical-align:-2px;margin-right:4px;fill:currentColor;" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z"/></svg>`;

const WHATSAPP_SVG_INLINE = `<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;fill:currentColor;" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.16 7.29C8.94 7.29 8.58 7.37 8.28 7.7C7.99 8.02 7.17 8.79 7.17 10.35C7.17 11.91 8.31 13.42 8.47 13.63C8.63 13.84 10.66 16.97 13.77 18.31C14.51 18.63 15.09 18.82 15.54 18.96C16.28 19.2 16.95 19.16 17.48 19.08C18.07 19 19.3 18.33 19.56 17.59C19.82 16.85 19.82 16.22 19.74 16.08C19.66 15.94 19.44 15.86 19.12 15.7C18.8 15.54 17.22 14.76 16.93 14.65C16.64 14.54 16.43 14.49 16.22 14.81C16.01 15.13 15.4 15.86 15.21 16.08C15.02 16.3 14.83 16.33 14.51 16.17C14.19 16.01 13.16 15.67 11.94 14.58C10.98 13.72 10.33 12.67 10.14 12.35C9.95 12.03 10.12 11.85 10.28 11.69C10.42 11.55 10.6 11.32 10.76 11.13C10.92 10.94 10.97 10.81 11.08 10.6C11.19 10.39 11.13 10.2 11.05 10.04C10.97 9.88 10.35 8.35 10.1 7.73C9.84 7.14 9.58 7.22 9.39 7.21C9.21 7.2 9.01 7.29 8.81 7.29L9.16 7.29Z"/></svg>`;

export function generateStandaloneHtml(
  config: InvitationConfig,
  guestName = config.defaultGuestName
): string {
  const isBrideFirst = config.coupleTitleOrder === 'bride-first';
  const coupleNickTitle = isBrideFirst
    ? `${config.brideNickname} &amp; ${config.groomNickname}`
    : `${config.groomNickname} &amp; ${config.brideNickname}`;
  const couplePlainTitle = isBrideFirst
    ? `${config.brideFullName} & ${config.groomFullName}`
    : `${config.groomNickname} & ${config.brideNickname}`;
  const editionBadge =
    config.editionBadge || '👑 Royal Malige Buton Edition • VIP';
  const eventSummaryLine =
    config.eventSummaryLine || 'Senin, 23 November 2026 • Lahumoko';
  const footerBrandTitle =
    config.footerBrandTitle || 'MMDAF Royal Malige Edition • Kota Baubau';
  const footerBrandSubtitle =
    config.footerBrandSubtitle ||
    'Karya : G-Faizu_3.8 • Ingin buat undangan seperti ini? Hubungi Kami';
  const musicArtist = config.musicArtist || 'Payung Teduh';
  const musicTitle = config.musicTitle || 'Akad';
  const musicTrackLabel = `${musicArtist} — ${musicTitle}`;
  const musicUrl =
    config.musicUrl ||
    'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3';
  const musicFallbackUrl =
    config.musicFallbackUrl || '/assets/aistudio/payung-teduh-akad.mp3';

  const coverPhoto =
    config.coverFloatingPhotoUrl || UPLOADED_COUPLE_PHOTOS.royalArch;
  const heroPhoto =
    config.heroFloatingPhotoUrl || UPLOADED_COUPLE_PHOTOS.goldSilk;
  const middlePhoto =
    config.middleBannerPhotoUrl || UPLOADED_COUPLE_PHOTOS.ringShowcase;
  const closingPhoto =
    config.closingFloatingPhotoUrl || UPLOADED_COUPLE_PHOTOS.baroqueFrame;
  const bridePhoto = config.bridePhotoUrl || UPLOADED_COUPLE_PHOTOS.goldSilk;
  const groomPhoto =
    config.groomPhotoUrl || UPLOADED_COUPLE_PHOTOS.baroqueFrame;
  const brideTikTok = config.brideInstagram || 'mmdaf.studio.project';
  const groomTikTok = config.groomInstagram || 'mmdaf.studio.project';

  const galleryPhotos =
    config.galleryPhotos && config.galleryPhotos.length > 0
      ? config.galleryPhotos
      : [
          {
            url: UPLOADED_COUPLE_PHOTOS.royalArch,
            title: 'Singgasana Emas & Janji Suci',
            caption: 'Raminianti & Aliadin dalam balutan adat dan kemewahan Hitam Emas',
          },
          {
            url: UPLOADED_COUPLE_PHOTOS.goldSilk,
            title: 'Tatapan Kasih & Ketulusan',
            caption: 'Dua hati yang saling menjaga menuju hari bahagia 23 November 2026',
          },
          {
            url: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
            title: 'Harmoni Cinta & Restu Keluarga',
            caption: 'Doa restu keluarga besar mengiringi langkah menuju pelaminan',
          },
          {
            url: UPLOADED_COUPLE_PHOTOS.ringShowcase,
            title: 'Ikatan Cincin Pernikahan',
            caption: 'Simbol ikatan suci yang abadi dalam suka maupun duka',
          },
        ];

  const eventsHtml = config.events
    .map((ev, index) => {
      const borderRadius =
        ev.archType === 'top'
          ? '160px 160px 14px 14px'
          : ev.archType === 'bottom'
          ? '14px 14px 160px 160px'
          : '14px';
      const dividerHtml =
        index < config.events.length - 1
          ? `
        <div class="couple-bar">
          <h1 class="font-signature couple-bar-text">${coupleNickTitle}</h1>
        </div>`
          : '';
      return `
        <div class="event-card dashboard-black-gold" style="border-radius: ${borderRadius};">
          <h1 class="font-signature event-title">${ev.title}</h1>
          <div class="event-date-wrap">
            <h3 class="font-averia event-month">${ev.month}</h3>
            <div class="event-date-grid">
              <div class="event-day">${ev.dayName}</div>
              <div class="event-num">${ev.dateNumber}</div>
              <div class="event-year">${ev.year}</div>
            </div>
          </div>
          <h3 class="font-averia event-time">${ev.timeText}</h3>
          <h3 class="font-averia event-venue">${ev.venueText}</h3>
          <a class="btn-maps" href="${ev.mapsUrl}" target="_blank" rel="noopener noreferrer">📍 Maps Lokasi Acara</a>
        </div>${dividerHtml}`;
    })
    .join('\n');

  const showPhotos = config.showCouplePhotos ?? false;

  const storiesHtml = config.stories
    .map(
      (st) => {
        const cleanTitle = st.title.replace(/^\d+\.\s*/, '');
        return `
        <div class="story-card dashboard-black-gold">
          ${
            showPhotos && st.photoUrl
              ? `
          <div class="story-photo-frame">
            <div class="photo-frame-black-gold" style="width: 224px; height: 298px; margin: 0 auto;">
              <img src="${st.photoUrl}" alt="${cleanTitle}" />
            </div>
          </div>`
              : ''
          }
          <h3 class="font-averia story-card-title">${cleanTitle}</h3>
          <p class="font-playfair story-card-text">${st.content}</p>
        </div>`;
      }
    )
    .join('\n');

  const galleryHtml = showPhotos
    ? galleryPhotos
        .map(
          (photo, idx) => `
        <div class="gallery-item dashboard-black-gold">
          <div class="photo-frame-black-gold" style="width: 100%; aspect-ratio: 3 / 4;">
            <img src="${photo.url}" alt="${photo.title}" />
          </div>
          <div class="gallery-caption-wrap">
            <span class="gallery-kicker">Potret 0${idx + 1}</span>
            <h4 class="font-averia gallery-title">${photo.title}</h4>
            <p class="gallery-desc">${photo.caption}</p>
          </div>
        </div>`
        )
        .join('\n')
    : '';

  const timelineHtml = config.timeline
    .map((tl) => {
      if (tl.textSide === 'left') {
        return `
          <div class="tl-row">
            <div class="tl-col tl-left">
              <p class="tl-title">${tl.title}</p>
              <hr class="tl-hr" />
              <p class="tl-desc">${tl.description}</p>
            </div>
            <div class="tl-dot"></div>
            <div class="tl-col tl-right tl-time-box">
              <span class="tl-time">${tl.timeText}</span>
            </div>
          </div>`;
      }
      return `
          <div class="tl-row">
            <div class="tl-col tl-left tl-time-box-left">
              <span class="tl-time">${tl.timeText}</span>
            </div>
            <div class="tl-dot"></div>
            <div class="tl-col tl-right">
              <p class="tl-title">${tl.title}</p>
              <hr class="tl-hr" />
              <p class="tl-desc">${tl.description}</p>
            </div>
          </div>`;
    })
    .join('\n');

  const banksHtml = config.bankAccounts
    .map(
      (b) => `
        <div class="bank-card atm-card-surface">
          <div class="bank-top">
            <div class="bank-chip"></div>
            <div class="bank-brand">${b.bankName}</div>
          </div>
          <p class="bank-num">${b.accountNumber}</p>
          <p class="bank-holder">${b.accountHolder}</p>
          <button type="button" class="btn-copy" onclick="copyRek('${b.accountNumber}', this)">Salin No. Rek</button>
        </div>`
    )
    .join('\n');

  const brideProfileHtml = `
      <div class="profile-card dashboard-black-gold">
        ${
          showPhotos
            ? `
        <div class="profile-photo-wrap">
          <div class="photo-frame-black-gold" style="width: 236px; height: 314px; margin: 0 auto; border-radius: 125px 125px 20px 20px;">
            <img src="${bridePhoto}" alt="${config.brideFullName}" />
          </div>
          <div class="monogram-badge"><span>${config.brideNickname.charAt(0).toUpperCase()}</span></div>
        </div>`
            : `
        <div class="royal-circle-monogram profile-monogram">
          <span class="font-signature monogram-initials">${config.brideNickname.charAt(0).toUpperCase()}</span>
          <span class="monogram-sub">Mempelai Wanita</span>
        </div>`
        }
        <p class="profile-role">The Bride · Mempelai Wanita</p>
        <h1 class="font-signature profile-nick">${config.brideNickname}</h1>
        <h3 class="profile-full">${config.brideFullName}</h3>
        <div class="profile-divider">------------</div>
        <div class="profile-parents">
          <p class="parents-kicker">Putri dari Pasangan</p>
          <p>${config.brideFather} &amp;</p>
          <p>${config.brideMother}</p>
          <p class="parents-addr">${config.brideAddress}</p>
        </div>
        <div class="profile-divider">------------</div>
        <a class="btn-tiktok" href="https://www.tiktok.com/@${brideTikTok}" target="_blank" rel="noopener noreferrer">${TIKTOK_SVG_INLINE}@${brideTikTok}</a>
      </div>`;

  const groomProfileHtml = `
      <div class="profile-card dashboard-black-gold">
        ${
          showPhotos
            ? `
        <div class="profile-photo-wrap">
          <div class="photo-frame-black-gold" style="width: 236px; height: 314px; margin: 0 auto; border-radius: 125px 125px 20px 20px;">
            <img src="${groomPhoto}" alt="${config.groomFullName}" />
          </div>
          <div class="monogram-badge"><span>${config.groomNickname.charAt(0).toUpperCase()}</span></div>
        </div>`
            : `
        <div class="royal-circle-monogram profile-monogram">
          <span class="font-signature monogram-initials">${config.groomNickname.charAt(0).toUpperCase()}</span>
          <span class="monogram-sub">Mempelai Pria</span>
        </div>`
        }
        <p class="profile-role">The Groom · Mempelai Pria</p>
        <h1 class="font-signature profile-nick">${config.groomNickname}</h1>
        <h3 class="profile-full">${config.groomFullName}</h3>
        <div class="profile-divider">------------</div>
        <div class="profile-parents">
          <p class="parents-kicker">Putra dari Pasangan</p>
          <p>${config.groomFather} &amp;</p>
          <p>${config.groomMother}</p>
          <p class="parents-addr">${config.groomAddress}</p>
        </div>
        <div class="profile-divider">------------</div>
        <a class="btn-tiktok" href="https://www.tiktok.com/@${groomTikTok}" target="_blank" rel="noopener noreferrer">${TIKTOK_SVG_INLINE}@${groomTikTok}</a>
      </div>`;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#b45309" />
  <title>The Wedding of ${couplePlainTitle} — MMDAF VIP Malige Buton</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300;400;700&family=Golos+Text:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link href="https://fonts.cdnfonts.com/css/photograph-signature" rel="stylesheet" />
  <style>
    :root {
      --bg-malige: url('assets/bg-malige.jpg');
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: #0c0a09;
      font-family: 'Playfair Display', serif;
      color: #f5e3b3;
      overflow-x: hidden;
    }
    .font-signature { font-family: 'Photograph Signature', cursive, sans-serif; font-weight: 400; }
    .font-averia { font-family: 'Averia Serif Libre', cursive, serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }

    /* PERPADUAN SENTUHAN HITAM & EMAS VIP ICONIC */
    .section-vip-black-gold {
      background-color: #0e0b08;
      background-image: linear-gradient(180deg, #15110c 0%, #0c0a08 50%, #16120c 100%);
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
      padding: 48px 20px;
      text-align: center;
    }
    .section-vip-obsidian {
      background-color: #0a0806;
      background-image: linear-gradient(180deg, #0d0a07 0%, #17120c 52%, #0a0806 100%);
      border-top: 1px solid rgba(212, 175, 55, 0.28);
      border-bottom: 1px solid rgba(212, 175, 55, 0.28);
      padding: 48px 20px;
      text-align: center;
    }
    .dashboard-black-gold {
      background: radial-gradient(circle at 50% 18%, rgba(212, 175, 55, 0.20) 0%, rgba(21, 17, 12, 0.96) 58%, #090705 100%);
      border: 1px solid rgba(212, 175, 55, 0.52);
      box-shadow:
        0 18px 42px rgba(0, 0, 0, 0.72),
        0 0 28px rgba(212, 175, 55, 0.16),
        inset 0 1px 0 rgba(245, 227, 179, 0.28);
    }
    .photo-frame-black-gold {
      position: relative;
      overflow: hidden;
      border-radius: 22px;
      background: #0a0806;
      border: 1.5px solid rgba(212, 175, 55, 0.68);
      box-shadow:
        0 14px 32px rgba(0, 0, 0, 0.75),
        0 0 20px rgba(212, 175, 55, 0.20),
        inset 0 0 18px rgba(10, 8, 6, 0.75);
    }
    .photo-frame-black-gold img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .floating-photo-dashboard {
      position: relative;
      background: radial-gradient(ellipse at center, rgba(22, 17, 12, 0.78) 0%, rgba(12, 9, 6, 0.54) 68%, rgba(8, 6, 4, 0.08) 100%);
      border: 1px solid rgba(212, 175, 55, 0.48);
      box-shadow:
        0 20px 48px rgba(0, 0, 0, 0.68),
        0 0 32px rgba(212, 175, 55, 0.24),
        inset 0 0 24px rgba(212, 175, 55, 0.15);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      padding: 6px;
      border-radius: 26px;
      animation: floatSlow 5.5s ease-in-out infinite;
    }
    .feathered-photo-box {
      position: relative;
      overflow: hidden;
      border-radius: 22px;
      -webkit-mask-image: radial-gradient(ellipse 96% 96% at 50% 50%, #000000 68%, rgba(0, 0, 0, 0.86) 82%, rgba(0, 0, 0, 0.35) 93%, transparent 100%);
      mask-image: radial-gradient(ellipse 96% 96% at 50% 50%, #000000 68%, rgba(0, 0, 0, 0.86) 82%, rgba(0, 0, 0, 0.35) 93%, transparent 100%);
    }
    .feathered-photo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .feathered-photo-box::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(ellipse 96% 96% at 50% 50%, transparent 64%, rgba(14, 11, 8, 0.45) 85%, rgba(10, 8, 6, 0.88) 100%);
      border: 1px solid rgba(212, 175, 55, 0.42);
      border-radius: 22px;
    }

    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes floatParticle {
      0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
      50% { opacity: 0.75; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    .particle {
      position: fixed;
      top: -20px;
      pointer-events: none;
      z-index: 30;
      border-radius: 50%;
      background: #e6c687;
      filter: blur(1px);
      animation: floatParticle 8s linear infinite;
    }
    @keyframes spinDisc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .spin-music { animation: spinDisc 6s linear infinite; }
    #floatingMusicWrap {
      position: fixed;
      bottom: 22px;
      right: 18px;
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    #floatingMusicLabel {
      background: rgba(16, 13, 10, 0.94);
      border: 1px solid rgba(212, 175, 55, 0.55);
      color: #f5e3b3;
      font-family: 'Golos Text', sans-serif;
      font-size: 11px;
      padding: 5px 11px;
      border-radius: 999px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.5);
      white-space: nowrap;
      pointer-events: none;
    }
    #floatingMusicBtn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #120f0b;
      border: 2px solid #d4af37;
      padding: 4px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #musicDiscInner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #b8860b 0%, #f5e3b3 50%, #9a6f0a 100%);
      color: #120f0b;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mobile-shell {
      max-width: 430px;
      margin: 0 auto;
      background: #0c0a09;
      min-height: 100vh;
      position: relative;
      border-left: 1px solid rgba(212, 175, 55, 0.25);
      border-right: 1px solid rgba(212, 175, 55, 0.25);
      box-shadow: 0 0 50px rgba(0,0,0,0.85);
    }
    .edition-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(10, 8, 6, 0.65);
      border: 1px solid rgba(212, 175, 55, 0.55);
      color: #f5e3b3;
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .event-summary-line {
      font-size: 11.5px;
      color: #f5e3b3;
      margin-top: 4px;
      letter-spacing: 0.5px;
    }
    /* SAMPUL DEPAN: FOTO MENGAMBANG DI DEPAN LATAR BELAKANG RUMAH ADAT MALIGE ATAU MONOGRAM */
    #cover-overlay {
      position: fixed;
      inset: 0;
      max-width: 430px;
      margin: 0 auto;
      z-index: 9999;
      background: linear-gradient(180deg, rgba(12,10,8,0.68) 0%, rgba(12,10,8,0.34) 46%, rgba(10,8,6,0.92) 100%),
                  var(--bg-malige, url('assets/bg-malige.jpg')) center center / cover no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      padding: 20px 18px 24px;
      text-align: center;
      color: #ffffff;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
    }
    #cover-overlay.hidden {
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
    }
    .royal-circle-monogram {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.22) 0%, rgba(16, 13, 10, 0.95) 75%);
      border: 2px solid rgba(212, 175, 55, 0.75);
      box-shadow: 0 0 24px rgba(212, 175, 55, 0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 4px auto 8px;
    }
    .monogram-initials {
      font-size: 42px;
      color: #f5e3b3;
      line-height: 1;
    }
    .monogram-sub {
      font-size: 8.5px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #d4af37;
      font-family: 'Playfair Display', serif;
      margin-top: 2px;
    }
    .kicker-top {
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 4px;
      color: #f5e3b3;
    }
    .couple-main-title {
      font-size: 42px;
      color: #ffffff;
      line-height: 1.15;
      text-shadow: 0 2px 12px rgba(0,0,0,0.65);
    }
    .guest-box {
      width: 100%;
      max-width: 345px;
      padding: 14px 16px;
      border-radius: 18px;
    }
    .guest-box p { font-size: 12px; margin-bottom: 2px; color: #e7dac6; }
    .guest-name {
      font-size: 30px;
      margin: 4px 0 6px;
      color: #f5e3b3;
    }
    .guest-sub {
      font-size: 10.5px;
      line-height: 1.5;
      max-width: 300px;
      margin: 0 auto 4px;
      color: rgba(255,255,255,0.86);
    }
    .guest-apology {
      font-size: 9px;
      font-style: italic;
      color: rgba(245,227,179,0.75);
      margin-bottom: 12px;
    }
    .btn-open {
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08;
      font-weight: 700;
      border: 1px solid rgba(255, 240, 195, 0.65);
      padding: 10px 28px;
      border-radius: 999px;
      font-family: 'Averia Serif Libre', serif;
      font-size: 13.5px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(212,175,55,0.35);
    }
    /* HERO DEPAN: FOTO MENGAMBANG DI DEPAN LATAR BELAKANG RUMAH ADAT MALIGE */
    .hero-section {
      position: relative;
      min-height: 690px;
      background: linear-gradient(180deg, rgba(12,10,8,0.56) 0%, rgba(12,10,8,0.32) 45%, rgba(12,10,8,0.94) 100%),
                  var(--bg-malige, url('assets/bg-malige.jpg')) center center / cover no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 36px 20px 38px;
      text-align: center;
      color: #ffffff;
    }
    .countdown-kicker {
      font-size: 10.5px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 10px;
      color: #f5e3b3;
    }
    .countdown-row {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .cd-box {
      width: 68px;
      height: 68px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #f5e3b3;
    }
    .cd-num { font-size: 20px; font-weight: 700; }
    .cd-label { font-size: 9.5px; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; color: #e2d5c1; }
    /* OUR WEDDING & DASBOR MEMPELAI HITAM EMAS */
    .our-title-sm { font-size: 16px; letter-spacing: 3px; color: #d4af37; }
    .our-title-lg { font-size: 32px; letter-spacing: 3px; color: #f5e3b3; margin-bottom: 6px; font-weight: 600; }
    .our-subtitle {
      font-family: 'Averia Serif Libre', serif;
      font-size: 11px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #d4af37;
      margin-bottom: 14px;
    }
    .intro-text {
      font-size: 13px;
      line-height: 1.75;
      color: #d6d3d1;
      max-width: 340px;
      margin: 0 auto 36px;
    }
    .profile-card {
      border-radius: 175px 175px 22px 22px;
      padding: 30px 22px 28px;
      max-width: 350px;
      margin: 0 auto 28px;
      color: #f5e3b3;
    }
    .profile-photo-wrap {
      position: relative;
      margin-bottom: 16px;
    }
    .monogram-badge {
      width: 38px;
      height: 38px;
      margin: -18px auto 0;
      position: relative;
      z-index: 3;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, #b8860b, #f5e3b3, #8b6508);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }
    .monogram-badge span {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #120f0b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      color: #f5e3b3;
    }
    .profile-role {
      font-family: 'Averia Serif Libre', serif;
      font-size: 10.5px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #d4af37;
      margin-bottom: 6px;
    }
    .profile-nick {
      font-size: 40px;
      color: #f5e3b3;
      margin-bottom: 4px;
    }
    .profile-full {
      font-family: 'Averia Serif Libre', serif;
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .profile-divider {
      color: rgba(212, 175, 55, 0.55);
      letter-spacing: 3px;
      margin: 8px 0;
    }
    .profile-parents {
      font-size: 13px;
      line-height: 1.7;
      color: #e7dac6;
    }
    .parents-kicker {
      color: #f5e3b3;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .parents-addr {
      color: rgba(245, 227, 179, 0.85);
      font-size: 12px;
      margin-top: 2px;
    }
    .btn-tiktok {
      display: inline-block;
      margin-top: 12px;
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08;
      font-weight: 700;
      text-decoration: none;
      font-size: 11px;
      padding: 6px 16px;
      border-radius: 999px;
      font-family: 'Averia Serif Libre', serif;
    }
    .couple-banner {
      padding: 26px 18px;
      margin: 28px 0;
      border-radius: 24px;
      text-align: center;
    }
    .couple-banner h1 { font-size: 42px; color: #f5e3b3; margin-top: 6px; }
    .couple-banner-kicker {
      font-family: 'Averia Serif Libre', serif;
      font-size: 10.5px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #d4af37;
      margin-top: 12px;
    }
    /* SAVE THE DATE (VIP HITAM EMAS) */
    .save-date-title {
      font-size: 45px;
      color: #f5e3b3;
      margin-bottom: 20px;
    }
    .quran-box {
      font-size: 12.5px;
      line-height: 1.75;
      color: #e7dac6;
      margin-bottom: 32px;
      padding: 20px 16px;
      border-radius: 18px;
    }
    .event-card {
      padding: 48px 18px 44px;
      margin-bottom: 0;
    }
    .event-title { font-size: 36px; color: #f5e3b3; margin-bottom: 14px; }
    .event-month { font-size: 20px; color: #d4af37; margin-bottom: 10px; }
    .event-date-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      max-width: 260px;
      margin: 0 auto 14px;
      color: #f5e3b3;
    }
    .event-day { text-align: right; padding-right: 12px; font-weight: 700; font-size: 17px; }
    .event-num {
      font-size: 44px;
      font-weight: 900;
      padding: 0 16px;
      border-left: 1px solid rgba(212, 175, 55, 0.7);
      border-right: 1px solid rgba(212, 175, 55, 0.7);
    }
    .event-year { text-align: left; padding-left: 12px; font-weight: 700; font-size: 17px; }
    .event-time { font-size: 16px; color: #f5e3b3; margin-top: 8px; }
    .event-venue { font-size: 13.5px; color: #d6d3d1; margin-top: 6px; margin-bottom: 18px; }
    .btn-maps {
      display: inline-block;
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08;
      font-weight: 700;
      text-decoration: none;
      padding: 8px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-family: 'Averia Serif Libre', serif;
    }
    .couple-bar {
      background: linear-gradient(90deg, #9a722c 0%, #d4af37 50%, #9a722c 100%);
      padding: 8px;
      margin: 14px 0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.45);
    }
    .couple-bar-text { font-size: 24px; color: #0c0a08; font-weight: 700; }
    .map-frame {
      margin-top: 24px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(212, 175, 55, 0.5);
      padding: 6px;
      background: #0c0a08;
    }
    .map-frame iframe { width: 100%; height: 280px; border: 0; border-radius: 12px; }
    /* STORY, GALERI HITAM EMAS & TIMELINE */
    .story-kicker { font-size: 22px; color: #d4af37; font-weight: 700; }
    .story-main-heading { font-size: 44px; color: #f5e3b3; margin-bottom: 20px; }
    .story-card {
      border-radius: 22px;
      padding: 24px 18px;
      margin-bottom: 18px;
      color: #f5e3b3;
    }
    .story-photo-frame {
      margin-bottom: 14px;
    }
    .story-badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.45);
      font-family: 'Averia Serif Libre', serif;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #d4af37;
      margin-bottom: 8px;
    }
    .story-card-title { font-size: 20px; color: #f5e3b3; margin-bottom: 8px; }
    .story-card-text { font-size: 13px; line-height: 1.7; color: #e7dac6; }
    .gallery-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
      margin-bottom: 32px;
    }
    .gallery-item {
      border-radius: 18px;
      padding: 8px;
      text-align: left;
    }
    .gallery-caption-wrap {
      padding: 8px 4px 4px;
    }
    .gallery-kicker {
      font-family: 'Averia Serif Libre', serif;
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #d4af37;
      display: block;
    }
    .gallery-title {
      font-size: 12px;
      color: #f5e3b3;
      margin-top: 2px;
      line-height: 1.35;
    }
    .gallery-desc {
      font-size: 10px;
      line-height: 1.45;
      color: rgba(231, 218, 198, 0.82);
      margin-top: 3px;
    }
    .timeline-wrap {
      position: relative;
      margin-top: 28px;
      padding: 16px 0;
    }
    .timeline-wrap::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: rgba(212, 175, 55, 0.55);
      transform: translateX(-50%);
    }
    .tl-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
      margin-bottom: 28px;
    }
    .tl-col { width: 44%; }
    .tl-left { text-align: right; }
    .tl-right { text-align: left; }
    .tl-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #d4af37;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
      margin-top: 8px;
      z-index: 2;
    }
    .tl-title { font-weight: 700; font-size: 14px; color: #f5e3b3; }
    .tl-hr { border: 0; border-top: 1px dashed rgba(212, 175, 55, 0.5); margin: 6px 0; }
    .tl-desc { font-size: 12px; line-height: 1.45; color: #d6d3d1; }
    .tl-time { font-size: 15px; font-weight: 600; color: #f5e3b3; display: inline-block; margin-top: 8px; }
    /* TITIP HADIAH (VIP HITAM EMAS) */
    .atm-card-surface {
      background: radial-gradient(circle at 85% 15%, rgba(212, 175, 55, 0.24) 0%, transparent 55%),
                  linear-gradient(135deg, #1b150e 0%, #0f0c08 60%, #1f1810 100%);
      border: 1px solid rgba(212, 175, 55, 0.55);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65),
                  inset 0 1px 0 rgba(245, 227, 179, 0.3);
    }
    .bank-card {
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      text-align: left;
      position: relative;
    }
    .bank-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .bank-chip {
      width: 40px;
      height: 28px;
      border-radius: 5px;
      background: linear-gradient(135deg, #f5e3b3 0%, #d4af37 50%, #9a722c 100%);
    }
    .bank-brand { font-weight: 700; font-size: 15px; color: #f5e3b3; }
    .bank-num { font-family: 'Golos Text', sans-serif; font-size: 16px; font-weight: 700; color: #f5e3b3; letter-spacing: 1px; }
    .bank-holder { font-family: 'Golos Text', sans-serif; font-size: 13px; color: #d4af37; margin-top: 2px; }
    .btn-copy {
      position: absolute;
      right: 18px;
      bottom: 16px;
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08;
      font-weight: 700;
      border: 0;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      cursor: pointer;
    }
    /* KEHADIRAN / RSVP (TANPA MENU MAKAN MALAM & UCAPAN AWAL 0 KOSONG) */
    .rsvp-card {
      padding: 22px 18px;
      border-radius: 24px;
    }
    .form-group { margin-bottom: 14px; text-align: left; }
    .form-group label { display: block; font-size: 14px; margin-bottom: 6px; color: #f5e3b3; }
    .form-control {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 12px;
      background: #0a0806;
      color: #ffffff;
      font-family: inherit;
      font-size: 13px;
    }
    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08;
      font-weight: 700;
      border: 0;
      padding: 11px 28px;
      border-radius: 999px;
      cursor: pointer;
      font-size: 14px;
    }
    .wish-box {
      margin-top: 24px;
      border-radius: 24px;
      padding: 18px;
      text-align: left;
    }
    .wish-stats {
      font-size: 12.5px;
      color: #f5e3b3;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      margin-bottom: 10px;
    }
    .wish-list {
      max-height: 320px;
      overflow-y: auto;
    }
    .wish-empty {
      padding: 20px 8px;
      text-align: center;
      font-size: 12.5px;
      font-style: italic;
      color: #a8a29e;
    }
    .wish-item {
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      padding: 10px 0;
      text-align: left;
    }
    .wish-author { font-weight: 700; font-size: 13px; color: #f5e3b3; }
    .wish-author span { font-weight: 400; font-size: 11px; color: #d4af37; }
    .wish-msg { font-size: 12.5px; color: #e7dac6; margin-top: 4px; }
    /* FOOTER PENUTUP DENGAN DASBOR FOTO MENGAMBANG HITAM EMAS */
    .closing-section {
      min-height: 560px;
      background: linear-gradient(0deg, rgba(8,6,5,0.90), rgba(12,10,8,0.48)),
                  var(--bg-malige, url('assets/bg-malige.jpg')) center center / cover no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      text-align: center;
      padding: 38px 24px 68px;
    }
    .mmdaf-footer {
      margin-top: 16px;
      padding: 14px 18px;
      border-radius: 16px;
      font-size: 10.5px;
      line-height: 1.6;
      color: rgba(255,255,255,0.85);
    }
    .mmdaf-footer strong {
      display: block;
      color: #f5e3b3;
      letter-spacing: 0.8px;
    }
    .btn-wa-footer {
      display: inline-block;
      margin-top: 8px;
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08;
      font-weight: 700;
      text-decoration: none;
      font-size: 11px;
      padding: 7px 18px;
      border-radius: 999px;
      font-family: 'Averia Serif Libre', serif;
      box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
      transition: transform 0.2s, filter 0.2s;
    }
    .btn-wa-footer:hover {
      filter: brightness(1.15);
      transform: translateY(-1px);
    }
    .footer-contacts-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .btn-contact-capsule {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 8px 16px;
      border-radius: 9999px;
      font-family: 'Averia Serif Libre', serif;
      font-size: 11px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s ease;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
    }
    .btn-contact-wa {
      background: linear-gradient(135deg, #1b1610 0%, #2b2214 50%, #15110a 100%);
      color: #ffd700 !important;
      border: 1px solid rgba(212, 175, 55, 0.65);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.25);
    }
    .btn-contact-wa:hover {
      background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%);
      color: #0c0a08 !important;
      border-color: #ffd700;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.45);
    }
    .btn-contact-tiktok {
      background: #090705;
      color: #f5e3b3 !important;
      border: 1px solid rgba(212, 175, 55, 0.45);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.15);
    }
    .btn-contact-tiktok:hover {
      background: linear-gradient(135deg, #1f1811 0%, #2e2417 50%, #17120a 100%);
      color: #ffd700 !important;
      border-color: #ffd700;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(212, 175, 55, 0.35);
    }
  </style>
</head>
<body>
  <!-- Partikel Cahaya Emas -->
  <div class="particle" style="width: 7px; height: 7px; left: 14%; animation-duration: 7s;"></div>
  <div class="particle" style="width: 5px; height: 5px; left: 50%; animation-duration: 9s; animation-delay: 2s;"></div>
  <div class="particle" style="width: 8px; height: 8px; left: 84%; animation-duration: 8s; animation-delay: 3s;"></div>

  <!-- Audio Latar Musik: Payung Teduh - Akad -->
  <audio id="bgMusic" loop preload="auto">
    <source src="${musicFallbackUrl}" type="audio/mpeg" />
    <source src="${musicUrl}" type="audio/mpeg" />
  </audio>

  <!-- Tombol Piringan Musik Mengambang (Payung Teduh - Akad) -->
  <div id="floatingMusicWrap">
    <div id="floatingMusicLabel">&#9835; ${musicTrackLabel}</div>
    <button id="floatingMusicBtn" type="button" onclick="toggleMusic()" aria-label="Audio Control: ${musicTrackLabel}">
      <div id="musicDiscInner">&#9835;</div>
    </button>
  </div>

  <div class="mobile-shell">
    <!-- SAMPUL UNDANGAN: FOTO MENGAMBANG DI DEPAN LATAR BELAKANG RUMAH ADAT -->
    <div id="cover-overlay">
      <div>
        <div class="edition-badge">${editionBadge}</div>
        <p class="kicker-top">The Wedding Celebration Of</p>
        <h1 class="font-signature couple-main-title">${coupleNickTitle}</h1>
        <p class="event-summary-line">${eventSummaryLine}</p>
      </div>

      <!-- Dasbor Foto Mengambang Hitam Emas atau Monogram Mewah -->
      ${
        showPhotos
          ? `
      <div class="floating-photo-dashboard" style="margin: 6px auto;">
        <div class="feathered-photo-box" style="width: 195px; height: 255px;">
          <img src="${coverPhoto}" alt="${couplePlainTitle}" />
        </div>
      </div>`
          : `
      <div class="royal-circle-monogram">
        <span class="font-signature monogram-initials">${config.brideNickname.charAt(0)} &amp; ${config.groomNickname.charAt(0)}</span>
        <span class="monogram-sub">Walimatul 'Ursy</span>
      </div>`
      }

      <div class="guest-box dashboard-black-gold">
        <p>Kepada Yth. Bapak/Ibu/Saudara/i:</p>
        <h4 class="font-signature guest-name" id="guest-name-display">${guestName}</h4>
        <p class="guest-sub">Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i untuk Hadir di Acara Kami.</p>
        <p class="guest-apology">Mohon maaf bila ada kesalahan penulisan nama/gelar</p>
        <button type="button" class="btn-open" onclick="openInvitation()">
          &#9993; Buka Undangan
        </button>
      </div>
    </div>

    <!-- HERO DEPAN: FOTO MENGAMBANG DI DEPAN LATAR BELAKANG RUMAH ADAT ATAU MONOGRAM -->
    <section class="hero-section">
      <div>
        <div class="edition-badge">${editionBadge}</div>
        <p class="kicker-top">The Wedding Celebration Of</p>
        <h1 class="font-signature couple-main-title">${coupleNickTitle}</h1>
        <p class="event-summary-line">${eventSummaryLine}</p>
      </div>

      <!-- Dasbor Foto Mengambang Hitam Emas di Halaman Depan atau Monogram -->
      ${
        showPhotos
          ? `
      <div class="floating-photo-dashboard" style="margin: 14px auto;">
        <div class="feathered-photo-box" style="width: 212px; height: 282px;">
          <img src="${heroPhoto}" alt="${couplePlainTitle}" />
        </div>
      </div>`
          : `
      <div style="margin: 12px auto; text-align: center;">
        <div class="royal-circle-monogram">
          <span class="font-signature monogram-initials">${config.brideNickname.charAt(0)} &amp; ${config.groomNickname.charAt(0)}</span>
        </div>
      </div>`
      }

      <div>
        <p class="countdown-kicker">Menuju Hari Bahagia</p>
        <div class="countdown-row">
          <div class="cd-box dashboard-black-gold"><span class="cd-num" id="cdDays">12</span><span class="cd-label">Hari</span></div>
          <div class="cd-box dashboard-black-gold"><span class="cd-num" id="cdHours">04</span><span class="cd-label">Jam</span></div>
          <div class="cd-box dashboard-black-gold"><span class="cd-num" id="cdMins">30</span><span class="cd-label">Menit</span></div>
          <div class="cd-box dashboard-black-gold"><span class="cd-num" id="cdSecs">45</span><span class="cd-label">Detik</span></div>
        </div>
      </div>
    </section>

    <!-- OUR WEDDING & DASBOR MEMPELAI HITAM EMAS -->
    <section class="section-vip-black-gold">
      <p class="our-title-sm">OUR</p>
      <p class="our-title-lg">WEDDING</p>
      <p class="our-subtitle">Mempelai Yang Berbahagia</p>
      <p class="intro-text">${config.openingGreeting}</p>

      ${isBrideFirst ? brideProfileHtml : groomProfileHtml}

      <div class="couple-banner dashboard-black-gold">
        ${
          showPhotos
            ? `
        <div class="photo-frame-black-gold" style="width: 224px; height: 298px; margin: 0 auto;">
          <img src="${middlePhoto}" alt="Ikatan Janji Suci ${couplePlainTitle}" />
        </div>`
            : `
        <div style="width: 80px; height: 80px; margin: 0 auto 10px; border-radius: 50%; background: #0c0a08; border: 1.5px solid rgba(212,175,55,0.65); display: flex; align-items: center; justify-content: center; font-size: 28px;">
          💍
        </div>`
        }
        <p class="couple-banner-kicker">Ikatan Janji Suci</p>
        <h1 class="font-signature">${coupleNickTitle}</h1>
      </div>

      ${isBrideFirst ? groomProfileHtml : brideProfileHtml}
    </section>

    <!-- SAVE THE DATE & AYAT SUCI AR-RUM 21 (VIP HITAM EMAS) -->
    <section class="section-vip-obsidian">
      <h4 class="font-signature save-date-title">Save The Date</h4>
      <div class="quran-box dashboard-black-gold">
        <p style="margin-bottom: 12px; color: #f5e3b3; font-size: 14px;">${config.quranArabic}</p>
        <p style="margin-bottom: 12px; font-style: italic;">${config.quranTranslation}</p>
        <p style="font-weight: 700; color: #d4af37;">${config.quranSource}</p>
      </div>
      ${eventsHtml}
      <p style="font-size: 12.5px; color: #d6d3d1; margin-top: 28px; line-height: 1.65;">${config.closingGreeting}</p>
      <div class="map-frame">
        <iframe src="${config.mapsEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>

    <!-- SEBUAH KISAH, GALERI FOTO HITAM EMAS & SUSUNAN ACARA -->
    <section class="section-vip-black-gold">
      <h3 class="font-averia story-kicker">Sebuah Kisah</h3>
      <h1 class="font-signature story-main-heading">Our Story</h1>
      ${storiesHtml}

      ${
        showPhotos
          ? `
      <div style="margin-top: 34px;">
        <p style="font-family: 'Averia Serif Libre', serif; font-size: 10.5px; letter-spacing: 2.5px; text-transform: uppercase; color: #d4af37;">Galeri Potret Kebahagiaan</p>
        <h2 class="font-signature" style="font-size: 40px; color: #f5e3b3; margin-bottom: 8px;">Momen Indah Kami</h2>
        <div class="gallery-grid">
          ${galleryHtml}
        </div>
      </div>`
          : ''
      }

      <h1 class="font-signature" style="font-size: 46px; color: #f5e3b3; margin-top: 36px;">Susunan Acara</h1>
      <div class="timeline-wrap">
        ${timelineHtml}
      </div>
    </section>

    <!-- TITIP HADIAH / AMPLOP DIGITAL -->
    <section class="section-vip-obsidian">
      <h1 class="font-signature" style="font-size: 42px; color: #f5e3b3; margin-bottom: 14px;">Titip Hadiah</h1>
      <p class="intro-text" style="margin-bottom: 24px;">
        Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti bagi kami. Dan jika memberi merupakan ungkapan tanda kasih, Bapak/Ibu dapat memberi kado secara cashless (Amplop Digital). Terima kasih.
      </p>
      ${banksHtml}
      <p style="font-size: 12.5px; color: #d6d3d1; margin-top: 24px; line-height: 1.65;">${config.covidNotice}</p>
    </section>

    <!-- KEHADIRAN & DOA RESTU (TANPA MENU MAKAN MALAM & UCAPAN AWAL 0 KOSONG) -->
    <section class="section-vip-black-gold">
      <h2 class="font-signature" style="font-size: 46px; color: #f5e3b3; text-align: center; margin-bottom: 16px;">Kehadiran</h2>
      <form class="rsvp-card dashboard-black-gold" onsubmit="submitWish(event)">
        <div class="form-group">
          <label>Nama</label>
          <input type="text" id="rsvp-name" class="form-control" value="${guestName}" required />
        </div>
        <div class="form-group">
          <label>Ucapan &amp; Doa Restu</label>
          <textarea id="rsvp-msg" class="form-control" rows="3" placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..." required></textarea>
        </div>
        <div class="form-group">
          <label>Konfirmasi Kehadiran</label>
          <select id="rsvp-status" class="form-control" required>
            <option value="Hadir">InsyaAllah Hadir</option>
            <option value="Tidak Hadir">Maaf, Berhalangan Hadir</option>
          </select>
        </div>
        <div class="form-group">
          <label>Datang Bersama Siapa?</label>
          <input type="text" id="rsvp-companion" class="form-control" placeholder="Contoh: Pasangan / Keluarga Besar" />
        </div>
        <button type="submit" class="btn-submit">Kirim Doa Restu</button>
      </form>
      <div class="wish-box dashboard-black-gold">
        <div class="wish-stats">
          <span id="total-wishes-count">0</span> Total Ucapan &middot; <span id="total-attending-count">0</span> Orang Menyatakan Hadir
        </div>
        <div class="wish-list" id="wish-list">
          <p class="wish-empty" id="wish-empty-msg">Belum ada ucapan dan konfirmasi kehadiran. Jadilah yang pertama memberikan doa restu untuk kedua mempelai.</p>
        </div>
      </div>
    </section>

    <!-- PENUTUP DENGAN DASBOR FOTO MENGAMBANG HITAM EMAS ATAU TYPOGRAPHY MEWAH -->
    <section class="closing-section">
      ${
        showPhotos
          ? `
      <div class="floating-photo-dashboard" style="margin-bottom: 16px;">
        <div class="feathered-photo-box" style="width: 212px; height: 282px;">
          <img src="${closingPhoto}" alt="Penutupan ${couplePlainTitle}" />
        </div>
      </div>`
          : ''
      }
      <p style="font-family: 'Averia Serif Libre', serif; font-size: 10.5px; letter-spacing: 2.5px; text-transform: uppercase; color: #d4af37; margin-bottom: 4px;">Kami Yang Berbahagia</p>
      <h1 class="font-signature" style="font-size: 45px; color: #f5e3b3; margin-bottom: 6px;">${coupleNickTitle}</h1>
      <p style="font-size: 14px;">Terimakasih Atas Doa &amp; Restu Bapak/Ibu/Saudara/i</p>
      <div class="mmdaf-footer dashboard-black-gold">
        <strong>${footerBrandTitle}</strong>
        <p style="margin: 6px 0 8px; font-size: 11px; color: #e7dac6;">Karya : G-Faizu_3.8 • Ingin buat undangan seperti ini? Hubungi Kami</p>
        <div class="footer-contacts-wrap">
          <a href="https://wa.me/6281119127082?text=Halo%20MMDAF%20Studio%20(G-Faizu_3.8)%2C%20saya%20tertarik%20ingin%20membuat%20undangan%20digital%20seperti%20ini." target="_blank" rel="noopener noreferrer" class="btn-contact-capsule btn-contact-wa">
            ${WHATSAPP_SVG_INLINE}
            <span>WhatsApp: 0811-1912-7082</span>
          </a>
          <a href="https://www.tiktok.com/@mmdaf.studio.project" target="_blank" rel="noopener noreferrer" class="btn-contact-capsule btn-contact-tiktok">
            ${TIKTOK_SVG_INLINE}
            <span>TikTok: @mmdaf.studio.project</span>
          </a>
        </div>
      </div>
    </section>
  </div>

  <!-- POIN 5: PANEL GENERATOR LINK TAMU TERSEMBUNYI (KHUSUS PENGANTIN - ?admin=1) -->
  <div id="admin-guest-panel" class="dashboard-black-gold" style="display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 92%; max-width: 410px; z-index: 10000; border-radius: 20px; padding: 18px 16px; box-shadow: 0 16px 48px rgba(0,0,0,0.92); border: 1.5px solid rgba(212,175,55,0.7);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 8px;">
      <div style="text-align: left;">
        <span style="display: inline-block; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #d4af37; font-family: 'Averia Serif Libre', serif; font-weight: 700;">👑 Mode Khusus Pengantin</span>
        <h4 style="font-size: 14px; font-weight: 700; color: #f5e3b3; margin: 0;">Generator Link Undangan</h4>
      </div>
      <button type="button" onclick="toggleAdminPanel()" style="background: rgba(255,255,255,0.1); border: 0; color: #f5e3b3; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 13px; font-weight: bold;">✕</button>
    </div>
    
    <div style="text-align: left; margin-bottom: 10px;">
      <label style="display: block; font-size: 11px; color: #f5e3b3; margin-bottom: 4px; font-family: 'Golos Text', sans-serif;">Nama Tamu Undangan:</label>
      <input type="text" id="admin-guest-input" placeholder="Contoh: Bapak Ahmad &amp; Keluarga" oninput="updateAdminLinkPreview()" style="width: 100%; padding: 8px 12px; background: #070605; border: 1px solid rgba(212,175,55,0.5); border-radius: 10px; color: #ffffff; font-size: 12px; outline: none;" />
    </div>

    <div style="text-align: left; margin-bottom: 12px;">
      <label style="display: block; font-size: 11px; color: #f5e3b3; margin-bottom: 4px; font-family: 'Golos Text', sans-serif;">Pratinjau Teks WhatsApp:</label>
      <textarea id="admin-wa-preview" rows="5" readonly style="width: 100%; padding: 8px 10px; background: #070605; border: 1px solid rgba(212,175,55,0.3); border-radius: 10px; color: #e7dac6; font-size: 11px; font-family: inherit; line-height: 1.5; resize: none;"></textarea>
    </div>

    <div style="display: flex; gap: 8px;">
      <button type="button" onclick="copyAdminWaText(this)" style="flex: 1; background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%); color: #0c0a08; font-weight: 700; border: 0; padding: 9px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; font-family: 'Averia Serif Libre', serif;">
        📋 Salin Teks
      </button>
      <button type="button" onclick="sendAdminWa()" style="flex: 1; background: #25D366; color: #ffffff; font-weight: 700; border: 0; padding: 9px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; font-family: 'Averia Serif Libre', serif; display: flex; align-items: center; justify-content: center; gap: 4px;">
        <span>💬 Kirim ke WA</span>
      </button>
    </div>
  </div>

  <!-- Tombol Pemicu Mengambang Kembali (Jika panel ditutup saat ?admin=1) -->
  <button id="admin-trigger-btn" type="button" onclick="toggleAdminPanel()" style="display: none; position: fixed; bottom: 80px; right: 18px; z-index: 9990; background: linear-gradient(135deg, #b88c42 0%, #d4af37 50%, #9a722c 100%); color: #0c0a08; font-weight: 700; border: 1px solid #f5e3b3; padding: 7px 14px; border-radius: 999px; font-size: 11px; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,0.6); font-family: 'Averia Serif Libre', serif;">
    👑 Link Tamu
  </button>

  <script>
    // POIN 2: Keamanan & Penyimpanan Permanen Form RSVP (Buku Tamu)
    const GOOGLE_SCRIPT_URL = ""; // Opsional: Tempel Web App URL Google Apps Script di sini untuk sinkronisasi Google Sheets
    const WISHES_STORAGE_KEY = "MMDAF_WEDDING_WISHES_V1";

    var audioCtx = null;
    // Melodi D-Mayor inspirasi lagu Payung Teduh - Akad (sebagai cadangan bila jaringan memblokir MP3)
    var notes = [293.66, 369.99, 440.00, 587.33, 554.37, 440.00, 392.00, 369.99];
    var step = 0;
    var timer = null;
    var isPlaying = false;
    var totalWishes = 0;
    var totalAttending = 0;

    function startSynthFallback() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        if (timer) clearInterval(timer);
        timer = setInterval(function() {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(notes[step % notes.length], audioCtx.currentTime);
          step++;
          gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.75);
        }, 700);
      } catch (e) {}
    }

    function playSound() {
      isPlaying = true;
      var disc = document.getElementById('musicDiscInner');
      if (disc) disc.classList.add('spin-music');
      var bgAudio = document.getElementById('bgMusic');
      if (bgAudio) {
        bgAudio.volume = 0.85;
        var p = bgAudio.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function() { startSynthFallback(); });
        }
      } else {
        startSynthFallback();
      }
    }

    function stopSound() {
      if (timer) { clearInterval(timer); timer = null; }
      var bgAudio = document.getElementById('bgMusic');
      if (bgAudio) bgAudio.pause();
      isPlaying = false;
      var disc = document.getElementById('musicDiscInner');
      if (disc) disc.classList.remove('spin-music');
    }

    function toggleMusic() {
      if (isPlaying) stopSound();
      else playSound();
    }

    function openInvitation() {
      var overlay = document.getElementById('cover-overlay');
      if (overlay) overlay.classList.add('hidden');
      playSound();
    }

    function copyRek(num, btn) {
      if (navigator.clipboard) navigator.clipboard.writeText(num);
      var old = btn.textContent;
      btn.textContent = 'Tersalin!';
      setTimeout(function() { btn.textContent = old; }, 2000);
    }

    // Pembuatan elemen ucapan aman dari XSS menggunakan textContent
    function createWishElement(wish) {
      var item = document.createElement('div');
      item.className = 'wish-item';
      
      var pAuthor = document.createElement('p');
      pAuthor.className = 'wish-author';
      pAuthor.textContent = wish.name;
      
      var sStatus = document.createElement('span');
      var statusText = ' - ' + (wish.status || 'Hadir');
      if (wish.companion) {
        statusText += ' (' + wish.companion + ')';
      }
      sStatus.textContent = statusText;
      pAuthor.appendChild(sStatus);
      
      var pMsg = document.createElement('p');
      pMsg.className = 'wish-msg';
      pMsg.textContent = wish.message;
      
      item.appendChild(pAuthor);
      item.appendChild(pMsg);
      return item;
    }

    function loadSavedWishes() {
      try {
        var savedRaw = localStorage.getItem(WISHES_STORAGE_KEY);
        var wishes = savedRaw ? JSON.parse(savedRaw) : [];
        if (Array.isArray(wishes) && wishes.length > 0) {
          var list = document.getElementById('wish-list');
          var emptyMsg = document.getElementById('wish-empty-msg');
          if (emptyMsg) emptyMsg.remove();
          list.innerHTML = '';
          totalWishes = wishes.length;
          totalAttending = wishes.filter(function(w){ return w.status === 'Hadir'; }).length;
          
          wishes.forEach(function(w) {
            list.appendChild(createWishElement(w));
          });
          
          var elWishes = document.getElementById('total-wishes-count');
          var elAttending = document.getElementById('total-attending-count');
          if (elWishes) elWishes.textContent = String(totalWishes);
          if (elAttending) elAttending.textContent = String(totalAttending);
        }
      } catch (e) {
        console.warn('Gagal memuat ucapan dari localStorage', e);
      }

      // Sinkronisasi GET Google Sheets jika URL diisi
      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL)
          .then(function(res){ return res.json(); })
          .then(function(data){
            if (Array.isArray(data) && data.length > 0) {
              var list = document.getElementById('wish-list');
              var emptyMsg = document.getElementById('wish-empty-msg');
              if (emptyMsg) emptyMsg.remove();
              list.innerHTML = '';
              totalWishes = data.length;
              totalAttending = data.filter(function(w){ return w.status === 'Hadir'; }).length;
              data.forEach(function(w){
                list.appendChild(createWishElement(w));
              });
              var elW = document.getElementById('total-wishes-count');
              var elA = document.getElementById('total-attending-count');
              if (elW) elW.textContent = String(totalWishes);
              if (elA) elA.textContent = String(totalAttending);
              try { localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(data)); } catch(err){}
            }
          })
          .catch(function(err){ console.warn('Google Sheets sync error', err); });
      }
    }

    function submitWish(e) {
      e.preventDefault();
      var elName = document.getElementById('rsvp-name');
      var elMsg = document.getElementById('rsvp-msg');
      var elStatus = document.getElementById('rsvp-status');
      var elCompanion = document.getElementById('rsvp-companion');
      
      var name = elName ? elName.value.trim() : '';
      var msg = elMsg ? elMsg.value.trim() : '';
      var status = elStatus ? elStatus.value : 'Hadir';
      var companion = elCompanion ? elCompanion.value.trim() : '';
      
      if (!name) return;
      if (!msg) msg = 'Selamat menempuh hidup baru!';

      var wishObj = {
        name: name,
        message: msg,
        status: status,
        companion: companion,
        timestamp: new Date().toISOString()
      };

      var emptyMsg = document.getElementById('wish-empty-msg');
      if (emptyMsg) emptyMsg.remove();

      totalWishes += 1;
      if (status === 'Hadir') totalAttending += 1;

      var elWishes = document.getElementById('total-wishes-count');
      var elAttending = document.getElementById('total-attending-count');
      if (elWishes) elWishes.textContent = String(totalWishes);
      if (elAttending) elAttending.textContent = String(totalAttending);

      var list = document.getElementById('wish-list');
      var itemEl = createWishElement(wishObj);
      list.prepend(itemEl);

      // Simpan ke localStorage
      try {
        var existing = [];
        var savedRaw = localStorage.getItem(WISHES_STORAGE_KEY);
        if (savedRaw) existing = JSON.parse(savedRaw);
        if (!Array.isArray(existing)) existing = [];
        existing.unshift(wishObj);
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(existing));
      } catch (err) {
        console.warn('Gagal menyimpan ke localStorage', err);
      }

      // Kirim ke Google Sheets via fetch POST (no-cors) jika URL diisi
      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(wishObj)
        }).catch(function(err){ console.warn('Gagal kirim ke Google Sheets', err); });
      }

      if (elMsg) elMsg.value = '';
      if (elCompanion) elCompanion.value = '';
    }

    // POIN 4: Akurasi Zona Waktu Countdown ISO WITA (+08:00)
    function updateCountdown() {
      var target = new Date("2026-11-23T10:00:00+08:00").getTime();
      var now = new Date().getTime();
      var diff = target - now;
      var elD = document.getElementById('cdDays');
      var elH = document.getElementById('cdHours');
      var elM = document.getElementById('cdMins');
      var elS = document.getElementById('cdSecs');
      if (diff <= 0) {
        if (elD) elD.textContent = "00";
        if (elH) elH.textContent = "00";
        if (elM) elM.textContent = "00";
        if (elS) elS.textContent = "00";
        return;
      }
      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var m = Math.floor((diff / 1000 / 60) % 60);
      var s = Math.floor((diff / 1000) % 60);
      if (elD) elD.textContent = String(d).padStart(2, '0');
      if (elH) elH.textContent = String(h).padStart(2, '0');
      if (elM) elM.textContent = String(m).padStart(2, '0');
      if (elS) elS.textContent = String(s).padStart(2, '0');
    }

    // POIN 5: Fungsi Generator Link Undangan Tamu
    function getCleanInvitationBaseUrl() {
      var l = window.location;
      return l.protocol + '//' + l.host + l.pathname;
    }

    function updateAdminLinkPreview() {
      var input = document.getElementById('admin-guest-input');
      var preview = document.getElementById('admin-wa-preview');
      var guest = (input && input.value.trim()) ? input.value.trim() : 'Bapak/Ibu/Saudara/i';
      var baseUrl = getCleanInvitationBaseUrl();
      var link = baseUrl + '?to=' + encodeURIComponent(guest);
      
      var lines = [
        'Kepada Yth.',
        'Bapak/Ibu/Saudara/i: ' + guest,
        '',
        'Assalamu’alaikum Warahmatullahi Wabarakatuh.',
        'Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami:',
        '',
        'Raminianti & Aliadin',
        'Senin, 23 November 2026 • Lahumoko',
        '',
        'Berikut tautan undangan digital untuk informasi lengkap acara:',
        link,
        '',
        'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.',
        'Terima kasih.',
        'Wassalamu’alaikum Warahmatullahi Wabarakatuh.'
      ];
      var text = lines.join('\\n');
      
      if (preview) preview.value = lines.join('\\n');
      return lines.join('\\n');
    }

    function toggleAdminPanel() {
      var panel = document.getElementById('admin-guest-panel');
      var trigger = document.getElementById('admin-trigger-btn');
      if (panel) {
        if (panel.style.display === 'none') {
          panel.style.display = 'block';
          if (trigger) trigger.style.display = 'none';
        } else {
          panel.style.display = 'none';
          if (trigger) trigger.style.display = 'block';
        }
      }
    }

    function copyAdminWaText(btn) {
      var text = updateAdminLinkPreview();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
      var old = btn.textContent;
      btn.textContent = 'Tersalin!';
      setTimeout(function() { btn.textContent = old; }, 2000);
    }

    function sendAdminWa() {
      var text = updateAdminLinkPreview();
      var waUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    }

    window.addEventListener('DOMContentLoaded', function() {
      var params = new URLSearchParams(window.location.search);
      var guest = params.get('to') || params.get('kpd') || params.get('kepada');
      if (guest) {
        var el = document.getElementById('guest-name-display');
        var input = document.getElementById('rsvp-name');
        if (el) el.textContent = guest;
        if (input) input.value = guest;
      }
      loadSavedWishes();
      updateCountdown();
      setInterval(updateCountdown, 1000);

      // POIN 5: Deteksi Parameter ?admin=1
      var isAdmin = params.get('admin') === '1';
      if (isAdmin) {
        var adminPanel = document.getElementById('admin-guest-panel');
        if (adminPanel) {
          adminPanel.style.display = 'block';
          updateAdminLinkPreview();
        }
      }
    });
  </script>
</body>
</html>`;
}

export function generateMaligeWeddingHtml(
  config: InvitationConfig,
  guestName = config.defaultGuestName
): string {
  const bank = config.bankAccounts[0] || {
    bankName: 'Bank BRI',
    accountNumber: '488901053910537',
    accountHolder: 'a.n. RAMINIANTI',
  };
  const musicArtist = config.musicArtist || 'Payung Teduh';
  const musicTitle = config.musicTitle || 'Akad';
  const musicTrackLabel = `${musicArtist} — ${musicTitle}`;
  const musicUrl =
    config.musicUrl ||
    'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3';
  const musicFallbackUrl =
    config.musicFallbackUrl || '/assets/aistudio/payung-teduh-akad.mp3';

  const showPhotos = config.showCouplePhotos ?? false;
  const coverPhoto =
    config.coverFloatingPhotoUrl || UPLOADED_COUPLE_PHOTOS.royalArch;
  const bridePhoto = config.bridePhotoUrl || UPLOADED_COUPLE_PHOTOS.goldSilk;
  const groomPhoto =
    config.groomPhotoUrl || UPLOADED_COUPLE_PHOTOS.baroqueFrame;
  const middlePhoto =
    config.middleBannerPhotoUrl || UPLOADED_COUPLE_PHOTOS.ringShowcase;
  const closingPhoto =
    config.closingFloatingPhotoUrl || UPLOADED_COUPLE_PHOTOS.baroqueFrame;
  const brideTikTok = config.brideInstagram || 'mmdaf.studio.project';
  const groomTikTok = config.groomInstagram || 'mmdaf.studio.project';

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#b45309" />
  <title>The Wedding of ${config.brideFullName} & ${config.groomFullName} — MMDAF VIP Malige Buton</title>
  <link rel="manifest" href="manifest.json">
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0c0a09; color: #f5f5f4; overflow-x: hidden; }
    .font-royal { font-family: 'Cinzel', serif; }
    .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }

    @keyframes floatParticle {
      0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
      50% { opacity: 0.8; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    .particle { position: fixed; top: -20px; pointer-events: none; z-index: 15; animation: floatParticle 8s linear infinite; }

    .card-luxury, .dashboard-black-gold {
      background: radial-gradient(circle at 50% 18%, rgba(212, 175, 55, 0.2) 0%, rgba(16, 12, 9, 0.96) 60%, #080604 100%);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(212, 175, 55, 0.5);
      box-shadow: 0 14px 36px -5px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(212, 175, 55, 0.12);
    }

    .photo-frame-black-gold {
      position: relative;
      overflow: hidden;
      border-radius: 22px;
      background: #0a0806;
      border: 1.5px solid rgba(212, 175, 55, 0.68);
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 175, 55, 0.2);
    }

    .floating-photo-dashboard {
      position: relative;
      background: radial-gradient(ellipse at center, rgba(22, 17, 12, 0.78) 0%, rgba(12, 9, 6, 0.54) 68%, rgba(8, 6, 4, 0.08) 100%);
      border: 1px solid rgba(212, 175, 55, 0.48);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.68), 0 0 32px rgba(212, 175, 55, 0.22);
      padding: 6px;
      border-radius: 26px;
    }

    .feathered-photo-box {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      -webkit-mask-image: radial-gradient(ellipse 96% 96% at 50% 50%, #000000 68%, rgba(0, 0, 0, 0.86) 82%, rgba(0, 0, 0, 0.35) 93%, transparent 100%);
      mask-image: radial-gradient(ellipse 96% 96% at 50% 50%, #000000 68%, rgba(0, 0, 0, 0.86) 82%, rgba(0, 0, 0, 0.35) 93%, transparent 100%);
    }

    @keyframes spinDisc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .spin-music { animation: spinDisc 6s linear infinite; }
  </style>
</head>
<body class="min-h-screen flex justify-center bg-[#0c0a09] text-stone-100">

  <!-- Audio Latar Musik: Payung Teduh - Akad -->
  <audio id="bgMusic" loop preload="auto">
    <source src="${musicFallbackUrl}" type="audio/mpeg" />
    <source src="${musicUrl}" type="audio/mpeg" />
  </audio>

  <!-- Partikel Cahaya Emas -->
  <div class="particle w-2 h-2 rounded-full bg-amber-400 blur-[1px]" style="left: 12%; animation-duration: 7s;"></div>
  <div class="particle w-1.5 h-1.5 rounded-full bg-yellow-300 blur-[1px]" style="left: 48%; animation-duration: 9s; animation-delay: 2s;"></div>
  <div class="particle w-2.5 h-2.5 rounded-full bg-amber-500 blur-[1px]" style="left: 82%; animation-duration: 8s; animation-delay: 3s;"></div>

  <!-- Tombol Piringan Musik Mengambang (Payung Teduh - Akad) -->
  <div class="fixed bottom-6 right-5 z-40 flex items-center gap-2">
    <span class="px-3 py-1 rounded-full bg-slate-950/90 border border-amber-400/50 text-[11px] text-amber-200 shadow-lg">&#9835; ${musicTrackLabel}</span>
    <button id="floatingMusicBtn" onclick="toggleMusic()" aria-label="Audio Control: ${musicTrackLabel}" class="w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 p-1 shadow-2xl flex items-center justify-center transition">
      <div id="musicDiscInner" class="w-full h-full rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 font-bold text-xs">
        ♫
      </div>
    </button>
  </div>

  <div class="w-full max-w-md min-h-screen relative z-10 flex flex-col shadow-2xl border-x border-amber-500/25 bg-[#0c0a09]">

    <!-- BABAK 1: SAMPUL DEPAN (#cover) DENGAN FOTO MENGAMBANG DI DEPAN LATAR RUMAH ADAT MALIGE -->
    <div id="coverOverlay" class="fixed inset-0 max-w-md mx-auto z-30 flex flex-col justify-between p-6 text-center transition-all duration-700" style="background: linear-gradient(180deg, rgba(12,9,6,0.58) 0%, rgba(12,9,6,0.28) 45%, rgba(8,6,5,0.88) 100%), url('${config.heroImageUrl}') center center / cover no-repeat;">
      <div class="relative z-10 pt-2 space-y-1.5">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-[10px] text-amber-300 font-royal tracking-widest uppercase">
          <span>👑 Royal Malige Buton Edition • VIP</span>
        </div>
        <p class="font-royal text-[9px] uppercase tracking-[0.4em] text-amber-400 pt-1">The Wedding Celebration Of</p>
        <h1 class="font-serif-luxury text-4xl font-bold text-white tracking-wide">${config.brideNickname} <span class="text-amber-400 font-light">&amp;</span> ${config.groomNickname}</h1>
        <p class="text-xs text-amber-200/80">Senin, 23 November 2026 • Lahumoko</p>
      </div>

      <!-- Foto Mengambang Hitam Emas atau Monogram Kerajaan -->
      <div class="relative z-10 my-auto py-1 flex justify-center">
        ${
          showPhotos
            ? `
        <div class="floating-photo-dashboard">
          <div class="feathered-photo-box w-48 h-64 mx-auto">
            <img src="${coverPhoto}" class="w-full h-full object-cover object-center" alt="${config.brideFullName} & ${config.groomFullName}" />
          </div>
        </div>`
            : `
        <div class="w-28 h-28 rounded-full bg-black/70 border-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.3)] backdrop-blur-sm">
          <span class="font-serif-luxury text-3xl font-bold text-amber-300 leading-none select-none">
            ${config.brideNickname.charAt(0)} &amp; ${config.groomNickname.charAt(0)}
          </span>
          <span class="text-[8px] uppercase tracking-widest text-amber-400 font-royal mt-1">
            Walimatul 'Ursy
          </span>
        </div>`
        }
      </div>

      <div class="relative z-10 space-y-3 pb-2">
        <div class="dashboard-black-gold rounded-2xl p-4 shadow-2xl text-center">
          <p class="text-[11px] text-stone-300">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p id="guestNameLabel" class="font-serif-luxury text-lg font-bold text-amber-300 mt-1">${guestName}</p>
          <p class="text-[9px] text-stone-400 mt-0.5">Mohon maaf bila ada kesalahan penulisan nama/gelar</p>
        </div>

        <button onclick="openInvitation()" class="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-stone-950 shadow-2xl hover:brightness-110 transition">
          ✉ Buka Undangan
        </button>
      </div>
    </div>

    <!-- ISI UNDANGAN LENGKAP DENGAN DASBOR HITAM EMAS -->
    <div class="flex-1 pb-16 space-y-8">
      
      <!-- BABAK 2: AYAT SUCI AR-RUM 21 -->
      <div class="p-8 text-center border-b border-amber-500/20 bg-black/60 space-y-3">
        <div class="font-royal text-[10px] uppercase tracking-[0.3em] text-amber-400">Ar-Rum : 21</div>
        <p class="font-serif-luxury text-xs text-stone-200 italic leading-relaxed">
          "${config.quranTranslation}"
        </p>
      </div>

      <!-- BABAK 3: DASBOR HITAM EMAS KEDUA MEMPELAI (MONOGRAM ATAU FOTO) -->
      <div class="px-6 text-center space-y-6">
        <div class="font-royal text-[10px] uppercase tracking-[0.25em] text-amber-400">Mempelai Yang Berbahagia</div>
        
        <div class="dashboard-black-gold rounded-3xl p-6 space-y-3">
          ${
            showPhotos
              ? `
          <div class="photo-frame-black-gold w-52 h-72 mx-auto">
            <img src="${bridePhoto}" class="w-full h-full object-cover object-center" alt="${config.brideFullName}" />
          </div>`
              : `
          <div class="w-24 h-24 mx-auto rounded-full bg-black/70 border-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span class="font-serif-luxury text-3xl font-bold text-amber-300">${config.brideNickname.charAt(0)}</span>
            <span class="text-[7.5px] uppercase tracking-wider text-amber-400">Wanita</span>
          </div>`
          }
          <h2 class="font-serif-luxury text-2xl font-bold text-amber-300">${config.brideFullName}</h2>
          <p class="text-xs text-stone-300">Mempelai Wanita — Putri Tercinta dari Keluarga Besar di Lahumoko</p>
          <a href="https://www.tiktok.com/@${brideTikTok}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[11px]">${TIKTOK_SVG_INLINE}@${brideTikTok}</a>
        </div>

        <div class="dashboard-black-gold rounded-3xl p-5 space-y-2">
          ${
            showPhotos
              ? `
          <div class="photo-frame-black-gold w-48 h-64 mx-auto">
            <img src="${middlePhoto}" class="w-full h-full object-cover object-center" alt="Cincin Ikatan Suci" />
          </div>`
              : `
          <div class="w-16 h-16 mx-auto rounded-full bg-black/70 border border-amber-400/60 flex items-center justify-center text-2xl">
            💍
          </div>`
          }
          <div class="font-serif-luxury text-2xl text-amber-300 font-semibold">${config.brideNickname} &amp; ${config.groomNickname}</div>
        </div>

        <div class="dashboard-black-gold rounded-3xl p-6 space-y-3">
          ${
            showPhotos
              ? `
          <div class="photo-frame-black-gold w-52 h-72 mx-auto">
            <img src="${groomPhoto}" class="w-full h-full object-cover object-center" alt="${config.groomFullName}" />
          </div>`
              : `
          <div class="w-24 h-24 mx-auto rounded-full bg-black/70 border-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span class="font-serif-luxury text-3xl font-bold text-amber-300">${config.groomNickname.charAt(0)}</span>
            <span class="text-[7.5px] uppercase tracking-wider text-amber-400">Pria</span>
          </div>`
          }
          <h2 class="font-serif-luxury text-2xl font-bold text-amber-300">${config.groomFullName}</h2>
          <p class="text-xs text-stone-300">Mempelai Pria — Putra Tercinta dari Keluarga Besar di Lahumoko</p>
          <a href="https://www.tiktok.com/@${groomTikTok}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[11px]">${TIKTOK_SVG_INLINE}@${groomTikTok}</a>
        </div>
      </div>

      <!-- BABAK 4: HITUNG MUNDUR -->
      <div class="px-6 text-center space-y-4">
        <div class="font-royal text-[10px] uppercase tracking-[0.25em] text-amber-400">Menuju Hari Bahagia</div>
        <div class="grid grid-cols-4 gap-2">
          <div class="card-luxury rounded-2xl py-3 border border-amber-500/40"><span id="cdDays" class="text-lg font-bold text-amber-300 font-mono">12</span><span class="block text-[9px] uppercase text-stone-400">Hari</span></div>
          <div class="card-luxury rounded-2xl py-3 border border-amber-500/40"><span id="cdHours" class="text-lg font-bold text-amber-300 font-mono">04</span><span class="block text-[9px] uppercase text-stone-400">Jam</span></div>
          <div class="card-luxury rounded-2xl py-3 border border-amber-500/40"><span id="cdMins" class="text-lg font-bold text-amber-300 font-mono">30</span><span class="block text-[9px] uppercase text-stone-400">Menit</span></div>
          <div class="card-luxury rounded-2xl py-3 border border-amber-500/40"><span id="cdSecs" class="text-lg font-bold text-amber-300 font-mono">45</span><span class="block text-[9px] uppercase text-stone-400">Detik</span></div>
        </div>
      </div>

      <!-- BABAK 5: JADWAL ACARA & MAPS -->
      <div class="px-6 text-center space-y-4">
        <div class="font-royal text-[10px] uppercase tracking-[0.25em] text-amber-400">Waktu &amp; Tempat Acara</div>
        <div class="card-luxury rounded-3xl p-5 space-y-3">
          <h3 class="font-serif-luxury text-2xl font-bold text-white">Senin, 23 November 2026</h3>
          <div class="grid grid-cols-2 gap-3 text-left pt-2">
            <div class="bg-black/60 p-3 rounded-2xl border border-amber-500/20">
              <span class="text-[10px] uppercase font-bold text-amber-300 block">Akad Nikah</span>
              <span class="text-xs font-semibold text-white">10.00 WIT</span>
              <span class="text-[10px] text-stone-400 block mt-1">Kediaman Mempelai, Lahumoko</span>
            </div>
            <div class="bg-black/60 p-3 rounded-2xl border border-amber-500/20">
              <span class="text-[10px] uppercase font-bold text-amber-300 block">Resepsi</span>
              <span class="text-xs font-semibold text-white">14.00 - 17.00 WIT</span>
              <span class="text-[10px] text-stone-400 block mt-1">Kediaman Mempelai, Lahumoko</span>
            </div>
          </div>
          <a href="https://maps.google.com/?q=Lahumoko" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-xs font-bold text-slate-950 shadow">
            📍 Buka Petunjuk Arah (Google Maps)
          </a>
        </div>
      </div>

      <!-- KISAH CINTA KAMI -->
      <div class="px-6 text-center space-y-4">
        <div class="font-royal text-[10px] uppercase tracking-[0.25em] text-amber-400">Kisah Cinta Kami</div>
        <div class="space-y-3 text-left">
          <div class="card-luxury rounded-2xl p-4 space-y-1">
            <span class="text-xs font-bold text-amber-300">Awal Bertemu di Bawah Langit Lahumoko</span>
            <p class="text-[11px] text-stone-300 leading-relaxed">Dua langkah dan dua hati dipertemukan dalam kesederhanaan, belajar saling mengenal dan menautkan rasa saling percaya.</p>
          </div>
          <div class="card-luxury rounded-2xl p-4 space-y-1">
            <span class="text-xs font-bold text-amber-300">Mengikat Janji &amp; Restu Keluarga</span>
            <p class="text-[11px] text-stone-300 leading-relaxed">Cinta tumbuh dalam ketulusan. Dengan doa dan restu hangat kedua keluarga besar, kami memantapkan niat menyatukan takdir.</p>
          </div>
          <div class="card-luxury rounded-2xl p-4 space-y-1">
            <span class="text-xs font-bold text-amber-300">Menuju Mahligai Pelaminan</span>
            <p class="text-[11px] text-stone-300 leading-relaxed">Kini saat yang dinanti telah tiba pada Senin, 23 November 2026, kami mengikrarkan janji suci untuk saling menjaga hingga menua bersama.</p>
          </div>
        </div>
      </div>

      <!-- BABAK 7: AMPLOP DIGITAL -->
      <div class="px-6 text-center space-y-4">
        <div class="font-royal text-[10px] uppercase tracking-[0.25em] text-amber-400">Tanda Kasih (Amplop Digital)</div>
        <div class="card-luxury rounded-3xl p-5 text-left flex items-center justify-between border border-amber-400/40">
          <div>
            <div class="text-xs font-bold text-amber-300">${bank.bankName}</div>
            <div id="rekNumber" class="text-base font-mono font-bold text-white mt-0.5 tracking-wider">${bank.accountNumber}</div>
            <div class="text-[11px] text-stone-300">${bank.accountHolder}</div>
          </div>
          <button onclick="copyRek(this)" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-stone-950 shadow">Salin No. Rek</button>
        </div>
      </div>

      <!-- BABAK 8: BUKU TAMU & RSVP (TANPA MENU MAKAN MALAM & UCAPAN AWAL 0 KOSONG) -->
      <div class="px-6 text-center space-y-4">
        <div class="font-royal text-[10px] uppercase tracking-[0.25em] text-amber-400">Doa Restu &amp; Kehadiran</div>
        <div class="card-luxury rounded-3xl p-5 text-left space-y-3">
          <div>
            <label class="block text-[11px] text-stone-300 mb-1">Nama Anda:</label>
            <input id="rsvpNama" type="text" placeholder="Tuliskan nama Anda..." class="w-full bg-black/70 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="block text-[11px] text-stone-300 mb-1">Konfirmasi Kehadiran:</label>
            <select id="rsvpStatus" class="w-full bg-black/70 border border-stone-700 rounded-xl px-3 py-2 text-xs text-amber-300 focus:outline-none focus:border-amber-400">
              <option value="Hadir">InsyaAllah Hadir</option>
              <option value="Berhalangan">Maaf, Berhalangan Hadir</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] text-stone-300 mb-1">Doa Restu &amp; Ucapan:</label>
            <textarea id="rsvpPesan" rows="2" placeholder="Tulis doa restu untuk kedua mempelai..." class="w-full bg-black/70 border border-stone-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"></textarea>
          </div>
          <button onclick="kirimUcapan()" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow">
            Kirim Doa Restu
          </button>
        </div>

        <div class="card-luxury rounded-2xl p-4 text-left space-y-2">
          <div class="text-xs text-amber-300 border-b border-amber-500/20 pb-2">
            <span id="totalUcapanCount">0</span> Total Ucapan &middot; <span id="totalHadirCount">0</span> Orang Menyatakan Hadir
          </div>
          <div id="boxUcapanList" class="space-y-2.5 pt-1">
            <p id="emptyUcapanMsg" class="text-[11px] italic text-stone-400 text-center py-3">Belum ada ucapan dan konfirmasi kehadiran.</p>
          </div>
        </div>
      </div>

      <!-- PENUTUP DENGAN FOTO HITAM EMAS PAS BINGKAI -->
      <div class="pt-8 px-6 text-center border-t border-white/10 text-[10px] text-stone-400 space-y-3">
        <div class="floating-photo-dashboard inline-block mx-auto">
          <div class="feathered-photo-box w-48 h-64 mx-auto">
            <img src="${closingPhoto}" class="w-full h-full object-cover object-center" alt="Penutupan ${config.brideFullName} & ${config.groomFullName}" />
          </div>
        </div>
        <p class="text-amber-400 font-semibold tracking-wider">MMDAF Royal Malige Edition • Kota Baubau</p>
        <p>Karya : G-Faizu_3.8 • Ingin buat undangan seperti ini? Hubungi Kami</p>
        <div class="flex flex-col gap-2 max-w-[280px] mx-auto pt-2">
          <a
            href="https://wa.me/6281119127082?text=Halo%20MMDAF%20Studio%20(G-Faizu_3.8)%2C%20saya%20tertarik%20ingin%20membuat%20undangan%20digital%20seperti%20ini."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold font-averia bg-gradient-to-r from-[#1b1610] via-[#292015] to-[#15110a] text-[#ffd700] hover:text-[#0c0a08] hover:from-[#b88c42] hover:via-[#d4af37] hover:to-[#9a722c] border border-[#d4af37]/70 hover:border-[#ffd700] shadow-md transition-all whitespace-nowrap"
          >
            ${WHATSAPP_SVG_INLINE}
            <span>WhatsApp: 0811-1912-7082</span>
          </a>
          <a
            href="https://www.tiktok.com/@mmdaf.studio.project"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold font-averia bg-[#090705] text-[#f5e3b3] hover:text-[#ffd700] hover:bg-[#1a140d] border border-[#d4af37]/45 hover:border-[#ffd700] shadow-md transition-all whitespace-nowrap"
          >
            ${TIKTOK_SVG_INLINE}
            <span>TikTok: @mmdaf.studio.project</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <script>
    function getGuest() {
      var p = new URLSearchParams(window.location.search);
      return p.get("to") || p.get("kpd") || "${guestName}";
    }
    var audioCtx = null;
    var notes = [293.66, 369.99, 440.00, 587.33, 554.37, 440.00, 392.00, 369.99];
    var step = 0; var timer = null; var isPlaying = false;
    var totalUcapan = 0; var totalHadir = 0;
    function startSynthFallback() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === "suspended") audioCtx.resume();
        if (timer) clearInterval(timer);
        timer = setInterval(function() {
          var osc = audioCtx.createOscillator(); var gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(notes[step % notes.length], audioCtx.currentTime);
          step++; gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.start(); osc.stop(audioCtx.currentTime + 0.75);
        }, 700);
      } catch (e) {}
    }
    function playSound() {
      isPlaying = true;
      document.getElementById("musicDiscInner").classList.add("spin-music");
      var bgAudio = document.getElementById("bgMusic");
      if (bgAudio) {
        bgAudio.volume = 0.85;
        var p = bgAudio.play();
        if (p && typeof p.catch === "function") {
          p.catch(function() { startSynthFallback(); });
        }
      } else {
        startSynthFallback();
      }
    }
    function stopSound() {
      if (timer) { clearInterval(timer); timer = null; }
      var bgAudio = document.getElementById("bgMusic");
      if (bgAudio) bgAudio.pause();
      isPlaying = false;
      document.getElementById("musicDiscInner").classList.remove("spin-music");
    }
    function toggleMusic() { if (isPlaying) stopSound(); else playSound(); }
    function openInvitation() { document.getElementById("coverOverlay").classList.add("opacity-0", "pointer-events-none", "-translate-y-full"); playSound(); }
    function copyRek(btn) {
      var r = document.getElementById("rekNumber").textContent.trim();
      navigator.clipboard.writeText(r);
      var old = btn.textContent;
      btn.textContent = "Tersalin!";
      setTimeout(function() { btn.textContent = old; }, 2000);
    }
    function kirimUcapan() {
      var n = document.getElementById("rsvpNama").value.trim();
      var s = document.getElementById("rsvpStatus").value;
      var p = document.getElementById("rsvpPesan").value.trim();
      if (!n) return;
      if (!p) p = "Selamat menempuh hidup baru!";
      var emptyEl = document.getElementById("emptyUcapanMsg");
      if (emptyEl) emptyEl.remove();
      totalUcapan += 1;
      if (s === "Hadir") totalHadir += 1;
      document.getElementById("totalUcapanCount").textContent = String(totalUcapan);
      document.getElementById("totalHadirCount").textContent = String(totalHadir);
      var box = document.getElementById("boxUcapanList");
      var item = document.createElement("div");
      item.className = "card-luxury rounded-2xl p-3.5 space-y-1";
      var badge = s === "Hadir" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border-rose-500/30";
      item.innerHTML = '<div class="flex justify-between items-center"><span class="text-xs font-bold text-amber-300">' + n + '</span><span class="text-[9px] px-2 py-0.5 rounded-full border ' + badge + '">' + s + '</span></div><p class="text-[11px] text-stone-300">' + p + '</p>';
      box.prepend(item);
      document.getElementById("rsvpNama").value = "";
      document.getElementById("rsvpPesan").value = "";
    }
    function updateCountdown() {
      var target = new Date(2026, 10, 23, 10, 0, 0).getTime();
      var now = new Date().getTime(); var diff = target - now;
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var m = Math.floor((diff / 1000 / 60) % 60);
      var s = Math.floor((diff / 1000) % 60);
      document.getElementById("cdDays").textContent = String(d).padStart(2, "0");
      document.getElementById("cdHours").textContent = String(h).padStart(2, "0");
      document.getElementById("cdMins").textContent = String(m).padStart(2, "0");
      document.getElementById("cdSecs").textContent = String(s).padStart(2, "0");
    }
    window.addEventListener("DOMContentLoaded", function() {
      document.getElementById("guestNameLabel").textContent = getGuest();
      setInterval(updateCountdown, 1000); updateCountdown();
    });
  </script>
</body>
</html>`;
}
