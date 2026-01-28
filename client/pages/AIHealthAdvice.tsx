import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Brain, Lightbulb, Activity, Shield } from "lucide-react";

export default function AIHealthAdvice() {
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
            
            <Link to="/">
              <Button variant="outline" className="glass-button">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <div className="glass-card p-12 space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
              AI Health Advice
            </h1>
            
            <p className="text-xl text-healthcare-blue-700/80 max-w-2xl mx-auto">
              Your personal AI health companion is coming soon! Get personalized wellness tips, 
              health insights, and preventive care recommendations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-healthcare-blue-50 rounded-lg p-6 space-y-3">
                <Lightbulb className="w-8 h-8 text-healthcare-blue-500 mx-auto" />
                <h3 className="font-semibold text-healthcare-blue-700">Personalized Tips</h3>
                <p className="text-sm text-healthcare-blue-600">AI-generated health recommendations based on your profile</p>
              </div>
              
              <div className="bg-healthcare-green-50 rounded-lg p-6 space-y-3">
                <Activity className="w-8 h-8 text-healthcare-green-500 mx-auto" />
                <h3 className="font-semibold text-healthcare-green-700">Wellness Tracking</h3>
                <p className="text-sm text-healthcare-green-600">Monitor your health progress with smart insights</p>
              </div>
              
              <div className="bg-healthcare-teal-50 rounded-lg p-6 space-y-3">
                <Shield className="w-8 h-8 text-healthcare-teal-500 mx-auto" />
                <h3 className="font-semibold text-healthcare-teal-700">Preventive Care</h3>
                <p className="text-sm text-healthcare-teal-600">Early detection and prevention recommendations</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 space-y-3">
                <Heart className="w-8 h-8 text-purple-500 mx-auto" />
                <h3 className="font-semibold text-purple-700">Health Companion</h3>
                <p className="text-sm text-purple-600">24/7 AI assistant for health questions and guidance</p>
              </div>
            </div>
            
            <p className="text-healthcare-blue-600/70">
              Continue prompting to have this page implemented with full AI health companion functionality!
            </p>
            
            <Link to="/">
              <Button className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
