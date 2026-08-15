import React, { useState } from 'react';
import { Play, Bell, Share2, Award, Calendar, Eye, Zap, Heart } from 'lucide-react';

const profileData = {
  name: 'TechVision',
  handle: '@techvision',
  avatar: 'TV',
  banner: 'https://images.pexels.com/photos/32141312/pexels-photo-32141312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bio: 'Bringing you the latest tech reviews, unboxings, and gadget comparisons. Original content creator on Render.',
  joinedDate: 'Jan 2024',
  subscribers: 2500,
  totalViews: 15400000,
  totalVideos: 87,
  isVerified: true,
  playButton: 'Wood',
};

const tabs = ['Videos', 'Shorts', 'About'];

const profileVideos = [
  {
    id: 1,
    title: 'The Ultimate Smartphone Review — 2026 Edition',
    views: 1250000,
    uploaded: '2 days ago',
    duration: '14:32',
    thumbnail: 'https://images.pexels.com/photos/32141312/pexels-photo-32141312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 2,
    title: 'Unboxing the Newest Wireless Earbuds',
    views: 450000,
    uploaded: '6 hours ago',
    duration: '6:22',
    thumbnail: 'https://images.pexels.com/photos/25809275/pexels-photo-25809275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 3,
    title: 'New Phone Unboxing — Is It Worth It?',
    views: 610000,
    uploaded: '12 hours ago',
    duration: '9:55',
    thumbnail: 'https://images.pexels.com/photos/12712506/pexels-photo-12712506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 4,
    title: 'Smartphone in the Kitchen — Tech Lifestyle',
    views: 340000,
    uploaded: '5 days ago',
    duration: '11:08',
    thumbnail: 'https://images.pexels.com/photos/31918446/pexels-photo-31918446.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

const formatViews = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Videos');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Banner */}
      <div className="relative h-32 sm:h-48 lg:h-64 bg-neutral-900">
        <img
          src={profileData.banner}
          alt="Channel banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* Channel header */}
      <div className="px-4 lg:px-6 -mt-8 sm:-mt-12 relative">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-render-red border-4 border-neutral-950 flex items-center justify-center text-white text-2xl sm:text-4xl font-black flex-shrink-0">
            {profileData.avatar}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-white text-2xl sm:text-3xl font-black">{profileData.name}</h1>
              {profileData.isVerified && (
                <span className="bg-render-red text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Verified
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">{profileData.handle}</p>
            <p className="text-gray-500 text-sm">
              {formatViews(profileData.subscribers)} subscribers • {profileData.totalVideos} videos
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSubscribed(!subscribed)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 ${
                subscribed
                  ? 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              <Bell size={16} />
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-full transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 lg:px-6 mt-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <Eye className="text-render-red mx-auto mb-2" size={20} />
          <p className="text-white text-xl font-bold">{formatViews(profileData.totalViews)}</p>
          <p className="text-gray-500 text-xs">Total Views</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <Calendar className="text-render-red mx-auto mb-2" size={20} />
          <p className="text-white text-xl font-bold">{profileData.joinedDate}</p>
          <p className="text-gray-500 text-xs">Joined</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <Award className="text-render-red mx-auto mb-2" size={20} />
          <p className="text-white text-xl font-bold">{profileData.playButton}</p>
          <p className="text-gray-500 text-xs">Play Button</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <Zap className="text-render-red mx-auto mb-2" size={20} />
          <p className="text-white text-xl font-bold">{profileData.totalVideos}</p>
          <p className="text-gray-500 text-xs">Videos</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-800 mt-6 px-4 lg:px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-white border-render-red'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4 lg:p-6">
        {activeTab === 'Videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {profileVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-render-red/90 rounded-full p-3">
                      <Play className="text-white" size={24} fill="white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    {video.duration}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug mt-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {formatViews(video.views)} views • {video.uploaded}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Shorts' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900">
                  <img
                    src={profileVideos[i - 1]?.thumbnail}
                    alt={`Short ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs font-bold">Short #{i}</p>
                    <div className="flex items-center gap-1 text-gray-300 text-xs mt-1">
                      <Heart size={12} fill="currentColor" />
                      {formatViews(100000 * i)} likes
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'About' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{profileData.bio}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <h4 className="text-gray-400 text-xs font-semibold uppercase mb-2">Subscribers</h4>
                <p className="text-white text-2xl font-black">{formatViews(profileData.subscribers)}</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <h4 className="text-gray-400 text-xs font-semibold uppercase mb-2">Total Views</h4>
                <p className="text-white text-2xl font-black">{formatViews(profileData.totalViews)}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-600/20 to-red-900/10 border border-red-600/30 rounded-xl p-5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Award className="text-render-red" size={20} />
                Play Button: {profileData.playButton}
              </h4>
              <p className="text-gray-300 text-sm">
                Earned the {profileData.playButton} Play Button for reaching 1,000 subscribers.
                Next milestone: Bronze at 10,000 subscribers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
