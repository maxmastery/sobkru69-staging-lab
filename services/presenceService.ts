import { supabaseRest } from './supabaseRest';

export const presenceService = {
  async trackPresence(sessionId: string, authToken?: string): Promise<void> {
    try {
      const res = await supabaseRest.upsert('online_presence', {
        id: sessionId,
        last_seen: new Date().toISOString()
      }, 'id', authToken);
      console.log(`[PRESENCE DEBUG] Upsert success for ${sessionId}:`, res);
    } catch (err) {
      console.error('[PRESENCE DEBUG] trackPresence error:', err);
    }
  },

  async getOnlineCount(authToken?: string): Promise<number> {
    try {
      const since = new Date(Date.now() - 60 * 1000).toISOString();
      // head: true, count: exact logic
      const url = `online_presence?last_seen=gte.${encodeURIComponent(since)}&select=id`;
      // supabaseRest.select returns the data array. We need the length.
      // Note: If using standard REST without head=true, we get the array.
      const data = await supabaseRest.select<any[]>(url, '', authToken);
      
      if (Array.isArray(data)) {
        console.log(`[PRESENCE DEBUG] Active records found: ${data.length}`);
        return data.length;
      }
      
      console.warn('[PRESENCE DEBUG] Unexpected data format:', data);
      return 0;
    } catch (err) {
      console.error('[PRESENCE DEBUG] getOnlineCount error:', err);
      return 0;
    }
  }
};
