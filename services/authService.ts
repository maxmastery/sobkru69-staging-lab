import { type Session as SupabaseBrowserSession, type User as SupabaseBrowserUser } from '@supabase/supabase-js';
import { getSupabaseConfig, isSupabaseConfigured, supabaseRest, uploadPublicImage } from './supabaseRest';
import { getSupabaseClient } from './supabaseClient';

const USER_CACHE_STORAGE_KEY = 'sobkru69_current_user';
const ADMIN_SESSION_STORAGE_KEY = 'sobkru69_admin_session';
const GOOGLE_PKCE_VERIFIER_KEY = 'sobkru69_google_pkce_verifier';
const GOOGLE_OAUTH_STATE_KEY = 'sobkru69_google_oauth_state';
const GOOGLE_LOGIN_PENDING_KEY = 'sobkru69_google_login_pending';

const ADMIN_EMAIL = 'Krumax';
const ADMIN_PASSWORD = '@max123456';

type AuthApiUser = {
  id: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  raw_user_meta_data?: Record<string, any>;
  raw_app_meta_data?: Record<string, any>;
};

type AuthSession = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
  expires_at?: number;
  user?: AuthApiUser;
};

type AuthResponsePayload = {
  user?: AuthApiUser;
  session?: AuthSession | null;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  age?: string;
  gender?: string;
  major?: string;
  province?: string;
  examCount?: string;
};

type UserProfileRow = {
  id: string;
  name: string;
  email: string;
  age: string | null;
  gender: string | null;
  major: string | null;
  province: string | null;
  exam_count: string | null;
  role: string | null;
  auth_provider: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at?: string | null;
};

type LegacyUserRow = {
  id: string;
  name: string;
  email: string;
  age: string | null;
  gender: string | null;
  major: string | null;
  province: string | null;
  exam_count: string | null;
  created_at: string | null;
  role: string | null;
};

type UserUiStateRow = {
  user_id: string;
  read_notification_ids: string[] | null;
  read_support_message_ids: string[] | null;
  popup_seen_map: Record<string, string> | null;
  updated_at?: string | null;
};

type AppSettingRow = {
  key: string;
  value: any;
  updated_at: string;
};

type SupportReplyRow = {
  id: string;
  sender: 'user' | 'admin';
  content: string;
  date: string;
};

type SupportMessageRow = {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  subject: string;
  content: string;
  date: string;
  status: 'unread' | 'read' | 'acknowledged' | 'replied';
  replies: SupportReplyRow[] | null;
};

type BellNotificationRow = {
  id: string;
  title: string;
  message: string;
  date: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  age?: string;
  gender?: string;
  major?: string;
  province?: string;
  examCount?: string;
  role?: string;
  createdAt?: string;
  authProvider?: string;
  isActive?: boolean;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
  requiresEmailConfirmation?: boolean;
}

export interface SupportReply {
  id: string;
  sender: 'user' | 'admin';
  content: string;
  date: string;
}

export interface SupportMessage {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  content: string;
  date: string;
  status: 'unread' | 'read' | 'acknowledged' | 'replied';
  replies: SupportReply[];
}

export interface BellNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead?: boolean;
}

export interface MaintenanceModeState {
  isActive: boolean;
  title: string;
  message: string;
  startAt?: string;
  endAt?: string;
}

export interface UserUiState {
  readNotificationIds: string[];
  readSupportMessageIds: string[];
  popupSeenMap: Record<string, string>;
}

export interface AuthStateChangeResult {
  event: string;
  user: User | null;
  message?: string;
}

type GoogleLoginMode = 'current-window' | 'external-browser';

const emptyUiState = (): UserUiState => ({
  readNotificationIds: [],
  readSupportMessageIds: [],
  popupSeenMap: {},
});

const defaultMaintenanceMode = (): MaintenanceModeState => ({
  isActive: false,
  title: 'ปิดปรับปรุงระบบชั่วคราว',
  message: 'ระบบอยู่ระหว่างอัปเดตและปรับปรุงประสิทธิภาพ ขออภัยในความไม่สะดวก',
  startAt: '',
  endAt: '',
});

