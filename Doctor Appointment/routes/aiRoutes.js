const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  imageAnalysis,
  wearableAnalysis,
  emergencyAnalysis,
  translateText,
  communityInsights,
  healthAdvice,
} = require('../controllers/aiController');

// All AI routes are protected
router.use(protect);

// AI analysis routes
router.post('/image-analysis', imageAnalysis);
router.post('/wearables', wearableAnalysis);
router.post('/emergency', emergencyAnalysis);
router.post('/translate', translateText);
router.get('/community-insights', communityInsights);
router.post('/health-advice', healthAdvice);

module.exports = router; 