import { supabaseRest } from './supabaseRest';

export interface PresenceResponse {
  success: boolean;
  error?: string;
  data?: any;
}

export const presenceService = {
  async trackPresence(sessionId: string, authToken?: string): Promise<PresenceResponse> {
    try {
      const res = await supabaseRest.upsert('online_presence', {
        id: sessionId,
        last_seen: new Date().toISOString()
      }, 'id', authToken);
      return { success: true, data: res };
    } catch (err: any) {
      console.error('[PRESENCE DEBUG] trackPresence error:', err);
      return { success: false, error: err.message || String(err) };
    }
  },

  async getOnlineCountWithDebug(authToken?: string): Promise<{ count: number; error?: string; since: string }> {
    const since = new Date(Date.now() - 60 * 1000).toISOString();
    try {
      const url = `online_presence?last_seen=gte.${encodeURIComponent(since)}&select=id`;
      const data = await supabaseRest.select<any[]>(url, '', authToken);
      
      if (Array.isArray(data)) {
        return { count: data.length, since };
      }
      return { count: 0, error: 'Response data is not an array', since };
    } catch (err: any) {
      console.error('[PRESENCE DEBUG] getOnlineCount error:', err);
      return { count: 0, error: err.message || String(err), since };
    }
  }
};
