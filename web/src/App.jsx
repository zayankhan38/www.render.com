import React, { useState } from 'react';
import { Home, Flame, Upload, Zap, User, LogOut } from 'lucide-react';
import AIAssistant from './components/AIAssistant';
import VideoUpload from './components/VideoUpload';
import ShortsPlayer from './components/ShortsPlayer';
import MonetizationDashboard from './components/MonetizationDashboard';
import ViewerRewards from './components/ViewerRewards';
import RenderStudio from './components/RenderStudio';
import HomeFeed from './components/HomeFeed';
import Profile from './components/Profile';
import { useAppStore } from './store/appStore';

/**
 * Render - Complete App Router
 * Main entry point with all pages
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, logout } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeFeed onVideoClick={() => setCurrentPage('home')} />;
      case 'shorts':
        return <ShortsPlayer />;
      case 'upload':
        return <VideoUpload />;
      case 'monetization':
        return <MonetizationDashboard userId={user.id} />;
      case 'rewards':
        return <ViewerRewards userId={user.id} />;
      case 'studio':
        return <RenderStudio userId={user.id} />;
      case 'profile':
        return <Profile userId={user.id} isOwnProfile={true} />;
      default:
        return <HomeFeed />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 flex flex-col">
        <h1 className="text-3xl font-black text-red-600 mb-8">🔴 RENDER</h1>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'shorts', label: 'Shorts', icon: Flame },
            { id: 'upload', label: 'Upload', icon: Upload },
            { id: 'studio', label: 'Studio', icon: Zap },
            { id: 'monetization', label: 'Earnings', icon: '💰' },
            { id: 'rewards', label: 'Rewards', icon: '🏆' },
            { id: 'profile', label: 'Profile', icon: User }
          ].map((item) => {
            const Icon = typeof item.icon === 'string' ? null : item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                  currentPage === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:bg-neutral-800'
                }`}
              >
                {Icon ? <Icon size={20} /> : <span className="text-xl">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            setCurrentPage('home');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-400 hover:bg-neutral-800 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderPage()}
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}

export default App;