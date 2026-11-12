export interface BankAccount {
  id: string;
  bankName: string;
  bankCode: 'BCA' | 'SINARMAS' | 'MESTIKA' | 'BRI';
  accountNumber: string;
  accountHolder: string;
}

export interface EventScheduleCard {
  id: string;
  title: string;
  month: string;
  dayName: string;
  dateNumber: string;
  year: string;
  timeText: string;
  venueText: string;
  mapsUrl: string;
  archType: 'top' | 'middle' | 'bottom';
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timeText: string;
  textSide: 'left' | 'right';
  iconType: 'checklist' | 'rings' | 'cheers' | 'party';
}

export interface StoryItem {
  id: string;
  title: string;
  content: string;
  photoUrl?: string;
}

export interface GalleryPhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
}

export interface WishItem {
  id: string;
  name: string;
  timestamp: string;
  message: string;
  attendance?: 'Hadir' | 'Tidak Hadir' | 'Kado' | 'Stiker';
  badgeText?: string;
  companion?: string;
  dinnerMenu?: string;
}

export interface PhysicalGiftItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface InvitationConfig {
  coupleTitleOrder?: 'bride-first' | 'groom-first';
  editionBadge?: string;
  eventSummaryLine?: string;
  footerBrandTitle?: string;
  footerBrandSubtitle?: string;
  targetDateIso?: string;
  showCouplePhotos?: boolean;
  musicTitle?: string;
  musicArtist?: string;
  musicUrl?: string;
  musicFallbackUrl?: string;
  groomNickname: string;
  groomFullName: string;
  groomFather: string;
  groomMother: string;
  groomAddress: string;
  groomInstagram: string;
  groomPhotoUrl?: string;
  brideNickname: string;
  brideFullName: string;
  brideFather: string;
  brideMother: string;
  brideAddress: string;
  brideInstagram: string;
  bridePhotoUrl?: string;
  defaultGuestName: string;
  heroImageUrl: string;
  coverFloatingPhotoUrl?: string;
  heroFloatingPhotoUrl?: string;
  middleBannerPhotoUrl?: string;
  closingFloatingPhotoUrl?: string;
  galleryPhotos?: GalleryPhotoItem[];
  openingGreeting: string;
  closingGreeting: string;
  covidNotice: string;
  quranArabic: string;
  quranTranslation: string;
  quranSource: string;
  mapsEmbedUrl: string;
  events: EventScheduleCard[];
  stories: StoryItem[];
  timeline: TimelineItem[];
  bankAccounts: BankAccount[];
}

export const UPLOADED_COUPLE_PHOTOS = {
  royalArch: '/assets/aistudio/IMG_20261112_005818_4df1bf53.jpg',
  goldSilk: '/assets/aistudio/IMG_20261112_005944_22161e8b.jpg',
  baroqueFrame: '/assets/aistudio/lv_0_20261112005653_91461ef9.jpg',
  ringShowcase: '/assets/aistudio/lv_0_20261112004909_4b42dc26.jpg',
  coverCutout: '/assets/aistudio/lv_0_20261112070114_8053d28b.png',
};

