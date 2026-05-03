export interface SupabaseRuntimeConfig {
  url: string;
  anonKey: string;
  imagesBucket: string;
  slipsBucket: string;
  filesBucket: string;
}

const DEFAULT_IMAGES_BUCKET = 'sobkru-images';
const DEFAULT_SLIPS_BUCKET = 'sobkru-slips';
const DEFAULT_FILES_BUCKET = 'sobkru-files';
const DEFAULT_READ_CACHE_TTL_MS = 45_000;
const STATIC_READ_CACHE_TTL_MS = 5 * 60_000;

type CacheEntry = {
  expiresAt: number;
  value: unknown;
};

const readCache = new Map<string, CacheEntry>();
const pendingReads = new Map<string, Promise<unknown>>();

const getCacheTtl = (resource: string) => {
  if (['app_settings', 'user_sessions', 'study_time', 'lesson_progress', 'daily_login_log', 'content_views'].includes(resource)) {
    return 0;
  }

  if (['news_posts', 'discussion_threads', 'discussion_replies', 'products', 'bell_notifications'].includes(resource)) {
    return STATIC_READ_CACHE_TTL_MS;
  }

  return DEFAULT_READ_CACHE_TTL_MS;
};

const CACHEABLE_RPC_FUNCTIONS = new Set([
  'list_user_profiles',
  'list_app_users',
]);

const getCachedRead = <T>(key: string): T | null => {
  const entry = readCache.get(key);
  if (!entry) return null;

  if (Date.now() >= entry.expiresAt) {
    readCache.delete(key);
    return null;
  }

  return entry.value as T;
};

const setCachedRead = (key: string, value: unknown, ttlMs: number) => {
  readCache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
};

const clearReadCache = () => {
  readCache.clear();
  pendingReads.clear();
};

const cachedRequest = async <T>(key: string, ttlMs: number, request: () => Promise<T>): Promise<T> => {
  if (ttlMs <= 0) {
    return request();
  }

  const cached = getCachedRead<T>(key);
  if (cached !== null) {
    return cached;
  }

  const pending = pendingReads.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const promise = request()
    .then((value) => {
      setCachedRead(key, value, ttlMs);
      return value;
    })
    .finally(() => {
      pendingReads.delete(key);
    });

  pendingReads.set(key, promise);
  return promise;
};

const getEnvValue = (key: string) => {
  const viteEnv = (import.meta as any).env;
  return viteEnv?.[key] || '';
};

const getLocalValue = (key: string) => {
  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
  }
};

const normalizeSupabaseUrl = (rawValue: string) => {
  const value = rawValue.trim();
  const markdownMatch = value.match(/\((https?:\/\/[^)\s]+)\)/i);
  const extracted = markdownMatch?.[1] || value.replace(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/i, '$2');
  return extracted.replace(/^["']|["']$/g, '').replace(/\/+$/, '');
};

export function getSupabaseConfig(): SupabaseRuntimeConfig {
  const url = normalizeSupabaseUrl(getLocalValue('VITE_SUPABASE_URL') || getEnvValue('VITE_SUPABASE_URL'));
  const anonKey = getLocalValue('VITE_SUPABASE_ANON_KEY') || getEnvValue('VITE_SUPABASE_ANON_KEY');
  
  // For debugging in development
  if ((import.meta as any).env?.DEV) {
    console.log('Supabase config URL:', url ? 'configured' : 'MISSING', 'Key:', anonKey ? 'configured' : 'MISSING');
  }

  return {
    url,
    anonKey,
    imagesBucket: getLocalValue('VITE_SUPABASE_IMAGES_BUCKET') || getEnvValue('VITE_SUPABASE_IMAGES_BUCKET') || DEFAULT_IMAGES_BUCKET,
    slipsBucket: getLocalValue('VITE_SUPABASE_SLIPS_BUCKET') || getEnvValue('VITE_SUPABASE_SLIPS_BUCKET') || DEFAULT_SLIPS_BUCKET,
    filesBucket: getLocalValue('VITE_SUPABASE_FILES_BUCKET') || getEnvValue('VITE_SUPABASE_FILES_BUCKET') || DEFAULT_FILES_BUCKET,
  };
}

export const isSupabaseConfigured = () => {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
};

const requireConfig = () => {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    throw new Error('ยังไม่ได้ตั้งค่า Supabase URL และ Anon Key');
  }
  return config;
};

