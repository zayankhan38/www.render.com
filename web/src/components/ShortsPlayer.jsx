import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Heart, MessageCircle, Share2, Volume2, VolumeX, Repeat2, MoveVertical as MoreVertical } from 'lucide-react';

/**
 * Professional TikTok-Style Shorts Player
 * Enterprise Features:
 * - Infinite loop system (swipe/click navigation)
 * - Real-time engagement (likes, comments, shares)
 * - Audio control & loop toggle
 * - Smooth animations
 * - Professional UI with red accent
 * - Fully extractable for other projects
 * 
 * Usage: <ShortsPlayer shorts={shortsArray} onEngagement={handleEngagement} />
 */
const ShortsPlayer = ({ shorts = [], onEngagement }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [likes, setLikes] = useState({});
  const [userLiked, setUserLiked] = useState({});
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  // Default shorts data if not provided
  const defaultShorts = [
    {
      id: 1,
      creator: 'Creator One',
      title: 'Amazing Short #1',
      description: 'Check out this awesome content!',
      views: 1500000,
      likes: 245000,
      comments: 12500,
      shares: 8900,
      avatar: 'C1',
      verified: true
    },
    {
      id: 2,
      creator: 'Creator Two',
      title: 'Mind Blowing Short #2',
      description: 'You won\'t believe this!',
      views: 2100000,
      likes: 356000,
      comments: 18900,
      shares: 12300,
      avatar: 'C2',
      verified: true
    },
    {
      id: 3,
      creator: 'Creator Three',
      title: 'Epic Content #3',
      description: 'This is insane!',
      views: 980000,
      likes: 175000,
      comments: 9200,
      shares: 6400,
      avatar: 'C3',
      verified: false
    }
  ];

  const shortsData = shorts.length > 0 ? shorts : defaultShorts;
  const short = shortsData[currentIndex % shortsData.length];

  // Initialize likes
  useEffect(() => {
    if (!likes[short.id]) {
      setLikes(prev => ({
        ...prev,
        [short.id]: short.likes || 0
      }));
    }
  }, [short.id]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % shortsData.length);
    setVideoTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + shortsData.length) % shortsData.length);
    setVideoTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleLike = () => {
    setUserLiked(prev => ({
      ...prev,
      [short.id]: !prev[short.id]
    }));
    setLikes(prev => ({
      ...prev,
      [short.id]: prev[short.id] + (userLiked[short.id] ? -1 : 1)
    }));

    if (onEngagement) {
      onEngagement({
        type: 'like',
        shortId: short.id,
        liked: !userLiked[short.id]
      });
    }
  };

  const handleShare = () => {
    if (onEngagement) {
      onEngagement({
        type: 'share',
        shortId: short.id
      });
    }
    alert(`Share: ${short.title}`);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <div className="relative w-full max-w-sm h-screen bg-neutral-950 flex flex-col">
        {/* Video Container */}
        <div className="flex-1 bg-black relative group overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black flex items-center justify-center relative">
            <video
              ref={videoRef}
              loop={isLooping}
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover"
              autoPlay
            />

            {/* Gradient Overlay (for readability) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-6xl mb-4">🎬</p>
                <p className="text-white text-lg font-bold">{short.title}</p>
                <p className="text-gray-400 text-sm mt-1">Tap play to preview</p>
              </div>
            </div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-red-600/80 hover:bg-red-700 text-white p-3 rounded-full transition transform hover:scale-110"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-3 rounded-full transition transform hover:scale-110 text-white ${
                isLooping ? 'bg-red-600/80 hover:bg-red-700' : 'bg-neutral-800/80 hover:bg-neutral-700'
              }`}
              title="Toggle Loop"
            >
              <Repeat2 size={20} />
            </button>
          </div>

          {/* TikTok Loop Badge */}
          {isLooping && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold loop-badge animate-pulse z-10">
              🔄 LOOP ON
            </div>
          )}

          {/* Video Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800/50 z-10">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all"
              style={{ width: `${(videoTime / videoDuration) * 100 || 0}%` }}
            />
          </div>

          {/* Time Display */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded text-opacity-80 z-10">
            {formatTime(videoTime)} / {formatTime(videoDuration)}
          </div>
        </div>

        {/* Creator Info Section */}
        <div className="bg-gradient-to-t from-black/90 to-transparent p-4 absolute bottom-24 left-0 right-0 z-20">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border-2 border-red-600 bg-render-red flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {short.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">{short.creator}</h3>
                {short.verified && (
                  <span className="text-red-600 text-xs">✓</span>
                )}
              </div>
              <p className="text-gray-300 text-xs truncate">{short.title}</p>
            </div>
            <button className="text-red-600 hover:text-red-500 transition">
              <MoreVertical size={18} />
            </button>
          </div>

          <p className="text-gray-300 text-xs line-clamp-2">{short.description}</p>
        </div>

        {/* Video Stats Section */}
        <div className="bg-gradient-to-t from-black to-black/70 p-4 text-white text-xs space-y-1 border-t border-neutral-800">
          <div className="flex justify-between text-gray-400">
            <span>{formatNumber(short.views)} views</span>
            <span>{formatNumber(short.comments)} comments</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>{formatNumber(likes[short.id] || 0)} likes</span>
            <span>{formatNumber(short.shares)} shares</span>
          </div>
        </div>

        {/* Right Side Action Buttons */}
        <div className="absolute right-3 bottom-32 flex flex-col gap-6 items-center z-20">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 text-white hover:text-red-600 transition transform hover:scale-110 group"
          >
            <div className={`p-3 rounded-full transition ${
              userLiked[short.id]
                ? 'bg-red-600/20'
                : 'bg-neutral-800/50 group-hover:bg-red-600/20'
            }`}>
              <Heart
                className="w-6 h-6"
                fill={userLiked[short.id] ? 'currentColor' : 'none'}
                color={userLiked[short.id] ? '#ef4444' : 'currentColor'}
              />
            </div>
            <span className="text-xs font-semibold">{formatNumber(likes[short.id] || 0)}</span>
          </button>

          {/* Comment Button */}
          <button className="flex flex-col items-center gap-1 text-white hover:text-red-600 transition transform hover:scale-110 group">
            <div className="p-3 rounded-full bg-neutral-800/50 group-hover:bg-red-600/20 transition">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">{formatNumber(short.comments)}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 text-white hover:text-red-600 transition transform hover:scale-110 group"
          >
            <div className="p-3 rounded-full bg-neutral-800/50 group-hover:bg-red-600/20 transition">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">Share</span>
          </button>

          {/* Subscribe Button */}
          <button className="flex flex-col items-center gap-1 text-white hover:text-red-600 transition transform hover:scale-110 group">
            <div className="p-3 rounded-full bg-red-600/20 border-2 border-red-600 group-hover:bg-red-600 transition">
              <span className="text-lg">+</span>
            </div>
            <span className="text-xs font-semibold">Subscribe</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex gap-4 z-20">
          <button
            onClick={handlePrev}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition transform hover:scale-110 shadow-lg"
            title="Previous short"
          >
            <ChevronUp size={28} />
          </button>
          <div className="flex items-center gap-2 bg-neutral-900/80 px-4 py-2 rounded-full text-white text-xs font-semibold">
            <span className="text-red-600">{currentIndex + 1}</span>
            <span className="text-gray-400">/</span>
            <span>{shortsData.length}</span>
          </div>
          <button
            onClick={handleNext}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition transform hover:scale-110 shadow-lg"
            title="Next short"
          >
            <ChevronDown size={28} />
          </button>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xs text-center opacity-50 pointer-events-none">
          👆 Swipe or use buttons
        </div>
      </div>
    </div>
  );
};

export default ShortsPlayer;
