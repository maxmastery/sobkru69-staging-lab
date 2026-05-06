import { getSupabaseConfig, isSupabaseConfigured, supabaseRest, uploadBucketFile, uploadPublicImage } from './supabaseRest';

type NewsRow = {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string | null;
  image_url: string | null;
  date: string;
  status: 'published' | 'draft';
  view_count?: number | null;
};

type DiscussionThreadRow = {
  id: string;
  title: string;
  content: string;
  author: string;
  tag: 'question' | 'suggestion';
  date: string;
  replies_count: number;
  status: 'active' | 'hidden' | 'deleted';
  is_highlighted: boolean;
  view_count?: number | null;
};

type DiscussionReplyRow = {
  id: string;
  thread_id: string;
  author: string;
  content: string;
  date: string;
  is_admin: boolean;
};

type ReportRow = {
  id: string;
  reporter_id: string;
  reporter_name: string;
  reported_user_id: string;
  reported_user_name: string;
  reason: string;
  type: 'post' | 'comment';
  target_id: string;
  target_content: string;
  date: string;
  status: 'pending' | 'resolved' | 'dismissed';
};

type BannedUserRow = {
  id: string;
  user_id: string;
  user_name: string;
  reason: string;
  ban_type: 'temporary' | 'permanent';
  banned_at: string;
  ban_until: string | null;
};

type ProductRow = {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image_url: string | null;
  features: unknown;
  status: 'in_stock' | 'out_of_stock';
  created_at?: string;
  view_count?: number | null;
};

type ContentViewRow = {
  id: string;
  content_type: 'news' | 'discussion' | 'product';
  content_id: string;
  viewer_key: string;
  viewed_at: string;
};

type DonationRow = {
  id: string;
  user_id: string | null;
  user_email: string | null;
  tier_id: string | null;
  tier_name: string | null;
  amount: string | number | null;
  slip_path: string | null;
  slip_hash: string | null;
  slip_text_hash: string | null;
  transaction_ref: string | null;
  status: 'pending' | 'verified' | 'rejected';
  verification_message: string | null;
  gift_link: string | null;
  created_at: string;
};

type AppSettingRow = {
  key: string;
  value: Record<string, any>;
  updated_at?: string;
};

export interface ContentNewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string;
  imageUrl: string;
  date: string;
  status: 'published' | 'draft';
  viewCount: number;
}

export interface ContentDiscussionReply {
  id: string;
  author: string;
  content: string;
  date: string;
  isAdmin?: boolean;
}

export interface ContentDiscussionThread {
  id: string;
  title: string;
  content: string;
  author: string;
  tag: 'question' | 'suggestion';
  date: string;
  repliesCount: number;
  status: 'active' | 'closed';
  replies?: ContentDiscussionReply[];
  isHighlighted?: boolean;
  viewCount: number;
}

export interface ContentReportItem {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: string;
  type: 'post' | 'comment' | 'user';
  targetId?: string;
  targetContent?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ContentBannedUser {
  userId: string;
  userName: string;
  banType: 'temporary' | 'permanent';
  banUntil?: string;
  reason: string;
  bannedAt: string;
  bannedBy: string;
}

export interface ContentProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  features: string[];
  status: 'in_stock' | 'out_of_stock';
  viewCount: number;
  galleryImages: string[];
  categoryPart: string;
  subject: string;
  stripeUrl: string;
  isDiscounted: boolean;
  originalPrice: number;
  isNew: boolean;
  isUpcoming: boolean;
  createdAt: string;
}

export interface ContentDonationRecord {
  id: string;
  date: string;
  type: string;
  amount: number;
  slip: string;
  giftLink?: string;
  slipHash?: string;
  slipTextHash?: string;
  transactionRef?: string;
}

export interface ShopButtonSettings {
  isVisible: boolean;
}

export interface DailyEnglishVocabularyItem {
  id: string;
  word: string;
  meaning: string;
}

export interface ContentDailyEnglishLesson {
  id: string;
  title: string;
  content: string;
  translation: string;
  vocabulary: DailyEnglishVocabularyItem[];
  date: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

const SUPABASE_NOT_CONFIGURED_MESSAGE = 'ยังไม่ได้ตั้งค่า Supabase';
const DAILY_ENGLISH_SETTINGS_KEY = 'daily_english_lessons';

const ensureSupabase = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(SUPABASE_NOT_CONFIGURED_MESSAGE);
  }
};

