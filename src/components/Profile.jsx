import React, { useState } from 'react';
import { Settings, Bell, Sun, Moon } from 'lucide-react';
import Notifications from './Notifications';

export default function Profile({ user, theme, onThemeToggle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: "You've earned 'Speed Runner' for completing 10 matches in under 15 minutes.",
      time: '2m ago',
      read: false,
    },
    {
      id: '2',
      type: 'level',
      title: 'Level Up!',
      message: "Congratulations! You've reached Level 42.",
      time: '1h ago',
      read: false,
    },
    {
      id: '3',
      type: 'challenge',
      title: 'Challenge Completed',
      message: "You've completed the 'Weekly Warrior' challenge.",
      time: '3h ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces'}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h2 className="font-semibold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">Level {user.level}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-secondary/80 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <Notifications
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onMarkAsRead={handleMarkAsRead}
              />
            )}
          </div>
          <button
            className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Level Progress</span>
            <span className="text-foreground font-medium">{user.xp}/10000 XP</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(user.xp / 10000) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
