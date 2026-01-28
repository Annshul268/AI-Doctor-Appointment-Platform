const AIService = require('../utils/aiService');

// @desc    Image analysis
// @route   POST /api/ai/image-analysis
// @access  Private
const imageAnalysis = async (req, res) => {
  try {
    const { imageUrl, analysisType } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const analysis = await AIService.analyzeImage(imageUrl, analysisType);
    res.json(analysis);
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ 
      message: error.message || 'AI analysis failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Wearable device data analysis
// @route   POST /api/ai/wearables
// @access  Private
const wearableAnalysis = async (req, res) => {
  try {
    const { deviceType, data, symptoms } = req.body;

    // Use AI to analyze wearable data and symptoms
    const analysis = await AIService.analyzeSymptoms(
      symptoms || 'Wearable data analysis requested',
      req.user?.age,
      req.user?.gender,
      req.user?.medicalHistory || ''
    );

    const wearableAnalysis = {
      analysisId: `wearable_${Date.now()}`,
      deviceType: deviceType || 'fitness_tracker',
      dataPoints: data?.length || 0,
      healthMetrics: {
        heartRate: {
          average: data?.heartRate?.average || 72,
          min: data?.heartRate?.min || 58,
          max: data?.heartRate?.max || 120,
          status: 'normal',
          trend: 'stable'
        },
        sleepQuality: {
          score: data?.sleepQuality?.score || 85,
          duration: data?.sleepQuality?.duration || '7h 23m',
          deepSleep: data?.sleepQuality?.deepSleep || '2h 15m',
          remSleep: data?.sleepQuality?.remSleep || '1h 45m',
          recommendations: analysis.recommendations || [
            'Maintain consistent sleep schedule',
            'Reduce screen time before bed',
            'Consider meditation for better sleep'
          ]
        },
        activityLevel: {
          steps: data?.activityLevel?.steps || 8420,
          calories: data?.activityLevel?.calories || 1850,
          activeMinutes: data?.activityLevel?.activeMinutes || 45,
          status: 'good',
          goal: '10,000 steps'
        },
        stressLevel: {
          score: data?.stressLevel?.score || 35,
          status: 'low',
          recommendations: analysis.recommendations || [
            'Continue current stress management routine',
            'Consider yoga or meditation',
            'Maintain work-life balance'
          ]
        }
      },
      insights: analysis.recommendations || [
        'Your heart rate variability is excellent',
        'Sleep quality has improved 15% this week',
        'Consider increasing daily activity by 10%'
      ],
      aiAnalysis: analysis,
      timestamp: new Date().toISOString()
    };

    res.json(wearableAnalysis);
  } catch (error) {
    console.error('Wearable analysis error:', error);
    res.status(500).json({ 
      message: error.message || 'Wearable analysis failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Emergency analysis
// @route   POST /api/ai/emergency
// @access  Private
const emergencyAnalysis = async (req, res) => {
  try {
    const { symptoms, location } = req.body;

    if (!symptoms) {
      return res.status(400).json({ message: 'Symptoms are required for emergency analysis' });
    }

    const analysis = await AIService.emergencyAnalysis(symptoms, location);
    res.json(analysis);
  } catch (error) {
    console.error('Emergency analysis error:', error);
    res.status(500).json({ 
      message: error.message || 'Emergency analysis failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Translate medical text
// @route   POST /api/ai/translate
// @access  Private
const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ message: 'Text and target language are required' });
    }

    // Use OpenAI for translation
    const completion = await require('openai').chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a medical translation assistant. Translate the following medical text accurately while maintaining medical terminology and context." 
        },
        { 
          role: "user", 
          content: `Translate the following medical text to ${targetLanguage}:\n\n${text}` 
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const translation = completion.choices[0].message.content;

    res.json({
      translationId: `translate_${Date.now()}`,
      originalText: text,
      translatedText: translation,
      targetLanguage: targetLanguage,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      message: error.message || 'Translation failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Community health insights
// @route   GET /api/ai/community-insights
// @access  Private
const communityInsights = async (req, res) => {
  try {
    const { location, ageGroup, healthCondition } = req.query;

    // Use AI to generate community insights
    const prompt = `Generate community health insights for:
    Location: ${location || 'General'}
    Age Group: ${ageGroup || 'All ages'}
    Health Condition: ${healthCondition || 'General health'}
    
    Provide insights about:
    1. Common health trends
    2. Seasonal health concerns
    3. Preventive measures
    4. Community health recommendations`;

    const completion = await require('openai').chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a community health analyst. Provide accurate, helpful insights about community health trends and recommendations." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 800
    });

    const insights = completion.choices[0].message.content;

    const communityInsights = {
      insightsId: `insights_${Date.now()}`,
      location: location || 'General',
      ageGroup: ageGroup || 'All ages',
      healthCondition: healthCondition || 'General health',
      insights: insights,
      trends: [
        {
          trend: 'Seasonal health awareness',
          description: 'Increased focus on preventive care',
          impact: 'positive'
        }
      ],
      recommendations: [
        'Maintain regular health check-ups',
        'Follow local health guidelines',
        'Stay informed about community health alerts'
      ],
      alerts: [
        {
          type: 'health_alert',
          message: 'Increased cases of seasonal allergies in your area',
          severity: 'low',
          action: 'Consider preventive measures'
        }
      ],
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    res.json(communityInsights);
  } catch (error) {
    console.error('Community insights error:', error);
    res.status(500).json({ 
      message: error.message || 'Community insights failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Health advice
// @route   POST /api/ai/health-advice
// @access  Private
const healthAdvice = async (req, res) => {
  try {
    const { symptoms, age, gender, medicalHistory } = req.body;

    if (!symptoms) {
      return res.status(400).json({ message: 'Symptoms are required for health advice' });
    }

    const advice = await AIService.generateHealthAdvice(symptoms, age, gender, medicalHistory);
    res.json(advice);
  } catch (error) {
    console.error('Health advice error:', error);
    res.status(500).json({ 
      message: error.message || 'Health advice generation failed',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  imageAnalysis,
  wearableAnalysis,
  emergencyAnalysis,
  translateText,
  communityInsights,
  healthAdvice,
}; 