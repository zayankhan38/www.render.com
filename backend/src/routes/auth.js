const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**
 * Authentication Routes
 * POST /auth/signup - Register new user
 * POST /auth/login - Login user
 * POST /auth/logout - Logout user
 * POST /auth/refresh - Refresh JWT token
 */

// Mock database for demo
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'render-secret-key-2024';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'render-refresh-key-2024';

// Helper: Generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// POST /auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      email,
      username,
      password: hashedPassword,
      subscribers: 0,
      totalViews: 0,
      isMonetized: false,
      createdAt: new Date()
    };

    users.push(newUser);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(userId);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: userId,
        email,
        username
      },
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        subscribers: user.subscribers,
        isMonetized: user.isMonetized
      },
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /auth/refresh
router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    res.json({
      success: true,
      tokens: { accessToken, refreshToken: newRefreshToken }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;