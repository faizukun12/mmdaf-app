import { InvitationConfig, UPLOADED_COUPLE_PHOTOS } from './invitationData';

export type EventCategoryId =
  | 'nikah'
  | 'aqiqah'
  | 'khitan'
  | 'wisuda'
  | 'ultah'
  | 'tasyakuran'
  | 'halal';

export type PackageTierId = 'silver' | 'gold' | 'titanium' | 'vip';

export type FrameStyleId =
  | 'arch-royal'
  | 'floating-feathered'
  | 'oval-medal'
  | 'modern-rounded';

export type CardLayoutId = 'arched-vip' | 'modern-grid' | 'editorial-stack';

export interface TemplateThemePreset {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  tier: PackageTierId;
  bgPrimary: string;
  bgSecondary: string;
  cardBg: string;
  accentHex: string;
  accentLightHex: string;
  borderRgba: string;
  textPrimary: string;
  textMuted: string;
  buttonGradient: string;
  buttonText: string;
  categoryNames: Record<EventCategoryId, string>;
}

export interface MusicTrackPreset {
  id: string;
  title: string;
  artist: string;
  categoryTag: string;
  url: string;
}

export interface StudioPackageTier {
  id: PackageTierId;
  name: string;
  tagline: string;
  priceText: string;
  originalPriceText?: string;
  periodText: string;
  badgeText: string;
  isPopular?: boolean;
  isVip?: boolean;
  maxPhotos: number;
  maxTemplates: number;
  activeDuration: string;
  points: string[];
  includedCategories: string[];
}

export interface StudioEventCategoryMeta {
  id: EventCategoryId;
  name: string;
  shortName: string;
  badgeLabel: string;
  fileSlug: string;
  description: string;
  primaryFieldLabel: string;
  secondaryFieldLabel: string;
  parentsFieldLabel: string;
  defaultPrimaryName: string;
  defaultSecondaryName: string;
  defaultParentsText: string;
  defaultDateText: string;
  defaultTimeText: string;
  defaultLocationText: string;
  defaultVenueDetail: string;
  defaultMapsUrl: string;
  defaultGreeting: string;
  defaultPrayerQuote: string;
  defaultPrayerSource: string;
  defaultStoryTitle1: string;
  defaultStoryContent1: string;
  defaultStoryTitle2: string;
  defaultStoryContent2: string;
  defaultBankName: string;
  defaultAccountNumber: string;
  defaultAccountHolder: string;
  defaultMusicId: string;
}

export interface StudioEnabledSections {
  cover: boolean;
  countdown: boolean;
  quote: boolean;
  story: boolean;
  gallery: boolean;
  timeline: boolean;
  gift: boolean;
  rsvp: boolean;
  maps: boolean;
}

export interface StudioProjectState {
  category: EventCategoryId;
  templateId: string;
  packageTier: PackageTierId;
  frameStyle: FrameStyleId;
  cardLayout: CardLayoutId;
  badgeText: string;
  primaryName: string;
  secondaryName: string;
  parentsText: string;
  guestName: string;
  dateText: string;
  countdownIso: string;
  timeText: string;
  secondSessionTitle: string;
  secondSessionTime: string;
  locationText: string;
  venueDetail: string;
  mapsUrl: string;
  openingGreeting: string;
  prayerQuote: string;
  prayerSource: string;
  closingGreeting: string;
  storyTitle1: string;
  storyContent1: string;
  storyTitle2: string;
  storyContent2: string;
  musicId: string;
  customMusicTitle: string;
  customMusicUrl: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  physicalGiftAddress: string;
  tiktokHandle: string;
  heroBackgroundUrl: string;
  mainPortraitUrl: string;
  secondaryPortraitUrl: string;
  galleryPhotoUrls: string[];
  enabledSections: StudioEnabledSections;
}

export const MUSIC_PRESETS: MusicTrackPreset[] = [
  {
    id: 'payung-teduh-akad',
    title: 'Akad (Instrumental & Vocal)',
    artist: 'Payung Teduh',
    categoryTag: 'Pernikahan & VIP',
    url: 'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3',
  },
  {
    id: 'baraka-allahu-lakuma',
    title: 'Baraka Allahu Lakuma',
    artist: 'Maher Zain',
    categoryTag: 'Pernikahan Islami',
    url: 'https://archive.org/download/MaherZainBarakaAllahuLakuma/Maher%20Zain%20-%20Baraka%20Allahu%20Lakuma.mp3',
  },
  {
    id: 'doa-syukuran-islami',
    title: 'Sholawat & Doa Syukuran Lembut',
    artist: 'Instrumental Gambus Madinah',
    categoryTag: 'Aqiqah & Khitan',
    url: 'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3',
  },
  {
    id: 'piano-graduation-glory',
    title: 'River Flows in You (Acoustic Piano)',
    artist: 'Yiruma Tribute',
    categoryTag: 'Wisuda & Tasyakuran',
    url: 'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3',
  },
  {
    id: 'happy-birthday-warm',
    title: 'Sweet Celebration Acoustic',
    artist: 'MMDAF Studio Instrumental',
    categoryTag: 'Ulang Tahun',
    url: 'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3',
  },
  {
    id: 'malige-buton-royal',
    title: 'Harmoni Klasik Istana Malige',
    artist: 'Ensemble Adat Buton',
    categoryTag: 'Adat & Halal Bi Halal',
    url: 'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3',
  },
];

// 7 TEMPLAT UNTUK SETIAP KATEGORI ACARA (7x7 = 49 Nama Templat Spesifik)
export const SEVEN_TEMPLATE_PRESETS: TemplateThemePreset[] = [
  {
    id: 'tpl-1-royal-black-gold',
    number: 1,
    name: '01. Royal Hitam Emas VIP',
    subtitle: 'Sentuhan Iconic Hitam Obsidian & Emas Murni Keraton',
    tier: 'vip',
    bgPrimary: '#0c0a09',
    bgSecondary: '#15110c',
    cardBg: 'linear-gradient(160deg, #16120c 0%, #1f1810 48%, #0a0806 100%)',
    accentHex: '#d4af37',
    accentLightHex: '#f5e3b3',
    borderRgba: 'rgba(212, 175, 55, 0.52)',
    textPrimary: '#f5e3b3',
    textMuted: '#d6d3d1',
    buttonGradient: 'linear-gradient(90deg, #b88c42 0%, #d4af37 50%, #9a722c 100%)',
    buttonText: '#0c0a08',
    categoryNames: {
      nikah: 'Royal Malige Buton Hitam Emas VIP',
      aqiqah: 'Al-Kautsar Hitam Emas VIP',
      khitan: 'Sultan Al-Fatih Hitam Emas VIP',
      wisuda: 'Magna Cumlaude Hitam Emas VIP',
      ultah: 'Golden Crown Soiree Hitam Emas VIP',
      tasyakuran: 'Mahligai Syukur Hitam Emas VIP',
      halal: 'Royal Silaturahmi Hitam Emas VIP',
    },
  },
  {
    id: 'tpl-2-emerald-heritage',
    number: 2,
    name: '02. Emerald Islamic Heritage',
    subtitle: 'Hijau Zamrud Islami Berpadu Ornamen Emas Klasik',
    tier: 'silver',
    bgPrimary: '#041610',
    bgSecondary: '#07261c',
    cardBg: 'linear-gradient(160deg, #092c20 0%, #051b14 55%, #03120d 100%)',
    accentHex: '#34d399',
    accentLightHex: '#a7f3d0',
    borderRgba: 'rgba(52, 211, 153, 0.45)',
    textPrimary: '#ecfdf5',
    textMuted: '#a7f3d0',
    buttonGradient: 'linear-gradient(90deg, #059669 0%, #34d399 50%, #047857 100%)',
    buttonText: '#022c22',
    categoryNames: {
      nikah: 'Emerald Walimatul Ursy Klasik',
      aqiqah: 'Emerald Raudhah Aqiqah',
      khitan: 'Emerald Khitanan Sholeh',
      wisuda: 'Emerald Scholar Celebration',
      ultah: 'Emerald Garden Birthday',
      tasyakuran: 'Emerald Doa Syukuran Berkah',
      halal: 'Emerald Idul Fitri & Halal Bi Halal',
    },
  },
  {
    id: 'tpl-3-sapphire-midnight',
    number: 3,
    name: '03. Sapphire Midnight Luxury',
    subtitle: 'Biru Safir Malam Elegan dengan Kilau Perak & Emas',
    tier: 'silver',
    bgPrimary: '#070d1f',
    bgSecondary: '#0e1a38',
    cardBg: 'linear-gradient(160deg, #112045 0%, #0b152e 55%, #060b19 100%)',
    accentHex: '#60a5fa',
    accentLightHex: '#dbeafe',
    borderRgba: 'rgba(96, 165, 250, 0.45)',
    textPrimary: '#f0f9ff',
    textMuted: '#bfdbfe',
    buttonGradient: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #1d4ed8 100%)',
    buttonText: '#081126',
    categoryNames: {
      nikah: 'Sapphire Starlight Wedding',
      aqiqah: 'Sapphire Little Prince Aqiqah',
      khitan: 'Sapphire Knight Walimatul Khitan',
      wisuda: 'Sapphire Unidayan Academic Pride',
      ultah: 'Sapphire Celestial Birthday Party',
      tasyakuran: 'Sapphire Grand Syukuran',
      halal: 'Sapphire Malam Silaturahmi',
    },
  },
  {
    id: 'tpl-4-rose-velvet',
    number: 4,
    name: '04. Rose Gold Velvet',
    subtitle: 'Nuansa Rose Gold Hangat, Manis, dan Romantis',
    tier: 'gold',
    bgPrimary: '#1a0916',
    bgSecondary: '#2b1025',
    cardBg: 'linear-gradient(160deg, #33132c 0%, #210c1c 55%, #140711 100%)',
    accentHex: '#f472b6',
    accentLightHex: '#fce7f3',
    borderRgba: 'rgba(244, 114, 182, 0.45)',
    textPrimary: '#fdf2f8',
    textMuted: '#fbcfe8',
    buttonGradient: 'linear-gradient(90deg, #db2777 0%, #f472b6 50%, #be185d 100%)',
    buttonText: '#1f0614',
    categoryNames: {
      nikah: 'Rose Gold Romantic Mawaddah',
      aqiqah: 'Rose Blossom Putri Sholehah',
      khitan: 'Rose Velvet Syukuran Ananda',
      wisuda: 'Rose Gold Scholarly Elegance',
      ultah: 'Sweet Pink & Rose Gold Party',
      tasyakuran: 'Rose Harmoni Keluarga',
      halal: 'Rose Hangatnya Kebersamaan',
    },
  },
  {
    id: 'tpl-5-teal-medina',
    number: 5,
    name: '05. Teal Medina Serenity',
    subtitle: 'Toska Teduh Bergaya Arsitektur Timur Tengah',
    tier: 'gold',
    bgPrimary: '#071717',
    bgSecondary: '#0d2929',
    cardBg: 'linear-gradient(160deg, #113333 0%, #0a2020 55%, #051212 100%)',
    accentHex: '#2dd4bf',
    accentLightHex: '#ccfbf1',
    borderRgba: 'rgba(45, 212, 191, 0.45)',
    textPrimary: '#f0fdfa',
    textMuted: '#99f6e4',
    buttonGradient: 'linear-gradient(90deg, #0d9488 0%, #2dd4bf 50%, #0f766e 100%)',
    buttonText: '#042f2e',
    categoryNames: {
      nikah: 'Teal Medina Sacred Vows',
      aqiqah: 'Teal Humaira Tasyakuran Bayi',
      khitan: 'Teal Nabawi Walimatul Khitan',
      wisuda: 'Teal Wisdom & Graduation',
      ultah: 'Teal Lagoon Celebration',
      tasyakuran: 'Teal Baitul Makmur Syukuran',
      halal: 'Teal Ukhuwah Halal Bi Halal',
    },
  },
  {
    id: 'tpl-6-champagne-ivory',
    number: 6,
    name: '06. Champagne Espresso Heritage',
    subtitle: 'Perpaduan Cokelat Espresso Klasik & Emas Champagne',
    tier: 'titanium',
    bgPrimary: '#14110f',
    bgSecondary: '#241e1a',
    cardBg: 'linear-gradient(160deg, #2b231d 0%, #1c1714 55%, #110e0c 100%)',
    accentHex: '#eab308',
    accentLightHex: '#fef08a',
    borderRgba: 'rgba(234, 179, 8, 0.48)',
    textPrimary: '#fafaf9',
    textMuted: '#e7e5e4',
    buttonGradient: 'linear-gradient(90deg, #ca8a04 0%, #facc15 50%, #a16207 100%)',
    buttonText: '#14110f',
    categoryNames: {
      nikah: 'Champagne Heritage Keraton',
      aqiqah: 'Champagne Berkah Buah Hati',
      khitan: 'Champagne Adat & Syukuran',
      wisuda: 'Champagne Toga Kehormatan',
      ultah: 'Champagne Sweet Seventeen',
      tasyakuran: 'Champagne Syukuran Rumah Baru',
      halal: 'Champagne Silaturahmi Akbar',
    },
  },
  {
    id: 'tpl-7-burgundy-crown',
    number: 7,
    name: '07. Burgundy Royal Velvet',
    subtitle: 'Merah Marun Bangsawan dengan Lis Emas Keraton',
    tier: 'titanium',
    bgPrimary: '#19060b',
    bgSecondary: '#2c0b14',
    cardBg: 'linear-gradient(160deg, #380e1a 0%, #240810 55%, #140409 100%)',
    accentHex: '#fbbf24',
    accentLightHex: '#fde68a',
    borderRgba: 'rgba(251, 191, 36, 0.5)',
    textPrimary: '#fff1f2',
    textMuted: '#fecdd3',
    buttonGradient: 'linear-gradient(90deg, #d97706 0%, #fbbf24 50%, #b45309 100%)',
    buttonText: '#19060b',
    categoryNames: {
      nikah: 'Burgundy Royal Mahkota Pelaminan',
      aqiqah: 'Burgundy Royal Permata Hati',
      khitan: 'Burgundy Royal Ksatria Kecil',
      wisuda: 'Burgundy Royal Sidang Senat',
      ultah: 'Burgundy Royal Gala Dinner',
      tasyakuran: 'Burgundy Royal Peresmian & Doa',
      halal: 'Burgundy Royal Pertemuan Keluarga',
    },
  },
];

