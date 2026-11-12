import React, { useState } from 'react';
import { Copy, Check, Gift, Eye, EyeOff } from 'lucide-react';
import { InvitationConfig, WishItem } from '../utils/invitationData';
import {
  validateRsvpSubmission,
  RsvpSubmissionInput,
} from '../utils/invitationLogic';

interface GiftAndRsvpSectionProps {
  config: InvitationConfig;
  guestName: string;
  wishes: WishItem[];
  stats: { totalWishes: number; totalAttending: number };
  onSubmitRsvp: (submission: RsvpSubmissionInput) => void;
  onOpenPhysicalGiftModal: () => void;
}

const BankBrandLogo: React.FC<{ code: string }> = ({ code }) => {
  switch (code) {
    case 'BCA':
      return (
        <div className="flex items-center gap-1 text-[#f5e3b3] font-golos font-extrabold italic text-[17px] tracking-tight">
          <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#d4af37]" />
          <span>BCA</span>
        </div>
      );
    case 'SINARMAS':
      return (
        <div className="flex items-center gap-1.5 font-golos">
          <span className="inline-block w-3.5 h-3.5 rounded-sm bg-[#d4af37]" />
          <div className="text-left leading-none">
            <span className="block text-[8px] text-[#d4af37]">bank</span>
            <span className="block text-[12px] font-bold text-[#f5e3b3]">
              sinarmas
            </span>
          </div>
        </div>
      );
    case 'MESTIKA':
      return (
        <div className="font-playfair text-[12px] text-[#f5e3b3] text-right">
          Nomor rekening
        </div>
      );
    case 'BRI':
      return (
        <div className="flex items-center gap-1.5 text-[#f5e3b3] font-golos font-extrabold text-[17px] tracking-tight">
          <span className="border-2 border-[#d4af37] text-[#d4af37] rounded px-1.5 text-[11px] leading-tight">
            B
          </span>
          <span>BANK BRI</span>
        </div>
      );
    default:
      return null;
  }
};

