
export const isSupabaseConfigured = () => {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

export const getSupabaseConfig = () => {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  };
};

const requireConfig = () => {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) throw new Error('Supabase configuration missing');
  return { url, key: anonKey };
};

export const getAuthHeaders = (authToken?: string) => {
  const { key } = requireConfig();
  const headers: Record<string, string> = {
    'apikey': key,
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
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
    const { url } = requireConfig();
    const fullUrl = `${url}/rest/v1/${table}${query ? `?${query}` : ''}`;
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: getAuthHeaders(authToken),
    });
    return readResponse<T>(response);
  },

  async insert<T>(table: string, data: Record<string, unknown> | Record<string, unknown>[], authToken?: string): Promise<T> {
    const { url } = requireConfig();
    const response = await fetch(`${url}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(authToken),
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },

  async upsert<T>(table: string, data: Record<string, unknown> | Record<string, unknown>[], onConflict?: string, authToken?: string): Promise<T> {
    const { url } = requireConfig();
    const query = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : '';
    const response = await fetch(`${url}/rest/v1/${table}${query}`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(authToken),
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },

  async update<T>(table: string, query: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const { url } = requireConfig();
    const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeaders(authToken),
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },

  async delete<T>(table: string, query: string, authToken?: string): Promise<T> {
    const { url } = requireConfig();
    const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
      method: 'DELETE',
      headers: getAuthHeaders(authToken),
    });
    return readResponse<T>(response);
  },

  async rpc<T>(functionName: string, data: Record<string, unknown>, authToken?: string): Promise<T> {
    const { url } = requireConfig();
    const response = await fetch(`${url}/rest/v1/rpc/${functionName}`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(authToken),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return readResponse<T>(response);
  },
};
