import { WishItem } from './invitationData';

export function parseGuestNameFromSearch(
  search: string,
  defaultName = 'Bapak Budi'
): string {
  if (!search) return defaultName;
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const kpd = params.get('kpd') || params.get('to') || params.get('kepada');
  if (kpd && kpd.trim().length > 0) {
    return kpd.trim();
  }
  return defaultName;
}

export function shouldAutoStartFromSearch(search: string): boolean {
  if (!search) return false;
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  return params.get('autostart') === '1' || params.get('open') === '1';
}

export function calculateCountdown(
  targetIso: string,
  nowMs: number
): { days: number; hours: number; minutes: number; seconds: number } {
  const targetMs = new Date(targetIso).getTime();
  if (Number.isNaN(targetMs) || targetMs <= nowMs) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const diffSeconds = Math.floor((targetMs - nowMs) / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  return { days, hours, minutes, seconds };
}

export interface RsvpSubmissionInput {
  name: string;
  message: string;
  attendance: string;
  companion?: string;
  dinnerMenu?: string;
  customOption?: string;
}

export function validateRsvpSubmission(input: RsvpSubmissionInput): {
  valid: boolean;
  error?: string;
} {
  if (!input.name || input.name.trim().length === 0) {
    return { valid: false, error: 'Nama wajib diisi.' };
  }
  if (!input.message || input.message.trim().length === 0) {
    return { valid: false, error: 'Ucapan doa restu wajib diisi.' };
  }
  if (
    !input.attendance ||
    (input.attendance !== 'Hadir' && input.attendance !== 'Tidak Hadir')
  ) {
    return { valid: false, error: 'Silakan pilih konfirmasi kehadiran.' };
  }
  return { valid: true };
}

export function addWishAndUpdateStats(
  currentWishes: WishItem[],
  currentStats: { totalWishes: number; totalAttending: number },
  submission: RsvpSubmissionInput & { timestampIso: string }
): {
  wishes: WishItem[];
  stats: { totalWishes: number; totalAttending: number };
} {
  const extraParts: string[] = [];
  if (submission.companion && submission.companion.trim()) {
    extraParts.push(`Bersama: ${submission.companion.trim()}`);
  }
  if (submission.dinnerMenu && submission.dinnerMenu.trim()) {
    extraParts.push(`Menu: ${submission.dinnerMenu.trim()}`);
  }

  const newWish: WishItem = {
    id: `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: submission.name.trim(),
    timestamp: submission.timestampIso,
    message: submission.message.trim(),
    attendance: submission.attendance === 'Hadir' ? 'Hadir' : 'Tidak Hadir',
    badgeText: extraParts.length > 0 ? extraParts.join(' · ') : undefined,
    companion: submission.companion?.trim(),
    dinnerMenu: submission.dinnerMenu?.trim(),
  };

  const nextTotalWishes = currentStats.totalWishes + 1;
  const nextTotalAttending =
    submission.attendance === 'Hadir'
      ? currentStats.totalAttending + 1
      : currentStats.totalAttending;

  return {
    wishes: [newWish, ...currentWishes],
    stats: {
      totalWishes: nextTotalWishes,
      totalAttending: nextTotalAttending,
    },
  };
}