export const EVENT_CATEGORIES: StudioEventCategoryMeta[] = [
  {
    id: 'nikah',
    name: 'Undangan Pernikahan (Wedding)',
    shortName: 'Pernikahan',
    badgeLabel: 'The Wedding Celebration Of',
    fileSlug: 'undangan.html',
    description: 'Undangan pernikahan adat & modern lengkap dengan 2 sesi acara, kisah cinta, galeri 4 foto, amplop BRI, dan RSVP.',
    primaryFieldLabel: 'Mempelai Wanita / Nama Utama 1',
    secondaryFieldLabel: 'Mempelai Pria / Nama Utama 2',
    parentsFieldLabel: 'Keterangan Orang Tua Kedua Mempelai',
    defaultPrimaryName: 'Raminianti, S.Ak',
    defaultSecondaryName: 'Aliadin',
    defaultParentsText: 'Putri & Putra Tercinta dari Keluarga Besar di Lahumoko, Kota Baubau',
    defaultDateText: 'Senin, 23 November 2026',
    defaultTimeText: 'Pukul 10.00 WIT - Selesai',
    defaultLocationText: 'Kediaman Mempelai, Lahumoko',
    defaultVenueDetail: 'Desa Lahumoko, Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Lahumoko+Baubau',
    defaultGreeting:
      'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir memberikan doa restu pada acara pernikahan kami.',
    defaultPrayerQuote:
      'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    defaultPrayerSource: 'QS. Ar-Rum : Ayat 21',
    defaultStoryTitle1: 'Awal Bertemu di Bawah Langit Lahumoko',
    defaultStoryContent1:
      'Dua langkah dan dua hati dipertemukan dalam kesederhanaan, belajar saling mengenal dan menautkan rasa saling percaya.',
    defaultStoryTitle2: 'Mengikat Janji & Restu Keluarga',
    defaultStoryContent2:
      'Cinta tumbuh dalam ketulusan. Dengan doa dan restu hangat kedua keluarga besar, kami memantapkan niat menyatukan takdir.',
    defaultBankName: 'Bank BRI',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'payung-teduh-akad',
  },
  {
    id: 'aqiqah',
    name: 'Tasyakuran Aqiqah Bayi',
    shortName: 'Aqiqah',
    badgeLabel: 'Tasyakuran Aqiqah & Doa Kelahiran',
    fileSlug: 'aqiqah.html',
    description: 'Undangan syukuran kelahiran & aqiqah buah hati tercinta dengan doa sholeh/sholehah dan tanda kasih bayi.',
    primaryFieldLabel: 'Nama Lengkap Bayi / Anak',
    secondaryFieldLabel: 'Hari & Tanggal Kelahiran',
    parentsFieldLabel: 'Putra / Putri dari Pasangan (Orang Tua)',
    defaultPrimaryName: 'Aisha Humaira',
    defaultSecondaryName: 'Lahir: Rabu, 10 Oktober 2026 • Baubau',
    defaultParentsText: 'Putri Pertama dari Bpk. Faisal & Ibu Raminianti',
    defaultDateText: 'Ahad, 18 Oktober 2026',
    defaultTimeText: 'Pukul 10.00 WITA - Selesai',
    defaultLocationText: 'Kediaman Keluarga, Kota Baubau',
    defaultVenueDetail: 'Kediaman Keluarga Besar di Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Kota+Baubau',
    defaultGreeting:
      'Alhamdulillahi Rabbil Alamin, telah lahir buah hati kami dengan selamat. Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri Tasyakuran Aqiqah putri kami.',
    defaultPrayerQuote:
      'Tiada kata yang seindah doa, semoga putri kami tumbuh menjadi anak yang sholehah, cerdas, berhati mulia, dan senantiasa dalam lindungan Allah SWT.',
    defaultPrayerSource: 'Doa Keberkahan Anak Sholehah',
    defaultStoryTitle1: '1. Anugerah Terindah Kelahiran',
    defaultStoryContent1:
      'Kehadiran buah hati membawa cahaya dan kebahagiaan yang tak terhingga bagi keluarga besar kami di Kota Baubau.',
    defaultStoryTitle2: '2. Ibadah Aqiqah & Cukur Rambut',
    defaultStoryContent2:
      'Sebagai wujud rasa syukur kepada Allah SWT, kami menyelenggarakan tasyakuran aqiqah dan doa bersama.',
    defaultBankName: 'Bank BRI',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'doa-syukuran-islami',
  },
  {
    id: 'khitan',
    name: 'Walimatul Khitan / Sunatan',
    shortName: 'Khitanan',
    badgeLabel: 'Walimatul Khitan',
    fileSlug: 'khitan.html',
    description: 'Undangan syukuran khitanan anak sholeh bernuansa Islami lengkap dengan jadwal doa bersama dan amplop digital.',
    primaryFieldLabel: 'Nama Anak yang Dikhitan',
    secondaryFieldLabel: 'Panggilan / Gelar Kesayangan',
    parentsFieldLabel: 'Putra Tercinta dari Pasangan',
    defaultPrimaryName: 'Muhammad Al-Fatih',
    defaultSecondaryName: 'Ananda Al-Fatih',
    defaultParentsText: 'Putra Tercinta dari Bpk. Ahmad & Ibu Siti',
    defaultDateText: 'Minggu, 20 Desember 2026',
    defaultTimeText: 'Pukul 09.00 WIT - Selesai',
    defaultLocationText: 'Kediaman Keluarga / Gedung Pertemuan, Kota Baubau',
    defaultVenueDetail: 'Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Kota+Baubau',
    defaultGreeting:
      'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i pada acara Walimatul Khitan putra tercinta kami.',
    defaultPrayerQuote:
      'Semoga ananda menjadi anak yang sholeh, taat beribadah, berbakti kepada kedua orang tua, serta berguna bagi agama, nusa, dan bangsa. Aamiin.',
    defaultPrayerSource: 'Doa Walimatul Khitan',
    defaultStoryTitle1: '1. Menjalankan Sunnah Fitrah',
    defaultStoryContent1:
      'Dengan penuh keberanian dan senyum bahagia, ananda telah melaksanakan sunnah khitan sebagai langkah awal kedewasaan.',
    defaultStoryTitle2: '2. Tasyakuran & Doa Restu',
    defaultStoryContent2:
      'Kehadiran dan doa tulus Bapak/Ibu/Saudara/i menjadi penyemangat terbesar bagi langkah masa depan ananda.',
    defaultBankName: 'Bank BRI',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'doa-syukuran-islami',
  },
  {
    id: 'wisuda',
    name: 'Tasyakuran Wisuda & Kelulusan',
    shortName: 'Wisuda',
    badgeLabel: 'Graduation Celebration',
    fileSlug: 'wisuda.html',
    description: 'Undangan syukuran wisuda sarjana & kelulusan akademik untuk rekan, sahabat, dan keluarga besar.',
    primaryFieldLabel: 'Nama Wisudawan & Gelar Akademik',
    secondaryFieldLabel: 'Program Studi / Universitas',
    parentsFieldLabel: 'Keluarga Besar yang Mengundang',
    defaultPrimaryName: 'Raminianti, S.Ak',
    defaultSecondaryName: 'Sarjana Akuntansi — Universitas Dayanu Ikhsanuddin (Unidayan) Baubau',
    defaultParentsText: 'Keluarga Besar Bpk. & Ibu di Lahumoko, Kota Baubau',
    defaultDateText: 'Sabtu, 15 Desember 2026',
    defaultTimeText: 'Pukul 13.00 WITA - Selesai',
    defaultLocationText: 'Kediaman Keluarga, Kota Baubau',
    defaultVenueDetail: 'Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Unidayan+Baubau',
    defaultGreeting:
      'Rasa syukur yang mendalam atas terselesaikannya studi ini. Kami mengundang Bapak/Ibu/Sahabat untuk hadir pada acara Syukuran Wisuda & Ramah Tamah.',
    defaultPrayerQuote:
      'Terima kasih kepada kedua orang tua, keluarga, dosen, dan sahabat atas doa serta dukungannya. Semoga ilmu yang diraih membawa keberkahan dan manfaat luas.',
    defaultPrayerSource: 'Ungkapan Syukur Wisuda',
    defaultStoryTitle1: '1. Perjuangan Menuntut Ilmu',
    defaultStoryContent1:
      'Setiap lembar skripsi dan doa malam menjadi saksi perjalanan menempuh pendidikan tinggi di Unidayan Baubau.',
    defaultStoryTitle2: '2. Awal Pengabdian Baru',
    defaultStoryContent2:
      'Toga kehormatan ini bukanlah akhir, melainkan awal langkah baru untuk berkarya dan membanggakan keluarga.',
    defaultBankName: 'Bank BRI',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'piano-graduation-glory',
  },
  {
    id: 'ultah',
    name: 'Pesta Ulang Tahun (Anak & Dewasa)',
    shortName: 'Ulang Tahun',
    badgeLabel: 'Birthday Celebration',
    fileSlug: 'ultah.html',
    description: 'Undangan pesta ulang tahun anak maupun Sweet Seventeen dengan informasi dresscode, lokasi kafe/resto, dan kado digital.',
    primaryFieldLabel: 'Nama yang Berulang Tahun',
    secondaryFieldLabel: 'Usia / Tema Perayaan',
    parentsFieldLabel: 'Keluarga / Penyelenggara Pesta',
    defaultPrimaryName: 'Nayra Khayla',
    defaultSecondaryName: 'Is Turning 5 Years Old! • Dresscode: Pastel / Ceria',
    defaultParentsText: 'Keluarga Bpk. Faisal & Ibu Raminianti — Kota Baubau',
    defaultDateText: 'Sabtu, 28 November 2026',
    defaultTimeText: 'Pukul 15.30 WITA - Selesai',
    defaultLocationText: 'Kafe / Resto Pesta, Kota Baubau',
    defaultVenueDetail: 'Pusat Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Kota+Baubau',
    defaultGreeting:
      'Keceriaan masa kecil adalah kenangan terindah. Kami mengundang teman-teman dan sahabat untuk hadir merayakan ulang tahun bersama!',
    defaultPrayerQuote:
      'Semoga panjang umur, sehat selalu, makin pintar, dan senantiasa membawa kebahagiaan bagi orang-orang di sekitarnya.',
    defaultPrayerSource: 'Doa & Harapan Ulang Tahun',
    defaultStoryTitle1: '1. Bertambah Usia, Bertambah Ceria',
    defaultStoryContent1:
      'Tahun demi tahun berlalu penuh tawa dan langkah kecil yang menggemaskan bersama keluarga tercinta.',
    defaultStoryTitle2: '2. Pesta Tiup Lilin &Potong Kue',
    defaultStoryContent2:
      'Mari berkumpul, berbagi tawa, berfoto bersama, dan menikmati hidangan spesial di hari bahagia ini.',
    defaultBankName: 'Bank BRI / DANA',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'happy-birthday-warm',
  },
  {
    id: 'tasyakuran',
    name: 'Tasyakuran Rumah / Usaha / 7 Bulanan',
    shortName: 'Tasyakuran',
    badgeLabel: 'Syukuran & Doa Bersama',
    fileSlug: 'tasyakuran.html',
    description: 'Undangan tasyakuran rumah baru, peresmian usaha, maupun syukuran kehamilan 4/7 bulanan.',
    primaryFieldLabel: 'Nama Keluarga / Usaha yang Berhajat',
    secondaryFieldLabel: 'Jenis Hajat Tasyakuran',
    parentsFieldLabel: 'Penyelenggara / Tuan Rumah',
    defaultPrimaryName: 'Keluarga Besar Aliadin & Raminianti, S.Ak',
    defaultSecondaryName: 'Tasyakuran menempati Kediaman Baru & Doa Bersama',
    defaultParentsText: 'Tuan Rumah: Keluarga Besar di Lahumoko, Kota Baubau',
    defaultDateText: 'Minggu, 06 Desember 2026',
    defaultTimeText: 'Pukul 16.00 WITA - Selesai',
    defaultLocationText: 'Kediaman Baru Keluarga, Kota Baubau',
    defaultVenueDetail: 'Lahumoko, Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Lahumoko+Baubau',
    defaultGreeting:
      'Sebagai wujud syukur atas nikmat dan karunia Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran & Doa Bersama.',
    defaultPrayerQuote:
      'Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu. (QS. Ibrahim: 7)',
    defaultPrayerSource: 'QS. Ibrahim : Ayat 7',
    defaultStoryTitle1: '1. Ungkapan Rasa Syukur',
    defaultStoryContent1:
      'Segala puji bagi Allah SWT atas limpahan rezeki, kesehatan, dan ketenteraman yang diberikan kepada keluarga kami.',
    defaultStoryTitle2: '2. Silaturahmi & Doa Keberkahan',
    defaultStoryContent2:
      'Kehadiran dan lantunan doa dari Bapak/Ibu/Saudara/i menjadi berkah yang sangat berarti bagi kami.',
    defaultBankName: 'Bank BRI',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'doa-syukuran-islami',
  },
  {
    id: 'halal',
    name: 'Halal Bi Halal & Buka Puasa Bersama',
    shortName: 'Halal Bi Halal',
    badgeLabel: 'Silaturahmi & Halal Bi Halal',
    fileSlug: 'halal-bihalal.html',
    description: 'Undangan Halal Bi Halal keluarga besar, reuni akbar, maupun buka puasa bersama (Bukber) komunitas/instansi.',
    primaryFieldLabel: 'Nama Keluarga Besar / Instansi / Angkatan',
    secondaryFieldLabel: 'Tema Silaturahmi',
    parentsFieldLabel: 'Panitia / Koordinator Acara',
    defaultPrimaryName: 'Keluarga Besar Kerukunan Lahumoko & Baubau',
    defaultSecondaryName: 'Merajut Ukhuwah, Menjemput Berkah di Hari Kemenangan',
    defaultParentsText: 'Panitia Pelaksana Silaturahmi Akbar Kota Baubau',
    defaultDateText: 'Sabtu, 20 Maret 2027',
    defaultTimeText: 'Pukul 09.30 WITA - Selesai',
    defaultLocationText: 'Aula Pertemuan Utama, Kota Baubau',
    defaultVenueDetail: 'Kota Baubau, Sulawesi Tenggara',
    defaultMapsUrl: 'https://maps.google.com/?q=Kota+Baubau',
    defaultGreeting:
      'Taqabbalallahu Minna Wa Minkum. Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Halal Bi Halal & Temu Kangen.',
    defaultPrayerQuote:
      'Barangsiapa yang ingin diluaskan rezekinya dan dipanjangkan umurnya, maka hendaklah ia menyambung tali silaturahmi.',
    defaultPrayerSource: 'HR. Bukhari & Muslim',
    defaultStoryTitle1: '1. Mempererat Tali Persaudaraan',
    defaultStoryContent1:
      'Momentum berharga untuk saling memaafkan, melepas rindu, dan memperkokoh ikatan kekeluargaan lintas generasi.',
    defaultStoryTitle2: '2. Ramah Tamah & Santap Kasih',
    defaultStoryContent2:
      'Mari hadir bersama keluarga tercinta untuk berbagi cerita hangat dan mengabadikan kebersamaan.',
    defaultBankName: 'Bank BRI',
    defaultAccountNumber: '488901053910537',
    defaultAccountHolder: 'a.n. RAMINIANTI',
    defaultMusicId: 'malige-buton-royal',
  },
];