const encodeValue = (value: string) => encodeURIComponent(value);

const isUuid = (value?: string) => Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
};

const toNewsItem = (row: NewsRow): ContentNewsItem => ({
  id: row.id,
  title: row.title,
  content: row.content,
  author: row.author,
  source: row.source || '',
  imageUrl: row.image_url || '',
  date: row.date,
  status: row.status,
  viewCount: Number(row.view_count || 0),
});

const toDiscussionReply = (row: DiscussionReplyRow): ContentDiscussionReply => ({
  id: row.id,
  author: row.author,
  content: row.content,
  date: row.date,
  isAdmin: row.is_admin,
});

const toDiscussionThread = (row: DiscussionThreadRow, replies: ContentDiscussionReply[]): ContentDiscussionThread => ({
  id: row.id,
  title: row.title,
  content: row.content,
  author: row.author,
  tag: row.tag,
  date: row.date,
  repliesCount: replies.length || row.replies_count || 0,
  status: row.status === 'active' ? 'active' : 'closed',
  replies,
  isHighlighted: row.is_highlighted,
  viewCount: Number(row.view_count || 0),
});

const toReportStatus = (status: ReportRow['status']): ContentReportItem['status'] => {
  if (status === 'resolved') return 'approved';
  if (status === 'dismissed') return 'rejected';
  return 'pending';
};

const toDbReportStatus = (status: ContentReportItem['status']): ReportRow['status'] => {
  if (status === 'approved') return 'resolved';
  if (status === 'rejected') return 'dismissed';
  return 'pending';
};

const toReportItem = (row: ReportRow): ContentReportItem => ({
  id: row.id,
  reporterId: row.reporter_id,
  reporterName: row.reporter_name,
  reportedUserId: row.reported_user_id,
  reportedUserName: row.reported_user_name,
  reason: row.reason,
  type: row.type,
  targetId: row.target_id,
  targetContent: row.target_content,
  date: row.date,
  status: toReportStatus(row.status),
});

const toBannedUser = (row: BannedUserRow): ContentBannedUser => ({
  userId: row.user_id,
  userName: row.user_name,
  banType: row.ban_type,
  banUntil: row.ban_until || undefined,
  reason: row.reason,
  bannedAt: row.banned_at,
  bannedBy: 'Admin ผู้ดูแลระบบ',
});

const parseProductFeatures = (features: unknown) => {
  if (Array.isArray(features)) {
    return {
      items: features.filter(item => typeof item === 'string') as string[],
      galleryImages: [] as string[],
      categoryPart: '',
      subject: '',
      stripeUrl: '',
      isDiscounted: false,
      originalPrice: 0,
      isNew: false,
      isUpcoming: false,
    };
  }

  if (features && typeof features === 'object') {
    const value = features as Record<string, any>;
    const items = Array.isArray(value.items)
      ? value.items.filter((item: unknown) => typeof item === 'string')
      : [];
    const galleryImages = Array.isArray(value.galleryImages)
      ? value.galleryImages.filter((item: unknown) => typeof item === 'string').slice(0, 3)
      : [];

    return {
      items,
      galleryImages,
      categoryPart: typeof value.categoryPart === 'string' ? value.categoryPart : '',
      subject: typeof value.subject === 'string' ? value.subject : '',
      stripeUrl: typeof value.stripeUrl === 'string' ? value.stripeUrl : '',
      isDiscounted: Boolean(value.isDiscounted),
      originalPrice: Number(value.originalPrice || 0),
      isNew: Boolean(value.isNew),
      isUpcoming: Boolean(value.isUpcoming),
    };
  }

  return {
    items: [] as string[],
    galleryImages: [] as string[],
    categoryPart: '',
    subject: '',
    stripeUrl: '',
    isDiscounted: false,
    originalPrice: 0,
    isNew: false,
    isUpcoming: false,
  };
};

const toProductFeaturesPayload = (product: Partial<ContentProductItem>) => ({
  items: product.features || [],
  galleryImages: (product.galleryImages || []).filter(Boolean).slice(0, 3),
  categoryPart: product.categoryPart || '',
  subject: product.subject || '',
  stripeUrl: product.stripeUrl || '',
  isDiscounted: Boolean(product.isDiscounted),
  originalPrice: Number(product.originalPrice || 0),
  isNew: Boolean(product.isNew),
  isUpcoming: Boolean(product.isUpcoming),
});

