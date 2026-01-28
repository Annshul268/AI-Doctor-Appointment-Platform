import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, TrendingUp, MapPin, AlertTriangle, Heart, Activity, Shield, BarChart3, Globe, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityHealthInsights = () => {
  const healthTrends = [
    { condition: "Flu Cases", current: 156, change: "+23%", status: "rising", color: "text-red-600" },
    { condition: "Allergy Symptoms", current: 89, change: "-12%", status: "declining", color: "text-green-600" },
    { condition: "Mental Health", current: 234, change: "+8%", status: "rising", color: "text-yellow-600" },
    { condition: "Diabetes Checkups", current: 67, change: "+15%", status: "rising", color: "text-blue-600" },
  ];

  const communityStats = [
    { label: "Active Users", value: "12,485", icon: Users, color: "bg-blue-500" },
    { label: "Health Reports", value: "3,247", icon: BarChart3, color: "bg-green-500" },
    { label: "Prevention Programs", value: "18", icon: Shield, color: "bg-purple-500" },
    { label: "Success Rate", value: "94.2%", icon: Target, color: "bg-orange-500" },
  ];

  const localAlerts = [
    { type: "High Air Quality Index", level: "Moderate", area: "Downtown", color: "bg-yellow-500" },
    { type: "Flu Outbreak", level: "Low Risk", area: "Northside", color: "bg-orange-500" },
    { type: "Vaccination Drive", level: "Active", area: "Community Center", color: "bg-green-500" },
    { type: "Mental Health Resources", level: "Available", area: "Multiple Locations", color: "bg-blue-500" },
  ];

  const preventionPrograms = [
    { 
      title: "Heart Health Initiative", 
      participants: 2847, 
      completion: 78, 
      description: "Community-wide cardiovascular health improvement program",
      category: "Cardiology"
    },
    { 
      title: "Diabetes Prevention", 
      participants: 1923, 
      completion: 85, 
      description: "Early intervention and lifestyle modification program",
      category: "Endocrinology"
    },
    { 
      title: "Mental Wellness Campaign", 
      participants: 3456, 
      completion: 67, 
      description: "Community mental health awareness and support initiative",
      category: "Mental Health"
    },
    { 
      title: "Vaccination Outreach", 
      participants: 5632, 
      completion: 92, 
      description: "Comprehensive immunization program for all age groups",
      category: "Public Health"
    },
  ];

  const healthcareProviders = [
    { name: "Central Medical Center", rating: 4.8, specialties: ["Emergency", "Cardiology"], distance: "0.8 mi" },
    { name: "Community Health Clinic", rating: 4.6, specialties: ["Primary Care", "Pediatrics"], distance: "1.2 mi" },
    { name: "Wellness Family Practice", rating: 4.7, specialties: ["Family Medicine", "Preventive Care"], distance: "1.5 mi" },
    { name: "Advanced Diagnostic Center", rating: 4.9, specialties: ["Radiology", "Lab Services"], distance: "2.1 mi" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Community Health Insights</h1>
                <p className="text-sm text-gray-600">Real-time health trends and community wellness data</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Live Data
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Community Health Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay informed about local health trends, participate in community wellness programs, 
            and access real-time insights that help keep your community healthy and safe.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Health Trends</TabsTrigger>
            <TabsTrigger value="alerts">Local Alerts</TabsTrigger>
            <TabsTrigger value="programs">Prevention Programs</TabsTrigger>
            <TabsTrigger value="providers">Healthcare Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/70 backdrop-blur-sm border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Current Health Trends
                    </CardTitle>
                    <CardDescription>
                      Real-time analysis of health conditions in your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {healthTrends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-green-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Activity className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{trend.condition}</h4>
                              <p className="text-sm text-gray-600">{trend.current} reported cases</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={trend.status === 'rising' ? 'destructive' : 'default'}
                              className="mb-1"
                            >
                              {trend.status}
                            </Badge>
                            <p className={`text-sm font-medium ${trend.color}`}>{trend.change}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-white/70 backdrop-blur-sm border-green-100 mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Your Area
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-lg font-semibold text-blue-900">Downtown District</p>
                        <p className="text-sm text-blue-600">Health Score: 8.2/10</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Air Quality</span>
                          <span className="text-green-600">Good</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Water Quality</span>
                          <span className="text-green-600">Excellent</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Healthcare Access</span>
                          <span className="text-blue-600">High</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Emergency Response</span>
                          <span className="text-green-600">Fast</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      Community Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Vaccination Rate Goal</p>
                      <div className="text-2xl font-bold text-green-600 mb-2">87%</div>
                      <Progress value={87} className="mb-2" />
                      <p className="text-xs text-gray-500">Target: 90% by month end</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Local Health Alerts
                </CardTitle>
                <CardDescription>
                  Stay informed about health advisories and opportunities in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {localAlerts.map((alert, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 ${alert.color} rounded-full`}></div>
                        <h4 className="font-semibold text-gray-900">{alert.type}</h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Level: {alert.level}</p>
                        <p className="text-sm text-gray-600">Area: {alert.area}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Learn More
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Community Prevention Programs
                </CardTitle>
                <CardDescription>
                  Join local health initiatives and track community progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {preventionPrograms.map((program, index) => (
                    <div key={index} className="p-6 bg-white/50 rounded-lg border border-green-100">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{program.title}</h4>
                        <Badge variant="outline">{program.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Participants</span>
                          <span className="font-medium">{program.participants.toLocaleString()}</span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Completion Rate</span>
                            <span className="font-medium">{program.completion}%</span>
                          </div>
                          <Progress value={program.completion} />
                        </div>
                        <Button className="w-full" variant="outline">
                          Join Program
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Local Healthcare Providers
                </CardTitle>
                <CardDescription>
                  Find and connect with healthcare providers in your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthcareProviders.map((provider, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.specialties.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.distance}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Book Appointment
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
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Community Health Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Data Collection</h4>
              <p className="text-gray-600">Aggregate anonymous health data from community members to identify trends and patterns.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. AI Analysis</h4>
              <p className="text-gray-600">Our AI analyzes community health data to provide insights and early warning systems.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Community Action</h4>
              <p className="text-gray-600">Launch targeted health programs and initiatives based on community-specific needs and trends.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHealthInsights;
