import { syncRecentStripeSessions as syncSalesStoreSessions } from './_stripe-utils.js';

export const syncRecentStripeSessions = async ({ limit = 50 } = {}) => {
  const result = await syncSalesStoreSessions({ limit, sendDeliveries: true });
  return {
    synced: result.syncedCount,
    skipped: 0,
    failed: 0,
    checked: result.syncedCount,
    paid: result.syncedCount,
    results: [],
    store: result.store,
  };
};
