import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

const router = express.Router();
const users = [];

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

router.post('/signup', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ success: false, error: 'Email, username, and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
    }

    const existingUser = users.find((user) => user.email === email || user.username === username);
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      email,
      username,
      password: hashedPassword,
      subscribers: 0,
      totalViews: 0,
      isMonetized: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    const tokens = generateTokens(userId);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: userId,
        email,
        username,
        subscribers: 0,
        isMonetized: false,
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const user = users.find((entry) => entry.email === email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    const tokens = generateTokens(user.id);

    return res.json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        subscribers: user.subscribers,
        totalViews: user.totalViews,
        isMonetized: user.isMonetized,
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, error: 'Refresh token is required.' });
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const tokens = generateTokens(decoded.userId);

    return res.json({
      success: true,
      tokens,
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid refresh token.' });
  }
});

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

export default router;
