import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Hop as Home, Zap, Upload, ChartBar as BarChart3, User, Wallet, Trophy, Menu, Search, X } from 'lucide-react';
import HomeFeed from './components/HomeFeed.jsx';
import ShortsPlayer from './components/ShortsPlayer.jsx';
import VideoUpload from './components/VideoUpload.jsx';
import RenderStudio from './components/RenderStudio.jsx';
import Profile from './components/Profile.jsx';
import MonetizationDashboard from './components/MonetizationDashboard.jsx';
import ViewerRewards from './components/ViewerRewards.jsx';
import AIAssistant from './components/AIAssistant.jsx';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/shorts', label: 'Shorts', icon: Zap },
  { path: '/upload', label: 'Upload', icon: Upload },
  { path: '/studio', label: 'Studio', icon: BarChart3 },
  { path: '/monetization', label: 'Monetization', icon: Wallet },
  { path: '/rewards', label: 'Rewards', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
];

function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-950 border-r border-neutral-800 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 px-6 h-16 border-b border-neutral-800">
          <div className="w-9 h-9 rounded-lg bg-render-red flex items-center justify-center">
            <Zap className="text-white" size={22} fill="white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            Render
          </span>
        </div>

        <nav className="py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-6 py-3 text-gray-300 hover:bg-neutral-900 hover:text-white transition-colors text-sm font-medium"
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="px-6 mt-4">
          <div className="bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-600/30 rounded-xl p-4">
            <p className="text-white font-bold text-sm mb-1">Go Monetized</p>
            <p className="text-gray-400 text-xs">90% payout to creators</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function TopBar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 bg-neutral-950/95 backdrop-blur border-b border-neutral-800 h-16 flex items-center px-4 lg:px-6 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-300 hover:text-white"
      >
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-8 h-8 rounded-lg bg-render-red flex items-center justify-center">
          <Zap className="text-white" size={18} fill="white" />
        </div>
        <span className="text-xl font-black text-white">Render</span>
      </div>

      <div className="flex-1 max-w-xl mx-auto hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search videos, creators, shorts..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:border-red-600 outline-none transition-colors"
          />
        </div>
      </div>

      <button className="bg-render-red hover:bg-render-red-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
        Sign In
      </button>
    </header>
  );
}

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const isShorts = location.pathname === '/shorts';

  return (
    <div className="min-h-screen bg-neutral-950">
      {!isShorts && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
      {!isShorts && <TopBar onMenuClick={() => setSidebarOpen(true)} />}
      <main className={`lg:ml-64 ${isShorts ? '' : 'pt-0'}`}>
        {children}
      </main>
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/shorts" element={<ShortsPlayer />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/studio" element={<RenderStudio />} />
          <Route path="/monetization" element={<MonetizationDashboard />} />
          <Route path="/rewards" element={<ViewerRewards />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