export const GiftAndRsvpSection: React.FC<GiftAndRsvpSectionProps> = ({
  config,
  guestName,
  wishes,
  stats,
  onSubmitRsvp,
  onOpenPhysicalGiftModal,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAccounts, setShowAccounts] = useState(true);

  const [name, setName] = useState(guestName);
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('');
  const [companion, setCompanion] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleCopy = (id: string, accNumber: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(accNumber).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRsvpSubmission({
      name,
      message,
      attendance,
      companion,
    });
    if (!validation.valid) {
      setFormError(validation.error || 'Mohon lengkapi data kehadiran.');
      setFormSuccess(false);
      return;
    }
    setFormError(null);
    onSubmitRsvp({
      name,
      message,
      attendance,
      companion,
    });
    setMessage('');
    setCompanion('');
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <>
      {/* BOX-3: TITIP HADIAH (SENTUHAN HITAM & EMAS VIP) */}
      <section
        id="section-gift"
        className="section-vip-obsidian text-center py-12 px-5 relative"
      >
        <div className="w-[92%] mx-auto">
          <p className="font-averia text-[10.5px] uppercase tracking-[0.28em] text-[#d4af37] mb-1">
            Tanda Kasih &amp; Amplop Digital
          </p>
          <h2 className="font-signature text-[42px] text-[#f5e3b3] mb-3">
            Titip Hadiah
          </h2>

          <div className="font-playfair text-[13px] leading-[1.7] text-stone-300 space-y-2.5 mb-5">
            <p>
              Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti
              bagi kami. Dan jika memberi merupakan ungkapan tanda kasih,
              Bapak/Ibu dapat memberi kado secara cashless. Terima kasih.
            </p>
          </div>

          <div className="mb-5">
            <button
              type="button"
              onClick={() => setShowAccounts((prev) => !prev)}
              className="inline-flex items-center gap-1.5 font-averia text-[12px] text-[#f5e3b3] hover:text-[#d4af37] bg-[#16120d] border border-[#d4af37]/50 rounded-full px-4 py-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {showAccounts ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Sembunyikan Daftar Rekening</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Tampilkan Daftar Rekening</span>
                </>
              )}
            </button>
          </div>

          {/* VIP BLACK & GOLD ATM-STYLE BANK CARDS */}
          {showAccounts && (
            <div className="space-y-4 mb-8">
              {config.bankAccounts.map((bank) => {
                const isCopied = copiedId === bank.id;
                return (
                  <div
                    key={bank.id}
                    className="atm-card-surface rounded-2xl p-5 text-left relative"
                  >
                    <div className="flex items-start justify-between mb-4">
                      {/* Gold EMV Chip */}
                      <div className="w-10 h-7 rounded-[5px] bg-gradient-to-br from-[#f5e3b3] via-[#d4af37] to-[#9a722c] border border-[#f5e3b3]/60 shadow-inner mt-1" />
                      <BankBrandLogo code={bank.bankCode} />
                    </div>

                    <p className="font-golos font-bold text-[16px] tracking-[0.08em] text-[#f5e3b3] tabular-nums">
                      {bank.accountNumber}
                    </p>
                    <p className="font-golos text-[13px] text-[#d4af37] mt-0.5">
                      {bank.accountHolder}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleCopy(bank.id, bank.accountNumber)}
                      aria-label={`Copy rekening ${bank.accountHolder}`}
                      className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold font-golos text-[11.5px] py-1.5 px-3.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 shadow"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Physical Gift Registry CTA */}
          <div className="dashboard-black-gold rounded-2xl p-5 mb-6">
            <div className="w-12 h-12 mx-auto mb-2.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 flex items-center justify-center text-[#f5e3b3]">
              <Gift className="w-6 h-6" />
            </div>
            <p className="font-playfair text-[12px] text-stone-300 mb-3">
              Klik tombol di bawah untuk titip kado fisik ke acara:
            </p>
            <button
              type="button"
              onClick={onOpenPhysicalGiftModal}
              className="bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold font-averia text-[13px] py-2 px-6 rounded-full shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              Pilih Kado Fisik
            </button>
          </div>

          <p className="font-playfair text-[12.5px] leading-[1.65] text-stone-300 px-2 pt-1">
            {config.covidNotice}
          </p>
        </div>
      </section>

      {/* KEHADIRAN / RSVP & UCAPAN SECTION (TANPA MENU MAKAN MALAM & UCAPAN AWAL 0 KOSONG) */}
      <section
        id="section-rsvp"
        className="section-vip-black-gold py-12 px-5 relative"
      >
        <div className="w-[94%] mx-auto">
          <p className="font-averia text-[10.5px] font-normal uppercase tracking-[0.28em] text-[#d4af37] text-center mb-1">
            Doa Restu &amp; Konfirmasi
          </p>
          <h2 className="font-signature text-[48px] text-[#f5e3b3] text-center mb-6">
            Kehadiran
          </h2>

          <form
            onSubmit={handleFormSubmit}
            noValidate
            className="dashboard-black-gold rounded-3xl p-5 space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="rsvp-nama"
                className="block font-playfair text-[14.5px] text-[#f5e3b3] mb-1.5"
              >
                Nama
              </label>
              <input
                id="rsvp-nama"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full bg-[#0a0806] border border-[#d4af37]/45 rounded-xl px-3.5 py-2.5 text-[13.5px] text-white placeholder-stone-500 focus:outline-none focus:border-[#f5e3b3]"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-ucapan"
                className="block font-playfair text-[14.5px] text-[#f5e3b3] mb-1.5"
              >
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                id="rsvp-ucapan"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Berikan ucapan & doa restu..."
                className="w-full bg-[#0a0806] border border-[#d4af37]/45 rounded-xl px-3.5 py-2.5 text-[13.5px] text-white placeholder-stone-500 focus:outline-none focus:border-[#f5e3b3]"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-kehadiran"
                className="block font-playfair text-[14.5px] text-[#f5e3b3] mb-1.5"
              >
                Kehadiran
              </label>
              <select
                id="rsvp-kehadiran"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full bg-[#0a0806] border border-[#d4af37]/45 rounded-xl px-3.5 py-2.5 text-[13.5px] text-[#f5e3b3] focus:outline-none focus:border-[#f5e3b3]"
              >
                <option value="">Pilih Konfirmasi Kehadiran</option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="rsvp-companion"
                className="block font-playfair text-[14.5px] text-[#f5e3b3] mb-1.5"
              >
                Datang Bersama Siapa?
              </label>
              <input
                id="rsvp-companion"
                type="text"
                value={companion}
                onChange={(e) => setCompanion(e.target.value)}
                placeholder="Contoh: Pasangan / Keluarga"
                className="w-full bg-[#0a0806] border border-[#d4af37]/45 rounded-xl px-3.5 py-2.5 text-[13.5px] text-white placeholder-stone-500 focus:outline-none focus:border-[#f5e3b3]"
              />
            </div>

            {formError && (
              <p
                role="alert"
                className="text-red-300 bg-red-950/70 border border-red-500/40 rounded-xl px-3.5 py-2 text-[12px] font-playfair"
              >
                {formError}
              </p>
            )}

            {formSuccess && (
              <p
                role="status"
                className="text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 rounded-xl px-3.5 py-2 text-[12px] font-playfair"
              >
                Terima kasih! Konfirmasi kehadiran dan ucapan Anda telah
                tersimpan.
              </p>
            )}

            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#b88c42] via-[#d4af37] to-[#9a722c] hover:brightness-110 text-[#0c0a08] font-bold font-playfair text-[14px] py-2.5 px-8 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                Kirim Doa Restu
              </button>
            </div>
          </form>

          {/* LIVE STATS & WISHES BOX (AWAL KOSONG 0 UCAPAN & 0 HADIR) */}
          <div className="mt-6 dashboard-black-gold rounded-3xl p-5 text-left">
            <div
              data-testid="wishes-stats"
              className="font-playfair text-[12.5px] text-[#f5e3b3] flex flex-wrap items-center gap-x-3 gap-y-1 pb-3 border-b border-[#d4af37]/30 tabular-nums"
            >
              <span>{stats.totalWishes} Total Ucapan</span>
              <span aria-hidden="true" className="text-[#d4af37]">·</span>
              <span>{stats.totalAttending} Orang Menyatakan Hadir</span>
            </div>

            <div
              data-testid="wishes-list"
              className="mt-3 max-h-[340px] overflow-y-auto divide-y divide-[#d4af37]/20 pr-1"
            >
              {wishes.length === 0 ? (
                <p
                  data-testid="wishes-empty-state"
                  className="py-6 text-center font-playfair text-[12.5px] italic text-stone-400"
                >
                  Belum ada ucapan dan konfirmasi kehadiran. Jadilah yang
                  pertama memberikan doa restu untuk kedua mempelai.
                </p>
              ) : (
                wishes.map((w) => (
                  <div key={w.id} className="py-3">
                    <p className="font-playfair font-bold text-[13px] text-[#f5e3b3]">
                      {w.name}{' '}
                      <span className="font-normal text-[11px] text-[#d4af37]">
                        - {w.timestamp}
                      </span>
                    </p>
                    {w.badgeText && (
                      <p className="font-playfair text-[11px] text-[#d4af37] mt-0.5">
                        {w.badgeText}
                      </p>
                    )}
                    <p className="font-playfair text-[12.5px] text-stone-200 mt-1 leading-relaxed">
                      {w.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING SECTION (.akhir) - DENGAN DASBOR FOTO HITAM EMAS PAS BINGKAI */}
      <section
        data-testid="closing-section"
        className="relative w-full min-h-[560px] py-12 overflow-hidden flex flex-col justify-center items-center text-center text-white pb-28"
      >
        <img
          src={config.heroImageUrl}
          alt="Penutup Undangan Rumah Adat"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(8, 6, 5, 0.90) 0%, rgba(12, 10, 8, 0.52) 55%, rgba(8, 6, 5, 0.82) 100%)',
          }}
        />
        <div className="relative z-10 px-6 flex flex-col items-center">
          {/* Dasbor Foto Penutupan (Hanya Jika Foto Diaktifkan) */}
          {(config.showCouplePhotos ?? false) && (
            <div
              data-testid="closing-floating-photo-dashboard"
              className="floating-photo-dashboard w-[212px] h-[282px] mb-4 animate-float-slow"
            >
              <div className="feathered-photo-box w-full h-full">
                <img
                  src={
                    config.closingFloatingPhotoUrl ||
                    '/assets/aistudio/lv_0_20261112005653_91461ef9.jpg'
                  }
                  alt="Potret Penutup Kedua Mempelai"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          )}

          <p className="font-averia text-[10.5px] uppercase tracking-[0.26em] text-[#d4af37] mb-1">
            Kami Yang Berbahagia
          </p>
          <h2 className="font-signature text-[45px] text-[#f5e3b3] mb-1.5">
            {config.coupleTitleOrder === 'bride-first'
              ? `${config.brideNickname} & ${config.groomNickname}`
              : `${config.groomNickname} & ${config.brideNickname}`}
          </h2>
          <p className="font-playfair text-[13.5px] text-white/95 mb-4">
            Terimakasih Atas Doa &amp; Restu Bapak/Ibu/Saudara/i
          </p>
          {config.footerBrandTitle && (
            <div className="dashboard-black-gold rounded-2xl px-5 py-3 text-[10.5px] text-white/90 space-y-0.5 font-playfair">
              <p className="text-[#f5e3b3] font-semibold tracking-wider">
                {config.footerBrandTitle}
              </p>
              {config.footerBrandSubtitle && (
                <p className="text-stone-300">{config.footerBrandSubtitle}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
