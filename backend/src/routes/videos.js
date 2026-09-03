const express = require('express');
const router = express.Router();

/**
 * Video Routes
 * POST /videos/upload - Upload video
 * GET /videos/:id - Get video details
 * GET /videos/trending - Get trending videos
 * DELETE /videos/:id - Delete video
 */

// Mock database
const videos = [];

// POST /videos/upload
router.post('/upload', async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;
    const file = req.files?.video;

    if (!title || !userId || !file) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const videoId = `video_${Date.now()}`;
    const newVideo = {
      id: videoId,
      title,
      description,
      category,
      userId,
      views: 0,
      likes: 0,
      duration: '0:00',
      thumbnail: 'https://via.placeholder.com/320x180',
      uploadedAt: new Date()
    };

    videos.push(newVideo);

    res.status(201).json({
      success: true,
      message: 'Video uploaded successfully',
      video: newVideo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /videos/:id
router.get('/:id', (req, res) => {
  try {
    const video = videos.find(v => v.id === req.params.id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      success: true,
      video
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /videos/trending
router.get('/trending', (req, res) => {
  try {
    const trending = videos
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);

    res.json({
      success: true,
      videos: trending
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /videos/:id
router.delete('/:id', (req, res) => {
  try {
    const index = videos.findIndex(v => v.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Video not found' });
    }

    videos.splice(index, 1);

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;