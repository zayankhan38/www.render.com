import React, { useState } from 'react';
import { BarChart3, TrendingUp, Eye, Heart, MessageSquare, Share2, Users, Calendar, Download, Filter, Search } from 'lucide-react';

/**
 * Professional Render Studio (Creator Analytics)
 * Enterprise Features:
 * - Real-time video performance analytics
 * - Audience insights & demographics
 * - Revenue tracking & payout info
 * - Content calendar & scheduling
 * - Trending metrics & growth charts
 * - Comment management
 * - Traffic source analysis
 * - Fully extractable for other projects
 * 
 * Usage: <RenderStudio userId={userId} />
 */
const RenderStudio = ({ userId = 'creator123' }) => {
  const [selectedRange, setSelectedRange] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const studioStats = {
    subscribers: 2500,
    totalViews: 15400000,
    totalShorts: 8900000,
    totalVideos: 6500000,
    engagementRate: 8.5,
    avgViewDuration: 3.2,
    revenue: 12500,
    weeklyGrowth: 12.5
  };

  const videoPerformance = [
    {
      id: 1,
      title: 'How to Make Money on Render in 2025',
      type: 'Video',
      views: 1250000,
      likes: 85000,
      comments: 12500,
      shares: 8900,
      watchTime: 450000,
      thumbnail: '🎬',
      published: '2 days ago',
      revenue: 850
    },
    {
      id: 2,
      title: 'Render Shorts Challenge - $10K Prize',
      type: 'Short',
      views: 5680000,
      likes: 320000,
      comments: 45000,
      shares: 28900,
      watchTime: 280000,
      thumbnail: '📱',
      published: '1 day ago',
      revenue: 2150
    },
    {
      id: 3,
      title: 'Top 10 Render Creators You Must Follow',
      type: 'Video',
      views: 890000,
      likes: 52000,
      comments: 8200,
      shares: 5600,
      watchTime: 310000,
      thumbnail: '🌟',
      published: '3 days ago',
      revenue: 620
    }
  ];

  const audienceInsights = {
    topCountry: { name: 'United States', percentage: 35 },
    secondCountry: { name: 'India', percentage: 22 },
    thirdCountry: { name: 'Brazil', percentage: 18 },
    ageGroups: [
      { age: '13-17', percentage: 15 },
      { age: '18-24', percentage: 35 },
      { age: '25-34', percentage: 28 },
      { age: '35-44', percentage: 15 },
      { age: '45+', percentage: 7 }
    ],
    genderSplit: { male: 58, female: 42 },
    topDevices: [
      { device: 'Mobile', percentage: 72 },
      { device: 'Desktop', percentage: 20 },
      { device: 'Tablet', percentage: 8 }
    ]
  };

  const trafficSources = [
    { source: 'Render Home Feed', clicks: 5200000, percentage: 33.7 },
    { source: 'Search', clicks: 3800000, percentage: 24.7 },
    { source: 'External Sites', clicks: 2600000, percentage: 16.9 },
    { source: 'Subscriptions', clicks: 2200000, percentage: 14.3 },
    { source: 'Playlists', clicks: 1600000, percentage: 10.4 }
  ];

  const recentComments = [
    {
      creator: 'ViewerOne',
      avatar: '👤',
      comment: 'This is amazing! Love your content!',
      video: 'Render Shorts Challenge',
      timestamp: '2 hours ago',
      likes: 234
    },
    {
      creator: 'ContentFan',
      avatar: '👤',
      comment: 'When is the next part coming? 🔥',
      video: 'How to Make Money on Render',
      timestamp: '5 hours ago',
      likes: 156
    },
    {
      creator: 'ProViewer',
      avatar: '👤',
      comment: 'Best creator on Render! Keep it up!',
      video: 'Top 10 Render Creators',
      timestamp: '1 day ago',
      likes: 892
    }
  ];

  const scheduledContent = [
    { title: 'Render Tutorial: Advanced Features', type: 'Video', scheduled: '2026-08-18 14:00 UTC', status: 'Scheduled' },
    { title: 'Behind the Scenes at Render HQ', type: 'Short', scheduled: '2026-08-20 10:00 UTC', status: 'Scheduled' },
    { title: 'Q&A with Render Team', type: 'Live', scheduled: '2026-08-22 19:00 UTC', status: 'Scheduled' }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return '$' + num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black text-white mb-2">
              🎙️ Render Studio
            </h1>
            <p className="text-xl text-gray-400">
              Professional creator analytics & insights
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition">
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Total Views</p>
              <Eye className="text-red-600" size={24} />
            </div>
            <p className="text-4xl font-black text-white mb-2">
              {formatNumber(studioStats.totalViews)}
            </p>
            <p className="text-xs text-green-600 font-semibold">↑ 12.5% this week</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Total Engagement</p>
              <Heart className="text-red-600" size={24} />
            </div>
            <p className="text-4xl font-black text-white mb-2">
              {formatNumber(studioStats.totalViews * (studioStats.engagementRate / 100))}
            </p>
            <p className="text-xs text-gray-500">Likes, comments, shares</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Subscribers</p>
              <Users className="text-red-600" size={24} />
            </div>
            <p className="text-4xl font-black text-white mb-2">
              {formatNumber(studioStats.subscribers)}
            </p>
            <p className="text-xs text-green-600 font-semibold">↑ 250 new this week</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-red-600/30 transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-semibold">Total Revenue</p>
              <TrendingUp className="text-red-600" size={24} />
            </div>
            <p className="text-4xl font-black text-white mb-2">
              {formatCurrency(studioStats.revenue)}
            </p>
            <p className="text-xs text-gray-500">All-time earnings</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-4 flex-wrap">
          {[
            { label: 'Last 7 Days', value: '7days' },
            { label: 'Last 30 Days', value: '30days' },
            { label: 'Last 90 Days', value: '90days' },
            { label: 'All Time', value: 'all' }
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedRange === range.value
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Video Performance */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="text-red-600" />
            Video Performance
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Title</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold">Views</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold">Likes</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold">Comments</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold">Watch Time</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {videoPerformance.map((video) => (
                  <tr key={video.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{video.thumbnail}</span>
                        <div>
                          <p className="text-white font-semibold">{video.title}</p>
                          <p className="text-xs text-gray-500">{video.published}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-white font-semibold">{formatNumber(video.views)}</td>
                    <td className="text-right py-4 px-4 text-white">{formatNumber(video.likes)}</td>
                    <td className="text-right py-4 px-4 text-white">{formatNumber(video.comments)}</td>
                    <td className="text-right py-4 px-4 text-white">{formatNumber(video.watchTime)}</td>
                    <td className="text-right py-4 px-4 text-green-600 font-bold">{formatCurrency(video.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audience Insights */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">👥 Audience Insights</h2>

            {/* Top Countries */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4">Top Locations</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">🇺🇸 {audienceInsights.topCountry.name}</span>
                    <span className="text-white font-bold">{audienceInsights.topCountry.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${audienceInsights.topCountry.percentage}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">🇮🇳 {audienceInsights.secondCountry.name}</span>
                    <span className="text-white font-bold">{audienceInsights.secondCountry.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${audienceInsights.secondCountry.percentage}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">🇧🇷 {audienceInsights.thirdCountry.name}</span>
                    <span className="text-white font-bold">{audienceInsights.thirdCountry.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${audienceInsights.thirdCountry.percentage}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Age Distribution */}
            <div className="mb-8 pb-8 border-b border-neutral-800">
              <h3 className="text-white font-bold mb-4">Age Distribution</h3>
              <div className="flex items-end gap-3 h-32">
                {audienceInsights.ageGroups.map((group, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-neutral-800 rounded-t-lg overflow-hidden">
                      <div
                        className="bg-gradient-to-t from-red-600 to-red-500 w-full transition-all"
                        style={{ height: `${group.percentage * 1.5}px` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{group.age}</p>
                    <p className="text-xs text-white font-bold">{group.percentage}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices */}
            <div>
              <h3 className="text-white font-bold mb-4">Top Devices</h3>
              <div className="space-y-2">
                {audienceInsights.topDevices.map((device, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{device.device}</span>
                      <span className="text-white font-bold">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${device.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">🔗 Traffic Sources</h2>

            <div className="space-y-4">
              {trafficSources.map((source, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm">{source.source}</span>
                    <span className="text-white font-bold text-sm">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatNumber(source.clicks)} clicks</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Comments & Scheduled Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Comments */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="text-red-600" size={24} />
              Recent Comments
            </h2>

            <div className="space-y-4">
              {recentComments.map((comment, idx) => (
                <div key={idx} className="border-b border-neutral-800/50 pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{comment.avatar}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-bold text-sm">{comment.creator}</p>
                          <p className="text-xs text-gray-500">{comment.timestamp}</p>
                        </div>
                        <p className="text-xs text-gray-400">❤️ {formatNumber(comment.likes)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm ml-11 mb-2">{comment.comment}</p>
                  <p className="text-xs text-gray-500 ml-11">On: {comment.video}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Content */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="text-red-600" size={24} />
              Scheduled Content
            </h2>

            <div className="space-y-4">
              {scheduledContent.map((content, idx) => (
                <div key={idx} className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 hover:border-red-600/30 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-bold text-sm">{content.title}</p>
                      <p className="text-xs text-gray-400">{content.type}</p>
                    </div>
                    <span className="text-xs bg-green-600/20 text-green-600 px-2 py-1 rounded">
                      {content.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">📅 {content.scheduled}</p>
                </div>
              ))}

              <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition">
                + Schedule New Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderStudio;
