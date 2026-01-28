import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Clock,
  Star,
  Bell,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Video,
  Phone,
  User,
  Eye,
  Download,
  Share,
  CheckCircle,
  AlertCircle,
  XCircle,
  Brain,
  Camera,
  MessageCircle,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Zap
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  lastVisit: Date;
  nextAppointment?: Date;
  condition: string;
  priority: 'low' | 'medium' | 'high';
  aiInsights: string[];
}

interface Appointment {
  id: string;
  patient: Patient;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  duration: number;
  preDiagnosisReport?: string;
  symptoms: string[];
  aiAnalysis?: {
    confidence: number;
    recommendations: string[];
    urgency: 'low' | 'medium' | 'high';
  };
}

export default function DoctorDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState<Appointment | null>(null);

  // Mock data
  const doctorStats = {
    todayAppointments: 12,
    totalPatients: 847,
    avgRating: 4.9,
    completionRate: 98
  };

  const todayAppointments: Appointment[] = [
    {
      id: '1',
      patient: {
        id: '1',
        name: 'Sarah Johnson',
        age: 34,
        gender: 'Female',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        condition: 'Skin Rash Analysis',
        priority: 'medium',
        aiInsights: ['AI detected possible contact dermatitis', 'Recommended dermatology consultation', 'Upload included detailed image analysis']
      },
      time: '9:00 AM',
      type: 'video',
      status: 'upcoming',
      duration: 30,
      symptoms: ['skin rash', 'itching', 'redness'],
      preDiagnosisReport: 'Patient uploaded image showing inflammatory skin condition. AI analysis suggests contact dermatitis with 87% confidence.',
      aiAnalysis: {
        confidence: 87,
        recommendations: ['Topical anti-inflammatory treatment', 'Allergen avoidance counseling', 'Follow-up in 1 week'],
        urgency: 'medium'
      }
    },
    {
      id: '2',
      patient: {
        id: '2',
        name: 'Michael Chen',
        age: 45,
        gender: 'Male',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        condition: 'Follow-up Consultation',
        priority: 'low',
        aiInsights: ['Previous treatment showing positive response', 'Vital signs within normal range', 'Recommended routine follow-up']
      },
      time: '9:30 AM',
      type: 'in-person',
      status: 'completed',
      duration: 45,
      symptoms: ['follow-up', 'general checkup'],
      aiAnalysis: {
        confidence: 92,
        recommendations: ['Continue current treatment', 'Lifestyle modifications', 'Next appointment in 3 months'],
        urgency: 'low'
      }
    },
    {
      id: '3',
      patient: {
        id: '3',
        name: 'Emily Rodriguez',
        age: 28,
        gender: 'Female',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        lastVisit: new Date(),
        condition: 'AI Symptom Analysis',
        priority: 'high',
        aiInsights: ['AI flagged potential serious condition', 'Immediate consultation recommended', 'Multiple symptoms correlation detected']
      },
      time: '10:00 AM',
      type: 'video',
      status: 'in-progress',
      duration: 30,
      symptoms: ['chest pain', 'shortness of breath', 'fatigue'],
      preDiagnosisReport: 'AI analysis detected concerning symptom pattern. Patient reports chest discomfort and breathing difficulties.',
      aiAnalysis: {
        confidence: 94,
        recommendations: ['Immediate cardiac evaluation', 'ECG and chest X-ray', 'Consider emergency consultation'],
        urgency: 'high'
      }
    }
  ];

  const recentPatients: Patient[] = [
    {
      id: '4',
      name: 'David Wilson',
      age: 52,
      gender: 'Male',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      condition: 'Diabetes Management',
      priority: 'medium',
      aiInsights: ['Blood glucose trending upward', 'Medication compliance good', 'Diet modification suggested']
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      age: 36,
      gender: 'Female',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      lastVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      condition: 'Allergy Testing',
      priority: 'low',
      aiInsights: ['Seasonal allergies confirmed', 'Treatment plan effective', 'Preventive measures recommended']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in-progress': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'in-person': return User;
      default: return User;
    }
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
                Doctor Portal
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="glass-button relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</div>
              </Button>
              <Button variant="outline" className="glass-button">
                <Settings className="w-4 h-4" />
              </Button>
              <Link to="/">
                <Button variant="outline" className="glass-button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit Portal
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-2">
              Welcome back, Dr. Rodriguez
            </h1>
            <p className="text-xl text-healthcare-blue-700/80">Here's your practice overview for today</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-healthcare-blue-600 mb-1">Today's Appointments</p>
                  <p className="text-3xl font-bold text-healthcare-blue-700">{doctorStats.todayAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-healthcare-blue-600 mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-healthcare-blue-700">{doctorStats.totalPatients}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-healthcare-green-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-healthcare-blue-600 mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-healthcare-blue-700">{doctorStats.avgRating}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-healthcare-blue-600 mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-healthcare-blue-700">{doctorStats.completionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-healthcare-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Schedule */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-healthcare-blue-700">Today's Schedule</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="glass-button">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add Appointment
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {todayAppointments.map((appointment) => {
                    const TypeIcon = getTypeIcon(appointment.type);
                    
                    return (
                      <div 
                        key={appointment.id} 
                        className="bg-white/60 rounded-xl p-6 border border-healthcare-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => setShowAppointmentDetails(appointment)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.patient.avatar}
                              alt={appointment.patient.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-healthcare-blue-200"
                            />
                            <div>
                              <h3 className="font-semibold text-healthcare-blue-700">{appointment.patient.name}</h3>
                              <p className="text-sm text-healthcare-blue-600">{appointment.patient.condition}</p>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-xs text-gray-500">{appointment.time}</span>
                                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(appointment.patient.priority)}`}>
                                  {appointment.patient.priority} priority
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {appointment.aiAnalysis && (
                              <div className="flex items-center space-x-1 px-3 py-1 bg-healthcare-blue-50 rounded-full">
                                <Brain className="w-4 h-4 text-healthcare-blue-500" />
                                <span className="text-xs text-healthcare-blue-600">{appointment.aiAnalysis.confidence}% AI</span>
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-1">
                              <TypeIcon className="w-4 h-4 text-healthcare-blue-500" />
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{appointment.duration}m</span>
                            </div>
                            
                            <Button variant="outline" size="sm" className="glass-button">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* AI Insights Preview */}
                        {appointment.patient.aiInsights && (
                          <div className="mt-4 p-3 bg-healthcare-blue-50 rounded-lg border border-healthcare-blue-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="w-4 h-4 text-healthcare-blue-500" />
                              <span className="text-sm font-semibold text-healthcare-blue-700">AI Insights</span>
                            </div>
                            <ul className="text-sm text-healthcare-blue-600 space-y-1">
                              {appointment.patient.aiInsights.slice(0, 2).map((insight, idx) => (
                                <li key={idx}>• {insight}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Analytics Dashboard */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6">AI Analytics & Insights</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-healthcare-blue-50 rounded-lg p-4 border border-healthcare-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Brain className="w-6 h-6 text-healthcare-blue-500" />
                      <h3 className="font-semibold text-healthcare-blue-700">AI Accuracy</h3>
                    </div>
                    <div className="text-2xl font-bold text-healthcare-blue-600 mb-1">94%</div>
                    <p className="text-sm text-healthcare-blue-600">Diagnostic accuracy this month</p>
                  </div>

                  <div className="bg-healthcare-green-50 rounded-lg p-4 border border-healthcare-green-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Camera className="w-6 h-6 text-healthcare-green-500" />
                      <h3 className="font-semibold text-healthcare-green-700">Image Analysis</h3>
                    </div>
                    <div className="text-2xl font-bold text-healthcare-green-600 mb-1">156</div>
                    <p className="text-sm text-healthcare-green-600">Images analyzed this week</p>
                  </div>

                  <div className="bg-healthcare-teal-50 rounded-lg p-4 border border-healthcare-teal-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Zap className="w-6 h-6 text-healthcare-teal-500" />
                      <h3 className="font-semibold text-healthcare-teal-700">Time Saved</h3>
                    </div>
                    <div className="text-2xl font-bold text-healthcare-teal-600 mb-1">4.2h</div>
                    <p className="text-sm text-healthcare-teal-600">Average time saved daily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-healthcare-blue-700 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 justify-start">
                    <Video className="w-4 h-4 mr-3" />
                    Start Video Call
                  </Button>
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <FileText className="w-4 h-4 mr-3" />
                    Create Report
                  </Button>
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <Users className="w-4 h-4 mr-3" />
                    View All Patients
                  </Button>
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Analytics
                  </Button>
                </div>
              </div>

              {/* Recent Patients */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-healthcare-blue-700 mb-4">Recent Patients</h3>
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div 
                      key={patient.id} 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-healthcare-blue-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-healthcare-blue-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-healthcare-blue-700 text-sm">{patient.name}</h4>
                        <p className="text-xs text-healthcare-blue-600">{patient.condition}</p>
                        <p className="text-xs text-gray-500">{patient.lastVisit.toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(patient.priority)}`}>
                        {patient.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-healthcare-blue-700 mb-4">AI Recommendations</h3>
                <div className="space-y-4">
                  <div className="bg-healthcare-blue-50 rounded-lg p-4 border border-healthcare-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-healthcare-blue-500" />
                      <span className="text-sm font-semibold text-healthcare-blue-700">Pattern Detected</span>
                    </div>
                    <p className="text-sm text-healthcare-blue-600">
                      Increased skin condition cases this week. Consider allergy screening protocols.
                    </p>
                  </div>
                  
                  <div className="bg-healthcare-green-50 rounded-lg p-4 border border-healthcare-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-healthcare-green-500" />
                      <span className="text-sm font-semibold text-healthcare-green-700">Efficiency Tip</span>
                    </div>
                    <p className="text-sm text-healthcare-green-600">
                      Your diagnostic accuracy improved 5% this month with AI assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {showAppointmentDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-healthcare-blue-700">Appointment Details</h2>
                <button
                  onClick={() => setShowAppointmentDetails(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={showAppointmentDetails.patient.avatar}
                  alt={showAppointmentDetails.patient.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-healthcare-blue-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-healthcare-blue-700">{showAppointmentDetails.patient.name}</h3>
                  <p className="text-healthcare-blue-600">{showAppointmentDetails.patient.age} years old, {showAppointmentDetails.patient.gender}</p>
                  <p className="text-sm text-gray-500">Last visit: {showAppointmentDetails.patient.lastVisit.toLocaleDateString()}</p>
                </div>
              </div>

              {/* AI Analysis */}
              {showAppointmentDetails.aiAnalysis && (
                <div className="bg-healthcare-blue-50 rounded-lg p-6 border border-healthcare-blue-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-healthcare-blue-500" />
                    <h4 className="text-lg font-bold text-healthcare-blue-700">AI Analysis Report</h4>
                    <span className="px-3 py-1 bg-healthcare-blue-500 text-white text-sm rounded-full">
                      {showAppointmentDetails.aiAnalysis.confidence}% Confidence
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-healthcare-blue-700 mb-2">Symptoms Analyzed</h5>
                      <ul className="text-sm text-healthcare-blue-600 space-y-1">
                        {showAppointmentDetails.symptoms.map((symptom, idx) => (
                          <li key={idx}>• {symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-healthcare-blue-700 mb-2">AI Recommendations</h5>
                      <ul className="text-sm text-healthcare-blue-600 space-y-1">
                        {showAppointmentDetails.aiAnalysis.recommendations.map((rec, idx) => (
                          <li key={idx}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Pre-diagnosis Report */}
              {showAppointmentDetails.preDiagnosisReport && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-healthcare-blue-700 mb-3">Pre-Diagnosis Report</h4>
                  <p className="text-healthcare-blue-600 leading-relaxed">{showAppointmentDetails.preDiagnosisReport}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                  <Video className="w-4 h-4 mr-2" />
                  Start Consultation
                </Button>
                <Button variant="outline" className="glass-button">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
                <Button variant="outline" className="glass-button">
                  <Download className="w-4 h-4 mr-2" />
                  Download AI Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
