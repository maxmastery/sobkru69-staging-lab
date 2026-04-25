import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './supabaseRest';

let cachedClient: SupabaseClient | null = null;
let cachedSignature = '';

export const getSupabaseClient = (): SupabaseClient => {
  const config = getSupabaseConfig();

  if (!config.url || !config.anonKey) {
    throw new Error('ยังไม่ได้ตั้งค่า Supabase URL และ Anon Key');
  }

  const signature = `${config.url}::${config.anonKey}`;
  if (cachedClient && cachedSignature === signature) {
    return cachedClient;
  }

  cachedClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storageKey: 'sobkru69-supabase-auth',
    },
  });
  cachedSignature = signature;

  return cachedClient;
};
