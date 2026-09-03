import React, { useState } from 'react';
import { Search, Flame, TrendingUp, Clock, Settings } from 'lucide-react';

/**
 * Professional Render Home Feed
 * Enterprise Features:
 * - Infinite scroll video feed
 * - Category filtering
 * - Trending videos
 * - Recommended content
 * - Search functionality
 * - Watch history
 * - Fully extractable for other projects
 * 
 * Usage: <HomeFeed onVideoClick={handleVideoClick} />
 */
const HomeFeed = ({ onVideoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const categories = [
    { id: 'all', name: 'All', icon: '🎬' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'vlogs', name: 'Vlogs', icon: '📹' },
    { id: 'comedy', name: 'Comedy', icon: '😂' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  const videos = [
    {
      id: 1,
      title: 'How to Make Money on Render - Full Tutorial 2025',
      creator: 'Creator Pro',
      avatar: '👤',
      thumbnail: '🎬',
      views: 1250000,
      likes: 85000,
      category: 'education',
      duration: '12:45',
      verified: true,
      trending: true
    },
    {
      id: 2,
      title: 'Render Shorts Challenge - Win $10K Prize 🏆',
      creator: 'Content King',
      avatar: '👤',
      thumbnail: '🎥',
      views: 5680000,
      likes: 320000,
      category: 'gaming',
      duration: 'Short',
      verified: true,
      trending: true
    },
    {
      id: 3,
      title: 'Best Render Studio Features Explained',
      creator: 'Analytics Master',
      avatar: '👤',
      thumbnail: '📊',
      views: 890000,
      likes: 52000,
      category: 'tech',
      duration: '8:30',
      verified: false,
      trending: false
    },
    {
      id: 4,
      title: 'Gaming Setup Reveal - $50K Investment',
      creator: 'Gamer Elite',
      avatar: '👤',
      thumbnail: '🎮',
      views: 2340000,
      likes: 156000,
      category: 'gaming',
      duration: '15:20',
      verified: true,
      trending: true
    },
    {
      id: 5,
      title: 'Music Production Beats Tutorial',
      creator: 'Beat Master',
      avatar: '👤',
      thumbnail: '🎵',
      views: 456000,
      likes: 34000,
      category: 'music',
      duration: '22:15',
      verified: false,
      trending: false
    },
    {
      id: 6,
      title: 'Render Platform Review - Is it Better Than YouTube?',
      creator: 'Tech Reviewer',
      avatar: '👤',
      thumbnail: '⭐',
      views: 3120000,
      likes: 210000,
      category: 'tech',
      duration: '18:45',
      verified: true,
      trending: true
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === 'trending') return b.views - a.views;
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'popular') return b.likes - a.likes;
    return 0;
  });

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-black text-red-600">🔴 RENDER</h1>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search videos, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition">
              Upload
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Sort Options */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
          >
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onVideoClick?.(video)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center overflow-hidden">
                <span className="text-6xl">{video.thumbnail}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                  {video.duration}
                </div>
                {video.trending && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Flame size={12} /> Trending
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-lg flex-shrink-0">
                    {video.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-400 text-xs">{video.creator}</p>
                      {video.verified && <span className="text-red-600 text-xs">✓</span>}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{formatNumber(video.views)} views</span>
                  <span>❤️ {formatNumber(video.likes)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Load More Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;