export const MMDAF_WEDDING_CONFIG: InvitationConfig = {
  coupleTitleOrder: 'bride-first',
  showCouplePhotos: false,
  editionBadge: '👑 ROYAL MALIGE BUTON EDITION • VIP',
  eventSummaryLine: 'Senin, 23 November 2026 • Lahumoko',
  footerBrandTitle: 'MMDAF Royal Malige Edition • Kota Baubau',
  footerBrandSubtitle:
    'Karya : G-Faizu_3.8 • Ingin buat undangan seperti ini? Hubungi Kami',
  targetDateIso: '2026-11-23T10:00:00+09:00',
  musicTitle: 'Akad',
  musicArtist: 'Payung Teduh',
  musicUrl:
    'https://archive.org/download/01PayungTeduhAkad/01%20Payung%20Teduh%20Akad.mp3',
  musicFallbackUrl: '/assets/aistudio/payung-teduh-akad.mp3',
  brideNickname: 'Raminianti',
  brideFullName: 'Raminianti, S.Ak',
  brideFather: 'Keluarga Besar Bapak/Ibu',
  brideMother: 'Keluarga Besar di Lahumoko',
  brideAddress: 'Mempelai Wanita — Putri Tercinta dari Keluarga Besar di Lahumoko',
  brideInstagram: 'mmdaf.studio.project',
  bridePhotoUrl: UPLOADED_COUPLE_PHOTOS.goldSilk,
  groomNickname: 'Aliadin',
  groomFullName: 'Aliadin',
  groomFather: 'Keluarga Besar Bapak/Ibu',
  groomMother: 'Keluarga Besar di Lahumoko',
  groomAddress: 'Mempelai Pria — Putra Tercinta dari Keluarga Besar di Lahumoko',
  groomInstagram: 'mmdaf.studio.project',
  groomPhotoUrl: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
  defaultGuestName: 'Tamu Undangan Terhormat',
  heroImageUrl: '/assets/aistudio/1794388703749_7a2ccb9a.jpg',
  coverFloatingPhotoUrl: UPLOADED_COUPLE_PHOTOS.coverCutout,
  heroFloatingPhotoUrl: UPLOADED_COUPLE_PHOTOS.goldSilk,
  middleBannerPhotoUrl: UPLOADED_COUPLE_PHOTOS.ringShowcase,
  closingFloatingPhotoUrl: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
  galleryPhotos: [
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
  ],
  openingGreeting:
    'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir memberikan doa restu pada acara pernikahan kami.',
  closingGreeting:
    'Besar harapan kami jika Bapak/Ibu/Sahabat/Sdr/i berkenan hadir dan memberikan doa restu pada acara pernikahan kami di Lahumoko. Atas perhatiannya kami ucapkan terima kasih.',
  covidNotice:
    'Doa restu dan kehadiran Bapak/Ibu/Saudara/i merupakan kebahagiaan yang tak ternilai bagi kedua keluarga besar kami di Lahumoko, Kota Baubau.',
  quranArabic:
    'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ',
  quranTranslation:
    'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
  quranSource: '- Ar-Rum · Ayat 21 -',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Lahumoko+Buton&output=embed',
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      month: 'November',
      dayName: 'Senin',
      dateNumber: '23',
      year: '2026',
      timeText: 'Pukul 10.00 WIT - Selesai',
      venueText: 'Kediaman Mempelai, Lahumoko',
      mapsUrl: 'https://maps.google.com/?q=Lahumoko',
      archType: 'top',
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      month: 'November',
      dayName: 'Senin',
      dateNumber: '23',
      year: '2026',
      timeText: 'Pukul 14.00 - 17.00 WIT',
      venueText: 'Kediaman Mempelai, Lahumoko',
      mapsUrl: 'https://maps.google.com/?q=Lahumoko',
      archType: 'bottom',
    },
  ],
  stories: [
    {
      id: 'story-1',
      title: 'Awal Bertemu di Bawah Langit Lahumoko',
      content:
        'Dua langkah dan dua hati dipertemukan dalam kesederhanaan, belajar saling mengenal dan menautkan rasa saling percaya.',
      photoUrl: UPLOADED_COUPLE_PHOTOS.goldSilk,
    },
    {
      id: 'story-2',
      title: 'Mengikat Janji & Restu Keluarga',
      content:
        'Cinta tumbuh dalam ketulusan. Dengan doa dan restu hangat kedua keluarga besar, kami memantapkan niat menyatukan takdir.',
      photoUrl: UPLOADED_COUPLE_PHOTOS.ringShowcase,
    },
    {
      id: 'story-3',
      title: 'Menuju Mahligai Pelaminan',
      content:
        'Kini saat yang dinanti telah tiba pada Senin, 23 November 2026, kami mengikrarkan janji suci untuk saling menjaga hingga menua bersama.',
      photoUrl: UPLOADED_COUPLE_PHOTOS.royalArch,
    },
  ],
  timeline: [
    {
      id: 'tl-1',
      title: 'Persiapan dan Kedatangan Tamu',
      description:
        'Keluarga besar menyambut kehadiran tamu undangan di Kediaman Mempelai, Lahumoko',
      timeText: '09.00 WIT',
      textSide: 'left',
      iconType: 'checklist',
    },
    {
      id: 'tl-2',
      title: 'Akad Nikah',
      description:
        "Pembukaan oleh MC, Pembacaan Ayat Suci Al-Qur'an, Khutbah Nikah, Ijab Kabul, dan Doa Restu",
      timeText: '10.00 WIT',
      textSide: 'right',
      iconType: 'rings',
    },
    {
      id: 'tl-3',
      title: 'Doa Bersama & Sesi Keluarga',
      description:
        'Ungkapan syukur serta pemberian ucapan selamat dari kedua keluarga besar',
      timeText: '11.30 WIT',
      textSide: 'left',
      iconType: 'cheers',
    },
    {
      id: 'tl-4',
      title: 'Resepsi Pernikahan',
      description:
        'Sambutan keluarga kedua mempelai, ramah tamah, dan jamuan kasih hingga selesai',
      timeText: '14.00 - 17.00 WIT',
      textSide: 'right',
      iconType: 'party',
    },
  ],
  bankAccounts: [
    {
      id: 'bri-mmdaf',
      bankName: 'Bank BRI',
      bankCode: 'BRI',
      accountNumber: '488901053910537',
      accountHolder: 'a.n. RAMINIANTI',
    },
  ],
};

