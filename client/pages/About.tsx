import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Brain, 
  Shield, 
  Zap,
  TrendingUp,
  CheckCircle,
  Star,
  Quote,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      bio: "Former Harvard Medical School professor with 15 years in AI healthcare research",
      social: { linkedin: "#", twitter: "#", email: "sarah@aihealthcare.com" }
    },
    {
      name: "Alex Rodriguez",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Tech entrepreneur with previous exits in healthcare AI and machine learning",
      social: { linkedin: "#", twitter: "#", email: "alex@aihealthcare.com" }
    },
    {
      name: "Dr. Emily Johnson",
      role: "Head of AI Research",
      image: "https://images.unsplash.com/photo-1594824671323-a58b29cb8ff3?w=300&h=300&fit=crop&crop=face",
      bio: "PhD in Computer Vision from MIT, published 50+ papers on medical AI",
      social: { linkedin: "#", twitter: "#", email: "emily@aihealthcare.com" }
    },
    {
      name: "Michael Park",
      role: "VP of Engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Former Google engineer specializing in scalable healthcare platforms",
      social: { linkedin: "#", twitter: "#", email: "michael@aihealthcare.com" }
    }
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to democratize healthcare through AI" },
    { year: "2021", title: "First AI Model", description: "Launched symptom analysis AI with 85% accuracy" },
    { year: "2022", title: "Series A Funding", description: "Raised $15M to expand AI capabilities and team" },
    { year: "2023", title: "FDA Approval", description: "Received FDA clearance for AI diagnostic assistance" },
    { year: "2024", title: "Global Expansion", description: "Serving 1M+ patients across 25 countries" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "End-to-end encryption and blockchain security for all medical data"
    },
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Cutting-edge machine learning to improve healthcare outcomes"
    },
    {
      icon: Heart,
      title: "Patient Care",
      description: "Every decision is made with patient wellbeing as our top priority"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Making quality healthcare accessible to everyone, everywhere"
    }
  ];

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

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-6">
              Revolutionizing Healthcare with AI
            </h1>
            <p className="text-xl text-healthcare-blue-700/80 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make quality healthcare accessible to everyone through cutting-edge artificial intelligence, 
              real-time diagnosis, and personalized medical care.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="glass-card p-12 mb-16 bg-gradient-to-r from-healthcare-blue-50 to-healthcare-teal-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-healthcare-blue-700 mb-6">Our Mission</h2>
              <p className="text-xl text-healthcare-blue-700/90 leading-relaxed max-w-4xl mx-auto">
                To bridge the gap between patients and quality healthcare by leveraging artificial intelligence, 
                making medical expertise accessible 24/7, reducing diagnostic errors, and empowering individuals 
                to take control of their health journey.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "1M+", label: "Patients Served", icon: Users },
              { number: "50K+", label: "Doctors Connected", icon: Heart },
              { number: "95%", label: "Accuracy Rate", icon: Target },
              { number: "25", label: "Countries", icon: Globe }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-healthcare-blue-600 mb-2">{stat.number}</div>
                <div className="text-healthcare-blue-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-healthcare-blue-700 mb-6">Our Story</h2>
              <div className="space-y-4 text-healthcare-blue-700/80 leading-relaxed">
                <p>
                  AI HealthCare was born from a simple yet powerful observation: millions of people worldwide lack access 
                  to quality medical expertise when they need it most. Emergency rooms are overcrowded, specialist 
                  appointments take weeks, and many symptoms go undiagnosed.
                </p>
                <p>
                  Our founders, a team of doctors, AI researchers, and engineers, came together with a shared vision: 
                  what if we could democratize medical expertise through artificial intelligence?
                </p>
                <p>
                  Starting in a small lab in 2020, we've grown into a global platform serving over 1 million patients, 
                  with AI technology that rivals human specialists in accuracy while being available 24/7.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-healthcare-blue-700 mb-6">Company Timeline</h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {milestone.year.slice(-2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-blue-700">{milestone.title}</h3>
                      <p className="text-sm text-healthcare-blue-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-healthcare-blue-700 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-healthcare-blue-700 mb-3">{value.title}</h3>
                  <p className="text-healthcare-blue-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-healthcare-blue-700 mb-4">Leadership Team</h2>
            <p className="text-xl text-healthcare-blue-600 text-center mb-12 max-w-2xl mx-auto">
              Meet the experts driving healthcare innovation forward
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-healthcare-blue-200 group-hover:border-healthcare-blue-400 transition-colors"
                    />
                    <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-healthcare-blue-500/20 to-healthcare-teal-500/20 group-hover:from-healthcare-blue-500/30 group-hover:to-healthcare-teal-500/30 transition-all"></div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-healthcare-blue-700 mb-1">{member.name}</h3>
                  <p className="text-sm text-healthcare-blue-500 mb-3 font-medium">{member.role}</p>
                  <p className="text-xs text-healthcare-blue-600 leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    <a href={member.social.linkedin} className="w-8 h-8 bg-healthcare-blue-100 rounded-full flex items-center justify-center hover:bg-healthcare-blue-200 transition-colors">
                      <Linkedin className="w-4 h-4 text-healthcare-blue-600" />
                    </a>
                    <a href={member.social.twitter} className="w-8 h-8 bg-healthcare-blue-100 rounded-full flex items-center justify-center hover:bg-healthcare-blue-200 transition-colors">
                      <Twitter className="w-4 h-4 text-healthcare-blue-600" />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="w-8 h-8 bg-healthcare-blue-100 rounded-full flex items-center justify-center hover:bg-healthcare-blue-200 transition-colors">
                      <Mail className="w-4 h-4 text-healthcare-blue-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Recognition */}
          <div className="glass-card p-12 mb-16 bg-gradient-to-r from-healthcare-green-50 to-healthcare-teal-50">
            <h2 className="text-3xl font-bold text-center text-healthcare-blue-700 mb-8">Awards & Recognition</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Healthcare Innovation Award 2024",
                  organization: "MIT Technology Review",
                  description: "Recognized for breakthrough AI diagnostic technology"
                },
                {
                  title: "Best AI Healthcare Platform 2023",
                  organization: "Forbes Health Awards",
                  description: "Leading platform for AI-powered medical assistance"
                },
                {
                  title: "FDA Breakthrough Device Designation",
                  organization: "U.S. Food & Drug Administration",
                  description: "First AI symptom checker to receive FDA clearance"
                }
              ].map((award, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-healthcare-green-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-healthcare-blue-700 mb-2">{award.title}</h3>
                  <p className="text-sm text-healthcare-blue-500 mb-2 font-medium">{award.organization}</p>
                  <p className="text-xs text-healthcare-blue-600">{award.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-healthcare-blue-700 mb-6">Ready to Experience the Future of Healthcare?</h2>
            <p className="text-xl text-healthcare-blue-600 mb-8 max-w-2xl mx-auto">
              Join millions of patients and thousands of doctors who trust AI HealthCare for smarter medical care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-lg px-8 py-6"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass-button text-lg px-8 py-6"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
