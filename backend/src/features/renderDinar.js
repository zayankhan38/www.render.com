/**
 * Render Dinar (Ɽ) Token System
 * Fixed exchange rates and tiered multiplier system
 */

const express = require('express');
const router = express.Router();

// Fixed Token Rates (Non-fluctuating)
const TOKEN_RATES = {
  BUY_RATE: {
    name: 'Fan Purchase Rate',
    ratio: 100, // 100 Ɽ
    usd: 2.00,  // = $2.00
    perToken: 0.02
  },
  CREATOR_WITHDRAWAL_RATE: {
    name: 'Creator Withdrawal Rate',
    ratio: 100, // 100 Ɽ
    usd: 1.50,  // = $1.50
    perToken: 0.015
  },
  VIEWER_WITHDRAWAL_RATE: {
    name: 'Viewer Withdrawal Rate',
    ratio: 100, // 100 Ɽ
    usd: 1.50,  // = $1.50
    perToken: 0.015
  }
};

// Tiered Multiplier System
const TIER_MULTIPLIERS = {
  BRONZE: {
    tier: 1,
    name: 'Bronze Member',
    multiplier: 1.0,
    requirements: { minBalance: 0 },
    benefits: ['Basic rewards', 'Standard earning rate']
  },
  SILVER: {
    tier: 2,
    name: 'Silver Member',
    multiplier: 1.25,
    requirements: { minBalance: 1000, minWatchDays: 7 },
    benefits: ['25% earning boost', 'Priority support', 'Silver badge']
  },
  GOLD: {
    tier: 3,
    name: 'Gold Member',
    multiplier: 1.5,
    requirements: { minBalance: 5000, minWatchDays: 30 },
    benefits: ['50% earning boost', 'VIP support', 'Gold badge', 'Exclusive items']
  },
  PLATINUM: {
    tier: 4,
    name: 'Platinum Member',
    multiplier: 2.0,
    requirements: { minBalance: 10000, minWatchDays: 90 },
    benefits: ['2x earning boost', 'Premium support', 'Platinum badge', 'All VIP perks']
  },
  DIAMOND: {
    tier: 5,
    name: 'Diamond Creator',
    multiplier: 3.0,
    requirements: { minBalance: 25000, minWatchDays: 180 },
    benefits: ['3x earning boost', 'Direct creator support', 'Diamond badge', 'Exclusive features']
  }
};

// User Wallet System
class RenderDinarWallet {
  constructor() {
    this.wallets = new Map();
  }

  createWallet(userId) {
    if (this.wallets.has(userId)) {
      return this.wallets.get(userId);
    }

    const wallet = {
      userId,
      balance: 0,
      earned: 0,
      spent: 0,
      tier: 'BRONZE',
      multiplier: 1.0,
      transactions: [],
      createdAt: new Date()
    };

    this.wallets.set(userId, wallet);
    return wallet;
  }

  getWallet(userId) {
    return this.wallets.get(userId) || this.createWallet(userId);
  }

  addTokens(userId, amount, reason = 'Generic reward') {
    const wallet = this.getWallet(userId);
    const multipliedAmount = amount * wallet.multiplier;
    
    wallet.balance += multipliedAmount;
    wallet.earned += multipliedAmount;
    wallet.transactions.push({
      type: 'credit',
      amount: multipliedAmount,
      reason,
      timestamp: new Date()
    });

    return multipliedAmount;
  }

  spendTokens(userId, amount, reason = 'Generic purchase') {
    const wallet = this.getWallet(userId);
    
    if (wallet.balance < amount) {
      return { success: false, message: 'Insufficient balance' };
    }

    wallet.balance -= amount;
    wallet.spent += amount;
    wallet.transactions.push({
      type: 'debit',
      amount,
      reason,
      timestamp: new Date()
    });

    return { success: true, message: 'Transaction completed', newBalance: wallet.balance };
  }

  upgradeTier(userId, newTier) {
    const wallet = this.getWallet(userId);
    const tier = TIER_MULTIPLIERS[newTier];
    
    if (!tier) {
      return { success: false, message: 'Invalid tier' };
    }

    wallet.tier = newTier;
    wallet.multiplier = tier.multiplier;
    
    return { success: true, message: `Upgraded to ${tier.name}`, multiplier: tier.multiplier };
  }

  getStats(userId) {
    const wallet = this.getWallet(userId);
    const tier = TIER_MULTIPLIERS[wallet.tier];
    
    return {
      balance: wallet.balance,
      earned: wallet.earned,
      spent: wallet.spent,
      tier: wallet.tier,
      tierName: tier.name,
      multiplier: wallet.multiplier,
      lastTransaction: wallet.transactions[wallet.transactions.length - 1] || null
    };
  }
}

const walletManager = new RenderDinarWallet();

// Routes

// GET /render-dinar/rates
router.get('/rates', (req, res) => {
  res.json({
    success: true,
    rates: TOKEN_RATES,
    currency: 'Render Dinar (Ɽ)',
    stability: 'Fixed (non-fluctuating)'
  });
});

// GET /render-dinar/tiers
router.get('/tiers', (req, res) => {
  res.json({
    success: true,
    tiers: TIER_MULTIPLIERS,
    description: 'Earn more tokens with higher tier multipliers'
  });
});

// POST /render-dinar/wallet/create
router.post('/wallet/create', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const wallet = walletManager.createWallet(userId);
  
  res.status(201).json({
    success: true,
    message: 'Wallet created',
    wallet: {
      userId: wallet.userId,
      balance: wallet.balance,
      tier: wallet.tier,
      multiplier: wallet.multiplier
    }
  });
});

// GET /render-dinar/wallet/:userId
router.get('/wallet/:userId', (req, res) => {
  const { userId } = req.params;
  const stats = walletManager.getStats(userId);
  const tier = TIER_MULTIPLIERS[stats.tier];
  
  res.json({
    success: true,
    wallet: stats,
    tierBenefits: tier.benefits,
    nextTierRequirements: TIER_MULTIPLIERS[Object.keys(TIER_MULTIPLIERS)[tier.tier]] || null
  });
});

// POST /render-dinar/add-tokens
router.post('/add-tokens', (req, res) => {
  const { userId, amount, reason } = req.body;
  
  if (!userId || !amount) {
    return res.status(400).json({ error: 'Missing userId or amount' });
  }

  const earnedAmount = walletManager.addTokens(userId, amount, reason);
  const wallet = walletManager.getWallet(userId);
  
  res.json({
    success: true,
    message: 'Tokens added',
    earned: earnedAmount,
    currency: 'Ɽ',
    newBalance: wallet.balance,
    multiplier: wallet.multiplier
  });
});

// POST /render-dinar/spend-tokens
router.post('/spend-tokens', (req, res) => {
  const { userId, amount, reason } = req.body;
  
  if (!userId || !amount) {
    return res.status(400).json({ error: 'Missing userId or amount' });
  }

  const result = walletManager.spendTokens(userId, amount, reason);
  
  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// POST /render-dinar/upgrade-tier
router.post('/upgrade-tier', (req, res) => {
  const { userId, tier } = req.body;
  
  if (!userId || !tier) {
    return res.status(400).json({ error: 'Missing userId or tier' });
  }

  const result = walletManager.upgradeTier(userId, tier);
  
  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

module.exports = router;
module.exports.walletManager = walletManager;
module.exports.RATES = TOKEN_RATES;
module.exports.TIERS = TIER_MULTIPLIERS;