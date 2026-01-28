import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Clock, 
  AlertTriangle,
  Shield,
  Radio,
  Zap,
  User,
  FileText,
  Stethoscope,
  Ambulance,
  Navigation,
  Battery,
  Wifi,
  WifiOff,
  Volume2,
  Camera,
  Mic,
  MessageCircle,
  Share,
  Copy,
  CheckCircle
} from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'ambulance' | 'emergency';
  phone: string;
  distance: number;
  eta: string;
  available: boolean;
  specialization?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
  address?: string;
}

export default function Emergency() {
  const [emergencyActivated, setEmergencyActivated] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState(5);
  const [isRecording, setIsRecording] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [shareableLink, setShareableLink] = useState("");

  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get battery level if supported
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
      });
    }

    // Mock emergency contacts
    setEmergencyContacts([
      {
        id: '1',
        name: 'City Emergency Services',
        type: 'emergency',
        phone: '911',
        distance: 0.8,
        eta: '3-5 min',
        available: true
      },
      {
        id: '2',
        name: 'Dr. Sarah Chen (On-Call)',
        type: 'doctor',
        phone: '+1-555-0123',
        distance: 2.1,
        eta: '8-12 min',
        available: true,
        specialization: 'Emergency Medicine'
      },
      {
        id: '3',
        name: 'Memorial Hospital ER',
        type: 'hospital',
        phone: '+1-555-0199',
        distance: 1.5,
        eta: '5-8 min',
        available: true
      },
      {
        id: '4',
        name: 'FastCare Ambulance',
        type: 'ambulance',
        phone: '+1-555-0911',
        distance: 1.2,
        eta: '4-7 min',
        available: true
      }
    ]);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const activateEmergency = () => {
    setEmergencyActivated(true);
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date()
          };
          setLocation(locationData);
          
          // Generate shareable emergency link
          const emergencyLink = `https://emergency.aihealthcare.com/locate?lat=${locationData.latitude}&lng=${locationData.longitude}&emergency=true&user=sarah_j&time=${Date.now()}`;
          setShareableLink(emergencyLink);
          
          // Simulate reverse geocoding
          setTimeout(() => {
            setLocation(prev => prev ? {
              ...prev,
              address: "1234 Main Street, Downtown, San Francisco, CA 94105"
            } : null);
          }, 2000);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get location. Please ensure location services are enabled.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }

    // Simulate countdown timer
    const timer = setInterval(() => {
      setResponseTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const copyEmergencyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Emergency link copied to clipboard!");
  };

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      if (!isRecording) {
        setIsRecording(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setEmergencyMessage(transcript);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };
      } else {
        recognition.stop();
        setIsRecording(false);
      }
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'doctor': return Stethoscope;
      case 'hospital': return Heart;
      case 'ambulance': return Ambulance;
      case 'emergency': return AlertTriangle;
      default: return Phone;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20 bg-red-50/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Emergency Mode
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                {isConnected ? (
                  <div className="flex items-center text-green-600">
                    <Wifi className="w-4 h-4 mr-1" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <WifiOff className="w-4 h-4 mr-1" />
                    <span>Offline Mode</span>
                  </div>
                )}
                {batteryLevel !== null && (
                  <div className="flex items-center text-gray-600">
                    <Battery className="w-4 h-4 mr-1" />
                    <span>{batteryLevel}%</span>
                  </div>
                )}
              </div>
              
              {!emergencyActivated && (
                <Link to="/">
                  <Button variant="outline" className="glass-button">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-4xl">
          {!emergencyActivated ? (
            /* Emergency Activation Screen */
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <AlertTriangle className="w-16 h-16 text-white" />
                </div>
                
                <h1 className="text-4xl font-bold text-red-600 mb-4">Emergency Mode</h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                  Get immediate medical help when you need it most. Our AI-powered emergency system will:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
                  <div className="glass-card p-6 text-left">
                    <MapPin className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Share Your Location</h3>
                    <p className="text-sm text-gray-600">Instantly share your precise location with emergency responders</p>
                  </div>
                  
                  <div className="glass-card p-6 text-left">
                    <Stethoscope className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Alert Nearest Doctors</h3>
                    <p className="text-sm text-gray-600">Notify available doctors and medical facilities in your area</p>
                  </div>
                  
                  <div className="glass-card p-6 text-left">
                    <FileText className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Share Medical History</h3>
                    <p className="text-sm text-gray-600">Provide essential health information to first responders</p>
                  </div>
                  
                  <div className="glass-card p-6 text-left">
                    <Radio className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Real-time Updates</h3>
                    <p className="text-sm text-gray-600">Get live updates on response times and help status</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={activateEmergency}
                  className="w-64 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl shadow-2xl animate-pulse hover:animate-none"
                >
                  🚨 ACTIVATE EMERGENCY
                </Button>
                
                <p className="text-sm text-gray-500">
                  For life-threatening emergencies, always call 911 first
                </p>
              </div>
            </div>
          ) : (
            /* Active Emergency Screen */
            <div className="space-y-6">
              {/* Emergency Status Header */}
              <div className="glass-card p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-red-600">EMERGENCY ACTIVATED</h1>
                      <p className="text-red-500">Help is on the way</p>
                    </div>
                  </div>
                  
                  {responseTime > 0 ? (
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      {Math.floor(responseTime / 60)}:{(responseTime % 60).toString().padStart(2, '0')}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      <CheckCircle className="w-8 h-8 inline mr-2" />
                      Help Has Arrived
                    </div>
                  )}
                  <p className="text-gray-600">Estimated response time</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Location & Emergency Info */}
                <div className="space-y-6">
                  {/* Location Card */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Your Location</h3>
                      <Button
                        onClick={copyEmergencyLink}
                        variant="outline"
                        size="sm"
                        className="glass-button"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Share Link
                      </Button>
                    </div>
                    
                    {location ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-red-500" />
                          <span className="text-sm text-gray-700">
                            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                          </span>
                        </div>
                        
                        {location.address && (
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-sm text-red-700">{location.address}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Accuracy: ±{Math.round(location.accuracy)}m</span>
                          <span>Updated: {location.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3 text-gray-600">
                        <div className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
                        <span>Getting your location...</span>
                      </div>
                    )}
                  </div>

                  {/* Emergency Message */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Emergency Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={startVoiceRecording}
                          variant="outline"
                          className={`flex-1 ${isRecording ? 'bg-red-50 border-red-200 text-red-600' : 'glass-button'}`}
                        >
                          {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                          {isRecording ? 'Stop Recording' : 'Record Message'}
                        </Button>
                        <Button variant="outline" className="glass-button">
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <textarea
                        value={emergencyMessage}
                        onChange={(e) => setEmergencyMessage(e.target.value)}
                        placeholder="Describe your emergency situation..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        rows={3}
                      />
                      
                      {isRecording && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">Recording voice message...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Emergency Contacts</h3>
                  
                  <div className="space-y-4">
                    {emergencyContacts.map((contact) => {
                      const Icon = getContactIcon(contact.type);
                      
                      return (
                        <div key={contact.id} className="bg-white/60 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                                {contact.specialization && (
                                  <p className="text-sm text-gray-600">{contact.specialization}</p>
                                )}
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>{contact.distance} miles</span>
                                  <span>ETA: {contact.eta}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </Button>
                            </div>
                          </div>
                          
                          {contact.available ? (
                            <div className="mt-2 flex items-center text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Available & Notified
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              Unavailable
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Emergency Alert Sent</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      All nearby medical professionals have been notified of your emergency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => window.open('tel:911', '_self')}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 911
                </Button>
                
                <Button
                  onClick={() => setEmergencyActivated(false)}
                  variant="outline"
                  className="glass-button"
                >
                  Cancel Emergency
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
