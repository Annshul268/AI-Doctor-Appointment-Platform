import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Calendar,
  Bell,
  Award,
  TrendingUp,
  Target,
  Zap,
  Brain,
  Activity,
  Users,
  Clock,
  Star,
  Shield,
  Sparkles,
  Trophy,
  Medal,
  Gift,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  ArrowRight,
  Pill,
  Stethoscope,
  BookOpen,
  MessageCircle,
  Camera,
  BarChart3,
  Flame,
  Timer,
  MapPin
} from "lucide-react";

interface HealthMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earnedDate?: Date;
  progress?: number;
  maxProgress?: number;
  category: 'health' | 'engagement' | 'streak' | 'milestone';
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: Date;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: Date;
  category: string;
  ai_suggestions: string[];
}

export default function Dashboard() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { name: 'Steps', value: 8547, target: 10000, unit: 'steps', trend: 'up', color: 'healthcare-blue' },
    { name: 'Heart Rate', value: 72, target: 80, unit: 'bpm', trend: 'stable', color: 'healthcare-green' },
    { name: 'Sleep', value: 7.2, target: 8, unit: 'hours', trend: 'down', color: 'healthcare-teal' },
    { name: 'Water', value: 6, target: 8, unit: 'glasses', trend: 'up', color: 'blue' }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Health Explorer',
      description: 'Used AI symptom checker for the first time',
      icon: Brain,
      earnedDate: new Date(),
      category: 'engagement'
    },
    {
      id: '2',
      title: 'Step Master',
      description: 'Reached 10,000 steps in a day',
      icon: Trophy,
      earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      category: 'health'
    },
    {
      id: '3',
      title: 'Consistency Champion',
      description: 'Log health data for 7 days straight',
      icon: Flame,
      progress: 5,
      maxProgress: 7,
      category: 'streak'
    },
    {
      id: '4',
      title: 'Prevention Pro',
      description: 'Complete 3 preventive check-ups',
      icon: Shield,
      progress: 1,
      maxProgress: 3,
      category: 'milestone'
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '2:30 PM',
      type: 'video',
      status: 'upcoming'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Rodriguez',
      specialty: 'Dermatologist',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      type: 'in-person',
      status: 'upcoming'
    }
  ]);

  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([
    {
      id: '1',
      title: 'Increase Daily Steps',
      description: 'Reach 12,000 steps daily for better cardiovascular health',
      progress: 8547,
      target: 12000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      category: 'Fitness',
      ai_suggestions: [
        'Take stairs instead of elevators',
        'Park further from entrances',
        'Take walking breaks every 2 hours'
      ]
    },
    {
      id: '2',
      title: 'Improve Sleep Quality',
      description: 'Maintain 8 hours of quality sleep nightly',
      progress: 7.2,
      target: 8,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      category: 'Sleep',
      ai_suggestions: [
        'Avoid screens 1 hour before bed',
        'Keep bedroom temperature cool (65-68°F)',
        'Establish consistent bedtime routine'
      ]
    }
  ]);

  const [healthScore, setHealthScore] = useState(78);
  const [weeklyStreak, setWeeklyStreak] = useState(5);
  const [totalPoints, setTotalPoints] = useState(2847);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingUp;
      case 'stable': return Activity;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-healthcare-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue-50 via-white to-healthcare-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
                AI HealthCare
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-healthcare-blue-600">
                <Trophy className="w-4 h-4" />
                <span>{totalPoints} Health Points</span>
              </div>
              <Button variant="outline" className="glass-button relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Link to="/">
                <Button variant="outline" className="glass-button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-2">
                  Health Dashboard
                </h1>
                <p className="text-xl text-healthcare-blue-700/80">Welcome back, Sarah! Let's keep you healthy.</p>
              </div>
              
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-healthcare-blue-600 mb-1">{healthScore}</div>
                <div className="text-sm text-healthcare-blue-500">Health Score</div>
                <div className="w-16 h-2 bg-gray-200 rounded-full mt-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-green-500 rounded-full"
                    style={{ width: `${healthScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Health Metrics */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-healthcare-blue-700">Today's Health Metrics</h2>
                  <Button variant="outline" className="glass-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Metric
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {healthMetrics.map((metric, index) => {
                    const TrendIcon = getTrendIcon(metric.trend);
                    const progress = (metric.value / metric.target) * 100;
                    
                    return (
                      <div key={index} className="bg-white/50 rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-healthcare-blue-700">{metric.name}</h3>
                          <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-2xl font-bold text-healthcare-blue-600">
                              {metric.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              of {metric.target.toLocaleString()} {metric.unit}
                            </div>
                          </div>
                          
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(metric.value, metric.target)}`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            {progress >= 100 ? '🎉 Goal achieved!' : `${(100 - progress).toFixed(0)}% to goal`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Health Goals */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-6 h-6 text-healthcare-blue-500" />
                    <h2 className="text-2xl font-bold text-healthcare-blue-700">AI Health Goals</h2>
                  </div>
                  <Button variant="outline" className="glass-button">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goal
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {healthGoals.map((goal) => {
                    const progress = (goal.progress / goal.target) * 100;
                    const daysLeft = Math.ceil((goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div key={goal.id} className="bg-gradient-to-r from-healthcare-blue-50 to-healthcare-teal-50 rounded-xl p-6 border border-healthcare-blue-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-healthcare-blue-700">{goal.title}</h3>
                              <span className="px-2 py-1 bg-healthcare-blue-100 text-healthcare-blue-600 text-xs rounded-full">
                                {goal.category}
                              </span>
                            </div>
                            <p className="text-healthcare-blue-600 mb-3">{goal.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Timer className="w-4 h-4 text-healthcare-green-500" />
                                <span className="text-healthcare-green-600">{daysLeft} days left</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="w-4 h-4 text-healthcare-blue-500" />
                                <span className="text-healthcare-blue-600">{progress.toFixed(0)}% complete</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-healthcare-blue-600">
                              {goal.progress.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              of {goal.target.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full h-3 bg-white/60 rounded-full mb-4">
                          <div 
                            className="h-3 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        
                        <div className="bg-white/60 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Sparkles className="w-4 h-4 text-healthcare-blue-500" />
                            <span className="text-sm font-semibold text-healthcare-blue-700">AI Suggestions</span>
                          </div>
                          <div className="space-y-2">
                            {goal.ai_suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm text-healthcare-blue-600">
                                <CheckCircle className="w-3 h-3 text-healthcare-green-500" />
                                <span>{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-healthcare-blue-700">Upcoming Appointments</h2>
                  <Link to="/find-doctor">
                    <Button className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book New
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {appointments.filter(apt => apt.status === 'upcoming').map((appointment) => (
                    <div key={appointment.id} className="bg-white/50 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-healthcare-blue-700">{appointment.doctor}</h3>
                            <p className="text-sm text-healthcare-blue-600">{appointment.specialty}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{formatDate(appointment.date)}</span>
                              <span>{appointment.time}</span>
                              <span className="capitalize">{appointment.type.replace('-', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="glass-button">
                            Reschedule
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                            Join Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Streak Counter */}
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-healthcare-blue-600 mb-1">{weeklyStreak}</div>
                <div className="text-sm text-healthcare-blue-500 mb-3">Day Streak</div>
                <div className="text-xs text-gray-500">Keep logging daily for rewards!</div>
              </div>

              {/* Achievements */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-healthcare-blue-700">Achievements</h3>
                  <Link to="/achievements" className="text-sm text-healthcare-blue-500 hover:text-healthcare-blue-600">
                    View All
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {achievements.slice(0, 4).map((achievement) => {
                    const Icon = achievement.icon;
                    const isEarned = !!achievement.earnedDate;
                    const progress = achievement.progress || 0;
                    const maxProgress = achievement.maxProgress || 1;
                    
                    return (
                      <div key={achievement.id} className={`p-3 rounded-lg border ${
                        isEarned 
                          ? 'bg-healthcare-green-50 border-healthcare-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isEarned 
                              ? 'bg-healthcare-green-500 text-white' 
                              : 'bg-gray-300 text-gray-500'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm ${
                              isEarned ? 'text-healthcare-green-700' : 'text-gray-600'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-gray-500">{achievement.description}</p>
                            
                            {!isEarned && achievement.maxProgress && (
                              <div className="mt-2">
                                <div className="w-full h-1.5 bg-gray-200 rounded-full">
                                  <div 
                                    className="h-1.5 bg-healthcare-blue-500 rounded-full"
                                    style={{ width: `${(progress / maxProgress) * 100}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {progress}/{maxProgress}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-healthcare-blue-700 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/symptom-checker" className="block">
                    <Button variant="outline" className="w-full glass-button justify-start">
                      <Brain className="w-4 h-4 mr-3" />
                      AI Symptom Check
                    </Button>
                  </Link>
                  <Link to="/image-analysis" className="block">
                    <Button variant="outline" className="w-full glass-button justify-start">
                      <Camera className="w-4 h-4 mr-3" />
                      AI Image Analysis
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <Pill className="w-4 h-4 mr-3" />
                    Medication Reminder
                  </Button>
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Health Reports
                  </Button>
                </div>
              </div>

              {/* Health Tip of the Day */}
              <div className="glass-card p-6 bg-gradient-to-br from-healthcare-blue-50 to-healthcare-teal-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-5 h-5 text-healthcare-blue-500" />
                  <h3 className="text-lg font-bold text-healthcare-blue-700">AI Health Tip</h3>
                </div>
                <p className="text-sm text-healthcare-blue-600 mb-4">
                  Based on your recent activity, try drinking a glass of water every hour to improve hydration and energy levels.
                </p>
                <Button size="sm" variant="outline" className="glass-button">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get More Tips
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
