import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './supabaseRest';

let cachedClient: SupabaseClient | null = null;
let cachedSignature = '';

const browserLocalStorage = {
  getItem: (key: string) => {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // ignore storage failures in restricted browser modes
    }
  },
  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch {
      // ignore storage failures in restricted browser modes
    }
  },
};

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
      storage: browserLocalStorage,
    },
  });
  cachedSignature = signature;

  return cachedClient;
};