// 4 PAKET STUDIO MMDAF.MY.ID (SILVER GRATIS, GOLD, TITANIUM, VIP)
export const STUDIO_PACKAGES: StudioPackageTier[] = [
  {
    id: 'silver',
    name: 'Paket Silver',
    tagline: 'Untuk pasangan & keluarga yang ingin mencoba undangan digital praktis tanpa biaya.',
    priceText: 'GRATIS',
    originalPriceText: 'Rp 45.000',
    periodText: 'Klaim via Follow TikTok @mmdaf.studio.project',
    badgeText: 'Free Promo • Klaim Instan',
    maxPhotos: 4,
    maxTemplates: 2,
    activeDuration: 'Masa Aktif 1 Bulan',
    includedCategories: ['Pernikahan', 'Aqiqah', 'Khitanan', 'Ulang Tahun', 'Wisuda'],
    points: [
      'Gratis Rp 0 cukup Follow TikTok @mmdaf.studio.project & masukkan kode kunci G-Faizu_3.8',
      'Akses 2 Templat Pilihan di setiap kategori acara (Pernikahan, Aqiqah, Khitan, dll.)',
      'Kuota hingga 4 Foto Galeri & Sampul dalam bingkai dasbor rapi',
      'Musik latar bawaan (Payung Teduh - Akad / Musik Syukuran Islami)',
      'Edit nama tokoh utama/mempelai, tanggal, waktu, dan lokasi acara',
      'Amplop Digital 1 Nomor Rekening / E-Wallet dengan tombol salin',
      'Masa aktif tautan undangan selama 1 Bulan di mmdaf.my.id',
    ],
  },
  {
    id: 'gold',
    name: 'Paket Gold',
    tagline: 'Pilihan hemat dengan fitur musik kustom, peta lokasi, dan konfirmasi kehadiran tamu.',
    priceText: 'Rp 75.000',
    originalPriceText: 'Rp 120.000',
    periodText: 'Sekali bayar • Langsung aktif',
    badgeText: 'Paket Hemat Populer',
    maxPhotos: 8,
    maxTemplates: 5,
    activeDuration: 'Masa Aktif 6 Bulan',
    includedCategories: ['Semua 7 Kategori Acara Studio MMDAF'],
    points: [
      'Bebas pilih 5 Templat Premium untuk masing-masing kategori acara',
      'Kuota hingga 8 Foto Resolusi Tinggi dengan bingkai melengkung elegan',
      'Bebas ganti musik latar dari daftar lagu populer atau tautan MP3 pilihan',
      'Kustomisasi kata-kata sapaan, kutipan ayat Al-Qur’an / doa, dan 2 sesi acara',
      'Sematkan Peta Lokasi Google Maps interaktif & tombol penunjuk arah',
      'Amplop Digital 2 Rekening + Formulir Ucapan Doa Restu & Konfirmasi RSVP',
      'Masa aktif tautan undangan selama 6 Bulan penuh',
    ],
  },
  {
    id: 'titanium',
    name: 'Paket Titanium',
    tagline: 'Fitur lengkap untuk acara besar dengan seluruh 7 templat, kisah perjalanan, dan QR tamu.',
    priceText: 'Rp 135.000',
    originalPriceText: 'Rp 210.000',
    periodText: 'Sekali bayar • Bebas revisi teks',
    badgeText: 'Best Seller Studio',
    isPopular: true,
    maxPhotos: 12,
    maxTemplates: 7,
    activeDuration: 'Masa Aktif 1 Tahun',
    includedCategories: ['Semua 7 Kategori Acara + Multi-Sesi Lengkap'],
    points: [
      'Akses penuh seluruh 7 Templat Eksklusif di setiap kategori acara (Total 49 variasi)',
      'Bebas mengatur Layout dalam undangan (Gaya Bingkai Sampul, Tata Letak Kartu, Urutan Seksi)',
      'Fitur Kisah Perjalanan (Our Story 3 Babak) & Timeline Susunan Acara Lengkap',
      'Upload musik MP3 sendiri + Fitur Auto-Scroll Layar Otomatis untuk tamu',
      'Desain Kartu ATM Eksklusif untuk Amplop Digital + Modal Kirim Kado Fisik',
      'QR Code Check-In Tamu & generator nama tamu tak terbatas (?to=Nama+Tamu)',
      'Masa aktif tautan undangan selama 1 Tahun penuh',
    ],
  },
  {
    id: 'vip',
    name: 'Paket VIP Exclusive',
    tagline: 'Mahakarya Royal Hitam & Emas seperti website undangan utama ini + Akses Full Script HTML.',
    priceText: 'Rp 225.000',
    originalPriceText: 'Rp 350.000',
    periodText: 'Sekali bayar • Aktif Selamanya (Lifetime)',
    badgeText: 'Iconic VIP Hitam & Emas',
    isVip: true,
    maxPhotos: 20,
    maxTemplates: 7,
    activeDuration: 'Aktif Selamanya (Lifetime)',
    includedCategories: ['Semua 7 Kategori Acara + Royal Malige Buton VIP Edition'],
    points: [
      'Mencakup seluruh fitur Titanium + Tema Iconic VIP Hitam & Emas (Royal Malige Buton Edition)',
      'Dasbor Foto Mengambang (Floating Feathered Photo) menyatu halus dengan latar belakang website',
      'Akses penuh 7 Templat x 7 Kategori Acara (Pernikahan, Aqiqah, Khitan, Wisuda, Ultah, Tasyakuran, Halal Bi Halal)',
      'Editor Studio Lengkap: Kustomisasi penuh musik, layout bingkai, kata-kata, ayat, kisah, dan galeri',
      'Bebas Salin & Unduh Full Script HTML Mandiri (undangan.html, aqiqah.html, index.html, editor.html)',
      'Sinkronisasi PWA manifest.json untuk tampilan aplikasi layar penuh di smartphone tamu',
      'Masa aktif tautan Selamanya (Lifetime) + Pendampingan prioritas tim MMDAF Studio Baubau',
    ],
  },
];

