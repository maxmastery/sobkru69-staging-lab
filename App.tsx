
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import TopicList from './components/TopicList';
import LessonView from './components/LessonView';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import LearningStats from './components/LearningStats';
import EditProfile from './components/EditProfile';
import CompleteGoogleProfile from './components/CompleteGoogleProfile';
import DonationModal from './components/DonationModal';
import NewsPage from './components/NewsPage';
import DiscussionBoard from './components/DiscussionBoard';
import ShopPage from './components/ShopPage';
import MockExamDemo from './components/MockExamDemo';
import DailyEnglishPage from './components/DailyEnglishPage';
import KnowledgeGraphView from './components/knowledge-graph/KnowledgeGraphView';
import ContactSupport from './components/ContactSupport';
import BellNotificationsPanel from './components/BellNotificationsPanel';
import Leaderboard from './components/Leaderboard';
import UserStatistics from './components/UserStatistics';
import { EXAM_CURRICULUM } from './constants';
import { convertLessonsToKnowledgeGraph } from './lib/knowledge-graph/adapters';
import { KnowledgeNode } from './lib/knowledge-graph/types';
import { ExamPart, SubTopic } from './types';
import { authService, User, BellNotification, UserUiState, MaintenanceModeState } from './services/authService';
import { userActivityService } from './services/userActivityService';
import { contentService } from './services/contentService';
import { LogOut, AlertTriangle, Bell, X, Settings, User as UserIcon, BarChart3, Megaphone, MessageSquare, Loader2, Lock } from 'lucide-react';

type PageState = 'dashboard' | 'news' | 'discussion' | 'shop' | 'mock-exam' | 'daily-english' | 'knowledge-graph' | 'contact-support' | 'leaderboard' | 'user-stats';
const SHOW_DONATION_HISTORY_SHORTCUT = false;
const FOOTER_LOGO_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/cc1.png';

const FloatingCoffeeCup: React.FC = () => (
  <span className="sobkru-coffee-wrap" aria-hidden="true">
    <span className="sobkru-coffee-smoke sobkru-coffee-smoke-1"></span>
    <span className="sobkru-coffee-smoke sobkru-coffee-smoke-2"></span>
    <span className="sobkru-coffee-smoke sobkru-coffee-smoke-3"></span>
    <span className="sobkru-coffee-cup">
      <span className="sobkru-coffee-liquid"></span>
      <span className="sobkru-coffee-handle"></span>
    </span>
    <span className="sobkru-coffee-saucer"></span>
  </span>
);

const EMPTY_UI_STATE: UserUiState = {
  readNotificationIds: [],
  readSupportMessageIds: [],
  popupSeenMap: {},
};

const POPUP_NOTIFICATION_KEY = 'popup_notification';
const POPUP_NOTIFICATION_MAX_PER_DAY = 2;
const POPUP_NOTIFICATION_COOLDOWN_MS = 8 * 60 * 60 * 1000;
const GOOGLE_LOGIN_RECOVERY_MESSAGE = 'Google login ยังไม่สมบูรณ์ กรุณาลองใหม่อีกครั้งจากลิงก์เดิม และระหว่างทั้งขั้นตอนให้ใช้โดเมนเดียวกัน เช่น 127.0.0.1 เดิมตลอด ไม่สลับกับ localhost';
const DEFAULT_MAINTENANCE_MODE: MaintenanceModeState = {
  isActive: false,
  title: 'ปิดปรับปรุงระบบชั่วคราว',
  message: 'ระบบอยู่ระหว่างอัปเดตและปรับปรุงประสิทธิภาพ ขออภัยในความไม่สะดวก',
  startAt: '',
  endAt: '',
};

const getInitialPage = (): PageState => {
  if (typeof window !== 'undefined' && window.location.pathname === '/knowledge-graph') {
    return 'knowledge-graph';
  }
  return 'dashboard';
};

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parsePopupSeenRecord = (rawValue?: string) => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as {
      updatedAt?: string;
      dateKey?: string;
      count?: number;
      lastShownAt?: string;
    };
    return parsed && typeof parsed === 'object' ? parsed : { updatedAt: rawValue };
  } catch {
    return { updatedAt: rawValue };
  }
};

