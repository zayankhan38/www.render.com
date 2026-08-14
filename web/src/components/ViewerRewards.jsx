import React, { useState } from 'react';
import { Trophy, Zap, Gift, Target, Flame, Star, Medal, Crown } from 'lucide-react';

/**
 * Professional Viewer Rewards System
 * Enterprise Features:
 * - 3-tier badge system (Golden, Diamond, Platinum)
 * - Real-time progress tracking
 * - Monthly Top 3 leaderboard
 * - Event ticket rewards
 * - Play button unlocks
 * - Achievement milestones
 * - Fully extractable for other projects
 * 
 * Usage: <ViewerRewards userId={userId} />
 */
const ViewerRewards = ({ userId = 'user123' }) => {
  const [viewerStats, setViewerStats] = useState({
    shortsWatched: 5500000,
    videosWatched: 250000,
    monthlyRank: 2,
    totalRewards: 8,
    joinDate: '2024-01-15'
  });

  const [selectedTab, setSelectedTab] = useState('badges');

  const badges = [
    {
      name: 'Golden Viewer',
      shorts: 1000000,
      videos: 100000,
      color: 'from-yellow-600 to-yellow-500',
      icon: '🥇',
      description: '1M shorts + 100K videos watched',
      rarity: 'Rare'
    },
    {
      name: 'Diamond Viewer',
      shorts: 10000000,
      videos: 500000,
      color: 'from-cyan-600 to-blue-500',
      icon: '💎',
      description: '10M shorts + 500K videos watched',
      rarity: 'Epic'
    },
    {
      name: 'Platinum Viewer',
      shorts: 100000000,
      videos: 5000000,
      color: 'from-slate-400 to-slate-300',
      icon: '👑',
      description: '100M shorts + 5M videos watched',
      rarity: 'Legendary'
    }
  ];

  const getBadges = () => {
    return badges.filter(badge =>
      viewerStats.shortsWatched >= badge.shorts &&
      viewerStats.videosWatched >= badge.videos
    );
  };

  const getNextBadge = () => {
    return badges.find(badge =>
      viewerStats.shortsWatched < badge.shorts ||
      viewerStats.videosWatched < badge.videos
    );
  };

  const earnedBadges = getBadges();
  const nextBadge = getNextBadge();

  const monthlyLeaderboard = [
    {
      rank: 1,
      username: 'ShortsKing',
      shortsWatched: 12500000,
      videosWatched: 850000,
      reward: 'Render Event Ticket + #1 Badge + 1K Play Button',
      medal: '🥇'
    },
    {
      rank: 2,
      username: 'You',
      shortsWatched: 8750000,
      videosWatched: 620000,
      reward: 'Render Event Ticket + #2 Badge + 1K Play Button',
      medal: '🥈',
      isUser: true
    },
    {
      rank: 3,
      username: 'ViewMaster',
      shortsWatched: 6200000,
      videosWatched: 480000,
      reward: 'Render Event Ticket + #3 Badge + 1K Play Button',
      medal: '🥉'
    },
    {
      rank: 4,
      username: 'BingeWatcher',
      shortsWatched: 4100000,
      videosWatched: 320000,
      medal: '4️⃣'
    },
    {
      rank: 5,
      username: 'ContentLover',
      shortsWatched: 3200000,
      videosWatched: 250000,
      medal: '5️⃣'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Watch 100 shorts', completed: true, icon: '👣' },
    { name: 'Content Junkie', description: 'Watch 1 hour of content', completed: true, icon: '🎬' },
    { name: 'Weekend Warrior', description: 'Watch 10 hours in a weekend', completed: true, icon: '⚔️' },
    { name: 'Golden Touch', description: 'Unlock Golden Viewer badge', completed: true, icon: '✨' },
    { name: 'Movie Marathon', description: 'Watch 100 full videos', completed: true, icon: '🎥' },
    { name: 'Diamond Eyes', description: 'Unlock Diamond Viewer badge', completed: false, icon: '💎' },
    { name: 'Platinum Elite', description: 'Unlock Platinum Viewer badge', completed: false, icon: '👑' },
    { name: 'Top of Charts', description: 'Rank in monthly Top 3', completed: true, icon: '📈' }
  ];

  const rewards = [
    {
      id: 1,
      type: 'Render Event Ticket',
      description: 'VIP access to Render Creator Summit 2025',
      value: '$500',
      earned: viewerStats.monthlyRank <= 3,
      icon: '🎫'
    },
    {
      id: 2,
      type: 'Play Button (1K)',
      description: '1,000 subscriber equivalent play button',
      value: '$50',
      earned: viewerStats.monthlyRank <= 3,
      icon: '🏅'
    },
    {
      id: 3,
      type: 'Exclusive Badge',
      description: 'Display on profile & videos',
      value: 'Priceless',
      earned: earnedBadges.length > 0,
      icon: '🎖️'
    },
    {
      id: 4,
      type: 'Creator Collab Pass',
      description: 'Feature in creator collaboration video',
      value: '$200',
      earned: viewerStats.shortsWatched >= 5000000,
      icon: '🤝'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            🏆 Viewer Rewards
          </h1>
          <p className="text-xl text-gray-400">
            Watch content, earn badges, and unlock exclusive rewards
          </p>
        </div>

        {/* Earned Badges Section */}
        {earnedBadges.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-600/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Star className="text-yellow-600" size={28} />
              Your Badges 🎖️
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {earnedBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${badge.color} rounded-xl p-8 text-center transform hover:scale-105 transition`}
                >
                  <div className="text-6xl mb-4">{badge.icon}</div>
                  <h3 className="text-2xl font-black text-white mb-2">{badge.name}</h3>
                  <p className="text-sm text-white/90 mb-3">{badge.description}</p>
                  <div className="inline-block bg-black/30 rounded-full px-4 py-1">
                    <span className="text-xs font-bold text-white">{badge.rarity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shorts Progress */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="text-red-600" size={28} />
              <h3 className="text-2xl font-bold text-white">Shorts Watched</h3>
            </div>
            
            <p className="text-4xl font-black text-white mb-2">
              {formatNumber(viewerStats.shortsWatched)}
            </p>
            <p className="text-gray-400 text-sm mb-6">
              {nextBadge ? `${formatNumber(nextBadge.shorts - viewerStats.shortsWatched)} to next badge` : '✨ All badges unlocked!'}
            </p>

            <div className="space-y-3">
              {badges.map((badge, idx) => {
                const progress = Math.min((viewerStats.shortsWatched / badge.shorts) * 100, 100);
                const met = viewerStats.shortsWatched >= badge.shorts;

                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300 font-semibold">{badge.icon} {badge.name}</span>
                      <span className={`text-xs font-bold ${met ? 'text-green-600' : 'text-gray-500'}`}>
                        {met ? '✓' : `${Math.round(progress)}%`}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          met ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Videos Progress */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-blue-600" size={28} />
              <h3 className="text-2xl font-bold text-white">Videos Watched</h3>
            </div>

            <p className="text-4xl font-black text-white mb-2">
              {formatNumber(viewerStats.videosWatched)}
            </p>
            <p className="text-gray-400 text-sm mb-6">
              {nextBadge ? `${formatNumber(nextBadge.videos - viewerStats.videosWatched)} to next badge` : '✨ All badges unlocked!'}
            </p>

            <div className="space-y-3">
              {badges.map((badge, idx) => {
                const progress = Math.min((viewerStats.videosWatched / badge.videos) * 100, 100);
                const met = viewerStats.videosWatched >= badge.videos;

                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300 font-semibold">{badge.icon} {badge.name}</span>
                      <span className={`text-xs font-bold ${met ? 'text-green-600' : 'text-gray-500'}`}>
                        {met ? '✓' : `${Math.round(progress)}%`}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          met ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Monthly Leaderboard */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Crown className="text-yellow-600" size={28} />
            Monthly Top Viewers
          </h3>

          <div className="space-y-3">
            {monthlyLeaderboard.map((user, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg border-2 transition ${
                  user.isUser
                    ? 'bg-red-900/20 border-red-600/50'
                    : 'bg-neutral-800/50 border-neutral-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{user.medal}</span>
                    <div>
                      <h4 className="text-white font-bold text-lg">{user.username}</h4>
                      <p className="text-gray-400 text-sm">
                        {formatNumber(user.shortsWatched)} shorts • {formatNumber(user.videosWatched)} videos
                      </p>
                    </div>
                  </div>
                  {user.isUser && <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">YOU</span>}
                </div>

                {user.reward && (
                  <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-lg p-3 border border-yellow-600/30">
                    <p className="text-sm text-yellow-200">
                      <span className="font-bold">🎁 Reward:</span> {user.reward}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Gift className="text-red-600" size={28} />
              Available Rewards
            </h3>

            <div className="space-y-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={`p-4 rounded-lg border-2 transition ${
                    reward.earned
                      ? 'bg-green-900/20 border-green-600/50'
                      : 'bg-neutral-800/50 border-neutral-700/50 opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-2xl">{reward.icon}</span>
                      <h4 className="text-white font-bold mt-2">{reward.type}</h4>
                    </div>
                    {reward.earned && (
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✓ EARNED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{reward.description}</p>
                  <p className="text-gray-500 text-xs">Value: {reward.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="text-yellow-600" size={28} />
              Achievements
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg text-center transition ${
                    achievement.completed
                      ? 'bg-green-900/20 border border-green-600/50'
                      : 'bg-neutral-800/50 border border-neutral-700/50 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-white font-bold text-xs">{achievement.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{achievement.description}</p>
                  {achievement.completed && (
                    <p className="text-green-600 text-xs font-bold mt-2">✓ Completed</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Top 3 Rewards Detail */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-600/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Monthly Top 3 Rewards</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { rank: '#1', medal: '🥇', rewards: ['Render Event Ticket', '#1 Exclusive Badge', '1K Play Button', '$500 Value'] },
              { rank: '#2', medal: '🥈', rewards: ['Render Event Ticket', '#2 Exclusive Badge', '1K Play Button', '$500 Value'] },
              { rank: '#3', medal: '🥉', rewards: ['Render Event Ticket', '#3 Exclusive Badge', '1K Play Button', '$500 Value'] }
            ].map((place, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/70 border border-neutral-700 rounded-lg p-6 text-center hover:border-red-600/50 transition"
              >
                <div className="text-5xl mb-3">{place.medal}</div>
                <h4 className="text-2xl font-black text-white mb-4">{place.rank}</h4>
                <div className="space-y-2">
                  {place.rewards.map((reward, i) => (
                    <div key={i} className="text-sm text-gray-300">
                      ✓ {reward}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Member Since</p>
            <p className="text-2xl font-black text-white">Jan 15, 2024</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Badges Earned</p>
            <p className="text-2xl font-black text-white">{earnedBadges.length}/3</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Monthly Rank</p>
            <p className="text-2xl font-black text-yellow-600">#{viewerStats.monthlyRank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerRewards;