export function getCategoryMeta(categoryId: EventCategoryId): StudioEventCategoryMeta {
  return (
    EVENT_CATEGORIES.find((c) => c.id === categoryId) || EVENT_CATEGORIES[0]
  );
}

export function getTemplatePreset(templateId: string): TemplateThemePreset {
  return (
    SEVEN_TEMPLATE_PRESETS.find((t) => t.id === templateId) ||
    SEVEN_TEMPLATE_PRESETS[0]
  );
}

export function getMusicPreset(musicId: string): MusicTrackPreset {
  return (
    MUSIC_PRESETS.find((m) => m.id === musicId) || MUSIC_PRESETS[0]
  );
}

export function createDefaultStudioProject(
  categoryId: EventCategoryId = 'nikah',
  templateId: string = 'tpl-1-royal-black-gold',
  packageTier: PackageTierId = 'vip'
): StudioProjectState {
  const cat = getCategoryMeta(categoryId);
  return {
    category: categoryId,
    templateId,
    packageTier,
    frameStyle: 'floating-feathered',
    cardLayout: 'arched-vip',
    badgeText: cat.badgeLabel,
    primaryName: cat.defaultPrimaryName,
    secondaryName: cat.defaultSecondaryName,
    parentsText: cat.defaultParentsText,
    guestName: 'Tamu Undangan Terhormat',
    dateText: cat.defaultDateText,
    countdownIso: '2026-11-23T10:00:00+09:00',
    timeText: cat.defaultTimeText,
    secondSessionTitle:
      categoryId === 'nikah' ? 'Resepsi Pernikahan' : 'Ramah Tamah & Doa Bersama',
    secondSessionTime:
      categoryId === 'nikah' ? 'Pukul 14.00 - 17.00 WIT' : 'Selesai Acara Utama',
    locationText: cat.defaultLocationText,
    venueDetail: cat.defaultVenueDetail,
    mapsUrl: cat.defaultMapsUrl,
    openingGreeting: cat.defaultGreeting,
    prayerQuote: cat.defaultPrayerQuote,
    prayerSource: cat.defaultPrayerSource,
    closingGreeting:
      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadirannya kami ucapkan terima kasih.',
    storyTitle1: cat.defaultStoryTitle1,
    storyContent1: cat.defaultStoryContent1,
    storyTitle2: cat.defaultStoryTitle2,
    storyContent2: cat.defaultStoryContent2,
    musicId: cat.defaultMusicId,
    customMusicTitle: '',
    customMusicUrl: '',
    bankName: cat.defaultBankName,
    accountNumber: cat.defaultAccountNumber,
    accountHolder: cat.defaultAccountHolder,
    physicalGiftAddress: 'Kediaman Keluarga, Desa Lahumoko / Kota Baubau',
    tiktokHandle: 'mmdaf.studio.project',
    heroBackgroundUrl: '/assets/aistudio/1794388703749_7a2ccb9a.jpg',
    mainPortraitUrl: UPLOADED_COUPLE_PHOTOS.royalArch,
    secondaryPortraitUrl: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
    galleryPhotoUrls: [
      UPLOADED_COUPLE_PHOTOS.royalArch,
      UPLOADED_COUPLE_PHOTOS.goldSilk,
      UPLOADED_COUPLE_PHOTOS.baroqueFrame,
      UPLOADED_COUPLE_PHOTOS.ringShowcase,
    ],
    enabledSections: {
      cover: true,
      countdown: true,
      quote: true,
      story: true,
      gallery: true,
      timeline: true,
      gift: true,
      rsvp: true,
      maps: true,
    },
  };
}

