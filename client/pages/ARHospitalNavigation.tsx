import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Navigation, Camera, Route, Clock, Users, Zap, Search, Phone, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ARHospitalNavigation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickDestinations = [
    { name: "Emergency Room", floor: "Ground Floor", time: "2 min", icon: "🚨" },
    { name: "Cardiology", floor: "3rd Floor", time: "5 min", icon: "❤️" },
    { name: "Pharmacy", floor: "Ground Floor", time: "3 min", icon: "💊" },
    { name: "Radiology", floor: "2nd Floor", time: "4 min", icon: "📸" },
    { name: "Laboratory", floor: "1st Floor", time: "3 min", icon: "🔬" },
    { name: "Cafeteria", floor: "Ground Floor", time: "2 min", icon: "🍽️" },
  ];

  const nearbyServices = [
    { name: "Patient Information", distance: "15m", type: "Information Desk" },
    { name: "Restrooms", distance: "30m", type: "Facilities" },
    { name: "ATM", distance: "45m", type: "Banking" },
    { name: "Gift Shop", distance: "60m", type: "Retail" },
  ];

  const arFeatures = [
    { title: "Real-time Directions", description: "Follow AR arrows overlaid on your camera view", icon: Navigation },
    { title: "Point & Identify", description: "Point your camera at signs to get instant translations", icon: Camera },
    { title: "Wait Time Display", description: "See live wait times floating above department entrances", icon: Clock },
    { title: "Emergency Alerts", description: "Receive AR notifications for emergency procedures", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-cyan-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AR Hospital Navigation</h1>
                <p className="text-sm text-gray-600">Navigate hospitals with augmented reality guidance</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
              AR Ready
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-6">
            <Navigation className="h-8 w-8 text-cyan-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AR-Powered Hospital Navigation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Never get lost in a hospital again. Use your smartphone camera to see AR directions, 
            department information, and real-time guidance overlaid on the real world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Camera className="h-4 w-4 mr-2" />
              Start AR Navigation
            </Button>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              View Map
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Navigation Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search & Quick Access */}
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-cyan-600" />
                  Find Your Destination
                </CardTitle>
                <CardDescription>
                  Search for departments, doctors, or services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Search departments, doctors, or services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Destinations</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {quickDestinations.map((dest, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 flex items-center gap-3 hover:bg-cyan-50"
                      >
                        <span className="text-2xl">{dest.icon}</span>
                        <div className="text-left">
                          <p className="font-medium">{dest.name}</p>
                          <p className="text-sm text-gray-600">{dest.floor} • {dest.time}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AR Camera View Simulation */}
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  AR Camera View
                </CardTitle>
                <CardDescription>
                  Live augmented reality navigation interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
                  
                  {/* AR Overlay Elements */}
                  <div className="absolute top-4 left-4 bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    AR Mode Active
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cyan-500/80 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Navigation className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-white font-medium">Turn left ahead</p>
                      <p className="text-cyan-200 text-sm">Cardiology - 50m</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">ETA: 3 minutes</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Low Wait Time</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Enable Camera
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Route className="h-4 w-4 mr-2" />
                    Alternative Route
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AR Features */}
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  AR Navigation Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {arFeatures.map((feature, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg border border-cyan-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                          <feature.icon className="h-4 w-4 text-cyan-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4 bg-green-50 rounded-lg mb-4">
                  <p className="text-lg font-semibold text-green-900">Main Entrance</p>
                  <p className="text-sm text-green-600">Ground Floor, Section A</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span className="text-sm">GPS Signal: Strong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">AR Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Indoor Positioning: Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  Nearby Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nearbyServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-cyan-100">
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-cyan-600">{service.distance}</p>
                        <Button variant="ghost" size="sm">
                          <Navigation className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  Emergency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Zap className="h-4 w-4 mr-2" />
                    Emergency Help
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    <p>In case of emergency, this will:</p>
                    <ul className="text-xs text-left mt-2 space-y-1">
                      <li>• Guide you to nearest emergency room</li>
                      <li>• Alert hospital security</li>
                      <li>• Call emergency services</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-cyan-100">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Check Wait Times
                </Button>
                <Button className="w-full" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Hospital Directory
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How AR Navigation Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-cyan-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Open Camera</h4>
              <p className="text-gray-600">Launch the AR navigation feature and point your camera at your surroundings.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Follow AR Arrows</h4>
              <p className="text-gray-600">See directional arrows and information overlaid on your camera view in real-time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Arrive at Destination</h4>
              <p className="text-gray-600">Get notified when you arrive and receive additional information about your destination.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARHospitalNavigation;
