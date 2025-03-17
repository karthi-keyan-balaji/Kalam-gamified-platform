import React from 'react';
import { Trophy, Target, Crown, X } from 'lucide-react';

export default function Notifications({ notifications, onClose, onMarkAsRead }) {
  const getIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'challenge':
        return <Target className="w-5 h-5 text-green-500" />;
      case 'level':
        return <Crown className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No new notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${
                !notification.read ? 'bg-secondary/20' : ''
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex gap-3">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground">{notification.title}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}