export function applyCategorySwitchToProject(
  current: StudioProjectState,
  nextCategory: EventCategoryId
): StudioProjectState {
  const cat = getCategoryMeta(nextCategory);
  return {
    ...current,
    category: nextCategory,
    badgeText: cat.badgeLabel,
    primaryName: cat.defaultPrimaryName,
    secondaryName: cat.defaultSecondaryName,
    parentsText: cat.defaultParentsText,
    dateText: cat.defaultDateText,
    timeText: cat.defaultTimeText,
    secondSessionTitle:
      nextCategory === 'nikah' ? 'Resepsi Pernikahan' : 'Ramah Tamah & Jamuan Kasih',
    secondSessionTime:
      nextCategory === 'nikah' ? 'Pukul 14.00 - 17.00 WIT' : 'Setelah Sesi Utama Selesai',
    locationText: cat.defaultLocationText,
    venueDetail: cat.defaultVenueDetail,
    mapsUrl: cat.defaultMapsUrl,
    openingGreeting: cat.defaultGreeting,
    prayerQuote: cat.defaultPrayerQuote,
    prayerSource: cat.defaultPrayerSource,
    storyTitle1: cat.defaultStoryTitle1,
    storyContent1: cat.defaultStoryContent1,
    storyTitle2: cat.defaultStoryTitle2,
    storyContent2: cat.defaultStoryContent2,
    bankName: cat.defaultBankName,
    accountNumber: cat.defaultAccountNumber,
    accountHolder: cat.defaultAccountHolder,
    musicId: cat.defaultMusicId,
  };
}

export function verifyTiktokFreeClaim(
  usernameInput: string,
  secretKeyInput: string
): { valid: boolean; normalizedUser: string; message: string } {
  const rawUser = usernameInput.trim();
  const rawKey = secretKeyInput.trim().toLowerCase();

  if (!rawUser) {
    return {
      valid: false,
      normalizedUser: '',
      message:
        'Mohon isi username akun TikTok Anda yang dipakai untuk follow @mmdaf.studio.project terlebih dahulu.',
    };
  }

  const normalizedUser = rawUser.startsWith('@') ? rawUser : `@${rawUser}`;

  if (rawKey === 'g-faizu_3.8' || rawKey === 'g_faizu_3.8') {
    return {
      valid: true,
      normalizedUser,
      message: `Verifikasi akun ${normalizedUser} berhasil! Paket Silver Gratis telah aktif di Studio Editor.`,
    };
  }

  return {
    valid: false,
    normalizedUser,
    message:
      'Kode kunci belum sesuai. Gunakan kode kunci resmi dari bio TikTok @mmdaf.studio.project (Contoh: G-Faizu_3.8).',
  };
}

export function generateCustomEventHtml(project: StudioProjectState): string {
  const cat = getCategoryMeta(project.category);
  const tpl = getTemplatePreset(project.templateId);
  const music = getMusicPreset(project.musicId);
  const activeMusicTitle =
    project.customMusicTitle.trim() || `${music.artist} — ${music.title}`;
  const activeMusicUrl = project.customMusicUrl.trim() || music.url;
  const tplCategoryTitle = tpl.categoryNames[project.category] || tpl.name;

  const isCoupleCategory = project.category === 'nikah';
  const mainHeading = isCoupleCategory
    ? `${project.primaryName.split(',')[0]} & ${project.secondaryName.split(',')[0]}`
    : project.primaryName;

  const borderRadiusCss =
    project.frameStyle === 'arch-royal'
      ? '130px 130px 22px 22px'
      : project.frameStyle === 'oval-medal'
      ? '9999px'
      : '24px';

  const galleryHtml = project.enabledSections.gallery
    ? `
    <section class="sec-card">
      <p class="kicker">Galeri Potret Kebahagiaan</p>
      <h2 class="sec-title">Momen Indah Kami</h2>
      <div class="gallery-grid">
        ${project.galleryPhotoUrls
          .slice(0, 4)
          .map(
            (url, i) => `
          <div class="gallery-item">
            <div class="photo-frame" style="aspect-ratio: 3/4; border-radius: 16px;">
              <img src="${url}" alt="Galeri ${i + 1}" />
            </div>
          </div>`
          )
          .join('')}
      </div>
    </section>`
    : '';

  const storyHtml = project.enabledSections.story
    ? `
    <section class="sec-card">
      <p class="kicker">Kisah & Perjalanan</p>
      <h2 class="sec-title">Cerita Bahagia</h2>
      <div class="story-box">
        <h4>${project.storyTitle1}</h4>
        <p>${project.storyContent1}</p>
      </div>
      <div class="story-box" style="margin-top: 12px;">
        <h4>${project.storyTitle2}</h4>
        <p>${project.storyContent2}</p>
      </div>
    </section>`
    : '';

  const quoteHtml = project.enabledSections.quote
    ? `
    <div class="quote-box">
      <p class="quote-text">"${project.prayerQuote}"</p>
      <p class="quote-src">— ${project.prayerSource} —</p>
    </div>`
    : '';

  const giftHtml = project.enabledSections.gift
    ? `
    <section class="sec-card">
      <p class="kicker">Tanda Kasih & Amplop Digital</p>
      <h2 class="sec-title">Titip Hadiah</h2>
      <div class="atm-card">
        <div class="atm-bank">${project.bankName}</div>
        <div class="atm-num" id="rekNum">${project.accountNumber}</div>
        <div class="atm-holder">${project.accountHolder}</div>
        <button type="button" class="btn-main" onclick="navigator.clipboard.writeText('${project.accountNumber}'); this.textContent='Nomor Rekening Tersalin!';">Salin Nomor Rekening</button>
      </div>
    </section>`
    : '';

  const rsvpHtml = project.enabledSections.rsvp
    ? `
    <section class="sec-card">
      <p class="kicker">Doa Restu & Konfirmasi</p>
      <h2 class="sec-title">Kehadiran & Ucapan</h2>
      <form onsubmit="submitWish(event)" class="rsvp-form">
        <input id="wName" type="text" placeholder="Nama Anda" value="${project.guestName}" required />
        <textarea id="wMsg" rows="3" placeholder="Tuliskan ucapan & doa restu..." required></textarea>
        <select id="wStatus">
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Berhalangan Hadir</option>
        </select>
        <button type="submit" class="btn-main">Kirim Doa Restu</button>
      </form>
      <div class="stats-bar">
        <span id="statWishes">0 Total Ucapan</span> · <span id="statAttend">0 Orang Menyatakan Hadir</span>
      </div>
      <div id="wishList" class="wish-list">
        <p class="empty-wish">Belum ada ucapan dan konfirmasi kehadiran.</p>
      </div>
    </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="${tpl.accentHex}" />
  <title>${cat.badgeLabel} — ${mainHeading} | mmdaf.my.id</title>
  <link rel="manifest" href="manifest.json" />
  <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link href="https://fonts.cdnfonts.com/css/photograph-signature" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: ${tpl.bgPrimary};
      color: ${tpl.textPrimary};
      font-family: 'Playfair Display', Georgia, serif;
      overflow-x: hidden;
    }
    .shell {
      max-width: 430px;
      margin: 0 auto;
      min-height: 100vh;
      background: linear-gradient(180deg, ${tpl.bgSecondary} 0%, ${tpl.bgPrimary} 100%);
      border-left: 1px solid ${tpl.borderRgba};
      border-right: 1px solid ${tpl.borderRgba};
      padding-bottom: 48px;
    }
    .hero {
      position: relative;
      padding: 44px 22px 36px;
      text-align: center;
      border-bottom: 1px solid ${tpl.borderRgba};
    }
    .kicker {
      font-family: 'Averia Serif Libre', serif;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.24em;
      color: ${tpl.accentHex};
      margin-bottom: 6px;
    }
    .main-title {
      font-family: 'Photograph Signature', cursive, serif;
      font-size: 42px;
      font-weight: 400;
      color: #ffffff;
      line-height: 1.2;
      margin: 6px 0;
    }
    .sub-line {
      font-size: 13px;
      color: ${tpl.textMuted};
      margin-bottom: 18px;
    }
    .photo-frame {
      width: 224px;
      height: 298px;
      margin: 16px auto;
      overflow: hidden;
      border-radius: ${borderRadiusCss};
      border: 1.5px solid ${tpl.accentHex};
      box-shadow: 0 14px 32px rgba(0,0,0,0.7);
      background: #0a0806;
    }
    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .sec-card {
      margin: 22px 16px;
      padding: 26px 18px;
      background: ${tpl.cardBg};
      border: 1px solid ${tpl.borderRgba};
      border-radius: ${project.cardLayout === 'arched-vip' ? '32px' : '20px'};
      text-align: center;
      box-shadow: 0 14px 32px rgba(0,0,0,0.55);
    }
    .sec-title {
      font-family: 'Photograph Signature', cursive, serif;
      font-size: 36px;
      font-weight: 400;
      color: ${tpl.accentLightHex};
      margin-bottom: 12px;
    }
    .quote-box, .story-box, .atm-card {
      background: rgba(0,0,0,0.38);
      border: 1px solid ${tpl.borderRgba};
      border-radius: 18px;
      padding: 16px;
      margin-top: 14px;
      font-size: 12.5px;
      line-height: 1.7;
      color: ${tpl.textMuted};
    }
    .quote-src {
      margin-top: 8px;
      font-weight: 700;
      color: ${tpl.accentHex};
    }
    .btn-main {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 14px;
      padding: 10px 22px;
      border-radius: 999px;
      border: none;
      background: ${tpl.buttonGradient};
      color: ${tpl.buttonText};
      font-family: 'Averia Serif Libre', serif;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      text-decoration: none;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 12px;
    }
    .gallery-grid .photo-frame {
      width: 100%;
      height: auto;
      margin: 0;
    }
    .atm-num {
      font-family: monospace;
      font-size: 18px;
      font-weight: 700;
      color: ${tpl.accentLightHex};
      letter-spacing: 0.08em;
      margin: 6px 0;
    }
    .rsvp-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }
    .rsvp-form input, .rsvp-form textarea, .rsvp-form select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid ${tpl.borderRgba};
      background: rgba(0,0,0,0.55);
      color: #ffffff;
      font-family: inherit;
      font-size: 12.5px;
    }
    .stats-bar {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid ${tpl.borderRgba};
      font-size: 12px;
      color: ${tpl.accentLightHex};
    }
    .wish-list {
      margin-top: 10px;
      text-align: left;
      font-size: 12px;
    }
    .empty-wish {
      text-align: center;
      font-style: italic;
      color: ${tpl.textMuted};
      padding: 10px 0;
    }
    footer {
      text-align: center;
      padding: 24px 16px 12px;
      font-size: 11px;
      color: ${tpl.textMuted};
    }
  </style>
</head>
<body>
  <audio id="bgMusic" loop preload="auto">
    <source src="${activeMusicUrl}" type="audio/mpeg" />
  </audio>
  <div class="shell">
    <header class="hero">
      <p class="kicker">${project.badgeText} • ${tplCategoryTitle}</p>
      <h1 class="main-title">${mainHeading}</h1>
      <p class="sub-line">${project.dateText} • ${project.locationText}</p>
      <div class="photo-frame">
        <img src="${project.mainPortraitUrl}" alt="${mainHeading}" />
      </div>
      <p class="sub-line" style="max-width: 330px; margin: 12px auto 0; line-height: 1.7;">
        ${project.openingGreeting}
      </p>
      ${quoteHtml}
    </header>

    <section class="sec-card">
      <p class="kicker">${cat.primaryFieldLabel}</p>
      <h2 class="sec-title">${project.primaryName}</h2>
      <p class="sub-line">${project.secondaryName}</p>
      <p style="font-size: 12.5px; color: ${tpl.textMuted}; line-height: 1.6;">${project.parentsText}</p>
      <a class="btn-main" href="https://www.tiktok.com/@${project.tiktokHandle}" target="_blank" rel="noopener noreferrer">TikTok @${project.tiktokHandle}</a>
    </section>

    <section class="sec-card">
      <p class="kicker">Waktu & Tempat Acara</p>
      <h2 class="sec-title">Save The Date</h2>
      <p style="font-size: 15px; font-weight: 700; color: ${tpl.accentLightHex};">${project.dateText}</p>
      <p style="font-size: 13.5px; margin-top: 6px;">${project.timeText}</p>
      <p style="font-size: 13px; color: ${tpl.textMuted}; margin-top: 4px;">${project.locationText}</p>
      <p style="font-size: 11.5px; color: ${tpl.textMuted}; margin-top: 2px;">${project.venueDetail}</p>
      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed ${tpl.borderRgba};">
        <p style="font-size: 13px; font-weight: 700; color: ${tpl.accentHex};">${project.secondSessionTitle}</p>
        <p style="font-size: 12.5px; margin-top: 2px;">${project.secondSessionTime}</p>
      </div>
      ${
        project.enabledSections.maps
          ? `<a class="btn-main" href="${project.mapsUrl}" target="_blank" rel="noopener noreferrer">Buka Peta Lokasi Acara</a>`
          : ''
      }
    </section>

    ${storyHtml}
    ${galleryHtml}
    ${giftHtml}
    ${rsvpHtml}

    <footer>
      <p>Musik Latar: ${activeMusicTitle}</p>
      <p style="margin-top: 4px;">mmdaf.my.id • Karya : G-Faizu_3.8 • TikTok @${project.tiktokHandle}</p>
    </footer>
  </div>
  <script>
    var wishCount = 0;
    var attendCount = 0;
    function submitWish(e) {
      e.preventDefault();
      var name = document.getElementById('wName').value.trim();
      var msg = document.getElementById('wMsg').value.trim();
      var status = document.getElementById('wStatus').value;
      if (!name || !msg) return;
      wishCount += 1;
      if (status === 'Hadir') attendCount += 1;
      document.getElementById('statWishes').textContent = wishCount + ' Total Ucapan';
      document.getElementById('statAttend').textContent = attendCount + ' Orang Menyatakan Hadir';
      var list = document.getElementById('wishList');
      if (wishCount === 1) list.innerHTML = '';
      var item = document.createElement('div');
      item.style.padding = '10px 0';
      item.style.borderBottom = '1px solid rgba(212,175,55,0.2)';
      item.innerHTML = '<strong>' + name + '</strong> (' + status + ')<br/><span>' + msg + '</span>';
      list.prepend(item);
      document.getElementById('wMsg').value = '';
    }
  </script>
</body>
</html>`;
}

