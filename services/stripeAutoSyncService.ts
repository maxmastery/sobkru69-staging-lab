const AUTO_SYNC_INTERVAL_MS = 5000;
const STORAGE_KEY = 'sobkru69_stripe_auto_sync_last_run';

let intervalId: number | null = null;
let isRunning = false;

const getLastRunAt = () => {
  try {
    return Number(localStorage.getItem(STORAGE_KEY) || 0);
  } catch {
    return 0;
  }
};

const setLastRunAt = (value: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Ignore storage errors; the network guard still prevents overlap in this tab.
  }
};

const shouldSync = () => {
  if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
    return false;
  }

  return Date.now() - getLastRunAt() >= AUTO_SYNC_INTERVAL_MS - 300;
};

const runAutoSync = async () => {
  if (isRunning || !shouldSync()) return;

  isRunning = true;
  setLastRunAt(Date.now());

  try {
    await fetch('/api/stripe-auto-sync', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ source: 'browser-watchdog' }),
    });
  } catch (error) {
    // Best-effort fallback. Manual sync and Stripe webhooks remain the source of truth.
    console.debug('Stripe auto sync skipped', error);
  } finally {
    isRunning = false;
  }
};

export const stripeAutoSyncService = {
  start() {
    if (typeof window === 'undefined' || intervalId !== null) {
      return () => {};
    }

    void runAutoSync();
    intervalId = window.setInterval(() => {
      void runAutoSync();
    }, AUTO_SYNC_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void runAutoSync();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  },
};