const getHeaders = (config: SupabaseRuntimeConfig, extra?: HeadersInit, authToken?: string): HeadersInit => ({
  apikey: config.anonKey,
  Authorization: `Bearer ${authToken || config.anonKey}`,
  ...extra,
});

const readResponse = async <T>(response: Response): Promise<T> => {
  const text = await response.text();
  const parsed = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = parsed?.message || parsed?.hint || parsed?.details || text || 'Supabase request failed';
    console.error('Supabase REST error:', { status: response.status, message, parsed });
    throw new Error(message);
  }

  return parsed as T;
};

export const supabaseRest = {
  async select<T>(table: string, query = '', authToken?: string): Promise<T> {
    const config = requireConfig();
    const url = `${config.url}/rest/v1/${table}${query ? `?${query}` : ''}`;
    const cacheKey = `select:${authToken ? 'auth' : 'anon'}:${url}`;

    return cachedRequest(cacheKey, getCacheTtl(table), async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(config, undefined, authToken),
      });

      return readResponse<T>(response);
    });
  },

  async insert<T>(table: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      }, authToken),
      body: JSON.stringify(data),
    });

    const result = await readResponse<T>(response);
    clearReadCache();
    return result;
  },

  async upsert<T>(table: string, data: Record<string, unknown>, onConflict: string, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`, {
      method: 'POST',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      }, authToken),
      body: JSON.stringify(data),
    });

    const result = await readResponse<T>(response);
    clearReadCache();
    return result;
  },

  async update<T>(table: string, query: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
      method: 'PATCH',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      }, authToken),
      body: JSON.stringify(data),
    });

    const result = await readResponse<T>(response);
    clearReadCache();
    return result;
  },

  async delete<T>(table: string, query: string, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
      method: 'DELETE',
      headers: getHeaders(config, {
        Prefer: 'return=representation',
      }, authToken),
    });

    const result = await readResponse<T>(response);
    clearReadCache();
    return result;
  },

  async rpc<T>(functionName: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const config = requireConfig();
    const cacheKey = `rpc:${authToken ? 'auth' : 'anon'}:${functionName}:${JSON.stringify(data)}`;
    const runRequest = async () => {
      const response = await fetch(`${config.url}/rest/v1/rpc/${functionName}`, {
        method: 'POST',
        headers: getHeaders(config, {
          'Content-Type': 'application/json',
        }, authToken),
        body: JSON.stringify(data),
      });

      return readResponse<T>(response);
    };

    if (CACHEABLE_RPC_FUNCTIONS.has(functionName)) {
      return cachedRequest(cacheKey, getCacheTtl(functionName), runRequest);
    }

    const result = await runRequest();
    clearReadCache();
    return result;
  },
};

const safeSegment = (value: string) => {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'uploads';
};

const getSafeFileName = (fileName: string) => {
  const parts = fileName.split('.');
  const ext = parts.length > 1 ? parts.pop() : '';
  const base = safeSegment(parts.join('.') || 'file');
  return `${base}.${safeSegment(ext || 'bin')}`;
};

const encodeStoragePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

export const uploadBucketFile = async (file: File, bucket: string, folder = 'uploads', isPublic = false) => {
  const config = requireConfig();
  const safeFolder = safeSegment(folder);
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const path = `${safeFolder}/${Date.now()}-${suffix}-${getSafeFileName(file.name)}`;
  const response = await fetch(`${config.url}/storage/v1/object/${bucket}/${encodeStoragePath(path)}`, {
    method: 'POST',
    headers: getHeaders(config, {
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
    }),
    body: file,
  });

  await readResponse<Record<string, unknown>>(response);

  return {
    path,
    url: isPublic ? `${config.url}/storage/v1/object/public/${bucket}/${encodeStoragePath(path)}` : '',
  };
};

export const uploadPublicImage = async (file: File, folder = 'uploads') => {
  const config = requireConfig();
  return uploadBucketFile(file, config.imagesBucket, folder, true);
};
