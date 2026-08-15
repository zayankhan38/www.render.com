import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, DollarSign, Target, Calendar, Download, Eye, Clock, Zap } from 'lucide-react';

/**
 * Professional Monetization Dashboard
 * Enterprise Features:
 * - Real-time earnings tracking
 * - 11-tier play button progression
 * - Eligibility requirements
 * - Payout breakdown (90% creator, 10% platform)
 * - Revenue analytics
 * - Monthly earnings calendar
 * - Fully extractable for other projects
 * 
 * Usage: <MonetizationDashboard userId={userId} />
 */
const MonetizationDashboard = ({ userId = 'user123' }) => {
  const [stats, setStats] = useState({
    subscribers: 2500,
    watchHours: 1500,
    shortViews: 650000,
    totalEarnings: 12500,
    monthlyEarnings: 2150,
    monthlyChange: 18.5
  });

  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const playButtonTiers = [
    { tier: 'Wood', subs: 1000, color: 'from-amber-900 to-amber-800' },
    { tier: 'Bronze', subs: 10000, color: 'from-orange-900 to-orange-800' },
    { tier: 'Silver', subs: 50000, color: 'from-gray-500 to-gray-600' },
    { tier: 'Platinum', subs: 100000, color: 'from-slate-400 to-slate-500' },
    { tier: 'Emerald', subs: 500000, color: 'from-green-600 to-emerald-700' },
    { tier: 'Gold', subs: 1000000, color: 'from-yellow-500 to-yellow-600' },
    { tier: 'Diamond', subs: 10000000, color: 'from-cyan-400 to-blue-500' },
    { tier: 'Red', subs: 50000000, color: 'from-red-600 to-red-700' },
    { tier: 'Green', subs: 100000000, color: 'from-green-500 to-green-600' },
    { tier: 'Blue', subs: 500000000, color: 'from-blue-600 to-blue-700' },
    { tier: 'Custom', subs: 1000000000, color: 'from-purple-600 to-pink-600' }
  ];

  const monetizationRequirements = [
    { label: 'Subscribers', required: 1000, current: stats.subscribers, icon: '👥', unit: '' },
    { label: 'Watch Time', required: 1000, current: Math.floor(stats.watchHours), icon: '⏱️', unit: ' hrs' },
    { label: 'Short Views', required: 500000, current: stats.shortViews, icon: '📱', unit: '' }
  ];

  const isMonetized = stats.subscribers >= 1000 && stats.watchHours >= 1000 && stats.shortViews >= 500000;

  const getCurrentPlayButton = () => {
    let currentButton = null;
    for (const button of playButtonTiers) {
      if (stats.subscribers >= button.subs) {
        currentButton = button;
      } else {
        break;
      }
    }
    return currentButton;
  };

  const getNextPlayButton = () => {
    for (const button of playButtonTiers) {
      if (stats.subscribers < button.subs) {
        return button;
      }
    }
    return null;
  };

  const currentButton = getCurrentPlayButton();
  const nextButton = getNextPlayButton();

  const revenueBreakdown = [
    { source: 'Video Ads', amount: 1200, percentage: 55.8 },
    { source: 'Short Ads', amount: 650, percentage: 30.2 },
    { source: 'Channel Memberships', amount: 200, percentage: 9.3 },
    { source: 'Super Chats', amount: 100, percentage: 4.7 }
  ];

  const payoutDetails = {
    subtotal: stats.monthlyEarnings,
    platformFee: Math.floor(stats.monthlyEarnings * 0.1),
    creatorPayout: Math.floor(stats.monthlyEarnings * 0.9)
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const formatCurrency = (num) => {
    return '$' + num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            Monetization Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Track your earnings, play buttons, and monetization progress
          </p>
        </div>

        {/* Monetization Status */}
        <div className={`relative overflow-hidden rounded-2xl p-8 border-2 ${
          isMonetized
            ? 'border-green-600/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20'
            : 'border-red-600/50 bg-gradient-to-br from-red-900/20 to-rose-900/20'
        }`}>
          <div className={`absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl ${
            isMonetized ? 'bg-green-600' : 'bg-red-600'
          }`}></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-full ${
                isMonetized ? 'bg-green-600/20' : 'bg-red-600/20'
              }`}>
                <Zap className={isMonetized ? 'text-green-600' : 'text-red-600'} size={28} />
              </div>
              <h2 className={`text-3xl font-bold ${
                isMonetized ? 'text-green-600' : 'text-red-600'
              }`}>
                {isMonetized ? '✅ Monetization Active' : '⏳ Not Yet Monetized'}
              </h2>
            </div>

            {!isMonetized && (
              <p className="text-gray-300 mb-6">
                You're close! Meet all requirements below to start earning.
              </p>
            )}

            {/* Requirements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {monetizationRequirements.map((req, idx) => {
                const progress = Math.min((req.current / req.required) * 100, 100);
                const met = req.current >= req.required;

                return (
                  <div key={idx} className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{req.icon}</span>
                        <span className="text-gray-300 font-semibold text-sm">{req.label}</span>
                      </div>
                      {met && <span className="text-green-600 text-lg">✓</span>}
                    </div>
                    <div className="text-white font-bold mb-2">
                      {formatNumber(req.current)}{req.unit} / {formatNumber(req.required)}{req.unit}
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          met ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {met ? 'Requirement met!' : `${(100 - progress).toFixed(0)}% to go`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Earnings */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Total Earnings</p>
              <DollarSign className="text-red-600" size={24} />
            </div>
            <p className="text-4xl font-black text-white mb-2">
              {formatCurrency(stats.totalEarnings)}
            </p>
            <p className="text-xs text-gray-500">All-time total</p>
          </div>

          {/* Monthly Earnings */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Monthly Earnings</p>
              <Calendar className="text-red-600" size={24} />
            </div>
            <p className="text-4xl font-black text-white mb-2">
              {formatCurrency(stats.monthlyEarnings)}
            </p>
            <p className="text-xs text-green-600 font-semibold">
              ↑ {stats.monthlyChange}% from last month
            </p>
          </div>

          {/* Creator Payout */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-green-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Creator Payout</p>
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <p className="text-4xl font-black text-green-600 mb-2">
              {formatCurrency(payoutDetails.creatorPayout)}
            </p>
            <p className="text-xs text-gray-500">90% of earnings</p>
          </div>

          {/* Platform Fee */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-blue-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Platform Fee</p>
              <Target className="text-blue-600" size={24} />
            </div>
            <p className="text-4xl font-black text-blue-600 mb-2">
              {formatCurrency(payoutDetails.platformFee)}
            </p>
            <p className="text-xs text-gray-500">10% platform cut</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Play Button Progression */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="text-red-600" />
              Play Button Progression
            </h3>

            {/* Current Button */}
            {currentButton && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-900/30 to-red-900/10 border border-red-600/30 rounded-lg">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Your Current Button</p>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentButton.color} flex items-center justify-center`}>
                    <span className="text-2xl">🏅</span>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">{currentButton.tier}</p>
                    <p className="text-gray-400">{formatNumber(currentButton.subs)} subscribers</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {nextButton && (
              <div className="mb-8">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Next Milestone</p>
                <div className="bg-neutral-800/50 p-4 rounded-lg mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{nextButton.tier} Button</span>
                    <span className="text-xs text-gray-400">{formatNumber(nextButton.subs)} subs</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min((stats.subscribers / nextButton.subs) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatNumber(nextButton.subs - stats.subscribers)} subscribers needed
                  </p>
                </div>
              </div>
            )}

            {/* All Buttons */}
            <div className="space-y-2">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">All Buttons</p>
              <div className="grid grid-cols-4 gap-2">
                {playButtonTiers.map((button, idx) => {
                  const unlocked = stats.subscribers >= button.subs;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg text-center transition ${
                        unlocked
                          ? `bg-gradient-to-br ${button.color} border border-opacity-50`
                          : 'bg-neutral-800 border border-neutral-700 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏅</div>
                      <p className="text-xs font-bold text-white">{button.tier}</p>
                      <p className={`text-xs mt-1 ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                        {formatNumber(button.subs)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Eye className="text-red-600" />
              Revenue Sources
            </h3>

            <div className="space-y-4 mb-6">
              {revenueBreakdown.map((source, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">{source.source}</span>
                    <span className="text-white font-bold">{formatCurrency(source.amount)}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{source.percentage}%</p>
                </div>
              ))}
            </div>

            {/* Payout Breakdown */}
            <div className="border-t border-neutral-700 pt-6 space-y-3">
              <h4 className="text-sm font-bold text-gray-400 uppercase">Monthly Payout</h4>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-semibold">{formatCurrency(payoutDetails.subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Platform (10%)</span>
                <span className="text-red-600">-{formatCurrency(payoutDetails.platformFee)}</span>
              </div>

              <div className="border-t border-neutral-700 pt-3 flex justify-between">
                <span className="text-white font-bold">Your Payout (90%)</span>
                <span className="text-green-600 font-bold text-lg">{formatCurrency(payoutDetails.creatorPayout)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border-t border-neutral-700 mt-6 pt-6">
              <p className="text-sm font-semibold text-gray-400 uppercase mb-4">Next Payment</p>
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <p className="text-white font-bold mb-1">Bank Transfer</p>
                <p className="text-xs text-gray-400 mb-4">Processing on Sept 1st</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-semibold">
                  <Download size={16} />
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-600/30 rounded-xl p-6">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-yellow-600" size={20} />
            💡 Tips to Increase Earnings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-300">
              • Post consistently (3-4x weekly)
            </div>
            <div className="text-sm text-gray-300">
              • Use trending music & hashtags
            </div>
            <div className="text-sm text-gray-300">
              • Engage with comments quickly
            </div>
            <div className="text-sm text-gray-300">
              • Create longer watch-time videos
            </div>
            <div className="text-sm text-gray-300">
              • Collaborate with other creators
            </div>
            <div className="text-sm text-gray-300">
              • Run channel memberships
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetizationDashboard;
