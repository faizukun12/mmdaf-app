import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseGuestNameFromSearch,
  shouldAutoStartFromSearch,
  calculateCountdown,
  validateRsvpSubmission,
  addWishAndUpdateStats,
} from './invitationLogic';
import {
  DEFAULT_INVITATION_CONFIG,
  MMDAF_WEDDING_CONFIG,
  JUSTIN_SISCA_CONFIG,
  INITIAL_WISHES,
  UPLOADED_COUPLE_PHOTOS,
  MANIFEST_JSON_CONFIG,
} from './invitationData';
import {
  generateStandaloneHtml,
  generateMaligeWeddingHtml,
} from './generateStandaloneHtml';
import {
  EVENT_CATEGORIES,
  SEVEN_TEMPLATE_PRESETS,
  STUDIO_PACKAGES,
  MUSIC_PRESETS,
  createDefaultStudioProject,
  applyCategorySwitchToProject,
  verifyTiktokFreeClaim,
  generateCustomEventHtml,
  syncStudioProjectToInvitationConfig,
  generateStandaloneVisitorIndexHtml,
  generateStandaloneStudioEditorHtml,
} from './studioTemplates';

test('parseGuestNameFromSearch parses kpd and to parameters and falls back to default', () => {
  assert.equal(
    parseGuestNameFromSearch('?kpd=Bapak%20Budi&contoh=1'),
    'Bapak Budi'
  );
  assert.equal(
    parseGuestNameFromSearch('?to=Tamu+Undangan'),
    'Tamu Undangan'
  );
  assert.equal(parseGuestNameFromSearch(''), 'Bapak Budi');
});

test('shouldAutoStartFromSearch detects autostart=1', () => {
  assert.equal(shouldAutoStartFromSearch('?autostart=1'), true);
  assert.equal(shouldAutoStartFromSearch('?kpd=Bapak%20Budi'), false);
});

