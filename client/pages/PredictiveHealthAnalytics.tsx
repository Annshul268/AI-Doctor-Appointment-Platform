import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Brain, Calendar, AlertTriangle, Target, LineChart, Activity, Shield, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const PredictiveHealthAnalytics = () => {
  const healthPredictions = [
    {
      condition: "Cardiovascular Risk",
      riskLevel: "Low",
      probability: 12,
      timeframe: "Next 5 years",
      factors: ["Age", "Exercise", "Diet"],
      recommendation: "Continue current lifestyle",
      color: "bg-green-500"
    },
    {
      condition: "Type 2 Diabetes",
      riskLevel: "Moderate",
      probability: 28,
      timeframe: "Next 10 years",
      factors: ["Family history", "BMI", "Diet"],
      recommendation: "Improve diet and exercise",
      color: "bg-yellow-500"
    },
    {
      condition: "Hypertension",
      riskLevel: "Low",
      probability: 18,
      timeframe: "Next 3 years",
      factors: ["Stress", "Sodium intake"],
      recommendation: "Monitor blood pressure regularly",
      color: "bg-green-500"
    },
    {
      condition: "Depression",
      riskLevel: "Moderate",
      probability: 35,
      timeframe: "Next 2 years",
      factors: ["Stress levels", "Sleep quality"],
      recommendation: "Consider mental health support",
      color: "bg-orange-500"
    }
  ];

  const healthTrends = [
    { metric: "Sleep Quality", current: 7.2, trend: "+0.3", period: "vs last month", status: "improving" },
    { metric: "Exercise Frequency", current: 4.1, trend: "+0.8", period: "sessions/week", status: "improving" },
    { metric: "Stress Level", current: 3.8, trend: "-0.5", period: "scale 1-10", status: "improving" },
    { metric: "Heart Rate Variability", current: 42, trend: "+3", period: "ms", status: "stable" },
  ];

  const preventiveActions = [
    {
      title: "Annual Cardiovascular Screening",
      dueDate: "Mar 15, 2024",
      priority: "Medium",
      description: "Comprehensive heart health checkup"
    },
    {
      title: "Diabetes Prevention Program",
      dueDate: "Feb 28, 2024",
      priority: "High",
      description: "Join lifestyle modification program"
    },
    {
      title: "Mental Health Assessment",
      dueDate: "Apr 10, 2024",
      priority: "Medium",
      description: "Stress and mood evaluation"
    },
    {
      title: "Nutrition Consultation",
      dueDate: "Feb 20, 2024",
      priority: "High",
      description: "Dietary assessment and planning"
    }
  ];

  const aiInsights = [
    {
      category: "Lifestyle",
      insight: "Your sleep pattern shows improvement, but going to bed 30 minutes earlier could reduce stress levels by 15%.",
      confidence: 89,
      impact: "High"
    },
    {
      category: "Exercise",
      insight: "Increasing cardiovascular exercise by 2 sessions per week could reduce diabetes risk by 22%.",
      confidence: 76,
      impact: "High"
    },
    {
      category: "Nutrition",
      insight: "Your sodium intake is 23% above recommended levels. Reducing it could lower hypertension risk.",
      confidence: 82,
      impact: "Medium"
    },
    {
      category: "Mental Health",
      insight: "Your stress patterns correlate with work schedule. Consider mindfulness practices during peak work periods.",
      confidence: 71,
      impact: "Medium"
    }
  ];

  const riskFactors = [
    { factor: "Age", impact: "Moderate", modifiable: false, score: 3.2 },
    { factor: "Family History", impact: "High", modifiable: false, score: 4.1 },
    { factor: "Exercise Level", impact: "High", modifiable: true, score: 2.8 },
    { factor: "Diet Quality", impact: "High", modifiable: true, score: 3.5 },
    { factor: "Stress Management", impact: "Medium", modifiable: true, score: 3.9 },
    { factor: "Sleep Quality", impact: "Medium", modifiable: true, score: 2.3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-violet-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Predictive Health Analytics</h1>
                <p className="text-sm text-gray-600">AI-powered health forecasting and risk assessment</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-6">
            <Brain className="h-8 w-8 text-violet-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Predictive Health Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Harness the power of AI to predict future health risks, identify early warning signs, 
            and receive personalized recommendations to prevent illness before it starts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Brain className="h-4 w-4 mr-2" />
              Generate Health Forecast
            </Button>
            <Button variant="outline">
              <LineChart className="h-4 w-4 mr-2" />
              View Trends
            </Button>
          </div>
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
            <TabsTrigger value="trends">Health Trends</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="prevention">Prevention Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/70 backdrop-blur-sm border-violet-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-violet-600" />
                      Health Risk Predictions
                    </CardTitle>
                    <CardDescription>
                      AI-generated forecasts based on your health data and lifestyle patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {healthPredictions.map((prediction, index) => (
                        <div key={index} className="p-6 bg-white/50 rounded-lg border border-violet-100">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{prediction.condition}</h4>
                              <p className="text-sm text-gray-600">{prediction.timeframe}</p>
                            </div>
                            <Badge 
                              variant="outline"
                              className={`${
                                prediction.riskLevel === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                                prediction.riskLevel === 'Moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              {prediction.riskLevel} Risk
                            </Badge>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Risk Probability</span>
                              <span className="text-sm font-bold">{prediction.probability}%</span>
                            </div>
                            <Progress value={prediction.probability} className="h-2" />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Key Risk Factors:</p>
                              <div className="flex flex-wrap gap-1">
                                {prediction.factors.map((factor, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Recommendation:</p>
                              <p className="text-sm text-gray-600">{prediction.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-white/70 backdrop-blur-sm border-violet-100 mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Overall Health Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">8.2</div>
                      <p className="text-sm text-gray-600 mb-4">out of 10</p>
                      <Progress value={82} className="mb-4" />
                      <p className="text-xs text-gray-500">
                        Your health score is above average for your age group.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-violet-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {riskFactors.slice(0, 4).map((factor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{factor.factor}</p>
                            <p className="text-xs text-gray-600">{factor.impact} impact</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                factor.score < 3 ? 'bg-green-500' : 
                                factor.score < 4 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span className="text-sm font-medium">{factor.score}</span>
                            </div>
                            {factor.modifiable && (
                              <Badge variant="outline" className="text-xs mt-1">
                                Modifiable
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-600" />
                  Health Trend Analysis
                </CardTitle>
                <CardDescription>
                  Track how your health metrics are changing over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {healthTrends.map((trend, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg border border-violet-100">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{trend.metric}</h4>
                        <Badge 
                          variant="outline"
                          className={trend.status === 'improving' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}
                        >
                          {trend.status}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{trend.current}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className={trend.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {trend.trend}
                        </span>
                        <span className="text-gray-600">{trend.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  AI Health Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your health data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-6 bg-white/50 rounded-lg border border-violet-100">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{insight.category}</Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Confidence: {insight.confidence}%</span>
                          <Badge 
                            variant="outline"
                            className={insight.impact === 'High' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}
                          >
                            {insight.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{insight.insight}</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Personalized Prevention Plan
                </CardTitle>
                <CardDescription>
                  Recommended actions to prevent future health issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {preventiveActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-violet-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                          <p className="text-xs text-gray-500">Due: {action.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline"
                          className={action.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}
                        >
                          {action.priority}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How It Works Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Predictive Analytics Work</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-violet-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Data Collection</h4>
              <p className="text-gray-600">Gather health data from multiple sources including wearables, medical records, and lifestyle inputs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. AI Analysis</h4>
              <p className="text-gray-600">Advanced machine learning algorithms analyze patterns and predict future health risks with high accuracy.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Personalized Action</h4>
              <p className="text-gray-600">Receive tailored recommendations and prevention strategies to optimize your health outcomes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveHealthAnalytics;