const toProductItem = (row: ProductRow): ContentProductItem => {
  const meta = parseProductFeatures(row.features);

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price || 0),
    imageUrl: row.image_url || '',
    features: meta.items,
    status: row.status,
    viewCount: Number(row.view_count || 0),
    galleryImages: meta.galleryImages,
    categoryPart: meta.categoryPart,
    subject: meta.subject,
    stripeUrl: meta.stripeUrl,
    isDiscounted: meta.isDiscounted,
    originalPrice: meta.originalPrice,
    isNew: meta.isNew,
    isUpcoming: meta.isUpcoming,
    createdAt: row.created_at || '',
  };
};

const getAnonymousViewerKey = () => {
  try {
    const storageKey = 'sobkru69_anonymous_viewer_key';
    const existing = localStorage.getItem(storageKey);
    if (existing) return existing;
    const next = createId();
    localStorage.setItem(storageKey, next);
    return next;
  } catch {
    return `guest-${createId()}`;
  }
};

const getViewerKey = () => {
  try {
    const currentUserRaw =
      sessionStorage.getItem('sobkru69_current_user') ||
      localStorage.getItem('sobkru69_current_user') ||
      localStorage.getItem('sobkru69_user') ||
      localStorage.getItem('user');
    if (currentUserRaw) {
      const currentUser = JSON.parse(currentUserRaw) as { id?: string };
      if (currentUser?.id) {
        return currentUser.id;
      }
    }
  } catch {
    // ignore
  }

  return getAnonymousViewerKey();
};

const toDonationRecord = (row: DonationRow): ContentDonationRecord => ({
  id: row.id,
  date: row.created_at,
  type: row.tier_name || '',
  amount: Number(row.amount || 0),
  slip: row.slip_path || '',
  giftLink: row.gift_link || undefined,
  slipHash: row.slip_hash || undefined,
  slipTextHash: row.slip_text_hash || undefined,
  transactionRef: row.transaction_ref || undefined,
});

const normalizeDailyEnglishVocabulary = (items: unknown): DailyEnglishVocabularyItem[] => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const value = item && typeof item === 'object' ? item as Record<string, any> : {};
      return {
        id: typeof value.id === 'string' && value.id ? value.id : createId(),
        word: typeof value.word === 'string' ? value.word : '',
        meaning: typeof value.meaning === 'string' ? value.meaning : '',
      };
    })
    .filter((item, index, array) => (item.word.trim() || item.meaning.trim()) && array.findIndex(entry => entry.id === item.id) === index);
};

const normalizeDailyEnglishLesson = (value: unknown): ContentDailyEnglishLesson => {
  const item = value && typeof value === 'object' ? value as Record<string, any> : {};
  const now = new Date().toISOString();

  return {
    id: typeof item.id === 'string' && item.id ? item.id : createId(),
    title: typeof item.title === 'string' ? item.title : '',
    content: typeof item.content === 'string' ? item.content : '',
    translation: typeof item.translation === 'string' ? item.translation : '',
    vocabulary: normalizeDailyEnglishVocabulary(item.vocabulary),
    date: typeof item.date === 'string' && item.date ? item.date : now.split('T')[0],
    status: item.status === 'draft' ? 'draft' : 'published',
    updatedAt: typeof item.updatedAt === 'string' && item.updatedAt ? item.updatedAt : now,
  };
};

const sortDailyEnglishLessons = (items: ContentDailyEnglishLesson[]) => [...items].sort((a, b) => {
  const dateCompare = b.date.localeCompare(a.date);
  if (dateCompare !== 0) return dateCompare;
  return b.updatedAt.localeCompare(a.updatedAt);
});

