import React, { useState } from 'react';
import { Play, Clock, Zap } from 'lucide-react';

const categories = ['All', 'Technology', 'Gaming', 'Cooking', 'Travel', 'Music', 'Live'];

const videos = [
  {
    id: 1,
    title: 'The Ultimate Smartphone Review — 2026 Edition',
    creator: 'TechVision',
    avatar: 'TV',
    views: 1250000,
    uploaded: '2 days ago',
    duration: '14:32',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/32141312/pexels-photo-32141312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 2,
    title: 'Insane Gaming Room Setup Tour — Neon Edition',
    creator: 'GameZone',
    avatar: 'GZ',
    views: 5680000,
    uploaded: '1 day ago',
    duration: '8:45',
    category: 'Gaming',
    thumbnail: 'https://images.pexels.com/photos/9072216/pexels-photo-9072216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 3,
    title: 'Professional Chef Shows 5 Knife Skills You Need',
    creator: 'KitchenPro',
    avatar: 'KP',
    views: 890000,
    uploaded: '3 days ago',
    duration: '12:18',
    category: 'Cooking',
    thumbnail: 'https://images.pexels.com/photos/13422410/pexels-photo-13422410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 4,
    title: 'Solo Mountain Trek — Breathtaking Valley Views',
    creator: 'Wanderlust',
    avatar: 'WL',
    views: 2100000,
    uploaded: '5 days ago',
    duration: '22:05',
    category: 'Travel',
    thumbnail: 'https://images.pexels.com/photos/6836495/pexels-photo-6836495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 5,
    title: 'Unboxing the Newest Wireless Earbuds',
    creator: 'TechVision',
    avatar: 'TV',
    views: 450000,
    uploaded: '6 hours ago',
    duration: '6:22',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/25809275/pexels-photo-25809275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 6,
    title: 'RGB Keyboard Battle — Which One Wins?',
    creator: 'GameZone',
    avatar: 'GZ',
    views: 3200000,
    uploaded: '4 days ago',
    duration: '10:33',
    category: 'Gaming',
    thumbnail: 'https://images.pexels.com/photos/7858742/pexels-photo-7858742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 7,
    title: 'Homemade Pasta From Scratch — Simple Recipe',
    creator: 'KitchenPro',
    avatar: 'KP',
    views: 720000,
    uploaded: '1 week ago',
    duration: '18:47',
    category: 'Cooking',
    thumbnail: 'https://images.pexels.com/photos/6287244/pexels-photo-6287244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 8,
    title: 'Sunrise Hike on the Misty Mountain Peak',
    creator: 'Wanderlust',
    avatar: 'WL',
    views: 1800000,
    uploaded: '3 days ago',
    duration: '15:12',
    category: 'Travel',
    thumbnail: 'https://images.pexels.com/photos/30784209/pexels-photo-30784209.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 9,
    title: 'New Phone Unboxing — Is It Worth It?',
    creator: 'TechVision',
    avatar: 'TV',
    views: 610000,
    uploaded: '12 hours ago',
    duration: '9:55',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/12712506/pexels-photo-12712506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 10,
    title: 'Female Gamer Setup — High-Tech Desk Tour',
    creator: 'GameZone',
    avatar: 'GZ',
    views: 2400000,
    uploaded: '2 days ago',
    duration: '7:30',
    category: 'Gaming',
    thumbnail: 'https://images.pexels.com/photos/28993069/pexels-photo-28993069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 11,
    title: 'Home Kitchen Cooking with Pro Lighting',
    creator: 'KitchenPro',
    avatar: 'KP',
    views: 340000,
    uploaded: '8 hours ago',
    duration: '16:40',
    category: 'Cooking',
    thumbnail: 'https://images.pexels.com/photos/19148133/pexels-photo-19148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 12,
    title: 'Backpacker Adventure — Scenic Winter View',
    creator: 'Wanderlust',
    avatar: 'WL',
    views: 980000,
    uploaded: '1 week ago',
    duration: '19:28',
    category: 'Travel',
    thumbnail: 'https://images.pexels.com/photos/5864358/pexels-photo-5864358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

const formatViews = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

function VideoCard({ video }) {
  return (
    <div className="group cursor-pointer">
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

      <div className="flex gap-3 mt-3">
        <div className="w-9 h-9 rounded-full bg-render-red flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
          {video.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">{video.creator}</p>
          <p className="text-gray-500 text-xs">
            {formatViews(video.views)} views • {video.uploaded}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomeFeed() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  return (
    <div className="p-4 lg:p-6">
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-white text-black'
                : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured banner */}
      <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[21/9] bg-neutral-900">
        <img
          src="https://images.pexels.com/photos/31918446/pexels-photo-31918446.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Featured"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-flex items-center gap-1 bg-render-red text-white text-xs font-bold px-2 py-1 rounded mb-3">
            <Zap size={12} fill="white" /> FEATURED
          </span>
          <h2 className="text-white text-2xl lg:text-3xl font-black mb-2 max-w-lg">
            Discover amazing content from creators worldwide
          </h2>
          <p className="text-gray-300 text-sm max-w-md">
            Original videos only — protected by AI copyright detection
          </p>
        </div>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