export function syncStudioProjectToInvitationConfig(
  baseConfig: InvitationConfig,
  project: StudioProjectState
): InvitationConfig {
  const music = getMusicPreset(project.musicId);
  const tpl = getTemplatePreset(project.templateId);
  const brideNick =
    project.primaryName.split(',')[0].trim().split(' ')[0] ||
    project.primaryName;
  const groomNick =
    project.secondaryName.split(',')[0].trim().split(' ')[0] ||
    project.secondaryName;

  return {
    ...baseConfig,
    editionBadge: `${tpl.categoryNames[project.category]} • ${project.packageTier.toUpperCase()}`,
    eventSummaryLine: `${project.dateText} • ${project.locationText}`,
    brideNickname: brideNick,
    brideFullName: project.primaryName,
    brideInstagram: project.tiktokHandle,
    brideAddress: project.parentsText,
    groomNickname: groomNick,
    groomFullName: project.secondaryName,
    groomInstagram: project.tiktokHandle,
    groomAddress: project.venueDetail,
    openingGreeting: project.openingGreeting,
    quranTranslation: project.prayerQuote,
    quranSource: `- ${project.prayerSource} -`,
    closingGreeting: project.closingGreeting,
    musicTitle:
      project.customMusicTitle.trim() || `${music.artist} — ${music.title}`,
    musicUrl: project.customMusicUrl.trim() || music.url,
    heroImageUrl: project.heroBackgroundUrl || baseConfig.heroImageUrl,
    coverFloatingPhotoUrl:
      project.mainPortraitUrl || baseConfig.coverFloatingPhotoUrl,
    heroFloatingPhotoUrl:
      project.mainPortraitUrl || baseConfig.heroFloatingPhotoUrl,
    bridePhotoUrl: project.mainPortraitUrl || baseConfig.bridePhotoUrl,
    groomPhotoUrl: project.secondaryPortraitUrl || baseConfig.groomPhotoUrl,
    events: baseConfig.events.map((ev, index) =>
      index === 0
        ? {
            ...ev,
            timeText: project.timeText,
            venueText: project.locationText,
            mapsUrl: project.mapsUrl,
          }
        : {
            ...ev,
            title: project.secondSessionTitle,
            timeText: project.secondSessionTime,
            venueText: project.locationText,
            mapsUrl: project.mapsUrl,
          }
    ),
    stories: baseConfig.stories.map((st, index) =>
      index === 0
        ? {
            ...st,
            title: project.storyTitle1,
            content: project.storyContent1,
            photoUrl: project.galleryPhotoUrls[0] || st.photoUrl,
          }
        : index === 1
        ? {
            ...st,
            title: project.storyTitle2,
            content: project.storyContent2,
            photoUrl: project.galleryPhotoUrls[1] || st.photoUrl,
          }
        : st
    ),
    bankAccounts: [
      {
        id: 'bank-primary',
        bankName: project.bankName,
        bankCode: 'BRI',
        accountNumber: project.accountNumber,
        accountHolder: project.accountHolder,
      },
    ],
  };
}

export type StudioEditorProject = StudioProjectState;

