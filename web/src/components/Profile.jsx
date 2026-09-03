import React, { useState } from 'react';
import { Edit2, Share2, Bell, Settings, MoreVertical, Users, Eye, Heart } from 'lucide-react';

/**
 * Professional Render User Profile
 * Enterprise Features:
 * - Creator profile display
 * - Statistics dashboard
 * - Video gallery
 * - Subscriber management
 * - Social links
 * - Fully extractable for other projects
 * 
 * Usage: <Profile userId={userId} isOwnProfile={true} />
 */
const Profile = ({ userId = 'user123', isOwnProfile = true }) => {
  const [activeTab, setActiveTab] = useState('videos');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const profileData = {
    username: 'CreatorPro',
    displayName: 'Creator Pro - Content Master',
    bio: 'Making awesome content on Render | Monetization Expert | Tech & Gaming',
    avatar: '👤',
    banner: '🎬',
    subscribers: 2500,
    totalViews: 15400000,
    videos: 156,
    verified: true,
    joinDate: 'Jan 15, 2024',
    website: 'www.creatorpro.com',
    location: 'San Francisco, CA',
    renderStudioLink: 'render.studio/creatorpro'
  };

  const socialStats = [
    { label: 'Subscribers', value: '2.5K', icon: '👥' },
    { label: 'Total Views', value: '15.4M', icon: '👁️' },
    { label: 'Videos', value: '156', icon: '🎬' },
    { label: 'Engagement', value: '8.5%', icon: '❤️' }
  ];

  const creatorVideos = [
    { id: 1, title: 'How to Make Money on Render', views: '1.2M', thumbnail: '🎬' },
    { id: 2, title: 'Render Shorts Challenge $10K', views: '5.6M', thumbnail: '🎥' },
    { id: 3, title: 'Render Studio Tutorial', views: '890K', thumbnail: '📊' },
    { id: 4, title: 'Gaming Setup Reveal', views: '2.3M', thumbnail: '🎮' },
    { id: 5, title: 'Music Production Guide', views: '456K', thumbnail: '🎵' },
    { id: 6, title: 'Platform Review', views: '3.1M', thumbnail: '⭐' }
  ];

  const playlists = [
    { id: 1, name: 'Best of Render', videos: 24 },
    { id: 2, name: 'Tutorials', videos: 18 },
    { id: 3, name: 'Gaming Highlights', videos: 42 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
      {/* Header Bar */}
      <div className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-red-600">🔴 RENDER</h1>
        <button className="bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-full transition">
          <Settings size={20} />
        </button>
      </div>

      {/* Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-red-600/20 to-purple-600/20 border-b border-neutral-800 flex items-center justify-center text-6xl">
        {profileData.banner}
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-6xl border-4 border-neutral-900 -mt-16">
              {profileData.avatar}
            </div>

            {/* Profile Details */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-black text-white">{profileData.displayName}</h1>
                {profileData.verified && <span className="text-red-600 text-2xl">✓</span>}
              </div>
              <p className="text-gray-400 mb-4">@{profileData.username}</p>
              <p className="text-gray-300 text-sm mb-4 max-w-2xl">{profileData.bio}</p>
              
              {/* Meta Info */}
              <div className="flex gap-4 text-sm text-gray-400 mb-4">
                <span>📍 {profileData.location}</span>
                <span>🌐 {profileData.website}</span>
                <span>📅 Joined {profileData.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isOwnProfile ? (
              <>
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition font-semibold">
                  <Edit2 size={18} />
                  Edit Profile
                </button>
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg transition">
                  <MoreVertical size={20} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                    isSubscribed
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isSubscribed ? '✓ Subscribed' : 'Subscribe'}
                </button>
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg transition">
                  <Bell size={20} />
                </button>
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg transition">
                  <Share2 size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {socialStats.map((stat, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-center hover:border-red-600/30 transition">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-800 mb-8">
          {[
            { id: 'videos', label: 'Videos', icon: '🎬' },
            { id: 'playlists', label: 'Playlists', icon: '📋' },
            { id: 'about', label: 'About', icon: 'ℹ️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === tab.id
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorVideos.map((video) => (
              <div
                key={video.id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-red-600/50 transition cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center text-5xl group-hover:scale-110 transition">
                  {video.thumbnail}
                </div>
                <div className="p-3">
                  <p className="text-white font-semibold text-sm line-clamp-2">{video.title}</p>
                  <p className="text-gray-400 text-xs mt-1">👁️ {video.views}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="space-y-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-red-600/50 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📋</div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{playlist.name}</h3>
                      <p className="text-gray-400 text-sm">{playlist.videos} videos</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-lg mb-4">About Creator</h3>
              <p className="text-gray-300 mb-4">{profileData.bio}</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 Contact: contact@creatorpro.com</p>
                <p>🔗 Render Studio: {profileData.renderStudioLink}</p>
                <p>💼 Business: Available for collaborations</p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-lg mb-4">Monetization Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-600 font-bold">✓ Monetized</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Play Button</span>
                  <span className="text-white font-bold">🏆 Diamond</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Payout</span>
                  <span className="text-green-600 font-bold">90%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;