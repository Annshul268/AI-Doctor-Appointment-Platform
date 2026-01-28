import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar,
  Clock,
  Star,
  Filter,
  Mic,
  Brain,
  Zap,
  Video,
  Phone,
  User,
  Award,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Users,
  BookOpen,
  Timer,
  Medal
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  subSpecialty?: string;
  rating: number;
  reviewCount: number;
  experience: number;
  education: string[];
  languages: string[];
  consultationFee: number;
  location: string;
  distance: number;
  availability: {
    today: boolean;
    nextAvailable: string;
    timeSlots: string[];
  };
  consultationTypes: ('in-person' | 'video' | 'phone')[];
  aiMatch: {
    score: number;
    reasoning: string[];
    confidence: number;
  };
  achievements: string[];
  image: string;
  verified: boolean;
  responseTime: string;
}

export default function FindDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedConsultationType, setSelectedConsultationType] = useState("all");
  const [sortBy, setSortBy] = useState("ai-match");
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingStep, setBookingStep] = useState(0);

  // Mock data - In real app, this would come from API
  useEffect(() => {
    const mockDoctors: Doctor[] = [
      {
        id: "1",
        name: "Dr. Sarah Chen",
        specialization: "Cardiologist",
        subSpecialty: "Interventional Cardiology",
        rating: 4.9,
        reviewCount: 847,
        experience: 15,
        education: ["Harvard Medical School", "Mayo Clinic Fellowship"],
        languages: ["English", "Mandarin", "Spanish"],
        consultationFee: 250,
        location: "Downtown Medical Center",
        distance: 2.3,
        availability: {
          today: true,
          nextAvailable: "Today, 2:30 PM",
          timeSlots: ["2:30 PM", "4:00 PM", "5:30 PM"]
        },
        consultationTypes: ["in-person", "video"],
        aiMatch: {
          score: 95,
          reasoning: [
            "Expert in cardiovascular conditions",
            "High success rate with similar cases",
            "Available for immediate consultation"
          ],
          confidence: 0.95
        },
        achievements: ["Top Doctor 2023", "Research Excellence Award", "Patient Choice Award"],
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
        verified: true,
        responseTime: "< 5 minutes"
      },
      {
        id: "2",
        name: "Dr. Michael Rodriguez",
        specialization: "Dermatologist",
        subSpecialty: "Pediatric Dermatology",
        rating: 4.8,
        reviewCount: 623,
        experience: 12,
        education: ["Stanford Medical School", "UCSF Dermatology Residency"],
        languages: ["English", "Spanish"],
        consultationFee: 200,
        location: "Westside Dermatology Clinic",
        distance: 4.7,
        availability: {
          today: false,
          nextAvailable: "Tomorrow, 10:00 AM",
          timeSlots: ["10:00 AM", "11:30 AM", "2:00 PM"]
        },
        consultationTypes: ["in-person", "video", "phone"],
        aiMatch: {
          score: 88,
          reasoning: [
            "Specializes in skin conditions",
            "Excellent patient reviews",
            "Telemedicine available"
          ],
          confidence: 0.88
        },
        achievements: ["Dermatology Excellence Award", "Telehealth Pioneer"],
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
        verified: true,
        responseTime: "< 10 minutes"
      },
      {
        id: "3",
        name: "Dr. Emily Johnson",
        specialization: "Neurologist",
        subSpecialty: "Headache Medicine",
        rating: 4.9,
        reviewCount: 392,
        experience: 18,
        education: ["Johns Hopkins Medical School", "Cleveland Clinic Fellowship"],
        languages: ["English", "French"],
        consultationFee: 300,
        location: "Neuroscience Institute",
        distance: 6.2,
        availability: {
          today: true,
          nextAvailable: "Today, 3:00 PM",
          timeSlots: ["3:00 PM", "4:30 PM"]
        },
        consultationTypes: ["in-person", "video"],
        aiMatch: {
          score: 92,
          reasoning: [
            "Headache specialist",
            "Advanced neurological expertise",
            "Same-day availability"
          ],
          confidence: 0.92
        },
        achievements: ["Neurologist of the Year", "Research Publication Leader"],
        image: "https://images.unsplash.com/photo-1594824671323-a58b29cb8ff3?w=300&h=300&fit=crop&crop=face",
        verified: true,
        responseTime: "< 15 minutes"
      }
    ];

    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  // Filter and sort doctors
  useEffect(() => {
    let filtered = doctors;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.subSpecialty?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Specialty filter
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(doctor => 
        doctor.specialization.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "ai-match":
        filtered.sort((a, b) => b.aiMatch.score - a.aiMatch.score);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case "availability":
        filtered.sort((a, b) => (b.availability.today ? 1 : 0) - (a.availability.today ? 1 : 0));
        break;
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, selectedSpecialty, sortBy]);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isVoiceSearch) {
        setIsVoiceSearch(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setIsVoiceSearch(false);
        };

        recognition.onerror = () => {
          setIsVoiceSearch(false);
        };

        recognition.onend = () => {
          setIsVoiceSearch(false);
        };
      }
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  const handleBookNow = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep(1);
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      default: return User;
    }
  };

  const getAIMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-healthcare-blue-600 bg-healthcare-blue-50 border-healthcare-blue-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
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
                <Brain className="w-4 h-4" />
                <span>AI-Powered Doctor Matching</span>
              </div>
              <Link to="/">
                <Button variant="outline" className="glass-button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-4">
              Find Your Perfect Doctor
            </h1>
            <p className="text-xl text-healthcare-blue-700/80 max-w-2xl mx-auto">
              AI-powered matching finds the best specialists for your needs with real-time availability
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 focus:border-transparent placeholder-gray-400 bg-white/50 backdrop-blur-sm"
                    placeholder="Search by name, specialty, or condition..."
                  />
                  <button
                    onClick={handleVoiceSearch}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${isVoiceSearch ? 'text-red-500' : 'text-gray-400 hover:text-healthcare-blue-500'}`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                </div>
                {isVoiceSearch && (
                  <p className="text-sm text-healthcare-blue-600 mt-2 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    Listening for voice search...
                  </p>
                )}
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 bg-white/80"
                >
                  <option value="all">All Specialties</option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="pediatrician">Pediatrician</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 bg-white/80"
                >
                  <option value="ai-match">AI Match Score</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest</option>
                  <option value="availability">Available Today</option>
                </select>

                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="glass-button"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                    <select
                      value={selectedConsultationType}
                      onChange={(e) => setSelectedConsultationType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 bg-white/80"
                    >
                      <option value="all">All Types</option>
                      <option value="in-person">In-Person</option>
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 bg-white/80"
                    >
                      <option value="all">All Locations</option>
                      <option value="downtown">Downtown</option>
                      <option value="westside">Westside</option>
                      <option value="online">Online Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 bg-white/80">
                      <option value="all">All Insurance</option>
                      <option value="aetna">Aetna</option>
                      <option value="bluecross">Blue Cross</option>
                      <option value="kaiser">Kaiser</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="glass-card p-6 mb-8 bg-gradient-to-r from-healthcare-blue-50 to-healthcare-teal-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-healthcare-blue-700">AI Recommendations</h3>
                <p className="text-sm text-healthcare-blue-600">Based on your health profile and preferences</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-lg p-4">
                <Zap className="w-6 h-6 text-healthcare-blue-500 mb-2" />
                <h4 className="font-semibold text-healthcare-blue-700 mb-1">Best Match</h4>
                <p className="text-sm text-healthcare-blue-600">Dr. Sarah Chen - 95% compatibility</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <Clock className="w-6 h-6 text-healthcare-green-500 mb-2" />
                <h4 className="font-semibold text-healthcare-green-700 mb-1">Available Today</h4>
                <p className="text-sm text-healthcare-green-600">3 specialists with same-day slots</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <Target className="w-6 h-6 text-healthcare-teal-500 mb-2" />
                <h4 className="font-semibold text-healthcare-teal-700 mb-1">Near You</h4>
                <p className="text-sm text-healthcare-teal-600">2.3 miles from your location</p>
              </div>
            </div>
          </div>

          {/* Doctor Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-healthcare-blue-700">
                {filteredDoctors.length} Specialists Found
              </h2>
              <div className="text-sm text-healthcare-blue-600">
                Sorted by {sortBy.replace('-', ' ')}
              </div>
            </div>

            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="glass-card p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-xl object-cover border-2 border-healthcare-blue-200"
                        />
                        {doctor.verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-healthcare-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-healthcare-blue-700">{doctor.name}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAIMatchColor(doctor.aiMatch.score)}`}>
                            {doctor.aiMatch.score}% AI Match
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-healthcare-blue-600">{doctor.specialization}</span>
                            {doctor.subSpecialty && (
                              <span className="text-sm text-healthcare-blue-500">• {doctor.subSpecialty}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-semibold">{doctor.rating}</span>
                              <span>({doctor.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="w-4 h-4 text-healthcare-blue-500" />
                              <span>{doctor.experience} years exp.</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-healthcare-green-500" />
                              <span>{doctor.distance} miles away</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="mt-4 p-3 bg-healthcare-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-healthcare-blue-500" />
                        <span className="text-sm font-semibold text-healthcare-blue-700">Why AI recommends this doctor:</span>
                      </div>
                      <ul className="text-sm text-healthcare-blue-600 space-y-1">
                        {doctor.aiMatch.reasoning.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Doctor Details */}
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-healthcare-blue-700 mb-2">Education & Achievements</h4>
                        <div className="space-y-1">
                          {doctor.education.slice(0, 2).map((edu, idx) => (
                            <div key={idx} className="text-sm text-healthcare-blue-600">• {edu}</div>
                          ))}
                          {doctor.achievements.slice(0, 2).map((achievement, idx) => (
                            <div key={idx} className="text-sm text-healthcare-green-600 flex items-center">
                              <Medal className="w-3 h-3 mr-1" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthcare-blue-700 mb-2">Languages & Response</h4>
                        <div className="space-y-1">
                          <div className="text-sm text-healthcare-blue-600">
                            <Globe className="w-3 h-3 inline mr-1" />
                            {doctor.languages.join(', ')}
                          </div>
                          <div className="text-sm text-healthcare-green-600">
                            <Timer className="w-3 h-3 inline mr-1" />
                            Responds in {doctor.responseTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Section */}
                  <div className="lg:w-80">
                    <div className="glass border border-healthcare-blue-200 rounded-xl p-4">
                      {/* Availability */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-healthcare-blue-700">Availability</span>
                          {doctor.availability.today && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Available Today</span>
                          )}
                        </div>
                        <p className="text-sm text-healthcare-blue-600 mb-2">
                          Next: {doctor.availability.nextAvailable}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {doctor.availability.timeSlots.slice(0, 3).map((slot, idx) => (
                            <span key={idx} className="text-xs bg-healthcare-blue-50 text-healthcare-blue-600 px-2 py-1 rounded border">
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Consultation Types */}
                      <div className="mb-4">
                        <span className="font-semibold text-healthcare-blue-700 block mb-2">Consultation Options</span>
                        <div className="flex space-x-3">
                          {doctor.consultationTypes.map((type, idx) => {
                            const Icon = getConsultationIcon(type);
                            return (
                              <div key={idx} className="flex items-center space-x-1 text-xs text-healthcare-blue-600">
                                <Icon className="w-3 h-3" />
                                <span className="capitalize">{type.replace('-', ' ')}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-healthcare-blue-700">Consultation Fee</span>
                          <span className="text-xl font-bold text-healthcare-blue-600">${doctor.consultationFee}</span>
                        </div>
                        <p className="text-xs text-gray-500">Insurance coverage may apply</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={() => handleBookNow(doctor)}
                          className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="glass-button">
                            <User className="w-4 h-4 mr-1" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm" className="glass-button">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Reviews
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDoctors.length === 0 && (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                  setSelectedLocation("all");
                }}
                variant="outline"
                className="glass-button"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Booking Modal */}
      {selectedDoctor && bookingStep > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-healthcare-blue-700">Book Appointment</h3>
              <button
                onClick={() => {setSelectedDoctor(null); setBookingStep(0);}}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                ×
              </button>
            </div>
            
            <div className="text-center">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h4 className="font-semibold text-healthcare-blue-700">{selectedDoctor.name}</h4>
              <p className="text-sm text-healthcare-blue-600 mb-4">{selectedDoctor.specialization}</p>
              
              <div className="space-y-3">
                {selectedDoctor.availability.timeSlots.map((slot, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full glass-button hover:bg-healthcare-blue-50"
                  >
                    {slot} - ${selectedDoctor.consultationFee}
                  </Button>
                ))}
              </div>
              
              <Button
                className="w-full mt-4 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500"
                onClick={() => {
                  alert("Booking confirmed! (Demo)");
                  setSelectedDoctor(null);
                  setBookingStep(0);
                }}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