export function generateStandaloneVisitorIndexHtml(): string {
  const packagesHtml = STUDIO_PACKAGES.map(
    (pkg) => `
      <div class="pkg-card ${pkg.isVip ? 'pkg-vip' : ''}">
        <div class="pkg-top">
          <span class="pkg-badge">${pkg.badgeText}</span>
          <span class="pkg-quota">${pkg.maxTemplates} Templat · ${pkg.maxPhotos} Foto</span>
        </div>
        <h3>${pkg.name}</h3>
        <p class="pkg-tag">${pkg.tagline}</p>
        <div class="pkg-price-box">
          ${pkg.originalPriceText ? `<span class="pkg-strike">${pkg.originalPriceText}</span>` : ''}
          <div class="pkg-price">${pkg.priceText}</div>
          <div class="pkg-period">${pkg.periodText}</div>
        </div>
        <div class="pkg-points-title">Poin-Poin Fitur ${pkg.name}:</div>
        <ul class="pkg-points">
          ${pkg.points.map((pt) => `<li>✓ <span>${pt}</span></li>`).join('')}
        </ul>
        <a href="editor.html?tier=${pkg.id}" class="pkg-btn">${
          pkg.id === 'silver'
            ? 'Klaim & Buat Gratis Sekarang'
            : `Pilih ${pkg.name} & Buka Editor`
        }</a>
      </div>`
  ).join('\n');

  const categoriesHtml = EVENT_CATEGORIES.map(
    (cat) => `
      <div class="cat-card">
        <div class="cat-head">
          <strong>${cat.name}</strong>
          <span class="cat-slug">${cat.fileSlug}</span>
        </div>
        <p>${cat.description}</p>
        <div class="tpl-pills">
          ${SEVEN_TEMPLATE_PRESETS.map(
            (t) =>
              `<span class="tpl-pill">0${t.number}. ${t.categoryNames[cat.id]}</span>`
          ).join('')}
        </div>
        <div class="cat-actions">
          <a href="${cat.fileSlug}" class="btn-outline">Lihat Contoh ${cat.shortName}</a>
          <a href="editor.html?cat=${cat.id}" class="btn-gold">Buat ${cat.shortName} (7 Templat)</a>
        </div>
      </div>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MMDAF Studio (mmdaf.my.id) — Portal Paket Undangan Digital & Aplikasi Editor 7x7</title>
  <meta name="theme-color" content="#b45309" />
  <link rel="manifest" href="manifest.json" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Golos+Text:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0c0a09; color: #f5f5f4; font-family: 'Golos Text', sans-serif; line-height: 1.6; }
    a { text-decoration: none; color: inherit; }
    .topbar { position: sticky; top: 0; z-index: 50; background: rgba(17,14,10,0.95); border-bottom: 1px solid rgba(212,175,55,0.35); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
    .brand { font-family: 'Playfair Display', serif; color: #f5e3b3; font-weight: 700; font-size: 16px; }
    .nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn-gold { background: linear-gradient(90deg, #b88c42, #d4af37, #9a722c); color: #0c0a08; font-weight: 700; padding: 8px 14px; border-radius: 8px; font-size: 12px; display: inline-block; border: none; cursor: pointer; }
    .btn-outline { background: #1c1610; border: 1px solid rgba(212,175,55,0.45); color: #f5e3b3; padding: 8px 14px; border-radius: 8px; font-size: 12px; display: inline-block; }
    .container { max-width: 1180px; margin: 0 auto; padding: 36px 20px; }
    .hero { display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 28px; align-items: center; padding-bottom: 36px; border-bottom: 1px solid rgba(212,175,55,0.2); }
    .eyebrow { color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
    h1 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); color: #f5e3b3; line-height: 1.15; margin-bottom: 14px; }
    .claim-box { background: linear-gradient(160deg, #1b150e, #0f0c08); border: 1px solid rgba(212,175,55,0.5); border-radius: 18px; padding: 22px; }
    .claim-box h2 { font-family: 'Playfair Display', serif; color: #f5e3b3; font-size: 20px; margin: 6px 0 10px; }
    .input { width: 100%; background: #090705; border: 1px solid rgba(212,175,55,0.35); color: #fff; padding: 10px 12px; border-radius: 8px; margin-bottom: 10px; font-size: 13px; }
    .sec-head { text-align: center; margin: 42px 0 26px; }
    .sec-head h2 { font-family: 'Playfair Display', serif; font-size: 28px; color: #f5e3b3; }
    .pkg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(255px, 1fr)); gap: 18px; }
    .pkg-card { background: #13100c; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; }
    .pkg-vip { background: linear-gradient(160deg, #21190f, #110d09); border: 2px solid #d4af37; }
    .pkg-top { display: flex; justify-content: space-between; font-size: 11px; color: #d4af37; margin-bottom: 8px; }
    .pkg-card h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: #fff; }
    .pkg-tag { font-size: 12px; color: #d6d3d1; margin: 6px 0 12px; }
    .pkg-price-box { border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); padding: 10px 0; margin-bottom: 12px; }
    .pkg-strike { font-size: 11px; color: #78716c; text-decoration: line-through; }
    .pkg-price { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #f5e3b3; }
    .pkg-period { font-size: 11px; color: #d4af37; }
    .pkg-points-title { font-size: 12px; font-weight: 600; color: #f5e3b3; margin-bottom: 8px; }
    .pkg-points { list-style: none; font-size: 12px; color: #e7e5e4; margin-bottom: 16px; }
    .pkg-points li { margin-bottom: 6px; display: flex; gap: 6px; }
    .pkg-btn { text-align: center; background: linear-gradient(90deg, #b88c42, #d4af37, #9a722c); color: #0c0a08; font-weight: 700; padding: 10px; border-radius: 10px; font-size: 12px; display: block; }
    .cat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; }
    .cat-card { background: #14100c; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 18px; }
    .cat-head { display: flex; justify-content: space-between; color: #f5e3b3; margin-bottom: 6px; }
    .cat-slug { font-family: monospace; font-size: 11px; color: #d4af37; }
    .cat-card p { font-size: 12px; color: #d6d3d1; margin-bottom: 10px; }
    .tpl-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .tpl-pill { font-size: 11px; background: #1f1912; border: 1px solid rgba(212,175,55,0.3); color: #f5e3b3; padding: 3px 8px; border-radius: 6px; }
    .cat-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="brand">MMDAF STUDIO • mmdaf.my.id</div>
    <div class="nav-links">
      <a href="undangan.html" class="btn-outline">Lihat Undangan VIP</a>
      <a href="#paket" class="btn-outline">Paket Silver – VIP</a>
      <a href="editor.html" class="btn-gold">Buka Studio Editor (7x7 Templat)</a>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <div>
        <div class="eyebrow">MMDAF.MY.ID • STUDIO UNDANGAN DIGITAL MULTI-ACARA • KOTA BAUBAU</div>
        <h1>Rancang Sendiri Undangan Pernikahan, Aqiqah, Khitan & Acara Impian Anda.</h1>
        <p style="color:#d6d3d1;font-size:14px;margin-bottom:18px;">
          Tersedia <strong>7 Templat Eksklusif di setiap kategori acara (49 variasi desain)</strong>, pilihan paket mulai dari <strong>Silver (Gratis Rp 0)</strong>, Gold, Titanium, hingga <strong>VIP Hitam & Emas</strong>.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="editor.html" class="btn-gold">Buat Sendiri Undangan Sekarang</a>
          <a href="undangan.html" class="btn-outline">Demo Undangan VIP Hitam Emas</a>
        </div>
      </div>

      <div class="claim-box">
        <div style="font-size:11px;color:#34d399;font-weight:700;">PROMO PAKET SILVER • GRATIS RP 0</div>
        <h2>Klaim Undangan Gratis (4 Foto)</h2>
        <p style="font-size:12px;color:#d6d3d1;margin-bottom:12px;">
          Follow akun TikTok resmi <strong>@mmdaf.studio.project</strong> lalu masukkan username TikTok Anda & kode kunci <code>G-Faizu_3.8</code>:
        </p>
        <p style="margin-bottom:10px;">
          <a href="https://www.tiktok.com/@mmdaf.studio.project" target="_blank" rel="noopener noreferrer" class="btn-outline" style="width:100%;text-align:center;">1. Follow TikTok @mmdaf.studio.project ↗</a>
        </p>
        <input id="ttUser" class="input" placeholder="2. Username TikTok Anda (contoh: @nama_anda)" />
        <input id="ttKey" class="input" placeholder="3. Kode Kunci (Ketik: G-Faizu_3.8)" />
        <button type="button" onclick="claimFree()" class="btn-gold" style="width:100%;padding:11px;">Verifikasi & Buka Editor Gratis</button>
        <p id="claimMsg" style="font-size:12px;margin-top:8px;"></p>
      </div>
    </section>

    <section id="paket">
      <div class="sec-head">
        <div class="eyebrow">DAFTAR PAKET STUDIO MMDAF.MY.ID</div>
        <h2>Pilih Paket Undangan Sesuai Kebutuhan Acara Anda</h2>
      </div>
      <div class="pkg-grid">
        ${packagesHtml}
      </div>
    </section>

    <section id="katalog">
      <div class="sec-head">
        <div class="eyebrow">7 KATEGORI ACARA × 7 TEMPLAT EKSKLUSIF</div>
        <h2>Katalog Lengkap Semua Acara di mmdaf.my.id</h2>
      </div>
      <div class="cat-grid">
        ${categoriesHtml}
      </div>
    </section>
  </main>

  <script>
    function claimFree() {
      var u = document.getElementById('ttUser').value.trim();
      var k = document.getElementById('ttKey').value.trim();
      var m = document.getElementById('claimMsg');
      if (u.length < 2) {
        m.style.color = '#fbbf24';
        m.textContent = 'Mohon isi username TikTok Anda terlebih dahulu.';
        return;
      }
      if (k.toLowerCase() !== 'g-faizu_3.8') {
        m.style.color = '#f87171';
        m.textContent = 'Kode kunci belum sesuai. Gunakan kode: G-Faizu_3.8';
        return;
      }
      m.style.color = '#34d399';
      m.textContent = 'Verifikasi Berhasil! Membuka Studio Editor...';
      setTimeout(function() {
        window.location.href = 'editor.html?mode=free_unlocked&user=' + encodeURIComponent(u);
      }, 600);
    }
  </script>
</body>
</html>`;
}

export function generateStandaloneStudioEditorHtml(
  initialProject: StudioProjectState
): string {
  const categoriesJson = JSON.stringify(EVENT_CATEGORIES);
  const templatesJson = JSON.stringify(SEVEN_TEMPLATE_PRESETS);
  const musicJson = JSON.stringify(MUSIC_PRESETS);
  const defaultProjectJson = JSON.stringify(initialProject);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MMDAF Studio Editor (7x7 Templat) — mmdaf.my.id</title>
  <meta name="theme-color" content="#b45309" />
  <link rel="manifest" href="manifest.json" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Sacramento&family=Golos+Text:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0c0a09; color: #f5f5f4; font-family: 'Golos Text', sans-serif; }
    .topbar { background: #14100b; border-bottom: 1px solid rgba(212,175,55,0.35); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; position: sticky; top: 0; z-index: 40; }
    .brand { font-family: 'Playfair Display', serif; color: #f5e3b3; font-weight: 700; }
    .btn-gold { background: linear-gradient(90deg, #b88c42, #d4af37, #9a722c); color: #0c0a08; font-weight: 700; padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; }
    .btn-outline { background: #1f1912; border: 1px solid rgba(212,175,55,0.4); color: #f5e3b3; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 12px; text-decoration: none; }
    .workspace { max-width: 1240px; margin: 0 auto; padding: 24px 16px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; align-items: start; }
    @media (max-width: 900px) { .workspace { grid-template-columns: 1fr; } }
    .panel { background: #14100c; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 20px; margin-bottom: 16px; }
    .panel h2 { font-family: 'Playfair Display', serif; color: #f5e3b3; font-size: 18px; margin-bottom: 12px; }
    label { display: block; font-size: 12px; color: #d6d3d1; margin: 10px 0 4px; }
    input, select, textarea { width: 100%; background: #090705; border: 1px solid rgba(212,175,55,0.35); color: #fff; padding: 9px 11px; border-radius: 8px; font-size: 13px; font-family: inherit; }
    .phone { max-width: 410px; margin: 0 auto; border-radius: 26px; border: 2px solid #d4af37; overflow: hidden; padding: 24px 18px; text-align: center; position: sticky; top: 76px; }
    .phone h3 { font-family: 'Sacramento', cursive; font-size: 38px; font-weight: 400; margin: 8px 0; }
    .frame { width: 210px; height: 260px; margin: 14px auto; overflow: hidden; border: 2px solid #d4af37; }
    .frame img { width: 100%; height: 100%; object-fit: cover; }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="brand">MMDAF STUDIO EDITOR (7 KATEGORI × 7 TEMPLAT)</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <a href="index.html" class="btn-outline">← Halaman Pengunjung (mmdaf.my.id)</a>
      <button type="button" class="btn-outline" onclick="copyResultHtml()">Salin Script HTML</button>
      <button type="button" class="btn-gold" onclick="downloadResultHtml()">Unduh File .HTML Acara Ini</button>
    </div>
  </header>

  <main class="workspace">
    <div>
      <div class="panel">
        <h2>1. Pilih Kategori Acara & 7 Templat Eksklusif</h2>
        <label>Kategori Acara (Pernikahan, Aqiqah, Khitan, Wisuda, Ultah, Tasyakuran, Halal Bi Halal)</label>
        <select id="edCat" onchange="onSwitchCat(this.value)"></select>
        <label>Pilih dari 7 Templat di Kategori Ini</label>
        <select id="edTpl" onchange="renderAll()"></select>
        <label>Gaya Bingkai Foto Dasbor</label>
        <select id="edFrame" onchange="renderAll()">
          <option value="floating-feathered">Floating Feathered (Menyatu Halus dengan Latar)</option>
          <option value="arch-royal">Arch Kubah Keraton Hitam Emas</option>
          <option value="oval-medal">Oval Medali Klasik</option>
          <option value="modern-rounded">Modern Rounded</option>
        </select>
      </div>

      <div class="panel">
        <h2>2. Musik Latar Undangan</h2>
        <label>Pilih Lagu Bawaan Studio</label>
        <select id="edMusic" onchange="renderAll()"></select>
        <label>Atau Masukkan URL MP3 Kustom</label>
        <input id="edCustomMusic" placeholder="https://.../lagu-pilihan.mp3" oninput="renderAll()" />
      </div>

      <div class="panel">
        <h2>3. Kata-Kata, Nama Tokoh Utama & Jadwal Acara</h2>
        <label id="lblPrimary">Nama Utama 1 / Mempelai Wanita</label>
        <input id="edPrimary" oninput="renderAll()" />
        <label id="lblSecondary">Nama Utama 2 / Mempelai Pria</label>
        <input id="edSecondary" oninput="renderAll()" />
        <label>Keterangan Orang Tua / Keluarga</label>
        <input id="edParents" oninput="renderAll()" />
        <label>Hari & Tanggal Acara</label>
        <input id="edDate" oninput="renderAll()" />
        <label>Waktu Acara</label>
        <input id="edTime" oninput="renderAll()" />
        <label>Tempat / Lokasi Acara</label>
        <input id="edLoc" oninput="renderAll()" />
        <label>Kata Sapaan Pembuka</label>
        <textarea id="edGreet" rows="3" oninput="renderAll()"></textarea>
        <label>Kutipan Doa / Ayat Suci</label>
        <textarea id="edQuote" rows="2" oninput="renderAll()"></textarea>
      </div>

      <div class="panel">
        <h2>4. Amplop Digital & TikTok Studio</h2>
        <label>Nama Bank / E-Wallet</label>
        <input id="edBank" oninput="renderAll()" />
        <label>Nomor Rekening</label>
        <input id="edRek" oninput="renderAll()" />
        <label>Atas Nama</label>
        <input id="edHolder" oninput="renderAll()" />
        <label>Username TikTok</label>
        <input id="edTiktok" oninput="renderAll()" />
      </div>
    </div>

    <div id="livePhone" class="phone">
      <div id="pvBadge" style="font-size:11px;letter-spacing:2px;text-transform:uppercase;"></div>
      <h3 id="pvTitle"></h3>
      <p id="pvDateLoc" style="font-size:12px;margin-bottom:10px;"></p>
      <div id="pvFrame" class="frame">
        <img id="pvImg" src="${initialProject.mainPortraitUrl}" alt="Foto Utama" />
      </div>
      <p id="pvParents" style="font-size:12px;font-weight:600;margin-bottom:8px;"></p>
      <p id="pvGreet" style="font-size:12px;opacity:0.9;margin-bottom:12px;"></p>
      <div style="padding:12px;border-radius:12px;background:rgba(0,0,0,0.35);border:1px solid rgba(212,175,55,0.3);font-size:12px;">
        <div id="pvBank" style="font-weight:700;"></div>
        <div id="pvRek" style="font-size:15px;margin:4px 0;"></div>
        <div id="pvHolder" style="font-size:11px;opacity:0.8;"></div>
      </div>
      <div id="pvFooter" style="font-size:11px;margin-top:12px;opacity:0.8;"></div>
    </div>
  </main>

  <script>
    var CATEGORIES = ${categoriesJson};
    var TEMPLATES = ${templatesJson};
    var MUSICS = ${musicJson};
    var state = ${defaultProjectJson};

    function initEditor() {
      var catSel = document.getElementById('edCat');
      catSel.innerHTML = CATEGORIES.map(function(c) {
        return '<option value="' + c.id + '">' + c.name + ' (' + c.fileSlug + ')</option>';
      }).join('');
      catSel.value = state.category;

      var musSel = document.getElementById('edMusic');
      musSel.innerHTML = MUSICS.map(function(m) {
        return '<option value="' + m.id + '">' + m.artist + ' — ' + m.title + '</option>';
      }).join('');
      musSel.value = state.musicId;

      populateInputsFromState();
      rebuildTemplateOptions();
      renderAll();
    }

    function rebuildTemplateOptions() {
      var catId = document.getElementById('edCat').value;
      var tplSel = document.getElementById('edTpl');
      tplSel.innerHTML = TEMPLATES.map(function(t) {
        return '<option value="' + t.id + '">0' + t.number + '. ' + t.categoryNames[catId] + ' (' + t.tier.toUpperCase() + ')</option>';
      }).join('');
      tplSel.value = state.templateId;
    }

    function populateInputsFromState() {
      document.getElementById('edPrimary').value = state.primaryName;
      document.getElementById('edSecondary').value = state.secondaryName;
      document.getElementById('edParents').value = state.parentsText;
      document.getElementById('edDate').value = state.dateText;
      document.getElementById('edTime').value = state.timeText;
      document.getElementById('edLoc').value = state.locationText;
      document.getElementById('edGreet').value = state.openingGreeting;
      document.getElementById('edQuote').value = state.prayerQuote;
      document.getElementById('edBank').value = state.bankName;
      document.getElementById('edRek').value = state.accountNumber;
      document.getElementById('edHolder').value = state.accountHolder;
      document.getElementById('edTiktok').value = state.tiktokHandle;
    }

    function onSwitchCat(catId) {
      var c = CATEGORIES.find(function(x) { return x.id === catId; }) || CATEGORIES[0];
      state.category = c.id;
      state.badgeText = c.badgeLabel;
      state.primaryName = c.defaultPrimaryName;
      state.secondaryName = c.defaultSecondaryName;
      state.parentsText = c.defaultParentsText;
      state.dateText = c.defaultDateText;
      state.timeText = c.defaultTimeText;
      state.locationText = c.defaultLocationText;
      state.openingGreeting = c.defaultGreeting;
      state.prayerQuote = c.defaultPrayerQuote;
      populateInputsFromState();
      rebuildTemplateOptions();
      renderAll();
    }

    function renderAll() {
      var catId = document.getElementById('edCat').value;
      var tplId = document.getElementById('edTpl').value;
      var frameId = document.getElementById('edFrame').value;
      var tpl = TEMPLATES.find(function(x) { return x.id === tplId; }) || TEMPLATES[0];
      var cat = CATEGORIES.find(function(x) { return x.id === catId; }) || CATEGORIES[0];

      var p1 = document.getElementById('edPrimary').value;
      var p2 = document.getElementById('edSecondary').value;
      var phone = document.getElementById('livePhone');
      phone.style.background = tpl.cardBg;
      phone.style.borderColor = tpl.accentHex;
      phone.style.color = tpl.textPrimary;

      document.getElementById('pvBadge').style.color = tpl.accentHex;
      document.getElementById('pvBadge').textContent = cat.badgeLabel + ' • 0' + tpl.number + '/07';
      document.getElementById('pvTitle').style.color = tpl.accentLightHex;
      document.getElementById('pvTitle').textContent = catId === 'nikah' ? (p1.split(',')[0] + ' & ' + p2.split(',')[0]) : p1;
      document.getElementById('pvDateLoc').textContent = document.getElementById('edDate').value + ' • ' + document.getElementById('edLoc').value;
      document.getElementById('pvParents').textContent = document.getElementById('edParents').value;
      document.getElementById('pvGreet').textContent = document.getElementById('edGreet').value;
      document.getElementById('pvBank').textContent = 'Amplop Digital · ' + document.getElementById('edBank').value;
      document.getElementById('pvRek').textContent = document.getElementById('edRek').value;
      document.getElementById('pvHolder').textContent = document.getElementById('edHolder').value;
      document.getElementById('pvFooter').textContent = 'mmdaf.my.id/' + cat.fileSlug + ' • ' + document.getElementById('edTiktok').value;

      var fr = document.getElementById('pvFrame');
      fr.style.borderColor = tpl.accentHex;
      fr.style.borderRadius = frameId === 'arch-royal' ? '110px 110px 16px 16px' : frameId === 'oval-medal' ? '999px' : '18px';
    }

    function downloadResultHtml() {
      var catId = document.getElementById('edCat').value;
      var cat = CATEGORIES.find(function(x) { return x.id === catId; }) || CATEGORIES[0];
      var content = '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + document.getElementById('pvTitle').textContent + '</title></head><body style="background:#0c0a09;color:#f5e3b3;font-family:sans-serif;display:flex;justify-content:center;padding:20px;">' + document.getElementById('livePhone').outerHTML + '</body></html>';
      var blob = new Blob([content], { type: 'text/html;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = cat.fileSlug;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    function copyResultHtml() {
      var content = document.getElementById('livePhone').outerHTML;
      if (navigator.clipboard) navigator.clipboard.writeText(content);
    }

    initEditor();
  </script>
</body>
</html>`;
}