const safeStorage = {
  getLocal(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setLocal(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  removeLocal(key: string) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
  getSession(key: string) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setSession(key: string, value: string) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  removeSession(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};

const createAdminUser = (): User => ({
  id: 'admin-001',
  name: 'Admin ผู้ดูแลระบบ',
  email: ADMIN_EMAIL,
  role: 'admin',
  authProvider: 'local-admin',
  isActive: true,
  createdAt: new Date().toISOString(),
});

const isAdminCredentials = (identifier: string, password: string) => {
  return identifier.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};

const storeAdminSession = () => {
  safeStorage.setSession(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(createAdminUser()));
};

const clearAdminSession = () => {
  safeStorage.removeSession(ADMIN_SESSION_STORAGE_KEY);
};

const getStoredAdminSession = (): User | null => {
  const raw = safeStorage.getSession(ADMIN_SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const storeCurrentUser = (user: User) => {
  safeStorage.setSession(USER_CACHE_STORAGE_KEY, JSON.stringify(user));
  safeStorage.setLocal(USER_CACHE_STORAGE_KEY, JSON.stringify(user));
  safeStorage.removeLocal('sobkru69_user');
  safeStorage.removeLocal('user');
};

const clearCurrentUser = () => {
  safeStorage.removeSession(USER_CACHE_STORAGE_KEY);
  safeStorage.removeLocal(USER_CACHE_STORAGE_KEY);
  safeStorage.removeLocal('sobkru69_user');
  safeStorage.removeLocal('user');
};

const getCurrentUser = (): User | null => {
  const raw = safeStorage.getSession(USER_CACHE_STORAGE_KEY) || safeStorage.getLocal(USER_CACHE_STORAGE_KEY) || safeStorage.getLocal('sobkru69_user') || safeStorage.getLocal('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const clearStoredSession = () => {
  safeStorage.removeLocal('sobkru69_supabase_session');
};

const ensureConfigured = () => {
  if (!isSupabaseConfigured()) {
    throw new Error('ยังไม่ได้ตั้งค่า Supabase URL และ Anon Key');
  }
  return getSupabaseConfig();
};

const encodeValue = (value: string) => encodeURIComponent(value);

const parseJson = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const readAuthError = async (response: Response) => {
  const text = await response.text();
  const parsed = parseJson(text);
  return parsed?.error_description || parsed?.msg || parsed?.message || text || 'Supabase Auth request failed';
};

const authRequest = async <T>(path: string, init: RequestInit = {}, accessToken?: string): Promise<T> => {
  const config = ensureConfigured();
  const headers = new Headers(init.headers || {});
  headers.set('apikey', config.anonKey);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${config.url}/auth/v1${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(await readAuthError(response));
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
};

const extractMetadata = (authUser?: AuthApiUser | null) => {
  if (!authUser) return {};
  return authUser.user_metadata || authUser.raw_user_meta_data || {};
};

const getAuthProvider = (authUser?: AuthApiUser | null) => {
  if (!authUser) return 'email';
  return authUser.app_metadata?.provider || authUser.raw_app_meta_data?.provider || 'email';
};

const normalizeString = (value?: string | null) => {
  const text = `${value || ''}`.trim();
  return text || undefined;
};

const mapSupabaseUserToAuthApiUser = (user?: SupabaseBrowserUser | null): AuthApiUser | null => {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user_metadata: user.user_metadata || {},
    app_metadata: user.app_metadata || {},
    raw_user_meta_data: user.user_metadata || {},
    raw_app_meta_data: user.app_metadata || {},
  };
};

const mapSupabaseSession = (session?: SupabaseBrowserSession | null): AuthSession | null => {
  if (!session) return null;

  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    token_type: session.token_type,
    expires_in: session.expires_in,
    expires_at: session.expires_at,
    user: mapSupabaseUserToAuthApiUser(session.user) || undefined,
  };
};

const ensureStringArray = (value: unknown): string[] => {
  return Array.isArray(value) ? value.filter(item => typeof item === 'string') : [];
};

const ensureStringMap = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string>>((acc, [key, item]) => {
    if (typeof item === 'string') {
      acc[key] = item;
    }
    return acc;
  }, {});
};

const mapProfileRowToUser = (row: UserProfileRow): User => ({
  id: row.id,
  name: row.name,
  email: row.email,
  age: normalizeString(row.age),
  gender: normalizeString(row.gender),
  major: normalizeString(row.major),
  province: normalizeString(row.province),
  examCount: normalizeString(row.exam_count),
  role: normalizeString(row.role) || 'student',
  createdAt: normalizeString(row.created_at),
  authProvider: normalizeString(row.auth_provider) || 'email',
  isActive: row.is_active !== false,
});

const mapLegacyUserToUser = (row: LegacyUserRow): User => ({
  id: row.id,
  name: row.name,
  email: row.email,
  age: normalizeString(row.age),
  gender: normalizeString(row.gender),
  major: normalizeString(row.major),
  province: normalizeString(row.province),
  examCount: normalizeString(row.exam_count),
  role: normalizeString(row.role) || 'student',
  createdAt: normalizeString(row.created_at),
  authProvider: 'legacy',
  isActive: true,
});

const mapSupportReply = (reply: SupportReplyRow): SupportReply => ({
  id: reply.id,
  sender: reply.sender === 'admin' ? 'admin' : 'user',
  content: reply.content,
  date: reply.date,
});

const mapSupportMessage = (row: SupportMessageRow): SupportMessage => ({
  id: row.id,
  userId: row.user_id,
  userName: row.user_name,
  userEmail: row.user_email,
  subject: row.subject,
  content: row.content,
  date: row.date,
  status: row.status,
  replies: Array.isArray(row.replies) ? row.replies.map(mapSupportReply) : [],
});

const mapBellNotification = (row: BellNotificationRow): BellNotification => ({
  id: row.id,
  title: row.title,
  message: row.message,
  date: row.date,
});

const mapUiStateRow = (row?: UserUiStateRow | null): UserUiState => ({
  readNotificationIds: ensureStringArray(row?.read_notification_ids),
  readSupportMessageIds: ensureStringArray(row?.read_support_message_ids),
  popupSeenMap: ensureStringMap(row?.popup_seen_map),
});

const sha256Hex = async (value: string) => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const createRandomToken = (length = 64) => {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const toBase64Url = (bytes: Uint8Array) => {
  const binary = Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const createCodeChallenge = async (verifier: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return toBase64Url(new Uint8Array(digest));
};

const storeOAuthState = (verifier: string, state: string) => {
  safeStorage.setSession(GOOGLE_PKCE_VERIFIER_KEY, verifier);
  safeStorage.setSession(GOOGLE_OAUTH_STATE_KEY, state);
  safeStorage.setLocal(GOOGLE_PKCE_VERIFIER_KEY, verifier);
  safeStorage.setLocal(GOOGLE_OAUTH_STATE_KEY, state);
};

const buildGoogleAuthorizeUrl = async () => {
  const config = ensureConfigured();
  const verifier = createRandomToken(48);
  const challenge = await createCodeChallenge(verifier);
  const state = createRandomToken(16);

  storeOAuthState(verifier, state);

  const authorizeUrl = new URL(`${config.url}/auth/v1/authorize`);
  authorizeUrl.searchParams.set('provider', 'google');
  authorizeUrl.searchParams.set('redirect_to', window.location.origin);
  authorizeUrl.searchParams.set('code_challenge', challenge);
  authorizeUrl.searchParams.set('code_challenge_method', 's256');
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('prompt', 'select_account');

  return authorizeUrl.toString();
};

const clearOAuthState = () => {
  safeStorage.removeSession(GOOGLE_PKCE_VERIFIER_KEY);
  safeStorage.removeSession(GOOGLE_OAUTH_STATE_KEY);
  safeStorage.removeLocal(GOOGLE_PKCE_VERIFIER_KEY);
  safeStorage.removeLocal(GOOGLE_OAUTH_STATE_KEY);
  safeStorage.removeSession(GOOGLE_OAUTH_PROCESSED_KEY);
};

const GOOGLE_OAUTH_PROCESSED_KEY = 'sobkru69_oauth_processed';

const markGoogleLoginPending = () => {
  safeStorage.setSession(GOOGLE_LOGIN_PENDING_KEY, '1');
  safeStorage.setLocal(GOOGLE_LOGIN_PENDING_KEY, '1');
};

const clearGoogleLoginPending = () => {
  safeStorage.removeSession(GOOGLE_LOGIN_PENDING_KEY);
  safeStorage.removeLocal(GOOGLE_LOGIN_PENDING_KEY);
};

const hasPendingGoogleLogin = () => {
  return safeStorage.getSession(GOOGLE_LOGIN_PENDING_KEY) === '1' || safeStorage.getLocal(GOOGLE_LOGIN_PENDING_KEY) === '1';
};

const markOAuthProcessed = () => {
  safeStorage.setSession(GOOGLE_OAUTH_PROCESSED_KEY, '1');
};

const hasOAuthProcessed = () => {
  return safeStorage.getSession(GOOGLE_OAUTH_PROCESSED_KEY) === '1';
};

const cleanAuthRedirectUrl = () => {
  try {
    const url = new URL(window.location.href);
    url.hash = '';
    ['code', 'state', 'error', 'error_code', 'error_description', 'google_login'].forEach(param => url.searchParams.delete(param));
    window.history.replaceState({}, document.title, url.toString());
    markOAuthProcessed();
  } catch {
    // ignore
  }
};

const getActiveSession = async (): Promise<AuthSession | null> => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return mapSupabaseSession(data.session);
  } catch {
    return null;
  }
};

const upsertOwnProfile = async (authUser: AuthApiUser, accessToken: string): Promise<User> => {
  const metadata = extractMetadata(authUser);
  const payload = {
    id: authUser.id,
    email: authUser.email?.trim().toLowerCase() || '',
    name: `${metadata.name || metadata.full_name || authUser.email?.split('@')[0] || 'ผู้ใช้งาน'}`.trim(),
    age: `${metadata.age || ''}`.trim() || null,
    gender: `${metadata.gender || ''}`.trim() || null,
    major: `${metadata.major || ''}`.trim() || null,
    province: `${metadata.province || ''}`.trim() || null,
    exam_count: `${metadata.examCount || metadata.exam_count || ''}`.trim() || null,
    auth_provider: getAuthProvider(authUser),
  };

  const rows = await supabaseRest.upsert<UserProfileRow[]>('user_profiles', payload, 'id', accessToken);
  const row = rows?.[0] || (await supabaseRest.select<UserProfileRow[]>('user_profiles', `select=*&id=eq.${encodeValue(authUser.id)}&limit=1`, accessToken))[0];
  const user = row ? mapProfileRowToUser(row) : {
    id: authUser.id,
    name: payload.name,
    email: payload.email,
    age: normalizeString(payload.age),
    gender: normalizeString(payload.gender),
    major: normalizeString(payload.major),
    province: normalizeString(payload.province),
    examCount: normalizeString(payload.exam_count),
    role: 'student',
    createdAt: authUser.created_at,
    authProvider: payload.auth_provider,
    isActive: true,
  };

  storeCurrentUser(user);
  return user;
};

const hydrateUserFromSession = async (session: AuthSession): Promise<User> => {
  let authUser = session.user;

  if (!authUser) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    authUser = mapSupabaseUserToAuthApiUser(data.user) || undefined;
  }

  if (!authUser || !session.access_token) {
    throw new Error('ยังไม่มี session การเข้าสู่ระบบ');
  }

  const user = await upsertOwnProfile(authUser, session.access_token);
  if (user.isActive === false) {
    throw new Error('บัญชีของคุณถูกระงับการใช้งาน');
  }
  return user;
};

const buildRegistrationMetadata = (data: Omit<RegisterPayload, 'email' | 'password'>) => ({
  name: data.name,
  age: data.age || '',
  gender: data.gender || '',
  major: data.major || '',
  province: data.province || '',
  examCount: data.examCount || '',
});

const resolveEmailFromIdentifier = async (identifier: string) => {
  const trimmed = identifier.trim();
  if (!trimmed) return '';
  if (trimmed.includes('@')) {
    return trimmed.toLowerCase();
  }

  try {
    const profiles = await supabaseRest.rpc<UserProfileRow[]>('list_user_profiles', {});
    const matched = profiles.find(item => item.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (matched?.email) {
      return matched.email.toLowerCase();
    }
  } catch {
    // ignore and fall back
  }

  try {
    const legacyUsers = await supabaseRest.rpc<LegacyUserRow[]>('list_app_users', {});
    const matched = legacyUsers.find(item => item.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (matched?.email) {
      return matched.email.toLowerCase();
    }
  } catch {
    // ignore
  }

  return trimmed.toLowerCase();
};

const migrateLegacyUserIfNeeded = async (email: string, password: string): Promise<User | null> => {
  const passwordHash = await sha256Hex(password);
  let legacyUsers: LegacyUserRow[] = [];

  try {
    legacyUsers = await supabaseRest.rpc<LegacyUserRow[]>('login_app_user', {
      p_email: email,
      p_password_hash: passwordHash,
    });
  } catch {
    return null;
  }

  if (!legacyUsers.length) {
    return null;
  }

  const legacyUser = mapLegacyUserToUser(legacyUsers[0]);
  const supabase = getSupabaseClient();

  try {
    const { error } = await supabase.auth.signUp({
      email: legacyUser.email.trim().toLowerCase(),
      password,
      options: {
        data: buildRegistrationMetadata({
          name: legacyUser.name,
          age: legacyUser.age,
          gender: legacyUser.gender,
          major: legacyUser.major,
          province: legacyUser.province,
          examCount: legacyUser.examCount,
        }),
      },
    });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    const message = `${error?.message || ''}`.toLowerCase();
    if (!message.includes('already') && !message.includes('registered')) {
      throw error;
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: legacyUser.email.trim().toLowerCase(),
    password,
  });
  if (error) {
    throw error;
  }
  const newSession = mapSupabaseSession(data.session);
  if (!newSession) {
    throw new Error('ยังไม่สามารถสร้าง session หลังย้ายข้อมูลได้');
  }
  return hydrateUserFromSession(newSession);
};

const consumeOAuthRedirectIfNeeded = async (): Promise<AuthSession | null> => {
  if (typeof window === 'undefined') return null;
  const supabase = getSupabaseClient();
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const authError = url.searchParams.get('error_description') || url.searchParams.get('error');

  if (authError) {
    cleanAuthRedirectUrl();
    throw new Error(decodeURIComponent(authError));
  }

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    cleanAuthRedirectUrl();
    if (error) {
      throw new Error(error.message);
    }
    const session = mapSupabaseSession(data.session);
    if (!session) {
      throw new Error('Google login สำเร็จแต่ระบบยังไม่ได้ session กลับมาจาก Supabase');
    }
    return session;
  }

  return null;
};

const getOwnAccessToken = async (targetUserId?: string) => {
  const currentUser = getCurrentUser();
  const session = await getActiveSession();
  if (!session?.access_token || !currentUser || !targetUserId || currentUser.id !== targetUserId || currentUser.email === ADMIN_EMAIL) {
    return '';
  }
  return session.access_token;
};

export const authService = {
  async restoreSession(): Promise<AuthResult> {
    const pendingGoogleLogin = hasPendingGoogleLogin();
    try {
      const adminUser = getStoredAdminSession();
      if (adminUser) {
        storeCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }

      // Skip OAuth processing if already processed (prevents back button from re-triggering OAuth)
      const oauthAlreadyProcessed = hasOAuthProcessed();

      let session = await getActiveSession();
      if (!session && typeof window !== 'undefined' && window.location.search.includes('code=') && !oauthAlreadyProcessed) {
        try {
          session = await consumeOAuthRedirectIfNeeded();
        } catch (exchangeError: any) {
          if (pendingGoogleLogin) {
            return {
              success: false,
              message: exchangeError?.message || 'Google login สำเร็จแล้ว แต่ระบบยังสร้าง session ไม่ครบ',
            };
          }
        }

        if (!session) {
          session = await getActiveSession();
        }
      }

      if (!session) {
        clearCurrentUser();
        if (pendingGoogleLogin) {
          return {
            success: false,
            message: 'การเข้าสู่ระบบยังไม่สมบูรณ์\nกรุณาเข้าสู่ระบบใหม่อีกครั้ง\nหากเปิดจาก LINE แนะนำให้เปิดลิงก์ใน Safari หรือ Chrome ก่อนเข้าสู่ระบบ',
          };
        }
        return { success: false, message: 'ยังไม่มี session การเข้าสู่ระบบ' };
      }

      const user = await hydrateUserFromSession(session);
      if (typeof window !== 'undefined' && (window.location.search.includes('code=') || window.location.search.includes('error=') || window.location.hash.includes('access_token='))) {
        cleanAuthRedirectUrl();
      }
      clearGoogleLoginPending();
      return { success: true, user };
    } catch (error: any) {
      clearStoredSession();
      clearCurrentUser();
      if (pendingGoogleLogin) {
        clearGoogleLoginPending();
      }
      return {
        success: false,
        message: pendingGoogleLogin
          ? error?.message || 'Google login ยังไม่สมบูรณ์ กรุณาลองอีกครั้ง'
          : error?.message || 'ไม่สามารถกู้คืน session ได้',
      };
    }
  },

  async login(identifier: string, password: string): Promise<AuthResult> {
    if (isAdminCredentials(identifier, password)) {
      const adminUser = createAdminUser();
      storeAdminSession();
      storeCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    try {
      const email = await resolveEmailFromIdentifier(identifier);
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }

      const session = mapSupabaseSession(data.session);
      if (!session) {
        throw new Error('ยังไม่มี session การเข้าสู่ระบบ');
      }
      const user = await hydrateUserFromSession(session);
      return { success: true, user };
    } catch (error: any) {
      try {
        const email = await resolveEmailFromIdentifier(identifier);
        const migratedUser = await migrateLegacyUserIfNeeded(email, password);
        if (migratedUser) {
          return { success: true, user: migratedUser };
        }
      } catch (migrationError: any) {
        return {
          success: false,
          message: migrationError?.message || error?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        };
      }

      return {
        success: false,
        message: error?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      };
    }
  },

  async register(data: RegisterPayload): Promise<AuthResult> {
    try {
      const supabase = getSupabaseClient();
      const { data: response, error } = await supabase.auth.signUp({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        options: {
          data: buildRegistrationMetadata(data),
        },
      });
      if (error) {
        throw error;
      }

      const session = mapSupabaseSession(response.session);

      if (session) {
        const user = await hydrateUserFromSession(session);
        return { success: true, user, message: 'สมัครสมาชิกสำเร็จ' };
      }

      return {
        success: true,
        requiresEmailConfirmation: true,
        message: 'สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีก่อนเข้าสู่ระบบ',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'ไม่สามารถสมัครสมาชิกได้',
      };
    }
  },

  async signInWithGoogle(mode: GoogleLoginMode = 'current-window'): Promise<AuthResult> {
    try {
      if (mode === 'external-browser') {
        const launchUrl = new URL(`${window.location.origin}${window.location.pathname}`);
        launchUrl.searchParams.set('google_login', '1');
        const openedWindow = window.open(launchUrl.toString(), '_blank');

        if (openedWindow) {
          try {
            openedWindow.focus();
          } catch {
            // ignore focus failure
          }

          return {
            success: true,
            message: 'เปิดหน้าล็อกอิน Google ในเบราว์เซอร์ใหม่แล้ว ให้ทำต่อในแท็บนั้นได้เลย',
          };
        }

        return {
          success: false,
          message: 'เบราว์เซอร์บล็อกการเปิดแท็บใหม่ กรุณาอนุญาต pop-up แล้วลองอีกครั้ง',
        };
      }

      const supabase = getSupabaseClient();
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      markGoogleLoginPending();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });
      if (error) {
        throw error;
      }

      if (!data.url) {
        throw new Error('Supabase ไม่ได้ส่ง URL สำหรับ Google login กลับมา');
      }

      window.location.assign(data.url);
      return {
        success: true,
        message: 'กำลังพาไปเข้าสู่ระบบด้วย Google...',
      };
    } catch (error: any) {
      clearGoogleLoginPending();
      return {
        success: false,
        message: error?.message || 'ไม่สามารถเริ่มต้น Google Login ได้',
      };
    }
  },

  subscribeToAuthChanges(callback: (result: AuthStateChangeResult) => void) {
    const supabase = getSupabaseClient();
    const { data } = supabase.auth.onAuthStateChange((event, rawSession) => {
      void (async () => {
        if (event === 'SIGNED_OUT' || !rawSession) {
          clearCurrentUser();
          clearStoredSession();
          clearGoogleLoginPending();
          callback({ event, user: null });
          return;
        }

        if (!['SIGNED_IN', 'INITIAL_SESSION', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
          return;
        }

        try {
          const session = mapSupabaseSession(rawSession);
          if (!session) {
            callback({ event, user: null });
            return;
          }

          const user = await hydrateUserFromSession(session);
          clearGoogleLoginPending();
          callback({ event, user });
        } catch (error: any) {
          callback({
            event,
            user: null,
            message: error?.message || 'ไม่สามารถกู้คืน session จาก Google ได้',
          });
        }
      })();
    });

    return {
      unsubscribe: () => data.subscription.unsubscribe(),
    };
  },

  async logout(): Promise<{ success: boolean }> {
    const supabase = getSupabaseClient();
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore logout failure
    } finally {
      clearStoredSession();
      clearCurrentUser();
      clearAdminSession();
      clearOAuthState();
      clearGoogleLoginPending();
    }

    return { success: true };
  },

  async getUsers(): Promise<{ success: boolean; users: User[]; message?: string }> {
    try {
      const rows = await supabaseRest.rpc<UserProfileRow[]>('list_user_profiles', {});
      return {
        success: true,
        users: (rows || []).map(mapProfileRowToUser),
      };
    } catch (error: any) {
      try {
        const legacyRows = await supabaseRest.rpc<LegacyUserRow[]>('list_app_users', {});
        return {
          success: true,
          users: (legacyRows || []).map(mapLegacyUserToUser),
        };
      } catch {
        return {
          success: false,
          users: [],
          message: error?.message || 'ไม่สามารถโหลดรายชื่อผู้ใช้งานได้',
        };
      }
    }
  },

  async updateUser(userId: string, name: string, email: string, password = '', extraData?: Partial<User>): Promise<AuthResult> {
    const currentUser = getCurrentUser();
    const isSelfUpdate = currentUser?.id === userId && currentUser.email !== ADMIN_EMAIL;

    if (isSelfUpdate) {
      try {
        const supabase = getSupabaseClient();
        const session = await getActiveSession();
        if (!session?.access_token) {
          throw new Error('กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
        }

        const payload: {
          email?: string;
          password?: string;
          data: Record<string, string>;
        } = {
          data: {
            name,
            age: extraData?.age || '',
            gender: extraData?.gender || '',
            major: extraData?.major || '',
            province: extraData?.province || '',
            examCount: extraData?.examCount || '',
          },
        };

        if (email.trim() && email.trim().toLowerCase() !== currentUser.email.toLowerCase()) {
          payload.email = email.trim().toLowerCase();
        }
        if (password.trim()) {
          payload.password = password.trim();
        }

        const { data, error } = await supabase.auth.updateUser(payload);
        if (error) {
          throw error;
        }

        const authUser = mapSupabaseUserToAuthApiUser(data.user);
        if (!authUser) {
          throw new Error('ไม่สามารถโหลดข้อมูลผู้ใช้หลังอัปเดตได้');
        }
        const user = await upsertOwnProfile(authUser, session.access_token);
        return {
          success: true,
          user: {
            ...user,
            age: extraData?.age || user.age,
            gender: extraData?.gender || user.gender,
            major: extraData?.major || user.major,
            province: extraData?.province || user.province,
            examCount: extraData?.examCount || user.examCount,
          },
        };
      } catch (error: any) {
        return {
          success: false,
          message: error?.message || 'ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้',
        };
      }
    }

    try {
      const rows = await supabaseRest.rpc<UserProfileRow[]>('admin_update_user_profile', {
        p_user_id: userId,
        p_name: name,
        p_email: email,
        p_age: extraData?.age ?? null,
        p_gender: extraData?.gender ?? null,
        p_major: extraData?.major ?? null,
        p_province: extraData?.province ?? null,
        p_exam_count: extraData?.examCount ?? null,
      });

      return {
        success: true,
        user: rows?.[0] ? mapProfileRowToUser(rows[0]) : undefined,
        message: password.trim() ? 'อัปเดตข้อมูลสำเร็จ (รหัสผ่านของผู้ใช้อื่นต้องให้เจ้าของบัญชีเปลี่ยนเอง)' : 'อัปเดตข้อมูลสำเร็จ',
      };
    } catch (error: any) {
      try {
        const passwordHash = password.trim() ? await sha256Hex(password.trim()) : '';
        const rows = await supabaseRest.rpc<LegacyUserRow[]>('update_app_user', {
          p_user_id: userId,
          p_name: name,
          p_email: email,
          p_password_hash: passwordHash || null,
          p_age: extraData?.age ?? null,
          p_gender: extraData?.gender ?? null,
          p_major: extraData?.major ?? null,
          p_province: extraData?.province ?? null,
          p_exam_count: extraData?.examCount ?? null,
        });

        return {
          success: true,
          user: rows?.[0] ? mapLegacyUserToUser(rows[0]) : undefined,
        };
      } catch {
        return {
          success: false,
          message: error?.message || 'ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้',
        };
      }
    }
  },

  async deleteUser(userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await supabaseRest.rpc<boolean>('deactivate_user_profile', {
        p_user_id: userId,
      });
      return {
        success: Boolean(result),
      };
    } catch (error: any) {
      try {
        const result = await supabaseRest.rpc<boolean>('delete_app_user', {
          p_user_id: userId,
        });
        return { success: Boolean(result) };
      } catch {
        return {
          success: false,
          message: error?.message || 'ไม่สามารถปิดการใช้งานผู้ใช้ได้',
        };
      }
    }
  },

  async getUserUiState(userId: string): Promise<{ success: boolean; state: UserUiState; message?: string }> {
    if (!userId || userId === 'admin-001') {
      return { success: true, state: emptyUiState() };
    }

    try {
      const accessToken = await getOwnAccessToken(userId);
      if (!accessToken) {
        return { success: true, state: emptyUiState() };
      }

      const rows = await supabaseRest.select<UserUiStateRow[]>('user_ui_state', `select=*&user_id=eq.${encodeValue(userId)}&limit=1`, accessToken);
      if (rows.length > 0) {
        return { success: true, state: mapUiStateRow(rows[0]) };
      }

      const created = await supabaseRest.upsert<UserUiStateRow[]>('user_ui_state', {
        user_id: userId,
        read_notification_ids: [],
        read_support_message_ids: [],
        popup_seen_map: {},
      }, 'user_id', accessToken);

      return {
        success: true,
        state: mapUiStateRow(created?.[0]),
      };
    } catch (error: any) {
      return {
        success: false,
        state: emptyUiState(),
        message: error?.message || 'ไม่สามารถโหลดสถานะการใช้งานได้',
      };
    }
  },

  async saveUserUiState(userId: string, patch: Partial<UserUiState>): Promise<{ success: boolean; state: UserUiState; message?: string }> {
    if (!userId || userId === 'admin-001') {
      return { success: true, state: emptyUiState() };
    }

    try {
      const accessToken = await getOwnAccessToken(userId);
      if (!accessToken) {
        return { success: false, state: emptyUiState(), message: 'ไม่พบ session ผู้ใช้งาน' };
      }

      const current = await this.getUserUiState(userId);
      const nextState: UserUiState = {
        readNotificationIds: patch.readNotificationIds ?? current.state.readNotificationIds,
        readSupportMessageIds: patch.readSupportMessageIds ?? current.state.readSupportMessageIds,
        popupSeenMap: patch.popupSeenMap ?? current.state.popupSeenMap,
      };

      const rows = await supabaseRest.upsert<UserUiStateRow[]>('user_ui_state', {
        user_id: userId,
        read_notification_ids: nextState.readNotificationIds,
        read_support_message_ids: nextState.readSupportMessageIds,
        popup_seen_map: nextState.popupSeenMap,
      }, 'user_id', accessToken);

      return {
        success: true,
        state: mapUiStateRow(rows?.[0] || {
          user_id: userId,
          read_notification_ids: nextState.readNotificationIds,
          read_support_message_ids: nextState.readSupportMessageIds,
          popup_seen_map: nextState.popupSeenMap,
        }),
      };
    } catch (error: any) {
      return {
        success: false,
        state: emptyUiState(),
        message: error?.message || 'ไม่สามารถบันทึกสถานะการใช้งานได้',
      };
    }
  },

  async getNotification(): Promise<{ success: boolean; notification?: { title: string; message: string; imageUrl: string; isActive: boolean; updatedAt?: string } }> {
    const rows = await supabaseRest.select<AppSettingRow[]>('app_settings', `select=*&key=eq.${encodeValue('popup_notification')}&limit=1`);
    const value = rows?.[0]?.value || {};
    return {
      success: true,
      notification: {
        title: value.title || '',
        message: value.message || '',
        imageUrl: value.imageUrl || '',
        isActive: Boolean(value.isActive),
        updatedAt: value.updatedAt || '',
      },
    };
  },

  async setNotification(title: string, message: string, isActive: boolean, imageUrl = ''): Promise<{ success: boolean; message?: string }> {
    await supabaseRest.upsert<AppSettingRow[]>('app_settings', {
      key: 'popup_notification',
      value: {
        title,
        message,
        imageUrl,
        isActive,
        updatedAt: new Date().toISOString(),
      },
      updated_at: new Date().toISOString(),
    }, 'key');
    return { success: true };
  },

  async getMarquee(): Promise<{ success: boolean; text: string; isActive: boolean }> {
    const rows = await supabaseRest.select<AppSettingRow[]>('app_settings', `select=*&key=eq.${encodeValue('marquee')}&limit=1`);
    const value = rows?.[0]?.value || {};
    return {
      success: true,
      text: value.text || '',
      isActive: value.isActive !== false,
    };
  },

  async setMarquee(text: string, isActive: boolean): Promise<{ success: boolean }> {
    await supabaseRest.upsert<AppSettingRow[]>('app_settings', {
      key: 'marquee',
      value: {
        text,
        isActive,
      },
      updated_at: new Date().toISOString(),
    }, 'key');
    return { success: true };
  },

  async getMaintenanceMode(): Promise<{ success: boolean; maintenance: MaintenanceModeState }> {
    try {
      const rows = await supabaseRest.select<AppSettingRow[]>('app_settings', `select=*&key=eq.${encodeValue('maintenance_mode')}&limit=1`);
      const value = rows?.[0]?.value || {};
      return {
        success: true,
        maintenance: {
          isActive: Boolean(value.isActive),
          title: value.title || defaultMaintenanceMode().title,
          message: value.message || defaultMaintenanceMode().message,
          startAt: value.startAt || '',
          endAt: value.endAt || '',
        },
      };
    } catch {
      return {
        success: true,
        maintenance: defaultMaintenanceMode(),
      };
    }
  },

  async setMaintenanceMode(maintenance: MaintenanceModeState): Promise<{ success: boolean }> {
    await supabaseRest.upsert<AppSettingRow[]>('app_settings', {
      key: 'maintenance_mode',
      value: {
        isActive: maintenance.isActive,
        title: maintenance.title,
        message: maintenance.message,
        startAt: maintenance.startAt || '',
        endAt: maintenance.endAt || '',
      },
      updated_at: new Date().toISOString(),
    }, 'key');
    return { success: true };
  },

  async getBellNotifications(): Promise<{ success: boolean; notifications: BellNotification[] }> {
    const rows = await supabaseRest.select<BellNotificationRow[]>('bell_notifications', 'select=*&order=date.desc');
    return {
      success: true,
      notifications: (rows || []).map(mapBellNotification),
    };
  },

  async saveBellNotification(data: { title: string; message: string }): Promise<{ success: boolean }> {
    await supabaseRest.insert<BellNotificationRow[]>('bell_notifications', {
      title: data.title,
      message: data.message,
      date: new Date().toISOString(),
    });
    return { success: true };
  },

  async deleteBellNotification(id: string): Promise<{ success: boolean }> {
    await supabaseRest.delete<BellNotificationRow[]>('bell_notifications', `id=eq.${encodeValue(id)}`);
    return { success: true };
  },

  async getSupportMessages(): Promise<{ success: boolean; messages: SupportMessage[] }> {
    const rows = await supabaseRest.select<SupportMessageRow[]>('support_messages', 'select=*&order=date.desc');
    return {
      success: true,
      messages: (rows || []).map(mapSupportMessage),
    };
  },

  async saveSupportMessage(payload: {
    userId: string;
    userName: string;
    userEmail: string;
    subject: string;
    content: string;
  }): Promise<{ success: boolean; id?: string }> {
    const rows = await supabaseRest.insert<SupportMessageRow[]>('support_messages', {
      user_id: payload.userId,
      user_name: payload.userName,
      user_email: payload.userEmail,
      subject: payload.subject,
      content: payload.content,
      date: new Date().toISOString(),
      status: 'unread',
      replies: [],
    });
    return { success: true, id: rows?.[0]?.id };
  },

  async updateSupportMessage(id: string, updateData: Partial<SupportMessage>): Promise<{ success: boolean }> {
    const payload: Record<string, unknown> = {};
    if (updateData.status) payload.status = updateData.status;
    if (updateData.replies) payload.replies = updateData.replies;
    await supabaseRest.update<SupportMessageRow[]>('support_messages', `id=eq.${encodeValue(id)}`, payload);
    return { success: true };
  },

  async uploadImage(file: File, _legacyFolderId?: string): Promise<{ success: boolean; url?: string; message?: string }> {
    try {
      const result = await uploadPublicImage(file, 'admin-images');
      return {
        success: true,
        url: result.url,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'อัปโหลดรูปภาพไม่สำเร็จ',
      };
    }
  },
};
