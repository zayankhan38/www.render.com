-- Render Database Schema
-- PostgreSQL

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  website VARCHAR(255),
  location VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  is_monetized BOOLEAN DEFAULT FALSE,
  play_button VARCHAR(50),
  subscribers INT DEFAULT 0,
  total_views BIGINT DEFAULT 0,
  total_videos INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  thumbnail_url TEXT,
  video_url TEXT NOT NULL,
  duration INT,
  views BIGINT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  watch_time BIGINT DEFAULT 0,
  is_monetized BOOLEAN DEFAULT FALSE,
  revenue DECIMAL(10, 2) DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE shorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  views BIGINT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  is_loop BOOLEAN DEFAULT TRUE,
  revenue DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE monetization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscribers INT NOT NULL,
  watch_hours INT NOT NULL,
  short_views BIGINT NOT NULL,
  is_eligible BOOLEAN DEFAULT FALSE,
  play_button VARCHAR(50),
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  monthly_earnings DECIMAL(10, 2) DEFAULT 0,
  creator_payout DECIMAL(10, 2) DEFAULT 0,
  platform_fee DECIMAL(10, 2) DEFAULT 0,
  payout_rate DECIMAL(3, 2) DEFAULT 0.90,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE viewer_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shorts_watched BIGINT DEFAULT 0,
  videos_watched BIGINT DEFAULT 0,
  monthly_rank INT,
  earned_badges TEXT[] DEFAULT '{}',
  earned_rewards TEXT[] DEFAULT '{}',
  total_points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  rank INT,
  shorts_watched BIGINT,
  videos_watched BIGINT,
  total_watched BIGINT,
  reward_earned TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, month)
);

CREATE TABLE creator_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views BIGINT DEFAULT 0,
  watch_time BIGINT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  subscribers_gained INT DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better query performance
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_videos_created_at ON videos(created_at);
CREATE INDEX idx_shorts_user_id ON shorts(user_id);
CREATE INDEX idx_monetization_user_id ON monetization(user_id);
CREATE INDEX idx_viewer_rewards_user_id ON viewer_rewards(user_id);
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank, month);
CREATE INDEX idx_creator_analytics_user_date ON creator_analytics(user_id, date);