export const JUSTIN_SISCA_CONFIG: InvitationConfig = {
  coupleTitleOrder: 'groom-first',
  editionBadge: '👑 Royal Malige Buton Edition • VIP',
  eventSummaryLine: 'Senin, 23 November 2026 • Lahumoko',
  footerBrandTitle: 'MMDAF Royal Malige Edition • Kota Baubau',
  footerBrandSubtitle:
    'Karya : G-Faizu_3.8 • Ingin buat undangan seperti ini? Hubungi Kami',
  targetDateIso: '2026-11-23T10:00:00+09:00',
  groomNickname: 'Justin',
  groomFullName: 'Tobias Justin',
  groomFather: 'Ayah Justin',
  groomMother: 'Ibu Justin',
  groomAddress: 'Beralamat di Jakarta',
  groomInstagram: 'mmdaf.studio.project',
  groomPhotoUrl: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
  brideNickname: 'Sisca',
  brideFullName: 'Sisca Chol',
  brideFather: 'Ayah Sisca',
  brideMother: 'Ibu Sisca',
  brideAddress: 'Beralamat di Jakarta',
  brideInstagram: 'mmdaf.studio.project',
  bridePhotoUrl: UPLOADED_COUPLE_PHOTOS.goldSilk,
  defaultGuestName: 'Bapak Budi',
  heroImageUrl: '/assets/aistudio/1794388703749_7a2ccb9a.jpg',
  coverFloatingPhotoUrl: UPLOADED_COUPLE_PHOTOS.royalArch,
  heroFloatingPhotoUrl: UPLOADED_COUPLE_PHOTOS.goldSilk,
  middleBannerPhotoUrl: UPLOADED_COUPLE_PHOTOS.ringShowcase,
  closingFloatingPhotoUrl: UPLOADED_COUPLE_PHOTOS.baroqueFrame,
  galleryPhotos: MMDAF_WEDDING_CONFIG.galleryPhotos,
  openingGreeting:
    'Atas Rahmat Tuhan Yang Maha Esa, kami bermaksud mengundang Anda di acara Kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada',
  closingGreeting:
    'Besar harapan kami jika Bapak/Ibu/Sahabat/Sdr/i berkenan hadir pada acara ini. Atas perhatiannya Terima kasih',
  covidNotice:
    'Acara ini di selenggarakan dengan mematuhi protokol pencegahan penyebaran COVID-19 dan bagi tamu undangan di harapkan dapat mengikutinya.',
  quranArabic:
    'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ',
  quranTranslation:
    'Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
  quranSource: '- Ar-Rum · Ayat 21 -',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.7405991503474!2d115.16283499678957!3d-8.810422800000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd244cf54e1dec7%3A0x1988663e064f5a51!2sGaruda%20Wisnu%20Kencana%20Cultural%20Park!5e0!3m2!1sid!2sid!4v1670039051476!5m2!1sid!2sid',
  events: [
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      month: 'Maret',
      dayName: 'Anggara',
      dateNumber: '04',
      year: '2025',
      timeText: 'Jam Bebas',
      venueText: 'Rumah Justin di Jakarta',
      mapsUrl: 'https://goo.gl/maps/1h11E7vMr2w8EXXF9',
      archType: 'top',
    },
    {
      id: 'akad',
      title: 'Akad Pernikahan',
      month: 'Februari',
      dayName: 'Rabu',
      dateNumber: '18',
      year: '2026',
      timeText: 'Pukul 02:39 WIB - 08:00 WIB',
      venueText: 'Jalan gunung batur, no 78, Denpasar, Bali',
      mapsUrl: 'https://goo.gl/maps/1h11E7vMr2w8EXXF9',
      archType: 'middle',
    },
    {
      id: 'dinner',
      title: 'Makan Malam',
      month: 'Mei',
      dayName: 'Kamis',
      dateNumber: '15',
      year: '2025',
      timeText: 'Pukul 21:00 WIB Sampai Larut',
      venueText: 'Restoran Makan Padang',
      mapsUrl: 'https://maps.app.goo.gl/QQux7eNPHPd1dsi59',
      archType: 'bottom',
    },
  ],
  stories: [
    {
      id: 'story-1',
      title: 'Pertemuan Di Kereta Api',
      content:
        'Pertemuan tak terduga di sebuah kereta api membawa Aria dan Ryan dalam sebuah cerita cinta perjalanan yang tak terlupakan. Aria adalah seorang gadis yang bekerja sebagai penulis buku anak-anak, sedangkan Ryan adalah seorang pengusaha muda yang sedang dalam perjalanan bisnis ke kota lain.',
    },
    {
      id: 'story-2',
      title: 'Lanjut Ke Pelaminan',
      content:
        'Setelah itu, Ryan dan Aria terus berhubungan dan memulai sebuah hubungan yang manis. Mereka mengunjungi tempat-tempat yang indah dan menikmati setiap momen bersama. Perjalanan pertemuan di kereta api telah membawa mereka pada sebuah cerita cinta perjalanan yang tak terlupakan.',
    },
  ],
  timeline: [
    {
      id: 'tl-1',
      title: 'Persiapan dan Kedatangan Tamu',
      description: 'Pengantin dan keluarga bersiap-siap',
      timeText: '08 WIB',
      textSide: 'left',
      iconType: 'checklist',
    },
    {
      id: 'tl-2',
      title: 'Akad Nikah',
      description:
        "Pembukaan oleh MC, Pembacaan Ayat Suci Al-Qur'an, Khutbah Nikah oleh penghulu atau tokoh agama, Ijab Kabul, Doa,",
      timeText: '10 WIB',
      textSide: 'right',
      iconType: 'rings',
    },
    {
      id: 'tl-3',
      title: 'Resepsi Pernikahan',
      description:
        'Sambutan dari keluarga kedua mempelai, Hiburan (musik, tarian tradisional, atau penampilan lainnya)',
      timeText: '11 WIB',
      textSide: 'left',
      iconType: 'cheers',
    },
    {
      id: 'tl-4',
      title: 'Acara Puncak Kami',
      description: 'Hiburan dan makan siang',
      timeText: '14.00 WIB Sampai Acara Selesai',
      textSide: 'right',
      iconType: 'party',
    },
  ],
  bankAccounts: [
    {
      id: 'bca',
      bankName: 'BCA',
      bankCode: 'BCA',
      accountNumber: '12345678',
      accountHolder: 'Sisca Kohl',
    },
    {
      id: 'sinarmas',
      bankName: 'Bank Sinarmas',
      bankCode: 'SINARMAS',
      accountNumber: '0982309823',
      accountHolder: 'Tobias Justin',
    },
    {
      id: 'mestika',
      bankName: 'Bank Mestika',
      bankCode: 'MESTIKA',
      accountNumber: '99787238',
      accountHolder: 'Papanya Sisca',
    },
    {
      id: 'bri',
      bankName: 'BRI',
      bankCode: 'BRI',
      accountNumber: '123456789123',
      accountHolder: 'Van',
    },
  ],
};

