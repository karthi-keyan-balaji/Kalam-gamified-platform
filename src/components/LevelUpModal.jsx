import React from 'react';
import { Crown, Sparkles, Star } from 'lucide-react';

export default function LevelUpModal({ level, onClose }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-card rounded-xl shadow-lg p-8 max-w-md w-full mx-4 animate-level-up">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <Crown className="w-24 h-24 text-yellow-500 animate-bounce" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -bottom-2 -left-2 animate-pulse" />
          </div>
        </div>
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Level Up!</h2>
          <p className="text-6xl font-bold text-primary mb-4">{level}</p>
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 animate-spin-slow" />
            ))}
          </div>
          <p className="text-muted-foreground mb-6">
            Congratulations! You've reached a new level. Keep up the great work!
          </p>
          <button
            onClick={onClose}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}