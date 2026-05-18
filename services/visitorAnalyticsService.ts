type VisitorEvent = {
  id: string;
  visitorId: string;
  type: 'page_view' | 'click' | 'scroll_depth' | 'signup_intent';
  page: string;
  label?: string;
  value?: number;
  createdAt: string;
  source: string;
  deviceType: 'mobile' | 'desktop' | 'tablet' | 'unknown';
  browser: string;
  os: string;
};

export type VisitorAnalyticsSummary = {
  totalVisitors: number;
  totalEvents: number;
  dailyVisitors: number;
  returningVisitors: number;
  mobileVisitors: number;
  desktopVisitors: number;
  topPages: Array<{ page: string; count: number }>;
  topClicks: Array<{ label: string; count: number }>;
  sources: Array<{ source: string; count: number }>;
  averageScrollDepth: number;
};

const VISITOR_ID_KEY = 'sobkru:visitor-id:v1';
const EVENTS_KEY = 'sobkru:visitor-events:v1';
const MAX_EVENTS = 600;

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const getVisitorId = () => {
  if (typeof localStorage === 'undefined') return 'server';
  const existing = localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;
  const next = createId();
  localStorage.setItem(VISITOR_ID_KEY, next);
  return next;
};

const getDeviceType = (): VisitorEvent['deviceType'] => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return 'mobile';
  if (/Macintosh|Windows|Linux|CrOS/i.test(ua)) return 'desktop';
  return 'unknown';
};

const getBrowser = () => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  if (/Edg/i.test(ua)) return 'Edge';
  if (/Chrome|CriOS/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  return 'Other';
};

const getOs = () => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Win/i.test(ua)) return 'Windows';
  return 'Other';
};

const getTrafficSource = () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 'Direct';
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  if (utmSource) return utmSource;

  const referrer = document.referrer.toLowerCase();
  if (!referrer) return 'Direct';
  if (referrer.includes('facebook') || referrer.includes('fb.')) return 'Facebook';
  if (referrer.includes('tiktok')) return 'TikTok';
  if (referrer.includes('google')) return 'Google';
  return 'Referral';
};

const readEvents = (): VisitorEvent[] => {
  if (typeof localStorage === 'undefined') return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeEvents = (events: VisitorEvent[]) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
};

const track = (event: Omit<VisitorEvent, 'id' | 'visitorId' | 'createdAt' | 'source' | 'deviceType' | 'browser' | 'os'>) => {
  const nextEvent: VisitorEvent = {
    ...event,
    id: createId(),
    visitorId: getVisitorId(),
    createdAt: new Date().toISOString(),
    source: getTrafficSource(),
    deviceType: getDeviceType(),
    browser: getBrowser(),
    os: getOs(),
  };

  writeEvents([...readEvents(), nextEvent]);
};

const countBy = <T,>(items: T[], getKey: (item: T) => string, limit = 5) => {
  const counts = new Map<string, number>();
  items.forEach(item => {
    const key = getKey(item) || 'ไม่ระบุ';
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const visitorAnalyticsService = {
  trackPageView(page: string) {
    track({ type: 'page_view', page });
  },

  trackClick(page: string, label: string) {
    track({ type: 'click', page, label });
  },

  trackSignupIntent(page: string, label = 'signup') {
    track({ type: 'signup_intent', page, label });
  },

  trackScrollDepth(page: string, value: number) {
    track({ type: 'scroll_depth', page, value: Math.round(value) });
  },

  getEvents: readEvents,

  getSummary(): VisitorAnalyticsSummary {
    const events = readEvents();
    const visitorIds = Array.from(new Set(events.map(event => event.visitorId)));
    const today = new Date().toISOString().slice(0, 10);
    const todayVisitorIds = new Set(events.filter(event => event.createdAt.slice(0, 10) === today).map(event => event.visitorId));
    const visitorEventCounts = visitorIds.map(id => events.filter(event => event.visitorId === id && event.type === 'page_view').length);
    const scrollEvents = events.filter(event => event.type === 'scroll_depth' && typeof event.value === 'number');
    const sourceRows = countBy(events.filter(event => event.type === 'page_view'), event => event.source, 6);

    return {
      totalVisitors: visitorIds.length,
      totalEvents: events.length,
      dailyVisitors: todayVisitorIds.size,
      returningVisitors: visitorEventCounts.filter(count => count > 1).length,
      mobileVisitors: visitorIds.filter(id => events.find(event => event.visitorId === id)?.deviceType === 'mobile').length,
      desktopVisitors: visitorIds.filter(id => events.find(event => event.visitorId === id)?.deviceType === 'desktop').length,
      topPages: countBy(events.filter(event => event.type === 'page_view'), event => event.page, 6).map(row => ({ page: row.key, count: row.count })),
      topClicks: countBy(events.filter(event => event.type === 'click'), event => event.label || event.page, 6).map(row => ({ label: row.key, count: row.count })),
      sources: sourceRows.map(row => ({ source: row.key, count: row.count })),
      averageScrollDepth: scrollEvents.length
        ? Math.round(scrollEvents.reduce((sum, event) => sum + Number(event.value || 0), 0) / scrollEvents.length)
        : 0,
    };
  },
};
