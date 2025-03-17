import React, { useState, useEffect } from 'react';
import { socket, socketEvents } from '../lib/socket';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { format } from 'date-fns';
import {
  Trophy,
  Target,
  Zap,
  Users,
  Award,
  Crown,
  ShoppingCart,
  MessageCircle,
  Bell,
  AlertTriangle,
  TrendingUp,
  Timer,
  Coins,
  Wheat,
  Tractor
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [taskStats, setTaskStats] = useState({
    daily: { completed: 15, total: 20 },
    weekly: { completed: 8, total: 10 },
    monthly: { completed: 25, total: 30 }
  });

  useEffect(() => {
    // Simulated data for demonstration
    const mockAnalytics = Array.from({ length: 7 }, (_, i) => ({
      date: format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'MMM dd'),
      crops: Math.floor(Math.random() * 1000) + 500,
      sales: Math.floor(Math.random() * 5000) + 2000,
      profit: Math.floor(Math.random() * 3000) + 1000
    })).reverse();

    setAnalyticsData(mockAnalytics);

    // Socket event listeners would go here in a real implementation
    socket.on(socketEvents.USER_UPDATE, (userData) => {
      setUser(userData);
    });

    socket.on(socketEvents.ANALYTICS_UPDATE, (data) => {
      setAnalyticsData(prev => [...prev, data].slice(-7));
    });

    return () => {
      socket.off(socketEvents.USER_UPDATE);
      socket.off(socketEvents.ANALYTICS_UPDATE);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Wheat}
          label="Total Harvest"
          value="2,345 kg"
          trend="+12.5%"
          color="text-yellow-500"
        />
        <StatCard
          icon={Coins}
          label="Total Earnings"
          value="₹45,678"
          trend="+8.2%"
          color="text-green-500"
        />
        <StatCard
          icon={Users}
          label="Community Size"
          value="234"
          trend="+15.3%"
          color="text-blue-500"
        />
        <StatCard
          icon={Tractor}
          label="Equipment Usage"
          value="85%"
          trend="+5.7%"
          color="text-purple-500"
        />
      </div>

      {/* Task Completion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Task Completion</h2>
          <div className="space-y-4">
            {Object.entries(taskStats).map(([period, stats]) => (
              <div key={period}>
                <div className="flex items-center justify-between mb-2">
                  <span className="capitalize text-muted-foreground">{period} Tasks</span>
                  <span className="text-foreground font-medium">
                    {stats.completed}/{stats.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Farming Analytics</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorCrops" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="crops"
                  stroke="#4ade80"
                  fillOpacity={1}
                  fill="url(#colorCrops)"
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Harvest Complete',
              desc: 'Successfully harvested 500kg of wheat',
              time: '2h ago',
              reward: '+200 Coins'
            },
            {
              title: 'Market Sale',
              desc: 'Sold vegetables at premium price',
              time: '5h ago',
              reward: '+350 Coins'
            },
            {
              title: 'Equipment Upgrade',
              desc: 'Upgraded tractor efficiency',
              time: '1d ago',
              reward: '+500 XP'
            }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
            >
              <div>
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.desc} • {activity.time}
                </p>
              </div>
              <span className="text-green-500 font-medium">{activity.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-secondary`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className="text-sm text-green-500">{trend}</span>
      </div>
      <p className="text-muted-foreground text-sm mt-4">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}