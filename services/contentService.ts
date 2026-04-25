import { getSupabaseConfig, isSupabaseConfigured, supabaseRest, uploadBucketFile } from './supabaseRest';

type NewsRow = {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string | null;
  image_url: string | null;
  date: string;
  status: 'published' | 'draft';
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
  features: string[] | null;
  status: 'in_stock' | 'out_of_stock';
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

export interface ContentNewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string;
  imageUrl: string;
  date: string;
  status: 'published' | 'draft';
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

const SUPABASE_NOT_CONFIGURED_MESSAGE = 'ยังไม่ได้ตั้งค่า Supabase';

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

const toProductItem = (row: ProductRow): ContentProductItem => ({
  id: row.id,
  name: row.name,
  description: row.description,
  price: Number(row.price || 0),
  imageUrl: row.image_url || '',
  features: Array.isArray(row.features) ? row.features : [],
  status: row.status,
});

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

export const contentService = {
  async getNewsPosts(): Promise<ContentNewsItem[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<NewsRow[]>('news_posts', 'select=id,title,content,author,source,image_url,date,status&order=date.desc');
    return rows.map(toNewsItem);
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
    const threadRows = await supabaseRest.select<DiscussionThreadRow[]>('discussion_threads', 'select=id,title,content,author,tag,date,replies_count,status,is_highlighted&order=date.desc');
    const activeRows = options?.includeInactive ? threadRows : threadRows.filter(row => row.status === 'active');

    if (activeRows.length === 0) return [];

    const idList = activeRows.map(row => row.id).filter(Boolean);
    const repliesQuery = `select=id,thread_id,author,content,date,is_admin&thread_id=in.(${idList.map(encodeValue).join(',')})&order=date.asc`;
    const replyRows = await supabaseRest.select<DiscussionReplyRow[]>('discussion_replies', repliesQuery);

    return activeRows.map(row => {
      const replies = replyRows
        .filter(reply => reply.thread_id === row.id)
        .map(toDiscussionReply);
      return toDiscussionThread(row, replies);
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
    const rows = await supabaseRest.select<ProductRow[]>('products', 'select=id,name,description,price,image_url,features,status&order=created_at.desc');
    return rows.map(toProductItem);
  },

  async saveProduct(product: Partial<ContentProductItem>): Promise<ContentProductItem> {
    ensureSupabase();

    const payload = {
      id: isUuid(product.id) ? product.id : createId(),
      name: product.name || '',
      description: product.description || '',
      price: Number(product.price || 0),
      image_url: product.imageUrl || '',
      features: product.features || [],
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
};
