import express from 'express';

const router = express.Router();

const videos = [
  {
    id: 'video_1',
    title: 'How to Make Money on Render - Full Tutorial 2025',
    description: 'A creator-focused guide to monetizing in Render.',
    category: 'education',
    userId: 'user123',
    views: 1250000,
    likes: 85000,
    duration: '12:45',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    uploadedAt: new Date().toISOString(),
  },
  {
    id: 'video_2',
    title: 'Render Shorts Challenge - Win $10K Prize 🏆',
    description: 'Creator challenge and platform rewards.',
    category: 'gaming',
    userId: 'user123',
    views: 5680000,
    likes: 320000,
    duration: 'Short',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    uploadedAt: new Date().toISOString(),
  },
];

router.post('/upload', (req, res) => {
  const { title, description, category, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ success: false, error: 'Title and userId are required.' });
  }

  const videoId = `video_${Date.now()}`;
  const newVideo = {
    id: videoId,
    title,
    description: description || '',
    category: category || 'general',
    userId,
    views: 0,
    likes: 0,
    duration: '0:00',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    uploadedAt: new Date().toISOString(),
  };

  videos.push(newVideo);

  return res.status(201).json({
    success: true,
    message: 'Video uploaded successfully.',
    video: newVideo,
  });
});

router.get('/:id', (req, res) => {
  const video = videos.find((item) => item.id === req.params.id);

  if (!video) {
    return res.status(404).json({ success: false, error: 'Video not found.' });
  }

  return res.json({
    success: true,
    video,
  });
});

router.get('/trending', (req, res) => {
  const trending = [...videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  return res.json({
    success: true,
    videos: trending,
  });
});

router.delete('/:id', (req, res) => {
  const index = videos.findIndex((video) => video.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Video not found.' });
  }

  videos.splice(index, 1);

  return res.json({
    success: true,
    message: 'Video deleted successfully.',
  });
});

export default router;
