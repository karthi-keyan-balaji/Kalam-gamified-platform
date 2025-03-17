import React, { useState } from 'react';
import { ShoppingBag, Wheat, Tractor, Package, ArrowRight, Coins } from 'lucide-react';

export default function Marketplace({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('buy');

  const products = [
    {
      id: '1',
      name: 'Premium Seeds',
      description: 'High-yield wheat seeds for better harvest',
      price: 300,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      category: 'seeds',
      stock: 50
    },
    {
      id: '2',
      name: 'Organic Fertilizer',
      description: 'Natural fertilizer for healthier crops',
      price: 200,
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&h=300&fit=crop',
      category: 'fertilizer',
      stock: 100
    },
    {
      id: '3',
      name: 'Basic Tractor',
      description: 'Essential farming equipment',
      price: 1000,
      image: 'https://images.unsplash.com/photo-1605338803155-8b0aa2016648?w=400&h=300&fit=crop',
      category: 'equipment',
      stock: 5
    },
  ];

  const userProducts = [
    {
      id: '1',
      name: 'Fresh Wheat',
      description: 'Organically grown wheat',
      price: 150,
      quantity: 500,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Organic Vegetables',
      description: 'Mixed vegetable bundle',
      price: 200,
      quantity: 100,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=300&fit=crop',
    },
  ];

  const handleBuy = (product) => {
    if (user.coins >= product.price) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - product.price
      }));
      // Here you would typically make an API call to update the backend
      alert(`Successfully purchased ${product.name}`);
    } else {
      alert('Not enough coins!');
    }
  };

  const handleSell = (product) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + product.price
    }));
    // Here you would typically make an API call to update the backend
    alert(`Successfully sold ${product.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
        <div className="flex items-center gap-2 bg-card rounded-lg p-2">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'buy'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'sell'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {activeTab === 'buy' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{product.price}</span>
                  </div>
                  <button
                    onClick={() => handleBuy(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProducts.map(product => (
            <div key={product.id} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Quantity: {product.quantity} {product.unit}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{product.price}</span>
                  </div>
                  <button
                    onClick={() => handleSell(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Sell Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}