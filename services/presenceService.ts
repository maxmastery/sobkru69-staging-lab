import { supabaseRest } from './supabaseRest';

export const presenceService = {
  async trackPresence(sessionId: string, userId: string | null, authToken?: string): Promise<void> {
    try {
      await supabaseRest.upsert('online_users', {
        session_id: sessionId,
        user_id: userId,
        last_seen: new Date().toISOString()
      }, 'session_id', authToken);
      console.log(`[PRESENCE] Tracked session ${sessionId.slice(0, 8)}...`);
    } catch (err) {
      console.error('[PRESENCE] trackPresence error:', err);
    }
  },

  async getOnlineCount(authToken?: string): Promise<number> {
    try {
      // Use RPC for efficiency
      const count = await supabaseRest.rpc<number>('get_online_count', {}, authToken);
      console.log(`[PRESENCE] Online count from DB: ${count}`);
      return count || 0;
    } catch (err) {
      console.error('[PRESENCE] getOnlineCount error:', err);
      return 0;
    }
  }
};