const requiresGoogleProfileCompletion = (activeUser: User | null) => {
  if (!activeUser || activeUser.email === 'Krumax' || activeUser.authProvider !== 'google') {
    return false;
  }

  return [
    activeUser.name,
    activeUser.age,
    activeUser.gender,
    activeUser.major,
    activeUser.province,
    activeUser.examCount,
  ].some(value => !`${value || ''}`.trim());
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [authBootstrapError, setAuthBootstrapError] = useState('');
  const [userUiState, setUserUiState] = useState<UserUiState>(EMPTY_UI_STATE);
  const [currentPart, setCurrentPart] = useState<ExamPart | null>(null);
  const [currentTopic, setCurrentTopic] = useState<SubTopic | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notificationModal, setNotificationModal] = useState<{ title: string; message: string; imageUrl?: string } | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // New states for profile menu and views
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLearningStats, setShowLearningStats] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [donationInitialView, setDonationInitialView] = useState<'intro' | 'history'>('intro');
  const [marquee, setMarquee] = useState<{ text: string; isActive: boolean } | null>(null);
  const [currentPage, setCurrentPage] = useState<PageState>(getInitialPage);
  const [maintenanceMode, setMaintenanceMode] = useState<MaintenanceModeState>(DEFAULT_MAINTENANCE_MODE);
  const [showMaintenanceAdminLogin, setShowMaintenanceAdminLogin] = useState(false);
  const [showShopButton, setShowShopButton] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Bell Notifications
  const [showBellPanel, setShowBellPanel] = useState(false);
  const [bellNotifications, setBellNotifications] = useState<BellNotification[]>([]);
  const [unreadSupportCount, setUnreadSupportCount] = useState(0);
  const readNotifIds = userUiState.readNotificationIds;

  const hydrateAuthenticatedUser = async (activeUser: User) => {
    setAuthBootstrapError('');
    setUser(activeUser);

    const uiStateRes = await authService.getUserUiState(activeUser.id);
    const nextUiState = uiStateRes.success ? uiStateRes.state : EMPTY_UI_STATE;
    setUserUiState(nextUiState);

    await Promise.all([
      fetchMarquee(),
      fetchBellNotifications(),
      fetchUnreadSupportCount(activeUser.id, nextUiState.readSupportMessageIds),
      checkPopupNotification(activeUser.id, nextUiState.popupSeenMap),
    ]);

    // Log daily login & start heartbeat
    userActivityService.logDailyLogin(activeUser.id).catch(err => console.error('logDailyLogin error:', err));
  };

  const loadMaintenanceMode = async () => {
    try {
      const res = await authService.getMaintenanceMode();
      if (res.success) {
        setMaintenanceMode(res.maintenance);
      }
    } catch (error) {
      console.error('Failed to fetch maintenance mode', error);
      setMaintenanceMode(DEFAULT_MAINTENANCE_MODE);
    }
  };

  const loadShopButtonSettings = async () => {
    try {
      const settings = await contentService.getShopButtonSettings();
      setShowShopButton(settings.isVisible);
    } catch (error) {
      console.error('Failed to fetch shop button settings', error);
      setShowShopButton(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      setIsBootstrapping(true);
      setAuthBootstrapError('');
      try {
        await Promise.all([
          loadMaintenanceMode(),
          loadShopButtonSettings(),
        ]);
        const restored = await authService.restoreSession();
        if (!isMounted) return;

        if (restored.success && restored.user) {
          await hydrateAuthenticatedUser(restored.user);
          if (!isMounted) return;
        } else {
          const returnedFromAuthProvider =
            typeof window !== 'undefined' &&
            (window.location.search.includes('code=') || window.location.search.includes('error=') || window.location.hash.includes('access_token='));

          if (restored.message && restored.message !== 'ยังไม่มี session การเข้าสู่ระบบ') {
            setAuthBootstrapError(restored.message);
          } else if (returnedFromAuthProvider) {
            setAuthBootstrapError(
              restored.message === 'ยังไม่มี session การเข้าสู่ระบบ'
                ? GOOGLE_LOGIN_RECOVERY_MESSAGE
                : restored.message || GOOGLE_LOGIN_RECOVERY_MESSAGE
            );
          }
          setUser(null);
          setUserUiState(EMPTY_UI_STATE);
          setUnreadSupportCount(0);
        }
      } catch (error) {
        console.error('Failed to restore session', error);
        if (!isMounted) return;
        setAuthBootstrapError('ระบบกู้คืน Google login ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        setUser(null);
        setUserUiState(EMPTY_UI_STATE);
        setUnreadSupportCount(0);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    void loadMaintenanceMode();
    const interval = window.setInterval(() => {
      void loadMaintenanceMode();
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const subscription = authService.subscribeToAuthChanges((result) => {
      void (async () => {
        if (!isMounted) return;

        if (result.user) {
          await hydrateAuthenticatedUser(result.user);
          if (!isMounted) return;
          setIsBootstrapping(false);
          return;
        }

        if (result.event === 'SIGNED_OUT') {
          setAuthBootstrapError('');
          setUser(null);
          setUserUiState(EMPTY_UI_STATE);
          setUnreadSupportCount(0);
          setBellNotifications([]);
          setNotificationModal(null);
          setShowBellPanel(false);
          setIsBootstrapping(false);
          return;
        }

        if (result.message) {
          setAuthBootstrapError(result.message);
          setIsBootstrapping(false);
        }
      })();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage, currentPart, currentTopic, showLearningStats]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const resolvePresencePage = () => {
      if (showAdminPanel) return 'admin';
      if (showLearningStats) return 'learning-stats';
      if (currentTopic?.id) return `lesson:${currentTopic.id}`;
      if (currentPart?.id) return `topic:${currentPart.id}`;
      return currentPage;
    };

    const syncPresence = async () => {
      try {
        await userActivityService.upsertSession(user.id, user.name, resolvePresencePage());
      } catch (error) {
        console.error('upsertSession error:', error);
      }
    };

    void syncPresence();

    const interval = window.setInterval(() => {
      void syncPresence();
    }, 60000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void syncPresence();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [currentPage, currentPart, currentTopic, showAdminPanel, showLearningStats, user]);

  const persistUserUiState = async (patch: Partial<UserUiState>) => {
    const nextState: UserUiState = {
      readNotificationIds: patch.readNotificationIds ?? userUiState.readNotificationIds,
      readSupportMessageIds: patch.readSupportMessageIds ?? userUiState.readSupportMessageIds,
      popupSeenMap: patch.popupSeenMap
        ? { ...userUiState.popupSeenMap, ...patch.popupSeenMap }
        : userUiState.popupSeenMap,
    };

    setUserUiState(nextState);

    if (!user) {
      return nextState;
    }

    try {
      const result = await authService.saveUserUiState(user.id, nextState);
      if (result.success) {
        setUserUiState(result.state);
        return result.state;
      }
    } catch (error) {
      console.error('Failed to persist user UI state', error);
    }

    return nextState;
  };

  const fetchUnreadSupportCount = async (userId: string, readSupportMessageIds: string[] = userUiState.readSupportMessageIds) => {
    try {
      const res = await authService.getSupportMessages();
      if (res.success) {
        const count = res.messages.filter(m =>
          m.userId === userId &&
          m.status === 'replied' &&
          !readSupportMessageIds.includes(m.id)
        ).length;

        setUnreadSupportCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch support messages", error);
    }
  };

  const handleMarkNotifAsRead = (id: string) => {
    if (!readNotifIds.includes(id)) {
      const newReadIds = [...readNotifIds, id];
      void persistUserUiState({ readNotificationIds: newReadIds });
    }
  };

  const handleMarkSupportMessageAsRead = async (messageId: string) => {
    if (userUiState.readSupportMessageIds.includes(messageId)) {
      return;
    }

    const nextReadIds = [...userUiState.readSupportMessageIds, messageId];
    await persistUserUiState({ readSupportMessageIds: nextReadIds });
    if (user) {
      await fetchUnreadSupportCount(user.id, nextReadIds);
    }
  };

  const checkPopupNotification = async (userId: string, popupSeenMap: Record<string, string> = userUiState.popupSeenMap) => {
    try {
      const res = await authService.getNotification();
      if (res.success && res.notification && (res.notification as any).isActive) {
        const notif = res.notification as any;
        const record = parsePopupSeenRecord(popupSeenMap[POPUP_NOTIFICATION_KEY]);
        const notificationVersion = notif.updatedAt || 'active-popup';
        const todayKey = getLocalDateKey();
        const isSameVersion = record?.updatedAt === notificationVersion;
        const countToday = isSameVersion && record?.dateKey === todayKey ? Number(record.count || 0) : 0;
        const lastShownAt = isSameVersion && record?.lastShownAt ? new Date(record.lastShownAt).getTime() : 0;
        const hasCooldownPassed = !lastShownAt || Date.now() - lastShownAt >= POPUP_NOTIFICATION_COOLDOWN_MS;
        const shouldShowPopup = countToday < POPUP_NOTIFICATION_MAX_PER_DAY && hasCooldownPassed;

        if (shouldShowPopup) {
          setNotificationModal(notif);
          const nextSeenValue = JSON.stringify({
            updatedAt: notificationVersion,
            dateKey: todayKey,
            count: countToday + 1,
            lastShownAt: new Date().toISOString(),
          });
          await authService.saveUserUiState(userId, {
            popupSeenMap: {
              [POPUP_NOTIFICATION_KEY]: nextSeenValue,
            },
          });
          setUserUiState(current => ({
            ...current,
            popupSeenMap: {
              ...current.popupSeenMap,
              [POPUP_NOTIFICATION_KEY]: nextSeenValue,
            },
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch notification", error);
    }
  };

  const fetchBellNotifications = async () => {
    try {
      const res = await authService.getBellNotifications();
      if (res.success) {
        setBellNotifications(res.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch bell notifications", error);
    }
  };

  const fetchMarquee = async () => {
    try {
      const res = await authService.getMarquee();
      if (res.success) {
        setMarquee({ text: res.text, isActive: res.isActive });
      }
    } catch (error) {
      console.error("Failed to fetch marquee", error);
    }
  };

  const handleLogin = async (loggedInUser: User) => {
    await hydrateAuthenticatedUser(loggedInUser);
    setShowMaintenanceAdminLogin(false);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleSelectPart = (part: ExamPart) => {
    setCurrentPart(part);
    setCurrentTopic(null);
  };

  const handleSelectTopic = (topic: SubTopic) => {
    setCurrentTopic(topic);
  };

  const handleBackToDashboard = () => {
    setCurrentPart(null);
    setCurrentTopic(null);
    setCurrentPage('dashboard');
    if (typeof window !== 'undefined' && window.location.pathname === '/knowledge-graph') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleBackToPart = () => {
    setCurrentTopic(null);
  };

  const handleLogout = async () => {
    await authService.logout();
    setAuthBootstrapError('');
    setUser(null);
    setUserUiState(EMPTY_UI_STATE);
    setCurrentPart(null);
    setCurrentTopic(null);
    setShowLogoutConfirm(false);
    setShowLearningStats(false);
    setCurrentPage('dashboard');
    setUnreadSupportCount(0);
    setBellNotifications([]);
    setNotificationModal(null);
    setShowBellPanel(false);
    setShowMaintenanceAdminLogin(false);
  };

  const isAdminUser = user?.email === 'Krumax';
  const isTestUser = user?.authProvider === 'local-test';
  const canBypassMaintenance = isAdminUser || isTestUser;
  const knowledgeGraphData = useMemo(() => convertLessonsToKnowledgeGraph(EXAM_CURRICULUM), []);

  const handleOpenKnowledgeNode = (node: KnowledgeNode) => {
    const lessonId = node.lessonSlug || node.url || '';
    for (const part of EXAM_CURRICULUM) {
      for (const section of part.sections) {
        const topic = section.subTopics.find((item) => item.id === lessonId);
        if (topic) {
          setCurrentPart(part);
          setCurrentTopic(topic);
          setCurrentPage('dashboard');
          if (typeof window !== 'undefined' && window.location.pathname === '/knowledge-graph') {
            window.history.pushState({}, '', '/');
          }
          return;
        }
      }
    }
  };

  const MaintenanceScreen = ({ allowAdminEntry = false, showLogout = false }: { allowAdminEntry?: boolean; showLogout?: boolean }) => (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dcfce7,_#f8fafc_42%,_#e2e8f0)] flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-[32px] border border-emerald-100 bg-white/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.14)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
        <div className="p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            อยู่ระหว่างปิดปรับปรุงระบบ
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {maintenanceMode.title || 'ปิดปรับปรุงระบบชั่วคราว'}
          </h1>
          <p className="mt-5 text-slate-600 text-base md:text-lg leading-8 whitespace-pre-wrap">
            {maintenanceMode.message || DEFAULT_MAINTENANCE_MODE.message}
          </p>
          {(maintenanceMode.startAt || maintenanceMode.endAt) && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 px-5 py-4 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">เริ่มปิดปรับปรุง</div>
                <div className="mt-2 text-base font-bold text-slate-900">{maintenanceMode.startAt ? new Date(maintenanceMode.startAt).toLocaleString('th-TH') : '-'}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-5 py-4 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">คาดว่าจะเปิดใช้งาน</div>
                <div className="mt-2 text-base font-bold text-slate-900">{maintenanceMode.endAt ? new Date(maintenanceMode.endAt).toLocaleString('th-TH') : '-'}</div>
              </div>
            </div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {showLogout && (
              <button
                onClick={handleLogout}
                className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
              >
                ออกจากระบบ
              </button>
            )}
          </div>
        </div>
      </div>
      {allowAdminEntry && (
        <button
          onClick={() => setShowMaintenanceAdminLogin(true)}
          aria-label="เข้าสู่ระบบผู้ดูแล"
          className="fixed bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm backdrop-blur transition-colors hover:bg-slate-900 hover:text-white"
        >
          <Lock className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  if (isBootstrapping) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-8 py-10 flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">กำลังเข้าสู่หน้าบทเรียน</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    if (maintenanceMode.isActive && !showMaintenanceAdminLogin) {
      return <MaintenanceScreen allowAdminEntry />;
    }
    return <Auth onLogin={handleLogin} initialError={authBootstrapError} maintenanceMode={maintenanceMode} adminOnlyMode={maintenanceMode.isActive} />;
  }

  if (maintenanceMode.isActive && !canBypassMaintenance) {
    return <MaintenanceScreen showLogout />;
  }

  if (requiresGoogleProfileCompletion(user)) {
    return (
      <CompleteGoogleProfile
        user={user}
        onComplete={handleUpdateProfile}
        onLogout={handleLogout}
      />
    );
  }

  if (showAdminPanel && user.email === 'Krumax') {
    return (
      <AdminDashboard
        onClose={() => setShowAdminPanel(false)}
        onPreviewShop={() => {
          setShowAdminPanel(false);
          setCurrentPage('shop');
          setCurrentPart(null);
          setCurrentTopic(null);
          setShowLearningStats(false);
        }}
        onShopButtonVisibilityChange={setShowShopButton}
      />
    );
  }

  const renderMainContent = () => {
    if (showLearningStats) {
      return <LearningStats onClose={() => setShowLearningStats(false)} user={user} />;
    }

    if (currentPage === 'news') {
      return <NewsPage onBack={handleBackToDashboard} />;
    }
    if (currentPage === 'discussion') {
      return <DiscussionBoard onBack={handleBackToDashboard} currentUser={user!} />;
    }
    if (currentPage === 'shop') {
      return <ShopPage onBack={handleBackToDashboard} />;
    }
    if (currentPage === 'mock-exam') {
      return <MockExamDemo onBack={handleBackToDashboard} />;
    }
    if (currentPage === 'daily-english') {
      return <DailyEnglishPage onBack={handleBackToDashboard} />;
    }
    if (currentPage === 'knowledge-graph') {
      return (
        <KnowledgeGraphView
          data={knowledgeGraphData}
          onBack={handleBackToDashboard}
          onOpenLesson={handleOpenKnowledgeNode}
        />
      );
    }
    if (currentPage === 'contact-support') {
      return (
        <ContactSupport
          user={user}
          onBack={handleBackToDashboard}
          readSupportMessageIds={userUiState.readSupportMessageIds}
          onMarkMessageRead={handleMarkSupportMessageAsRead}
        />
      );
    }
    if (currentPage === 'user-stats') {
      return <UserStatistics onBack={handleBackToDashboard} />;
    }

    if (!currentPart) {
      return (
        <Dashboard
          onSelectPart={handleSelectPart}
          onNavigateToNews={() => setCurrentPage('news')}
          onNavigateToDiscussion={() => setCurrentPage('discussion')}
          onNavigateToShop={() => setCurrentPage('shop')}
          onNavigateToMockExam={() => setCurrentPage('mock-exam')}
          onNavigateToDailyEnglish={() => setCurrentPage('daily-english')}
          onNavigateToKnowledgeGraph={() => {
            setCurrentPart(null);
            setCurrentTopic(null);
            setCurrentPage('knowledge-graph');
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/knowledge-graph');
            }
          }}
          onNavigateToLeaderboard={() => setCurrentPage('user-stats')}
          showShopButton={showShopButton}
        />
      );
    }

    if (!currentTopic) {
      return (
        <TopicList
          part={currentPart}
          onBack={handleBackToDashboard}
          onSelectTopic={handleSelectTopic}
        />
      );
    }

    return (
      <LessonView
        topic={currentTopic}
        onBack={handleBackToPart}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      {/* Header with User Info */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-50 gap-4">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => { setShowLearningStats(false); handleBackToDashboard(); }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-lg text-slate-800 hidden md:block">SobKru69</span>
        </div>

        {/* Marquee Section */}
        {marquee && marquee.isActive && (
          <div className="flex-1 overflow-hidden flex items-center bg-slate-50 rounded-full px-4 py-2 border border-slate-100 max-w-2xl mx-auto">
            <Megaphone className="w-5 h-5 text-red-500 shrink-0 mr-3 animate-pulse" />
            <div className="overflow-hidden w-full relative h-5">
              <div className="absolute whitespace-nowrap animate-[marquee_20s_linear_infinite] text-slate-700 font-medium text-sm flex items-center h-full">
                {marquee.text}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Notification Bell */}
          <button
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
            onClick={() => setShowBellPanel(true)}
          >
            <Bell className="w-6 h-6" />
            {bellNotifications.filter(n => !readNotifIds.includes(n.id)).length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity relative"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-800">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 relative">
                <UserIcon className="w-5 h-5" />
                {unreadSupportCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {unreadSupportCount}
                  </span>
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-100 py-2 z-50">
                <button
                  onClick={() => { setShowEditProfile(true); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  แก้ไขโปรไฟล์
                </button>
                <button
                  onClick={() => { setShowLearningStats(true); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-slate-400" />
                  สถิติการเรียน
                </button>
                {user.email !== 'Krumax' && (
                  <button
                    onClick={() => { setCurrentPage('contact-support'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                      ติดต่อผู้ดูแลระบบ
                    </div>
                    {unreadSupportCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadSupportCount}
                      </span>
                    )}
                  </button>
                )}
                {user.email === 'Krumax' && (
                  <button
                    onClick={() => { setShowAdminPanel(true); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 font-medium border-t border-slate-100 mt-1 pt-2"
                  >
                    <Settings className="w-4 h-4" />
                    ระบบจัดการหลังบ้าน
                  </button>
                )}
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={() => { setShowLogoutConfirm(true); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area filling remaining space */}
      <main className="flex-grow flex flex-col">
        {renderMainContent()}
      </main>

      {/* Footer */}
      {currentPage !== 'knowledge-graph' && (
        <footer className="py-8 mt-auto pb-12">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center">
            <img
              src={FOOTER_LOGO_URL}
              alt="Cool Com Logo"
              className="h-5 object-contain mb-3 opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm text-slate-500 text-center">
              &copy; 2026 SobKru69 All Rights Reserved.<br/>
              Developed by Cool Com | <a href="https://www.coolcom.click" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">www.coolcom.click</a>
            </p>
          </div>
        </footer>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile
          user={user}
          onClose={() => setShowEditProfile(false)}
          onUpdate={handleUpdateProfile}
        />
      )}

      {/* Notification Modal */}
      {notificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{notificationModal.title}</h3>
              </div>
              <button onClick={() => setNotificationModal(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            {notificationModal.imageUrl && (
              <div className="mb-4 rounded-xl overflow-hidden border border-slate-100">
                <img src={notificationModal.imageUrl} alt="Notification" className="w-full h-auto object-cover" />
              </div>
            )}
            <div className="text-slate-600 whitespace-pre-wrap mb-6">
              {notificationModal.message}
            </div>
            <button
              onClick={() => setNotificationModal(null)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              รับทราบ
            </button>
          </div>
        </div>
      )}

      {/* Bell Notifications Panel */}
      {showBellPanel && (
        <BellNotificationsPanel
          notifications={bellNotifications.map(n => ({ ...n, isRead: readNotifIds.includes(n.id) }))}
          onClose={() => setShowBellPanel(false)}
          onMarkAsRead={handleMarkNotifAsRead}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">ยืนยันการออกจากระบบ</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">
              คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Donation Button - Hidden when in lesson view */}
      {!currentTopic && currentPage !== 'shop' && currentPage !== 'daily-english' && currentPage !== 'knowledge-graph' && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 sobkru-donate-container">
          <style>{`
            @media (max-width: 640px) {
              .sobkru-donate-container {
                transform: scale(0.6);
                transform-origin: bottom right;
              }
            }

            @keyframes sobkruCoffeeFloat {
              0%, 100% { transform: translateY(0) rotate(-2deg); }
              50% { transform: translateY(-3px) rotate(2deg); }
            }

            @keyframes sobkruCoffeeSteam {
              0% {
                opacity: 0;
                transform: translateY(8px) scaleX(0.75);
              }
              25% {
                opacity: 0.75;
              }
              100% {
                opacity: 0;
                transform: translateY(-18px) scaleX(1.18);
              }
            }

            @keyframes sobkruCoffeeShine {
              0% { transform: translateX(-130%) rotate(18deg); opacity: 0; }
              35% { opacity: 0.6; }
              100% { transform: translateX(180%) rotate(18deg); opacity: 0; }
            }

            .sobkru-coffee-wrap {
              position: relative;
              width: 30px;
              height: 28px;
              display: inline-flex;
              align-items: flex-end;
              justify-content: center;
              border-radius: 999px;
              background: transparent;
              border: 0;
              box-shadow: none;
              animation: sobkruCoffeeFloat 2.6s ease-in-out infinite;
              transform-origin: center bottom;
            }

            .sobkru-coffee-cup {
              position: relative;
              width: 22px;
              height: 16px;
              margin-bottom: 5px;
              border: 2.5px solid #ffffff;
              border-radius: 5px 5px 10px 10px;
              background: transparent;
              box-shadow: none;
              overflow: visible;
            }

            .sobkru-coffee-liquid {
              position: absolute;
              left: 4px;
              right: 4px;
              top: 3px;
              height: 4px;
              border-radius: 999px;
              background: #ffffff;
              opacity: .95;
            }

            .sobkru-coffee-handle {
              position: absolute;
              right: -9px;
              top: 4px;
              width: 10px;
              height: 10px;
              border: 2.5px solid #ffffff;
              border-left: 0;
              border-radius: 0 999px 999px 0;
            }

            .sobkru-coffee-saucer {
              position: absolute;
              bottom: 6px;
              width: 28px;
              height: 4px;
              border-radius: 999px;
              background: #ffffff;
              box-shadow: 0 4px 10px rgba(120,53,15,.16);
            }

            .sobkru-coffee-smoke {
              position: absolute;
              top: -9px;
              width: 3px;
              height: 12px;
              border-radius: 999px;
              background: linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.9));
              filter: blur(.2px);
              animation: sobkruCoffeeSteam 2.2s ease-in-out infinite;
            }

            .sobkru-coffee-smoke-1 {
              left: 7px;
              animation-delay: 0s;
            }

            .sobkru-coffee-smoke-2 {
              left: 14px;
              height: 15px;
              animation-delay: .38s;
            }

            .sobkru-coffee-smoke-3 {
              left: 21px;
              animation-delay: .76s;
            }

            .sobkru-donate-button::after {
              content: "";
              position: absolute;
              inset: -42% auto -42% -34%;
              width: 34%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent);
              animation: sobkruCoffeeShine 4.2s ease-in-out infinite;
              pointer-events: none;
            }
          `}</style>
          <button
            onClick={() => { setDonationInitialView('intro'); setShowDonation(true); }}
            className="sobkru-donate-button group relative isolate flex items-center gap-3 overflow-hidden rounded-full bg-[#F59E0B] px-7 py-3.5 text-white shadow-[0_16px_34px_rgba(217,119,6,.34)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EA8A04] hover:shadow-[0_22px_46px_rgba(217,119,6,.42)] active:translate-y-0 active:scale-95"
          >
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,.12),transparent_45%,rgba(120,53,15,.12))]"></span>
            <FloatingCoffeeCup />
            <span className="relative flex items-center leading-none">
              <span className="text-lg font-black tracking-wide text-white drop-shadow-[0_1px_1px_rgba(120,53,15,.25)]">เลี้ยงกาแฟ</span>
            </span>
          </button>
          {SHOW_DONATION_HISTORY_SHORTCUT && (
            <button
              onClick={() => { setDonationInitialView('history'); setShowDonation(true); }}
              className="text-[10px] text-slate-400 hover:text-amber-600 transition-colors bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-200/50 mr-2"
            >
              ประวัติการเลี้ยงกาแฟ
            </button>
          )}
        </div>
      )}

      {/* Donation Modal */}
      {showDonation && (
        <DonationModal
          onClose={() => setShowDonation(false)}
          initialView={donationInitialView === 'history' ? 'history' : 'intro'}
        />
      )}

    </div>
  );
};

export default App;
