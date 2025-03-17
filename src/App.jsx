import React, { useState, useCallback } from 'react';
import { 
  BarChart3, 
  ShoppingBag,
  Users, 
  Wheat,
  Coins,
  Store,
  Tractor,
  Sprout,
  MessageSquare,
  Zap
} from 'lucide-react';
import Profile from './components/Profile';
import Tasks from './components/Tasks';
import Skills from './components/Skills';
import LevelUpModal from './components/LevelUpModal';
import Marketplace from './components/Marketplace';
import QuerySection from './components/QuerySection';

function App() {
  const [theme, setTheme] = useState('light');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'John Farmer',
    avatar: 'https://images.unsplash.com/photo-1560787313-5dff3307e257?w=100&h=100&fit=crop&crop=faces',
    level: 12,
    xp: 2742,
    coins: 1500,
  });

  const [dailyTasks, setDailyTasks] = useState([
    { id: '1', title: 'Harvest 100kg of Wheat', reward: '+200 Coins', completed: false, deadline: '2h left' },
    { id: '2', title: 'Sell Products at Market', reward: '+150 Coins', completed: false, deadline: '5h left' },
    { id: '3', title: 'Water Crops', reward: '+100 Coins', completed: false, deadline: '8h left' },
  ]);

  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: '4', title: 'Sell 500kg of Produce', reward: '+500 Coins', completed: false, deadline: '4d left' },
    { id: '5', title: 'Plant 200 Seeds', reward: '+300 Coins', completed: false, deadline: '4d left' },
    { id: '6', title: 'Complete All Daily Tasks', reward: '+1000 Coins', completed: false, deadline: '4d left' },
  ]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleCompleteTask = useCallback((taskId) => {
    const updateTasks = (tasks) =>
      tasks.map(task => {
        if (task.id === taskId && !task.completed) {
          const coinReward = parseInt(task.reward.replace(/[^0-9]/g, ''));
          
          setUser(prev => {
            const newXP = prev.xp + Math.floor(coinReward * 0.5);
            const xpPerLevel = 1000;
            const newLevel = Math.floor(newXP / xpPerLevel);
            
            if (newLevel > prev.level) {
              setShowLevelUp(true);
            }
            
            return {
              ...prev,
              level: newLevel,
              xp: newXP % xpPerLevel,
              coins: prev.coins + coinReward
            };
          });
          
          return { ...task, completed: true };
        }
        return task;
      });

    setDailyTasks(prev => updateTasks(prev));
    setWeeklyTasks(prev => updateTasks(prev));
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'marketplace':
        return <Marketplace user={user} setUser={setUser} />;
      case 'skills':
        return <Skills user={user} setUser={setUser} />;
      case 'stats':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Total Harvests', value: '1,234 kg', icon: Wheat, color: 'text-yellow-500' },
                { title: 'Market Sales', value: '₹45,678', icon: ShoppingBag, color: 'text-green-500' },
                { title: 'Active Farmers', value: '89', icon: Users, color: 'text-blue-500' },
                { title: 'Crops Growing', value: '567', icon: Sprout, color: 'text-emerald-500' },
                { title: 'Equipment Owned', value: '12', icon: Tractor, color: 'text-orange-500' },
                { title: 'Market Rating', value: '4.8/5', icon: Store, color: 'text-purple-500' },
              ].map((stat, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
              <h2 className="text-lg font-semibold text-foreground mb-4">Player Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Task Completion</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Daily Tasks</span>
                        <span>{dailyTasks.filter(t => t.completed).length}/{dailyTasks.length}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${(dailyTasks.filter(t => t.completed).length / dailyTasks.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Tasks</span>
                        <span>{weeklyTasks.filter(t => t.completed).length}/{weeklyTasks.length}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${(weeklyTasks.filter(t => t.completed).length / weeklyTasks.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Achievements</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                      <span>Master Farmer</span>
                      <span className="text-primary">Level {user.level}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                      <span>Total Coins Earned</span>
                      <span className="text-yellow-500">{user.coins}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                      <span>Skills Mastered</span>
                      <span className="text-green-500">3/6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="mb-8">
              <Profile 
                user={user}
                theme={theme}
                onThemeToggle={toggleTheme}
              />
            </div>
            <div className="mb-8">
              <Tasks
                dailyTasks={dailyTasks}
                weeklyTasks={weeklyTasks}
                onCompleteTask={handleCompleteTask}
              />
            </div>
            <div>
              <QuerySection />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary transition-colors duration-300">
      {showLevelUp && (
        <LevelUpModal
          level={user.level}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/50 p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <Tractor className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">KALAM</span>
        </div>
        
        <nav className="space-y-2">
          {[
            { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
            { icon: Store, label: 'Marketplace', id: 'marketplace' },
            { icon: Zap, label: 'Skills', id: 'skills' },
            { icon: BarChart3, label: 'Stats', id: 'stats' },
            { icon: MessageSquare, label: 'Support', id: 'support' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Coins Display */}
        <div className="absolute bottom-4 left-4 right-4 bg-secondary p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Your Coins</p>
              <p className="text-lg font-bold text-foreground">{user.coins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;