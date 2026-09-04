/**
 * Watch-to-Earn System
 * Viewers earn Render Dinar (Ɽ) by watching content
 */

const express = require('express');
const router = express.Router();

// 10-Second Watch-Time Validator
class WatchTimeValidator {
  constructor() {
    this.activeWatches = new Map();
    this.MINIMUM_WATCH_TIME = 10000; // 10 seconds in milliseconds
  }

  startWatch(userId, videoId) {
    const key = `${userId}_${videoId}`;
    this.activeWatches.set(key, {
      userId,
      videoId,
      startTime: Date.now(),
      watched: 0
    });
  }

  validateWatchTime(userId, videoId) {
    const key = `${userId}_${videoId}`;
    const watch = this.activeWatches.get(key);
    
    if (!watch) return false;
    
    const watchedDuration = Date.now() - watch.startTime;
    watch.watched = watchedDuration;
    
    return watchedDuration >= this.MINIMUM_WATCH_TIME;
  }

  getWatchDuration(userId, videoId) {
    const key = `${userId}_${videoId}`;
    const watch = this.activeWatches.get(key);
    return watch ? watch.watched : 0;
  }

  completeWatch(userId, videoId) {
    const key = `${userId}_${videoId}`;
    this.activeWatches.delete(key);
  }
}

const validator = new WatchTimeValidator();

// Micro-Token Reward Trigger (0.02 Render Dinar per ad completion)
const REWARD_PER_AD_COMPLETION = 0.02; // Render Dinar

// Daily Earnings Throttler - Max 20 videos per day
class DailyEarningsThrottler {
  constructor() {
    this.dailyWatches = new Map(); // userId -> {date, count}
    this.MAX_VIDEOS_PER_DAY = 20;
  }

  canEarnToday(userId) {
    const today = new Date().toDateString();
    const key = `${userId}_${today}`;
    
    if (!this.dailyWatches.has(key)) {
      this.dailyWatches.set(key, { date: today, count: 0 });
    }
    
    const data = this.dailyWatches.get(key);
    return data.count < this.MAX_VIDEOS_PER_DAY;
  }

  incrementDailyCount(userId) {
    const today = new Date().toDateString();
    const key = `${userId}_${today}`;
    
    if (!this.dailyWatches.has(key)) {
      this.dailyWatches.set(key, { date: today, count: 0 });
    }
    
    const data = this.dailyWatches.get(key);
    data.count++;
  }

  getDailyCount(userId) {
    const today = new Date().toDateString();
    const key = `${userId}_${today}`;
    const data = this.dailyWatches.get(key);
    return data ? data.count : 0;
  }
}

const throttler = new DailyEarningsThrottler();

// POST /watch-to-earn/start
router.post('/start', (req, res) => {
  const { userId, videoId } = req.body;
  
  if (!userId || !videoId) {
    return res.status(400).json({ error: 'Missing userId or videoId' });
  }

  validator.startWatch(userId, videoId);
  
  res.json({
    success: true,
    message: 'Watch session started',
    requiredWatchTime: 10000
  });
});

// POST /watch-to-earn/validate
router.post('/validate', async (req, res) => {
  const { userId, videoId } = req.body;

  if (!userId || !videoId) {
    return res.status(400).json({ error: 'Missing userId or videoId' });
  }

  // Check if 10 seconds watched
  const isValid = validator.validateWatchTime(userId, videoId);
  
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Minimum 10 seconds watch time required'
    });
  }

  // Check daily limit
  if (!throttler.canEarnToday(userId)) {
    return res.status(403).json({
      success: false,
      message: 'Daily earning limit reached (20 videos/day)',
      dailyCount: throttler.getDailyCount(userId)
    });
  }

  // Award tokens
  throttler.incrementDailyCount(userId);
  const earnedAmount = REWARD_PER_AD_COMPLETION;

  res.json({
    success: true,
    message: 'Reward earned!',
    earned: {
      amount: earnedAmount,
      currency: 'Render Dinar (Ɽ)',
      symbol: 'Ɽ'
    },
    dailyProgress: {
      videosWatchedToday: throttler.getDailyCount(userId),
      remainingToday: 20 - throttler.getDailyCount(userId),
      maxDaily: 20
    }
  });
});

// GET /watch-to-earn/status/:userId
router.get('/status/:userId', (req, res) => {
  const { userId } = req.params;
  const dailyCount = throttler.getDailyCount(userId);
  
  res.json({
    success: true,
    userId,
    dailyStats: {
      videosWatched: dailyCount,
      remainingQuota: 20 - dailyCount,
      maxPerDay: 20,
      percentageComplete: (dailyCount / 20) * 100
    },
    rewardRate: `${REWARD_PER_AD_COMPLETION} Ɽ per video`,
    potentialDailyEarnings: dailyCount * REWARD_PER_AD_COMPLETION
  });
});

// POST /watch-to-earn/complete
router.post('/complete', (req, res) => {
  const { userId, videoId } = req.body;
  validator.completeWatch(userId, videoId);
  
  res.json({
    success: true,
    message: 'Watch session completed'
  });
});

module.exports = router;
module.exports.validator = validator;
module.exports.throttler = throttler;