export const contentService = {
  async getShopButtonSettings(): Promise<ShopButtonSettings> {
    ensureSupabase();
    try {
      const rows = await supabaseRest.select<AppSettingRow[]>('app_settings', `select=*&key=eq.${encodeValue('shop_button_visibility')}&limit=1`);
      const value = rows?.[0]?.value || {};
      return {
        isVisible: value.isVisible === true,
      };
    } catch (error) {
      console.warn('Failed to load shop button settings', error);
      return { isVisible: false };
    }
  },

  async setShopButtonSettings(settings: ShopButtonSettings): Promise<ShopButtonSettings> {
    ensureSupabase();
    await supabaseRest.upsert<AppSettingRow[]>('app_settings', {
      key: 'shop_button_visibility',
      value: {
        isVisible: settings.isVisible,
        updatedAt: new Date().toISOString(),
      },
      updated_at: new Date().toISOString(),
    }, 'key');
    return settings;
  },

  async getDailyEnglishLessons(): Promise<ContentDailyEnglishLesson[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<AppSettingRow[]>('app_settings', `select=*&key=eq.${encodeValue(DAILY_ENGLISH_SETTINGS_KEY)}&limit=1`);
    const lessons = rows?.[0]?.value?.lessons;
    return sortDailyEnglishLessons(Array.isArray(lessons) ? lessons.map(normalizeDailyEnglishLesson) : []);
  },

  async getLatestDailyEnglishLesson(): Promise<ContentDailyEnglishLesson | null> {
    const lessons = await this.getDailyEnglishLessons();
    return lessons.find(item => item.status === 'published') || null;
  },

  async saveDailyEnglishLesson(item: Partial<ContentDailyEnglishLesson>): Promise<ContentDailyEnglishLesson> {
    ensureSupabase();
    const current = await this.getDailyEnglishLessons();
    const now = new Date().toISOString();
    const saved = normalizeDailyEnglishLesson({
      ...item,
      id: item.id || createId(),
      title: item.title || '',
      content: item.content || '',
      translation: item.translation || '',
      vocabulary: normalizeDailyEnglishVocabulary(item.vocabulary),
      date: item.date || new Date().toISOString().split('T')[0],
      status: item.status || 'published',
      updatedAt: now,
    });

    const nextLessons = sortDailyEnglishLessons(
      current.some(entry => entry.id === saved.id)
        ? current.map(entry => entry.id === saved.id ? saved : entry)
        : [saved, ...current]
    );

    await supabaseRest.upsert<AppSettingRow[]>('app_settings', {
      key: DAILY_ENGLISH_SETTINGS_KEY,
      value: {
        lessons: nextLessons,
        updatedAt: now,
      },
      updated_at: now,
    }, 'key');

    return saved;
  },

  async deleteDailyEnglishLesson(id: string) {
    ensureSupabase();
    const current = await this.getDailyEnglishLessons();
    const nextLessons = current.filter(item => item.id !== id);
    const now = new Date().toISOString();

    await supabaseRest.upsert<AppSettingRow[]>('app_settings', {
      key: DAILY_ENGLISH_SETTINGS_KEY,
      value: {
        lessons: nextLessons,
        updatedAt: now,
      },
      updated_at: now,
    }, 'key');
  },

  async getViewCounts(contentType: ContentViewRow['content_type'], contentIds: string[]): Promise<Record<string, Set<string>>> {
    ensureSupabase();
    const validIds = contentIds.filter(Boolean);
    if (validIds.length === 0) {
      return {};
    }

    try {
      const quotedIds = validIds.map(id => `"${id.replace(/"/g, '\\"')}"`).join(',');
      const query = `select=content_id,viewer_key&content_type=eq.${encodeValue(contentType)}&content_id=in.(${quotedIds})`;
      const rows = await supabaseRest.select<Pick<ContentViewRow, 'content_id' | 'viewer_key'>[]>('content_views', query);
      const grouped = rows.reduce<Record<string, Set<string>>>((acc, row) => {
        if (!acc[row.content_id]) {
          acc[row.content_id] = new Set<string>();
        }
        acc[row.content_id].add(row.viewer_key);
        return acc;
      }, {});
      return grouped;
    } catch (error) {
      console.warn(`Failed to load ${contentType} view counts`, error);
      return {};
    }
  },

  async recordContentView(contentType: ContentViewRow['content_type'], contentId: string) {
    ensureSupabase();

    try {
      const viewerKey = getViewerKey();
      await supabaseRest.upsert<ContentViewRow[]>('content_views', {
        id: `${contentType}_${contentId}_${viewerKey}`.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 260),
        content_type: contentType,
        content_id: contentId,
        viewer_key: viewerKey,
        viewed_at: new Date().toISOString(),
      }, 'id');
    } catch (error) {
      console.warn(`Failed to record ${contentType} view`, error);
    }
  },

  async getNewsPosts(): Promise<ContentNewsItem[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<NewsRow[]>('news_posts', 'select=*&order=date.desc');
    const items = rows.map(toNewsItem);
    const viewCounts = await this.getViewCounts('news', items.map(item => item.id));
    return items.map(item => ({
      ...item,
      viewCount: viewCounts[item.id] ? viewCounts[item.id].size : item.viewCount,
    }));
  },

  async saveNewsPost(item: Partial<ContentNewsItem>): Promise<ContentNewsItem> {
    ensureSupabase();

    const payload = {
      id: isUuid(item.id) ? item.id : createId(),
      title: item.title || '',
      content: item.content || '',
      author: item.author || 'Admin ผู้ดูแลระบบ',
      source: item.source || '',
      image_url: item.imageUrl || '',
      date: item.date || new Date().toISOString().split('T')[0],
      status: item.status || 'published',
    };

    const rows = item.id && isUuid(item.id)
      ? await supabaseRest.update<NewsRow[]>('news_posts', `id=eq.${encodeValue(item.id)}`, payload)
      : await supabaseRest.insert<NewsRow[]>('news_posts', payload);

    return toNewsItem(rows[0]);
  },

  async deleteNewsPost(id: string) {
    ensureSupabase();
    await supabaseRest.delete<NewsRow[]>('news_posts', `id=eq.${encodeValue(id)}`);
  },

  async getDiscussionThreads(options?: { includeInactive?: boolean }): Promise<ContentDiscussionThread[]> {
    ensureSupabase();
    const threadRows = await supabaseRest.select<DiscussionThreadRow[]>('discussion_threads', 'select=*&order=date.desc');
    const activeRows = options?.includeInactive ? threadRows : threadRows.filter(row => row.status === 'active');

    if (activeRows.length === 0) return [];

    const idList = activeRows.map(row => row.id).filter(Boolean);
    const repliesQuery = `select=id,thread_id,author,content,date,is_admin&thread_id=in.(${idList.map(encodeValue).join(',')})&order=date.asc`;
    const replyRows = await supabaseRest.select<DiscussionReplyRow[]>('discussion_replies', repliesQuery);

    const viewCounts = await this.getViewCounts('discussion', activeRows.map(row => row.id));

    return activeRows.map(row => {
      const replies = replyRows
        .filter(reply => reply.thread_id === row.id)
        .map(toDiscussionReply);
      return {
        ...toDiscussionThread(row, replies),
        viewCount: viewCounts[row.id] ? viewCounts[row.id].size : Number(row.view_count || 0),
      };
    });
  },

  async saveDiscussionThread(thread: Partial<ContentDiscussionThread>): Promise<ContentDiscussionThread> {
    ensureSupabase();

    const payload = {
      id: isUuid(thread.id) ? thread.id : createId(),
      title: thread.title || '',
      content: thread.content || '',
      author: thread.author || '',
      tag: thread.tag || 'question',
      date: thread.date || new Date().toISOString(),
      replies_count: thread.repliesCount || 0,
      status: 'active',
      is_highlighted: Boolean(thread.isHighlighted),
    };

    const rows = thread.id && isUuid(thread.id)
      ? await supabaseRest.update<DiscussionThreadRow[]>('discussion_threads', `id=eq.${encodeValue(thread.id)}`, payload)
      : await supabaseRest.insert<DiscussionThreadRow[]>('discussion_threads', payload);

    return toDiscussionThread(rows[0], thread.replies || []);
  },

  async toggleDiscussionHighlight(threadId: string, isHighlighted: boolean) {
    ensureSupabase();
    const rows = await supabaseRest.update<DiscussionThreadRow[]>('discussion_threads', `id=eq.${encodeValue(threadId)}`, {
      is_highlighted: isHighlighted,
    });
    return rows[0];
  },

  async deleteDiscussionThread(threadId: string) {
    ensureSupabase();
    await supabaseRest.delete<DiscussionThreadRow[]>('discussion_threads', `id=eq.${encodeValue(threadId)}`);
  },

  async saveDiscussionReply(threadId: string, reply: Partial<ContentDiscussionReply>): Promise<ContentDiscussionReply> {
    ensureSupabase();

    const replyPayload = {
      id: isUuid(reply.id) ? reply.id : createId(),
      thread_id: threadId,
      author: reply.author || '',
      content: reply.content || '',
      date: reply.date || new Date().toISOString(),
      is_admin: Boolean(reply.isAdmin),
    };

    const replyRows = await supabaseRest.insert<DiscussionReplyRow[]>('discussion_replies', replyPayload);
    const threadRows = await supabaseRest.select<DiscussionThreadRow[]>('discussion_threads', `select=id,replies_count&id=eq.${encodeValue(threadId)}&limit=1`);
    const nextCount = (threadRows[0]?.replies_count || 0) + 1;
    await supabaseRest.update<DiscussionThreadRow[]>('discussion_threads', `id=eq.${encodeValue(threadId)}`, { replies_count: nextCount });

    return toDiscussionReply(replyRows[0]);
  },

  async getReports(): Promise<ContentReportItem[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<ReportRow[]>('reports', 'select=id,reporter_id,reporter_name,reported_user_id,reported_user_name,reason,type,target_id,target_content,date,status&order=date.desc');
    return rows.map(toReportItem);
  },

  async saveReport(report: Omit<ContentReportItem, 'id' | 'status' | 'date'> & { status?: ContentReportItem['status']; date?: string }) {
    ensureSupabase();
    const payload = {
      id: createId(),
      reporter_id: report.reporterId,
      reporter_name: report.reporterName,
      reported_user_id: report.reportedUserId,
      reported_user_name: report.reportedUserName,
      reason: report.reason,
      type: report.type === 'user' ? 'post' : report.type,
      target_id: report.targetId || '',
      target_content: report.targetContent || '',
      date: report.date || new Date().toISOString(),
      status: toDbReportStatus(report.status || 'pending'),
    };
    const rows = await supabaseRest.insert<ReportRow[]>('reports', payload);
    return toReportItem(rows[0]);
  },

  async updateReportStatus(reportId: string, status: ContentReportItem['status']) {
    ensureSupabase();
    const rows = await supabaseRest.update<ReportRow[]>('reports', `id=eq.${encodeValue(reportId)}`, {
      status: toDbReportStatus(status),
    });
    return toReportItem(rows[0]);
  },

  async getPendingReportsCount() {
    ensureSupabase();
    const rows = await supabaseRest.select<ReportRow[]>('reports', 'select=id,status&status=eq.pending');
    return rows.length;
  },

  async getBannedUsers(): Promise<ContentBannedUser[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<BannedUserRow[]>('banned_users', 'select=id,user_id,user_name,reason,ban_type,banned_at,ban_until&order=banned_at.desc');
    return rows.map(toBannedUser);
  },

  async saveBannedUser(user: ContentBannedUser) {
    ensureSupabase();
    const existing = await supabaseRest.select<BannedUserRow[]>('banned_users', `select=id&user_id=eq.${encodeValue(user.userId)}&limit=1`);
    const payload = {
      user_id: user.userId,
      user_name: user.userName,
      reason: user.reason,
      ban_type: user.banType,
      banned_at: user.bannedAt || new Date().toISOString(),
      ban_until: user.banUntil || null,
    };

    const rows = existing.length > 0
      ? await supabaseRest.update<BannedUserRow[]>('banned_users', `user_id=eq.${encodeValue(user.userId)}`, payload)
      : await supabaseRest.insert<BannedUserRow[]>('banned_users', payload);

    return toBannedUser(rows[0]);
  },

  async deleteBannedUser(userId: string) {
    ensureSupabase();
    await supabaseRest.delete<BannedUserRow[]>('banned_users', `user_id=eq.${encodeValue(userId)}`);
  },

  async getProducts(): Promise<ContentProductItem[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<ProductRow[]>('products', 'select=*&order=created_at.desc');
    const items = rows.map(toProductItem);
    const viewCounts = await this.getViewCounts('product', items.map(item => item.id));
    return items.map(item => ({
      ...item,
      viewCount: viewCounts[item.id] ? viewCounts[item.id].size : item.viewCount,
    }));
  },

  async saveProduct(product: Partial<ContentProductItem>): Promise<ContentProductItem> {
    ensureSupabase();

    const payload = {
      id: isUuid(product.id) ? product.id : createId(),
      name: product.name || '',
      description: product.description || '',
      price: Number(product.price || 0),
      image_url: product.imageUrl || '',
      features: toProductFeaturesPayload(product),
      status: product.status || 'in_stock',
      updated_at: new Date().toISOString(),
    };

    const rows = product.id && isUuid(product.id)
      ? await supabaseRest.update<ProductRow[]>('products', `id=eq.${encodeValue(product.id)}`, payload)
      : await supabaseRest.insert<ProductRow[]>('products', payload);

    return toProductItem(rows[0]);
  },

  async deleteProduct(id: string) {
    ensureSupabase();
    await supabaseRest.delete<ProductRow[]>('products', `id=eq.${encodeValue(id)}`);
  },

  async uploadProductImage(file: File, slot = 'cover') {
    ensureSupabase();
    const safeSlot = slot.replace(/[^a-zA-Z0-9_-]+/g, '-').slice(0, 40) || 'image';
    return uploadPublicImage(file, `products/${safeSlot}`);
  },

  async getDonationHistory(params: { userId?: string; userEmail?: string }): Promise<ContentDonationRecord[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<DonationRow[]>('donations', 'select=id,user_id,user_email,tier_id,tier_name,amount,slip_path,slip_hash,slip_text_hash,transaction_ref,status,verification_message,gift_link,created_at&order=created_at.desc');
    return rows
      .filter(row => {
        if (params.userId && row.user_id === params.userId) return true;
        if (params.userEmail && row.user_email === params.userEmail) return true;
        return false;
      })
      .map(toDonationRecord);
  },

  async findDonationConflicts(params: { slipHash?: string; slipTextHash?: string; transactionRef?: string }) {
    ensureSupabase();
    const checks = await Promise.all([
      params.slipHash
        ? supabaseRest.select<DonationRow[]>('donations', `select=id&slip_hash=eq.${encodeValue(params.slipHash)}&limit=1`)
        : Promise.resolve([]),
      params.slipTextHash
        ? supabaseRest.select<DonationRow[]>('donations', `select=id&slip_text_hash=eq.${encodeValue(params.slipTextHash)}&limit=1`)
        : Promise.resolve([]),
      params.transactionRef
        ? supabaseRest.select<DonationRow[]>('donations', `select=id&transaction_ref=eq.${encodeValue(params.transactionRef)}&limit=1`)
        : Promise.resolve([]),
    ]);

    return {
      bySlipHash: checks[0].length > 0,
      bySlipTextHash: checks[1].length > 0,
      byTransactionRef: checks[2].length > 0,
    };
  },

  async uploadDonationSlip(file: File, folder = 'donations') {
    ensureSupabase();
    const config = getSupabaseConfig();
    return uploadBucketFile(file, config.slipsBucket, folder, false);
  },

  async saveDonationRecord(record: {
    userId?: string;
    userEmail?: string;
    tierId?: string;
    tierName: string;
    amount: number;
    slipPath?: string;
    slipHash?: string;
    slipTextHash?: string;
    transactionRef?: string;
    verificationMessage?: string;
    giftLink?: string;
    status?: 'pending' | 'verified' | 'rejected';
  }) {
    ensureSupabase();
    const rows = await supabaseRest.insert<DonationRow[]>('donations', {
      user_id: record.userId || null,
      user_email: record.userEmail || null,
      tier_id: record.tierId || null,
      tier_name: record.tierName,
      amount: record.amount,
      slip_path: record.slipPath || null,
      slip_hash: record.slipHash || null,
      slip_text_hash: record.slipTextHash || null,
      transaction_ref: record.transactionRef || null,
      status: record.status || 'verified',
      verification_message: record.verificationMessage || null,
      gift_link: record.giftLink || null,
      created_at: new Date().toISOString(),
    });
    return toDonationRecord(rows[0]);
  },

  async getAllDonations(): Promise<ContentDonationRecord[]> {
    ensureSupabase();
    // ดึงข้อมูลการเลี้ยงกาแฟทั้งหมด
    const rows = await supabaseRest.select<any[]>('donations', 'select=*&order=created_at.desc');
    
    return rows.map(record => {
      const donation = toDonationRecord(record);
      // ใช้ข้อมูลที่มีอยู่ใน record หรือตั้งค่าพื้นฐาน
      return {
        ...donation,
        userName: record.user_email || 'ผู้ใช้งานไม่ระบุชื่อ',
        userEmail: record.user_email || ''
      } as any;
    });
  },
};
