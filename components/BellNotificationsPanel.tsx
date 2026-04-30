import React, { useEffect, useState } from 'react';
import { X, Bell, Clock, ChevronRight } from 'lucide-react';
import { BellNotification } from '../services/authService';

interface BellNotificationsPanelProps {
  notifications: BellNotification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const BellNotificationsPanel: React.FC<BellNotificationsPanelProps> = ({ notifications, onClose, onMarkAsRead }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<BellNotification | null>(null);
  const visibleNotifications = notifications.filter((notif) => !notif.isRead);

  useEffect(() => {
    // Trigger slide-in animation after mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  const handleNotifClick = (notif: BellNotification) => {
    setSelectedNotif(notif);
    if (!notif.isRead) {
      onMarkAsRead(notif.id);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      {/* Slide Peak Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 ease-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">การแจ้งเตือน</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
              <Bell className="w-12 h-12 text-slate-200" />
              <p>ไม่มีการแจ้งเตือนใหม่</p>
            </div>
          ) : (
            visibleNotifications.map((notif) => (
              <button 
                key={notif.id} 
                onClick={() => handleNotifClick(notif)}
                className={`w-full text-left border rounded-xl p-4 transition-colors flex items-center justify-between gap-3 ${
                  notif.isRead 
                    ? 'bg-white border-slate-100 opacity-60 hover:bg-slate-50' 
                    : 'bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />}
                    <h4 className={`font-medium truncate ${notif.isRead ? 'text-slate-600' : 'text-indigo-900 font-semibold'}`}>
                      {notif.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(notif.date).toLocaleString('th-TH')}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 ${notif.isRead ? 'text-slate-300' : 'text-indigo-300'}`} />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Notification Detail Modal */}
      {selectedNotif && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedNotif(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedNotif.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(selectedNotif.date).toLocaleString('th-TH')}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedNotif(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-slate-700 whitespace-pre-wrap leading-relaxed">
                {selectedNotif.message}
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedNotif(null)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BellNotificationsPanel;
