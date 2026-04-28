
const isSupabaseConfigured = () => {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

const requireConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase configuration missing');
  return { url, key };
};

const getHeaders = (config: { key: string }, extra: Record<string, string> = {}, authToken?: string) => {
  const headers: Record<string, string> = {
    'apikey': config.key,
    ...extra,
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  } else {
    headers['Authorization'] = `Bearer ${config.key}`;
  }
  return headers;
};

const readResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'API request failed');
  }
  if (response.status === 204) return [] as any;
  return response.json();
};

export const supabaseRest = {
  async select<T>(table: string, query?: string, authToken?: string): Promise<T> {
    const config = requireConfig();
    const url = `${config.url}/rest/v1/${table}${query ? `?${query}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(config, {}, authToken),
    });
    return readResponse<T>(response);
  },

  async insert<T>(table: string, data: Record<string, unknown> | Record<string, unknown>[], authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      }, authToken),
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },

  async upsert<T>(table: string, data: Record<string, unknown> | Record<string, unknown>[], onConflict?: string, authToken?: string): Promise<T> {
    const config = requireConfig();
    const query = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : '';
    const response = await fetch(`${config.url}/rest/v1/${table}${query}`, {
      method: 'POST',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation',
      }, authToken),
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },

  async update<T>(table: string, query: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
      method: 'PATCH',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      }, authToken),
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },

  async delete<T>(table: string, query: string, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
      method: 'DELETE',
      headers: getHeaders(config, {}, authToken),
    });
    return readResponse<T>(response);
  },

  async rpc<T>(functionName: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const config = requireConfig();
    const response = await fetch(`${config.url}/rest/v1/rpc/${functionName}`, {
      method: 'POST',
      headers: getHeaders(config, {
        'Content-Type': 'application/json',
      }, authToken),
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },
};

export { isSupabaseConfigured };