test('calculateCountdown returns 0 when target date is in the past and accurate breakdown when in the future', () => {
  const now = new Date('2026-11-11T00:00:00Z').getTime();
  assert.deepEqual(calculateCountdown('2026-02-18T00:00:00Z', now), {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const future = new Date(
    now + (2 * 86400 + 3 * 3600 + 15 * 60 + 40) * 1000
  ).toISOString();
  assert.deepEqual(calculateCountdown(future, now), {
    days: 2,
    hours: 3,
    minutes: 15,
    seconds: 40,
  });
});

test('INITIAL_WISHES starts empty (0 wishes and 0 attending) and addWishAndUpdateStats increments from 0', () => {
  assert.equal(INITIAL_WISHES.length, 0);

  assert.equal(
    validateRsvpSubmission({
      name: '',
      message: 'Selamat',
      attendance: 'Hadir',
    }).valid,
    false
  );
  assert.equal(
    validateRsvpSubmission({
      name: 'Bapak Budi',
      message: 'Selamat!',
      attendance: 'Hadir',
    }).valid,
    true
  );

  const result = addWishAndUpdateStats(
    INITIAL_WISHES,
    { totalWishes: 0, totalAttending: 0 },
    {
      name: 'Bapak Budi',
      message: 'Selamat menempuh hidup baru!',
      attendance: 'Hadir',
      companion: 'Istri',
      timestampIso: '2026-11-11T10:00:00.000Z',
    }
  );

  assert.equal(result.stats.totalWishes, 1);
  assert.equal(result.stats.totalAttending, 1);
  assert.equal(result.wishes.length, 1);
  assert.equal(result.wishes[0].name, 'Bapak Budi');
});

test('generateStandaloneHtml and generateMaligeWeddingHtml include VIP Black & Gold sections, TikTok @mmdaf.studio.project, 0 initial wishes, no dinner menu caption, and manifest.json sync', () => {
  assert.equal(MANIFEST_JSON_CONFIG.name, 'MMDAF Wedding AI');
  assert.equal(MANIFEST_JSON_CONFIG.short_name, 'MMDAF');
  assert.equal(MANIFEST_JSON_CONFIG.background_color, '#0c0a09');
  assert.equal(MANIFEST_JSON_CONFIG.theme_color, '#b45309');

  const mmdafHtml = generateStandaloneHtml(
    DEFAULT_INVITATION_CONFIG,
    'Tamu Undangan Terhormat'
  );
  assert.ok(mmdafHtml.startsWith('<!DOCTYPE html>'));
  assert.ok(mmdafHtml.includes('Raminianti &amp; Aliadin'));
  assert.ok(mmdafHtml.includes('Raminianti, S.Ak'));
  assert.ok(mmdafHtml.includes('Aliadin'));
  assert.ok(mmdafHtml.includes('Senin, 23 November 2026 • Lahumoko'));
  assert.ok(mmdafHtml.includes('488901053910537'));
  assert.ok(mmdafHtml.includes('a.n. RAMINIANTI'));
  assert.ok(mmdafHtml.includes('Karya : G-Faizu_3.8'));
  assert.ok(mmdafHtml.includes('floatingMusicBtn'));
  assert.ok(mmdafHtml.includes('Payung Teduh — Akad'));
  assert.ok(mmdafHtml.includes('manifest.json'));
  assert.ok(mmdafHtml.includes('#b45309'));
  assert.ok(mmdafHtml.includes('https://www.tiktok.com/@mmdaf.studio.project'));
  assert.ok(mmdafHtml.includes('@mmdaf.studio.project'));
  assert.ok(mmdafHtml.includes('0811-1912-7082'));
  assert.ok(mmdafHtml.includes('https://wa.me/6281119127082'));
  assert.ok(!mmdafHtml.includes('Menu Makan Malam'));
  assert.ok(!mmdafHtml.includes('Mau custom form seperti diatas?'));
  assert.ok(!mmdafHtml.includes('231 Orang Menyatakan Hadir'));
  assert.ok(
    mmdafHtml.includes('<span id="total-wishes-count">0</span> Total Ucapan')
  );
  assert.ok(
    mmdafHtml.includes(
      '<span id="total-attending-count">0</span> Orang Menyatakan Hadir'
    )
  );
  assert.ok(mmdafHtml.includes('section-vip-black-gold'));
  assert.ok(mmdafHtml.includes('dashboard-black-gold'));
  assert.ok(mmdafHtml.includes('royal-circle-monogram'));
  assert.ok(!mmdafHtml.includes('Babak 01'));
  assert.ok(mmdafHtml.includes('Awal Bertemu di Bawah Langit Lahumoko'));
  assert.ok(!mmdafHtml.includes('1. Awal Bertemu'));
  // Foto pengantin dihilangkan sesuai permintaan user pada mode default
  assert.ok(!mmdafHtml.includes(UPLOADED_COUPLE_PHOTOS.royalArch));

  const mmdafHtmlWithPhotos = generateStandaloneHtml(
    { ...DEFAULT_INVITATION_CONFIG, showCouplePhotos: true },
    'Tamu Undangan Terhormat'
  );
  assert.ok(mmdafHtmlWithPhotos.includes(UPLOADED_COUPLE_PHOTOS.royalArch));
  assert.ok(mmdafHtmlWithPhotos.includes(UPLOADED_COUPLE_PHOTOS.goldSilk));
  assert.ok(mmdafHtmlWithPhotos.includes(UPLOADED_COUPLE_PHOTOS.baroqueFrame));
  assert.ok(mmdafHtmlWithPhotos.includes(UPLOADED_COUPLE_PHOTOS.ringShowcase));

  const justinHtml = generateStandaloneHtml(JUSTIN_SISCA_CONFIG, 'Bapak Budi');
  assert.ok(justinHtml.includes('Justin &amp; Sisca'));
  assert.ok(
    justinHtml.includes('https://www.tiktok.com/@mmdaf.studio.project')
  );

  const maligeHtml = generateMaligeWeddingHtml(
    MMDAF_WEDDING_CONFIG,
    'Tamu Undangan Terhormat'
  );
  assert.ok(maligeHtml.startsWith('<!DOCTYPE html>'));
  assert.ok(
    maligeHtml.includes('https://www.tiktok.com/@mmdaf.studio.project')
  );
  assert.ok(
    maligeHtml.includes('<span id="totalUcapanCount">0</span> Total Ucapan')
  );
  // When showCouplePhotos is false, it renders the royal monogram
  assert.ok(maligeHtml.includes("Walimatul 'Ursy"));

  // When showCouplePhotos is true, it renders the couple photos
  const maligeWithPhotos = generateMaligeWeddingHtml(
    { ...MMDAF_WEDDING_CONFIG, showCouplePhotos: true },
    'Tamu Undangan Terhormat'
  );
  assert.ok(maligeWithPhotos.includes(UPLOADED_COUPLE_PHOTOS.goldSilk));
});

test('studioTemplates provides 7 event categories and 7 distinct templates per category (7x7 = 49 variations)', () => {
  assert.equal(EVENT_CATEGORIES.length, 7);
  assert.equal(SEVEN_TEMPLATE_PRESETS.length, 7);
  assert.ok(MUSIC_PRESETS.length >= 6);

  for (const cat of EVENT_CATEGORIES) {
    for (const tpl of SEVEN_TEMPLATE_PRESETS) {
      const catSpecificName = tpl.categoryNames[cat.id];
      assert.ok(
        catSpecificName && catSpecificName.length > 3,
        `Missing template name for category ${cat.id} in template ${tpl.id}`
      );
    }
  }
});

test('STUDIO_PACKAGES provides Silver (Gratis), Gold, Titanium, and VIP packages with detailed points', () => {
  assert.equal(STUDIO_PACKAGES.length, 4);
  const ids = STUDIO_PACKAGES.map((p) => p.id);
  assert.deepEqual(ids, ['silver', 'gold', 'titanium', 'vip']);

  const silver = STUDIO_PACKAGES.find((p) => p.id === 'silver')!;
  assert.ok(silver.priceText.includes('GRATIS') || silver.priceText.includes('Rp 0'));
  assert.ok(silver.points.length >= 5);

  const vip = STUDIO_PACKAGES.find((p) => p.id === 'vip')!;
  assert.equal(vip.isVip, true);
  assert.equal(vip.points.length, 7);
});

test('verifyTiktokFreeClaim validates username and secret key G-Faizu_3.8', () => {
  assert.equal(verifyTiktokFreeClaim('', 'G-Faizu_3.8').valid, false);
  assert.equal(verifyTiktokFreeClaim('@user_tiktok', 'salah').valid, false);
  assert.equal(
    verifyTiktokFreeClaim('@user_tiktok', 'G-Faizu_3.8').valid,
    true
  );
});

test('applyCategorySwitchToProject and generateCustomEventHtml work across wedding, aqiqah, khitan, wisuda, and ultah', () => {
  const defaultProject = createDefaultStudioProject();
  assert.equal(defaultProject.category, 'nikah');

  const aqiqahProject = applyCategorySwitchToProject(defaultProject, 'aqiqah');
  assert.equal(aqiqahProject.category, 'aqiqah');
  assert.ok(aqiqahProject.primaryName.includes('Aisha Humaira'));

  const aqiqahHtml = generateCustomEventHtml(aqiqahProject);
  assert.ok(aqiqahHtml.startsWith('<!DOCTYPE html>'));
  assert.ok(aqiqahHtml.includes('Aisha Humaira'));
  assert.ok(aqiqahHtml.includes('Tasyakuran Aqiqah'));
  assert.ok(aqiqahHtml.includes('mmdaf.my.id'));
  assert.ok(aqiqahHtml.includes('@mmdaf.studio.project'));

  const khitanProject = applyCategorySwitchToProject(defaultProject, 'khitan');
  assert.equal(khitanProject.category, 'khitan');
  assert.ok(khitanProject.primaryName.includes('Muhammad Al-Fatih'));

  const syncedWeddingConfig = syncStudioProjectToInvitationConfig(
    DEFAULT_INVITATION_CONFIG,
    defaultProject
  );
  assert.equal(syncedWeddingConfig.brideFullName, 'Raminianti, S.Ak');

  const visitorIndexHtml = generateStandaloneVisitorIndexHtml();
  assert.ok(visitorIndexHtml.startsWith('<!DOCTYPE html>'));
  assert.ok(visitorIndexHtml.includes('mmdaf.my.id'));
  assert.ok(visitorIndexHtml.includes('Paket Silver'));
  assert.ok(visitorIndexHtml.includes('Paket VIP Exclusive'));
  assert.ok(visitorIndexHtml.includes('manifest.json'));

  const editorHtml = generateStandaloneStudioEditorHtml(defaultProject);
  assert.ok(editorHtml.startsWith('<!DOCTYPE html>'));
  assert.ok(editorHtml.includes('MMDAF STUDIO EDITOR'));
  assert.ok(editorHtml.includes('manifest.json'));
});
