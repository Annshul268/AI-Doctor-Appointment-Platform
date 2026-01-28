import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, Brain, Calendar, CheckCircle, ArrowRight, Play, Users, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const mainSteps = [
    {
      step: 1,
      title: "Describe Your Symptoms",
      description: "Tell our AI about your health concerns using voice, text, or images. Our multilingual system understands 12+ languages.",
      features: ["Voice recognition", "Image analysis", "Multilingual support", "Medical terminology"],
      icon: MessageSquare,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Get AI Recommendations",
      description: "Receive personalized health insights powered by advanced AI models trained on millions of medical cases.",
      features: ["Symptom analysis", "Risk assessment", "Treatment options", "Preventive care"],
      icon: Brain,
      color: "bg-purple-500"
    },
    {
      step: 3,
      title: "Book Appropriate Care",
      description: "Connect with the right healthcare provider based on your needs, from teleconsultation to emergency care.",
      features: ["Doctor matching", "Appointment booking", "Emergency protocols", "Insurance verification"],
      icon: Calendar,
      color: "bg-green-500"
    }
  ];

  const detailedWorkflows = [
    {
      title: "Emergency Situations",
      description: "Critical health issues require immediate attention",
      steps: [
        "Emergency mode activated automatically",
        "GPS location shared with emergency services",
        "AI provides first aid instructions",
        "Real-time communication with emergency team",
        "Hospital navigation with AR guidance"
      ],
      timeline: "0-5 minutes",
      icon: "🚨"
    },
    {
      title: "Routine Health Check",
      description: "Regular health monitoring and prevention",
      steps: [
        "Complete health questionnaire",
        "Wearable data integration",
        "AI health score calculation",
        "Personalized recommendations",
        "Schedule preventive care"
      ],
      timeline: "5-15 minutes",
      icon: "🏥"
    },
    {
      title: "Chronic Care Management",
      description: "Ongoing support for long-term conditions",
      steps: [
        "Sync with medical devices",
        "Track medication adherence",
        "Monitor vital signs trends",
        "Predictive health analytics",
        "Care team coordination"
      ],
      timeline: "Ongoing",
      icon: "📊"
    },
    {
      title: "Specialist Consultation",
      description: "Expert care for specific health issues",
      steps: [
        "Detailed symptom documentation",
        "Medical history compilation",
        "Specialist matching algorithm",
        "Appointment scheduling",
        "Pre-visit preparation"
      ],
      timeline: "15-30 minutes",
      icon: "👨‍⚕️"
    }
  ];

  const aiCapabilities = [
    {
      name: "Symptom Analysis",
      description: "Process natural language descriptions of symptoms and convert them into medical insights",
      accuracy: "94.2%",
      speed: "< 3 seconds"
    },
    {
      name: "Image Recognition",
      description: "Analyze medical images, skin conditions, and medication identification",
      accuracy: "91.8%",
      speed: "< 5 seconds"
    },
    {
      name: "Risk Prediction",
      description: "Forecast future health risks based on current data and lifestyle patterns",
      accuracy: "89.5%",
      speed: "< 10 seconds"
    },
    {
      name: "Treatment Recommendations",
      description: "Suggest appropriate care pathways and treatment options",
      accuracy: "92.7%",
      speed: "< 8 seconds"
    }
  ];

  const securityFeatures = [
    { feature: "End-to-End Encryption", description: "All data encrypted in transit and at rest" },
    { feature: "Blockchain Storage", description: "Immutable health records on distributed ledger" },
    { feature: "Zero Trust Architecture", description: "Every access request verified and authorized" },
    { feature: "HIPAA Compliance", description: "Full compliance with healthcare privacy regulations" },
    { feature: "Biometric Authentication", description: "Secure access with fingerprint or face recognition" },
    { feature: "Audit Trails", description: "Complete logs of all data access and modifications" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">How It Works</h1>
                <p className="text-sm text-gray-600">Your journey to better health, simplified</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              3-Step Process
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Play className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Healthcare Made Simple
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our AI-powered platform transforms complex healthcare into three simple steps. 
            From symptom checking to specialist care, we guide you through every stage of your health journey.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Play className="h-4 w-4 mr-2" />
            Watch Demo Video
          </Button>
        </div>

        {/* Main Process */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">The 3-Step Process</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {mainSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white/70 backdrop-blur-sm border-blue-100 h-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-6 text-base">
                      {step.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {index < mainSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Workflows */}
        <Tabs defaultValue="workflows" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflows">Detailed Workflows</TabsTrigger>
            <TabsTrigger value="ai">AI Capabilities</TabsTrigger>
            <TabsTrigger value="security">Security & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Detailed Workflows</h3>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Different health situations require different approaches. Here's how our platform adapts to various scenarios.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {detailedWorkflows.map((workflow, index) => (
                  <Card key={index} className="bg-white/70 backdrop-blur-sm border-blue-100">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{workflow.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{workflow.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {workflow.timeline}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{workflow.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {workflow.steps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                              {idx + 1}
                            </div>
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">AI Capabilities</h3>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Our advanced AI models are trained on millions of medical cases and continuously updated with the latest research.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {aiCapabilities.map((capability, index) => (
                  <Card key={index} className="bg-white/70 backdrop-blur-sm border-blue-100">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        {capability.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{capability.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{capability.accuracy}</div>
                          <div className="text-xs text-gray-600">Accuracy</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{capability.speed}</div>
                          <div className="text-xs text-gray-600">Response Time</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Security & Privacy</h3>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Your health data is protected by enterprise-grade security measures and blockchain technology.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {securityFeatures.map((security, index) => (
                  <Card key={index} className="bg-white/70 backdrop-blur-sm border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{security.feature}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{security.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Integration Partners */}
        <div className="mt-16 mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Seamless Integrations</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Electronic Health Records</h4>
                <p className="text-sm text-gray-600">Connect with Epic, Cerner, and other major EHR systems</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Wearable Devices</h4>
                <p className="text-sm text-gray-600">Apple Watch, Fitbit, Garmin, and 50+ other devices</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Insurance Networks</h4>
                <p className="text-sm text-gray-600">Direct billing with major insurance providers</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience AI Healthcare?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join millions who have transformed their health journey with our AI-powered platform. 
            Start your free trial today and experience the future of healthcare.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Play className="h-4 w-4 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
