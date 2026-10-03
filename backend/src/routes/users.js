import express from 'express';

const router = express.Router();

const users = [
  {
    id: 'user123',
    username: 'CreatorPro',
    displayName: 'Creator Pro - Content Master',
    email: 'creator@render.com',
    bio: 'Making awesome content on Render',
    subscribers: 2500,
    totalViews: 15400000,
    videos: 156,
    verified: true,
    joinDate: '2024-01-15',
    website: 'www.creatorpro.com',
    location: 'San Francisco, CA',
    isMonetized: true,
  },
];

router.get('/:id', (req, res) => {
  const user = users.find((entry) => entry.id === req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  return res.json({
    success: true,
    user,
  });
});

router.put('/:id', (req, res) => {
  const { username, bio, website, location } = req.body;
  const userIndex = users.findIndex((entry) => entry.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  const currentUser = users[userIndex];
  users[userIndex] = {
    ...currentUser,
    username: username || currentUser.username,
    bio: bio || currentUser.bio,
    website: website || currentUser.website,
    location: location || currentUser.location,
  };

  return res.json({
    success: true,
    message: 'Profile updated successfully.',
    user: users[userIndex],
  });
});

router.get('/:id/stats', (req, res) => {
  const user = users.find((entry) => entry.id === req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  return res.json({
    success: true,
    stats: {
      userId: user.id,
      subscribers: user.subscribers,
      totalViews: user.totalViews,
      totalVideos: user.videos,
      avgViewDuration: 3.2,
      engagementRate: 8.5,
      totalEarnings: 12500,
      monthlyEarnings: 2150,
    },
  });
});

export default router;
