import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import {
  Heart,
  Brain,
  Activity,
  Users,
  Clock,
  Shield,
  Star,
  Play,
  ChevronRight,
  Stethoscope,
  Bot,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue-50 via-white to-healthcare-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
                AI HealthCare
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-healthcare-blue-700 hover:text-healthcare-blue-600 transition-colors"
              >
                Features
              </a>
              <Link
                to="/how-it-works"
                className="text-healthcare-blue-700 hover:text-healthcare-blue-600 transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/testimonials"
                className="text-healthcare-blue-700 hover:text-healthcare-blue-600 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/dashboard"
                className="text-healthcare-blue-700 hover:text-healthcare-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/image-analysis"
                className="text-healthcare-blue-700 hover:text-healthcare-blue-600 transition-colors"
              >
                AI Vision
              </Link>
              <LanguageSelector className="hidden lg:block" />
              <Link to="/login">
                <Button variant="outline" className="glass-button">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium text-healthcare-blue-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Healthcare Platform
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
                    AI-powered
                  </span>
                  <br />
                  Healthcare.
                  <br />
                  <span className="text-healthcare-green-600">
                    Smarter
                  </span>{" "}
                  Appointments.
                  <br />
                  <span className="text-healthcare-blue-600">Better</span> Care.
                </h1>

                <p className="text-xl text-healthcare-blue-700/80 leading-relaxed max-w-lg">
                  Experience the future of healthcare with our AI-driven
                  platform. Get instant doctor recommendations, smart symptom
                  analysis, and seamless appointment booking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/find-doctor">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
                  >
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Find a Doctor
                  </Button>
                </Link>

                <Link to="/image-analysis">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-button shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6 border-2 border-purple-300 hover:border-purple-400"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    AI Image Analysis
                  </Button>
                </Link>

                <Link to="/ai-health-advice">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-button shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    Get AI Health Advice
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-healthcare-blue-600">
                    50K+
                  </div>
                  <div className="text-sm text-healthcare-blue-700/70">
                    Happy Patients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-healthcare-green-600">
                    1,200+
                  </div>
                  <div className="text-sm text-healthcare-blue-700/70">
                    Expert Doctors
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-healthcare-teal-600">
                    98%
                  </div>
                  <div className="text-sm text-healthcare-blue-700/70">
                    Accuracy Rate
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Animation */}
            <div className="relative">
              <div className="relative z-10">
                <div className="glass-card p-8 space-y-6 floating-element">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center animate-pulse-glow">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-healthcare-blue-700">
                        AI Health Assistant
                      </div>
                      <div className="text-sm text-healthcare-blue-600/70">
                        Online
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-healthcare-blue-50 rounded-lg p-3">
                      <p className="text-sm text-healthcare-blue-700">
                        📷 I've analyzed your skin image using computer vision.
                        It appears to be contact dermatitis with 87% confidence.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-soft">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-12 h-8 bg-gray-200 rounded border"></div>
                        <p className="text-xs text-healthcare-blue-600">
                          Image uploaded
                        </p>
                      </div>
                      <p className="text-sm text-healthcare-blue-700">
                        Can you recommend a specialist?
                      </p>
                    </div>

                    <div className="bg-healthcare-green-50 rounded-lg p-3">
                      <p className="text-sm text-healthcare-green-700">
                        🎯 I recommend Dr. Rodriguez (Dermatologist). Booking
                        appointment for today at 3:00 PM. Urgency: Medium
                        priority.
                      </p>
                    </div>
                  </div>

                  <Link to="/symptom-checker">
                    <Button className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                      Try AI Assistant
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-healthcare-blue-200 to-healthcare-teal-200 rounded-full opacity-20 animate-float"></div>
              <div
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-r from-healthcare-green-200 to-healthcare-teal-200 rounded-full opacity-20 animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
              Revolutionary AI Features
            </h2>
            <p className="text-xl text-healthcare-blue-700/80 max-w-2xl mx-auto">
              Experience healthcare like never before with our cutting-edge AI
              technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Image Analysis + Computer Vision",
                description:
                  "Revolutionary computer vision technology analyzes uploaded images of skin conditions, eye problems, wounds, and oral health to provide instant medical insights and specialist recommendations.",
                gradient: "from-purple-500 to-pink-500",
                badge: "👁️ Vision AI",
                link: "/image-analysis",
              },
              {
                icon: Activity,
                title: "Wearable & IoT Integration",
                description:
                  "Real-time data from smartwatches and fitness trackers enables early health warnings and predictive care recommendations.",
                gradient: "from-purple-500 to-pink-500",
                badge: "⌚ Smart Data",
                link: "/wearable-integration",
              },
              {
                icon: Heart,
                title: "Emergency Mode & Panic Button",
                description:
                  "One-tap emergency alerts nearest doctors, shares live location, and provides instant access to your medical history.",
                gradient: "from-red-500 to-orange-500",
                badge: "🚨 Life-Saving",
                link: "/emergency",
              },
              {
                icon: Clock,
                title: "Multilingual AI Translation",
                description:
                  "Real-time AI translation supports 50+ languages for voice and text communication during consultations and booking.",
                gradient: "from-healthcare-green-500 to-healthcare-teal-500",
                badge: "🌍 Global AI",
                link: "/multilingual-translation",
              },
              {
                icon: Star,
                title: "Community Health Insights",
                description:
                  "AI detects local health trends (flu outbreaks, allergies) and sends preventive care recommendations to keep you healthy.",
                gradient: "from-healthcare-blue-500 to-purple-500",
                badge: "📊 Trend AI",
                link: "/community-health-insights",
              },
              {
                icon: Shield,
                title: "Blockchain Health Records",
                description:
                  "End-to-end encrypted medical records with blockchain security ensure your health data remains private and secure.",
                gradient: "from-healthcare-teal-500 to-healthcare-green-500",
                badge: "🔒 Blockchain",
                link: "/blockchain-health-records",
              },
              {
                icon: Users,
                title: "AR Hospital Navigation",
                description:
                  "Augmented Reality guides you through hospitals with turn-by-turn directions and 3D doctor profile cards.",
                gradient: "from-indigo-500 to-purple-500",
                badge: "🥽 AR/VR",
                link: "/ar-hospital-navigation",
              },
              {
                icon: Sparkles,
                title: "Offline AI Mode (PWA)",
                description:
                  "Basic AI symptom checking works offline, automatically syncing your data when connectivity returns.",
                gradient: "from-healthcare-green-500 to-healthcare-blue-500",
                badge: "📱 PWA",
                link: "/offline-ai-mode",
              },
              {
                icon: TrendingUp,
                title: "Predictive Health Analytics",
                description:
                  "AI analyzes your health patterns to predict potential issues weeks in advance and suggest preventive measures.",
                gradient: "from-orange-500 to-red-500",
                badge: "🔮 Predictive",
                link: "/predictive-health-analytics",
              },
            ].map((feature, index) => (
              <Link key={index} to={feature.link}>
                <div className="glass-card p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden cursor-pointer">
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 rounded-full text-xs font-bold text-gray-700 border">
                    {feature.badge}
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-healthcare-blue-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-healthcare-blue-600/80 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-healthcare-blue-500">
                      <Sparkles className="w-4 h-4 mr-1" />
                      <span>AI-Powered</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-healthcare-blue-400 group-hover:text-healthcare-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 gradient-mesh">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-healthcare-blue-700/80 max-w-2xl mx-auto">
              Three simple steps to better healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Symptoms",
                description:
                  "Tell our AI assistant about your symptoms using voice or text. Our advanced NLP understands medical terminology.",
                icon: Bot,
              },
              {
                step: "02",
                title: "Get AI Recommendations",
                description:
                  "Receive instant specialist recommendations, urgency assessments, and personalized pre-diagnosis reports.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Book & Get Care",
                description:
                  "Book appointments with one click, access your health dashboard, and receive ongoing AI-powered care guidance.",
                icon: Heart,
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-healthcare-blue-700">
                  {step.title}
                </h3>
                <p className="text-healthcare-blue-600/80 leading-relaxed">
                  {step.description}
                </p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-full">
                    <ChevronRight className="w-6 h-6 text-healthcare-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
              What Our Patients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Patient",
                content:
                  "The AI assistant correctly identified I needed a cardiologist. The appointment was seamless and the pre-diagnosis report saved so much time!",
                rating: 5,
              },
              {
                name: "Dr. Michael Chen",
                role: "Cardiologist",
                content:
                  "The pre-diagnosis reports are incredibly detailed and accurate. It helps me prepare better for each patient consultation.",
                rating: 5,
              },
              {
                name: "Emma Rodriguez",
                role: "Patient",
                content:
                  "I love the wellness dashboard! The AI recommendations have helped me maintain better health habits consistently.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="glass-card p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-healthcare-green-500 text-healthcare-green-500"
                    />
                  ))}
                </div>
                <p className="text-healthcare-blue-700/80 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-healthcare-blue-700">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-healthcare-blue-600/70">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Health Insights */}
      <section className="py-20 px-6 bg-gradient-to-r from-healthcare-blue-50 to-healthcare-green-50">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
              Community Health Insights
            </h2>
            <p className="text-xl text-healthcare-blue-700/80 max-w-2xl mx-auto">
              AI-powered community health monitoring keeps you informed about
              local health trends
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">
                Flu Activity
              </h3>
              <div className="text-3xl font-bold text-red-500 mb-2">High</div>
              <p className="text-sm text-gray-600 mb-4">
                24% increase in your area this week
              </p>
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <p className="text-sm text-red-700">💡 AI Recommendation:</p>
                <p className="text-xs text-red-600 mt-1">
                  Get your flu shot if you haven't already. Wash hands
                  frequently.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-yellow-600 mb-2">
                Allergy Alert
              </h3>
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                Moderate
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Pollen count rising in San Francisco
              </p>
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-sm text-yellow-700">💡 AI Recommendation:</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Keep windows closed. Consider antihistamines if sensitive.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-healthcare-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2">
                Air Quality
              </h3>
              <div className="text-3xl font-bold text-green-500 mb-2">Good</div>
              <p className="text-sm text-gray-600 mb-4">
                Safe for outdoor activities
              </p>
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-sm text-green-700">💡 AI Recommendation:</p>
                <p className="text-xs text-green-600 mt-1">
                  Perfect weather for outdoor exercise. Stay hydrated!
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-healthcare-blue-700 mb-2">
                  Weekly Health Trends
                </h3>
                <p className="text-healthcare-blue-600">
                  AI-analyzed data from your community
                </p>
              </div>
              <Link to="/community-health-insights">
                <Button variant="outline" className="glass-button">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-healthcare-blue-600">
                  ↗️ 15%
                </div>
                <div className="text-sm text-gray-600">
                  Preventive Care Visits
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-healthcare-green-600">
                  ↘️ 8%
                </div>
                <div className="text-sm text-gray-600">
                  Emergency Room Visits
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-healthcare-teal-600">
                  ↗️ 22%
                </div>
                <div className="text-sm text-gray-600">Telemedicine Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">↗️ 18%</div>
                <div className="text-sm text-gray-600">
                  Mental Health Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-mesh">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
            Ready to Experience the Future of Healthcare?
          </h2>
          <p className="text-xl text-healthcare-blue-700/80 max-w-2xl mx-auto">
            Join thousands of patients who trust our AI-powered platform for
            smarter, faster, and better healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-doctor">
              <Button
                size="lg"
                className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              >
                Start Your Health Journey
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="glass-button shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 glass border-t border-white/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
                  AI HealthCare
                </span>
              </div>
              <p className="text-healthcare-blue-700/70">
                Revolutionizing healthcare with AI-powered solutions for better
                patient outcomes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-healthcare-blue-700 mb-4">
                Platform
              </h4>
              <div className="space-y-2">
                <Link
                  to="/find-doctor"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Find Doctors
                </Link>
                <Link
                  to="/ai-health-advice"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  AI Health Advice
                </Link>
                <Link
                  to="/symptom-checker"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Symptom Checker
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-healthcare-blue-700 mb-4">
                Company
              </h4>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  About Us
                </Link>
                <Link
                  to="/testimonials"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Careers
                </Link>
                <Link
                  to="/testimonials"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Press
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-healthcare-blue-700 mb-4">
                Support
              </h4>
              <div className="space-y-2">
                <Link
                  to="/how-it-works"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Help Center
                </Link>
                <Link
                  to="/contact"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className="block text-healthcare-blue-600/70 hover:text-healthcare-blue-600"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-healthcare-blue-600/70">
              © 2024 AI HealthCare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Emergency Mode - Floating Panic Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/emergency">
          <button
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-lg animate-pulse hover:animate-none transition-all duration-300 hover:scale-110"
            title="Emergency - Get immediate medical help"
          >
            🚨
          </button>
        </Link>
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