export const DEFAULT_INVITATION_CONFIG: InvitationConfig = MMDAF_WEDDING_CONFIG;

// Dikosongkan karena belum ada tamu yang memberikan ucapan dan konfirmasi hadir
export const INITIAL_WISHES: WishItem[] = [];

export const MANIFEST_JSON_CONFIG = {
  name: 'MMDAF Wedding AI',
  short_name: 'MMDAF',
  description:
    'Platform Pembuat Undangan Pernikahan Digital Berbasis AI — Edisi VIP Hitam Emas Raminianti & Aliadin',
  start_url: '/',
  display: 'standalone',
  background_color: '#0c0a09',
  theme_color: '#b45309',
  orientation: 'portrait',
  icons: [
    {
      src: 'https://cdn-icons-png.flaticon.com/512/8361/8361180.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
};

export const PHYSICAL_GIFT_CATALOG: PhysicalGiftItem[] = [
  { id: 74, name: 'Bedcover & Sprei Premium King Size', price: 179000, category: 'Kamar Tidur' },
  { id: 72, name: 'Set Peralatan Masak Non-Stick', price: 118000, category: 'Dapur' },
  { id: 4, name: 'Air Fryer Digital 4.5 Liter', price: 275000, category: 'Elektronik' },
  { id: 89, name: 'Set Handuk Couple Luxury Cotton', price: 140000, category: 'Kamar Mandi' },
  { id: 24, name: 'Coffee Maker Espresso Rumahan', price: 291500, category: 'Elektronik' },
  { id: 83, name: 'Dinnerware Ceramic Set 16 Pcs', price: 199000, category: 'Ruang Makan' },
];

export const DINNER_MENU_OPTIONS = [
  'Pempek Palembang',
  'Gudeg',
  'Sate Madura',
  'Soto Lamongan',
  'Ayam Betutu',
  'Kerak Telor',
  'Kue Sagu',
];
