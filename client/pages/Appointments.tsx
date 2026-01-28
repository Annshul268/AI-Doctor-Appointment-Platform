import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Calendar,
  Clock,
  Video,
  Phone,
  User,
  MapPin,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  Download,
  Share,
  Bell,
  Star,
  MessageCircle,
  FileText,
  Stethoscope,
  Brain,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Appointment {
  id: string;
  doctor: {
    name: string;
    specialization: string;
    image: string;
    rating: number;
  };
  patient: {
    name: string;
    image: string;
  };
  date: Date;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  status: 'upcoming' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  location?: string;
  notes?: string;
  preDiagnosisReport?: string;
  symptoms?: string[];
  priority: 'low' | 'medium' | 'high';
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: '1',
      doctor: {
        name: 'Dr. Sarah Chen',
        specialization: 'Cardiologist',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
        rating: 4.9
      },
      patient: {
        name: 'John Smith',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '2:30 PM',
      duration: 30,
      type: 'video',
      status: 'confirmed',
      notes: 'Follow-up for chest pain symptoms',
      symptoms: ['chest pain', 'shortness of breath'],
      priority: 'high'
    },
    {
      id: '2',
      doctor: {
        name: 'Dr. Michael Rodriguez',
        specialization: 'Dermatologist',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
        rating: 4.8
      },
      patient: {
        name: 'Emily Johnson',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      duration: 45,
      type: 'in-person',
      status: 'upcoming',
      location: 'Westside Dermatology Clinic',
      notes: 'Skin rash examination',
      symptoms: ['skin rash', 'itching'],
      priority: 'medium'
    },
    {
      id: '3',
      doctor: {
        name: 'Dr. Lisa Thompson',
        specialization: 'Internal Medicine',
        image: 'https://images.unsplash.com/photo-1594824671323-a58b29cb8ff3?w=100&h=100&fit=crop&crop=face',
        rating: 4.7
      },
      patient: {
        name: 'David Wilson',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      time: '3:00 PM',
      duration: 30,
      type: 'video',
      status: 'completed',
      notes: 'Annual checkup completed successfully',
      priority: 'low'
    },
    {
      id: '4',
      doctor: {
        name: 'Dr. Amanda Wilson',
        specialization: 'Gastroenterologist',
        image: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=100&h=100&fit=crop&crop=face',
        rating: 4.9
      },
      patient: {
        name: 'Sarah Martinez',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      time: '11:30 AM',
      duration: 60,
      type: 'in-person',
      status: 'upcoming',
      location: 'City Medical Center',
      notes: 'Digestive issues consultation',
      symptoms: ['abdominal pain', 'nausea'],
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'confirmed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      case 'rescheduled': return 'text-orange-600 bg-orange-50 border-orange-200';
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

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const upcomingAppointments = filteredAppointments.filter(apt => 
    apt.status === 'upcoming' || apt.status === 'confirmed'
  );

  const pastAppointments = filteredAppointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  );

  const handleReschedule = (appointmentId: string) => {
    alert(`Rescheduling appointment ${appointmentId} - Calendar integration would be implemented here`);
  };

  const handleCancel = (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Appointment ${appointmentId} cancelled`);
    }
  };

  const handleJoinCall = (appointmentId: string) => {
    alert(`Joining video call for appointment ${appointmentId}`);
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
                <Calendar className="w-4 h-4" />
                <span>Appointments</span>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" className="glass-button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-2">
                My Appointments
              </h1>
              <p className="text-xl text-healthcare-blue-700/80">Manage your upcoming and past medical appointments</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/find-doctor">
                <Button className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-healthcare-blue-700">{upcomingAppointments.length}</p>
                  <p className="text-sm text-healthcare-blue-600">Upcoming</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-healthcare-blue-700">{pastAppointments.filter(a => a.status === 'completed').length}</p>
                  <p className="text-sm text-healthcare-blue-600">Completed</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-healthcare-blue-700">{appointments.filter(a => a.type === 'video').length}</p>
                  <p className="text-sm text-healthcare-blue-600">Video Calls</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-healthcare-teal-500 to-healthcare-green-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-healthcare-blue-700">4.8</p>
                  <p className="text-sm text-healthcare-blue-600">Avg Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500' : 'glass-button'}
                >
                  List View
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  onClick={() => setViewMode('calendar')}
                  className={viewMode === 'calendar' ? 'bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500' : 'glass-button'}
                >
                  Calendar View
                </Button>
              </div>
            </div>
          </div>

          {viewMode === 'list' ? (
            /* List View */
            <div className="space-y-8">
              {/* Upcoming Appointments */}
              {upcomingAppointments.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6">Upcoming Appointments</h2>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => {
                      const TypeIcon = getTypeIcon(appointment.type);
                      
                      return (
                        <div key={appointment.id} className="glass-card p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={appointment.doctor.image}
                                alt={appointment.doctor.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-healthcare-blue-200"
                              />
                              <div>
                                <h3 className="text-lg font-bold text-healthcare-blue-700">{appointment.doctor.name}</h3>
                                <p className="text-healthcare-blue-600">{appointment.doctor.specialization}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{appointment.date.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <TypeIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600 capitalize">{appointment.type.replace('-', ' ')}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(appointment.status)} mb-2`}>
                                  {appointment.status}
                                </div>
                                <div className={`px-3 py-1 text-xs rounded-full border ${getPriorityColor(appointment.priority)}`}>
                                  {appointment.priority} priority
                                </div>
                              </div>

                              <div className="flex flex-col space-y-2">
                                {appointment.type === 'video' && (
                                  <Button 
                                    onClick={() => handleJoinCall(appointment.id)}
                                    className="bg-gradient-to-r from-green-500 to-green-600"
                                  >
                                    <Video className="w-4 h-4 mr-2" />
                                    Join Call
                                  </Button>
                                )}
                                
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={() => handleReschedule(appointment.id)}
                                    variant="outline"
                                    size="sm"
                                    className="glass-button"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleCancel(appointment.id)}
                                    variant="outline"
                                    size="sm"
                                    className="glass-button text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => setSelectedAppointment(appointment)}
                                    variant="outline"
                                    size="sm"
                                    className="glass-button"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {appointment.location && (
                            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.location}</span>
                            </div>
                          )}

                          {appointment.symptoms && appointment.symptoms.length > 0 && (
                            <div className="mt-4 p-3 bg-healthcare-blue-50 rounded-lg border border-healthcare-blue-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <Brain className="w-4 h-4 text-healthcare-blue-500" />
                                <span className="text-sm font-semibold text-healthcare-blue-700">Symptoms</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {appointment.symptoms.map((symptom, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-healthcare-blue-100 text-healthcare-blue-700 text-xs rounded-full">
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Past Appointments */}
              {pastAppointments.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6">Past Appointments</h2>
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => {
                      const TypeIcon = getTypeIcon(appointment.type);
                      
                      return (
                        <div key={appointment.id} className="glass-card p-6 opacity-80">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={appointment.doctor.image}
                                alt={appointment.doctor.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-healthcare-blue-700">{appointment.doctor.name}</h3>
                                <p className="text-healthcare-blue-600">{appointment.doctor.specialization}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-500">{appointment.date.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <TypeIcon className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-500 capitalize">{appointment.type.replace('-', ' ')}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="glass-button"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Report
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="glass-button"
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Rate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Calendar View */
            <div className="glass-card p-8">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-healthcare-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-healthcare-blue-700 mb-2">Calendar View</h3>
                <p className="text-healthcare-blue-600 mb-6">
                  Interactive calendar view would be implemented here with full scheduling capabilities
                </p>
                <Button 
                  onClick={() => setViewMode('list')}
                  className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500"
                >
                  Switch to List View
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-healthcare-blue-700">Appointment Details</h2>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedAppointment.doctor.image}
                  alt={selectedAppointment.doctor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-healthcare-blue-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-healthcare-blue-700">{selectedAppointment.doctor.name}</h3>
                  <p className="text-healthcare-blue-600">{selectedAppointment.doctor.specialization}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(selectedAppointment.doctor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{selectedAppointment.doctor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-healthcare-blue-700 mb-3">Appointment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="text-healthcare-blue-700">{selectedAppointment.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="text-healthcare-blue-700">{selectedAppointment.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-healthcare-blue-700">{selectedAppointment.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-healthcare-blue-700 capitalize">{selectedAppointment.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(selectedAppointment.status)}`}>
                        {selectedAppointment.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-healthcare-blue-700 mb-3">Additional Info</h4>
                  <div className="space-y-2 text-sm">
                    {selectedAppointment.location && (
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="text-healthcare-blue-700">{selectedAppointment.location}</p>
                      </div>
                    )}
                    {selectedAppointment.notes && (
                      <div>
                        <span className="text-gray-600">Notes:</span>
                        <p className="text-healthcare-blue-700">{selectedAppointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {selectedAppointment.type === 'video' && (
                  <Button className="bg-gradient-to-r from-green-500 to-green-600">
                    <Video className="w-4 h-4 mr-2" />
                    Join Video Call
                  </Button>
                )}
                <Button variant="outline" className="glass-button">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" className="glass-button">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
