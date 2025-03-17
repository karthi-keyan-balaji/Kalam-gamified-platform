import React, { useState } from 'react';
import { Tractor, Wheat, Coins, Lock, Star, Zap, ShoppingBag, Users } from 'lucide-react';

const skillCategories = [
  {
    id: 'farming',
    name: 'Farming Skills',
    description: 'Enhance your farming capabilities',
    icon: Tractor,
    color: 'text-green-500',
  },
  {
    id: 'market',
    name: 'Market Skills',
    description: 'Improve your trading abilities',
    icon: ShoppingBag,
    color: 'text-blue-500',
  },
  {
    id: 'community',
    name: 'Community Skills',
    description: 'Boost your social interactions',
    icon: Users,
    color: 'text-purple-500',
  },
];

const allSkills = {
  farming: [
    {
      id: '1',
      name: 'Farming Speed',
      description: 'Increase farming speed for faster harvests',
      level: 1,
      maxLevel: 5,
      boost: '+20% Speed',
      icon: Tractor,
      color: 'bg-green-500/20',
      price: 500,
      requiredLevel: 5,
      category: 'farming'
    },
    {
      id: '2',
      name: 'Harvest Yield',
      description: 'Get more crops from each harvest',
      level: 1,
      maxLevel: 5,
      boost: '+25% Yield',
      icon: Wheat,
      color: 'bg-yellow-500/20',
      price: 750,
      requiredLevel: 8,
      category: 'farming'
    },
    {
      id: '3',
      name: 'Resource Efficiency',
      description: 'Use fewer resources while farming',
      level: 1,
      maxLevel: 5,
      boost: '-15% Resource Usage',
      icon: Zap,
      color: 'bg-blue-500/20',
      price: 1000,
      requiredLevel: 10,
      category: 'farming'
    },
  ],
  market: [
    {
      id: '4',
      name: 'Bargaining',
      description: 'Get better prices when trading',
      level: 1,
      maxLevel: 5,
      boost: '+10% Better Prices',
      icon: Coins,
      color: 'bg-purple-500/20',
      price: 800,
      requiredLevel: 7,
      category: 'market'
    },
    {
      id: '5',
      name: 'Market Insight',
      description: 'See market trends and predictions',
      level: 1,
      maxLevel: 5,
      boost: 'Market Predictions',
      icon: ShoppingBag,
      color: 'bg-red-500/20',
      price: 1200,
      requiredLevel: 12,
      category: 'market'
    },
  ],
  community: [
    {
      id: '6',
      name: 'Leadership',
      description: 'Lead community projects effectively',
      level: 1,
      maxLevel: 5,
      boost: '+20% Team Bonus',
      icon: Users,
      color: 'bg-indigo-500/20',
      price: 1500,
      requiredLevel: 15,
      category: 'community'
    },
    {
      id: '7',
      name: 'Networking',
      description: 'Build better connections with other farmers',
      level: 1,
      maxLevel: 5,
      boost: '+15% Trade Network',
      icon: Star,
      color: 'bg-pink-500/20',
      price: 1000,
      requiredLevel: 10,
      category: 'community'
    },
  ],
};

export default function Skills({ user, setUser }) {
  const [activeCategory, setActiveCategory] = useState('farming');
  const [showConfirm, setShowConfirm] = useState(null);

  const handlePurchase = (skill) => {
    if (user.coins >= skill.price && user.level >= skill.requiredLevel) {
      setShowConfirm(skill);
    }
  };

  const confirmPurchase = () => {
    if (showConfirm) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - showConfirm.price
      }));
      // Here you would typically make an API call to update the backend
      alert(`Successfully upgraded ${showConfirm.name}!`);
      setShowConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skillCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-4 rounded-xl transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-card hover:bg-secondary'
            }`}
          >
            <div className="flex items-center gap-3">
              <category.icon className={`w-6 h-6 ${category.color}`} />
              <div className="text-left">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allSkills[activeCategory].map(skill => {
          const isLocked = user.level < skill.requiredLevel;
          const canAfford = user.coins >= skill.price;

          return (
            <div
              key={skill.id}
              className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${skill.color}`}>
                  <skill.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Level Progress</span>
                    <span className="text-foreground">{skill.level}/{skill.maxLevel}</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Boost</span>
                  <span className="text-primary font-medium">{skill.boost}</span>
                </div>

                {isLocked ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Requires Level {skill.requiredLevel}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(skill)}
                    disabled={!canAfford || skill.level >= skill.maxLevel}
                    className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      canAfford && skill.level < skill.maxLevel
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    <span>{skill.level >= skill.maxLevel ? 'Maxed Out' : `${skill.price} Coins`}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Purchase Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirm Purchase</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to upgrade {showConfirm.name} for {showConfirm.price} coins?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmPurchase}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}