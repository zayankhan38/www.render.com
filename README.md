# YouTube Clone with AI Copyright Detection & TikTok Loop System

A lightning-fast YouTube alternative built with cutting-edge technology featuring:
- ⚡ **Ultra-fast** web & Android apps
- 🤖 **AI Copyright Detection** - Prevents copyright infringement
- 🔄 **TikTok-style Loop System** - Continuous video playback
- 🎨 **Modern Red & Dark UI** - Beautiful design
- 📱 **Multi-platform** - Web & Android
- 🎥 **YouTube Studio Clone** - Full creator dashboard

## Project Structure

```
www.render.com/
├── web/                    # React web app (ultra-fast)
├── mobile/                 # React Native Android app
├── backend/                # Node.js/Express API
└── ai-service/             # Copyright detection AI microservice
```

## Tech Stack

### Web
- **Frontend**: React 18 + Vite (lightning fast)
- **State**: Zustand + React Query
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Custom components

### Mobile
- **Frontend**: React Native + Expo
- **State**: Zustand + React Query
- **Styling**: NativeWind (Tailwind for React Native)

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL + Redis cache
- **File Storage**: AWS S3 / Firebase Storage
- **Real-time**: WebSocket for live features

### AI Service
- **Framework**: Python FastAPI
- **ML Models**: YOLOv8 + TensorFlow
- **Copyright Detection**: Content-based fingerprinting + metadata analysis
- **Chatbot**: LLaMA-based conversational AI

## Features

- [x] Video upload with instant copyright detection
- [x] TikTok-style infinite loop playback
- [x] YouTube Studio interface
- [x] AI assistant (bottom-right corner)
- [x] Red & dark theme UI
- [x] Web & Android support
- [ ] Monetization system
- [ ] Analytics dashboard
- [ ] Community features

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL
- Redis

### Installation

```bash
# Clone repository
git clone https://github.com/zayankhan38/www.render.com.git
cd www.render.com

# Setup backend
cd backend
npm install
npm run dev

# Setup web
cd ../web
npm install
npm run dev

# Setup mobile
cd ../mobile
npm install
npx expo start

# Setup AI service
cd ../ai-service
pip install -r requirements.txt
python main.py
```

## Documentation
- [Web App Guide](./web/README.md)
- [Mobile App Guide](./mobile/README.md)
- [Backend API](./backend/README.md)
- [AI Service](./ai-service/README.md)

## Contributing
Pull requests welcome! Please follow our contribution guidelines.

## License
MIT
