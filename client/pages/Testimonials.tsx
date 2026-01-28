import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Quote, Heart, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Working Mother",
      location: "New York, NY",
      rating: 5,
      image: "👩‍💼",
      testimonial: "The AI symptom checker helped me identify my daughter's ear infection before it got serious. The multilingual support was perfect since my elderly mother only speaks Spanish. This platform has become our family's health guardian.",
      features: ["AI Symptom Checker", "Multilingual Support", "Family Health"],
      impact: "Saved 3 ER visits this year"
    },
    {
      name: "Dr. Michael Chen",
      role: "Emergency Physician",
      location: "Los Angeles, CA",
      rating: 5,
      image: "👨‍⚕️",
      testimonial: "As an ER doctor, I've seen patients arrive with better-documented symptoms thanks to this platform. The AI triage helps patients understand when they truly need emergency care, reducing unnecessary visits by 40%.",
      features: ["AI Triage", "Emergency Mode", "Medical Documentation"],
      impact: "40% reduction in non-urgent ER visits"
    },
    {
      name: "Maria Rodriguez",
      role: "Senior Patient",
      location: "Miami, FL",
      rating: 5,
      image: "👵",
      testimonial: "At 68, I was skeptical about AI healthcare. But when the system predicted my diabetes risk and connected me with a prevention program, it changed my life. My A1C levels are now normal, and I feel 10 years younger.",
      features: ["Predictive Analytics", "Prevention Programs", "Health Monitoring"],
      impact: "Prevented Type 2 diabetes"
    },
    {
      name: "James Miller",
      role: "Rural Resident",
      location: "Montana",
      rating: 5,
      image: "����‍🌾",
      testimonial: "Living 50 miles from the nearest hospital, this platform is a lifesaver. The offline AI mode works even without internet, and the AR navigation helped me find my way around the medical center during my wife's emergency.",
      features: ["Offline AI", "AR Navigation", "Rural Healthcare"],
      impact: "Healthcare access in remote areas"
    },
    {
      name: "Priya Patel",
      role: "Tech Professional",
      location: "San Francisco, CA",
      rating: 5,
      image: "👩‍💻",
      testimonial: "The wearable integration is seamless. My Apple Watch data combined with AI predictions helped identify stress patterns that were affecting my sleep. The personalized recommendations improved my health score by 30%.",
      features: ["Wearable Integration", "Stress Analysis", "Health Optimization"],
      impact: "30% improvement in health metrics"
    },
    {
      name: "Robert Thompson",
      role: "Chronic Patient",
      location: "Chicago, IL",
      rating: 5,
      image: "👨‍🦳",
      testimonial: "Managing multiple chronic conditions was overwhelming until I found this platform. The blockchain health records ensure my data follows me everywhere, and the community insights help me connect with others facing similar challenges.",
      features: ["Blockchain Records", "Chronic Care", "Community Support"],
      impact: "Better coordination between 5 specialists"
    }
  ];

  const statistics = [
    { value: "2.3M+", label: "Lives Improved", icon: Heart },
    { value: "98.7%", label: "Accuracy Rate", icon: Award },
    { value: "150+", label: "Countries Served", icon: Users },
    { value: "45%", label: "Cost Reduction", icon: TrendingUp },
  ];

  const awards = [
    { title: "Best Healthcare AI Platform 2024", organization: "HealthTech Awards" },
    { title: "Innovation in Digital Health", organization: "WHO Digital Health Initiative" },
    { title: "Patient Safety Excellence Award", organization: "American Medical Association" },
    { title: "Top 10 Health Apps", organization: "Apple App Store" },
  ];

  const healthcareProviders = [
    { name: "Mayo Clinic", type: "Hospital System", users: "50K+" },
    { name: "Kaiser Permanente", type: "Health Plan", users: "200K+" },
    { name: "Cleveland Clinic", type: "Medical Center", users: "75K+" },
    { name: "Johns Hopkins", type: "Research Hospital", users: "45K+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Stories & Testimonials</h1>
                <p className="text-sm text-gray-600">Real experiences from our healthcare community</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
              2.3M+ Lives Improved
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
            <Heart className="h-8 w-8 text-rose-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stories That Inspire Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From preventing emergencies to managing chronic conditions, see how our AI-powered 
            healthcare platform is transforming lives across the globe. These are real stories 
            from real people who trust us with their health.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statistics.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-rose-100 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-rose-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Patient Success Stories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-rose-100 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Quote className="h-6 w-6 text-rose-300 absolute -top-2 -left-1" />
                    <p className="text-gray-700 italic pl-5">{testimonial.testimonial}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Features Used:</p>
                      <div className="flex flex-wrap gap-1">
                        {testimonial.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800">Impact:</p>
                      <p className="text-sm text-green-700">{testimonial.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Healthcare Providers */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Trusted by Leading Healthcare Providers</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthcareProviders.map((provider, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-rose-100 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{provider.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{provider.type}</p>
                  <Badge variant="outline" className="text-xs">
                    {provider.users} Active Users
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Awards & Recognition</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-rose-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{award.title}</h4>
                      <p className="text-sm text-gray-600">{award.organization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Health Journey?</h3>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            Join millions of people who trust our platform with their health. 
            Experience personalized AI healthcare that adapts to your unique needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-rose-600 hover:bg-rose-50">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Book a Demo
            </Button>
          </div>
        </div>

        {/* Share Your Story */}
        <div className="mt-16 text-center">
          <Card className="bg-white/70 backdrop-blur-sm border-rose-100 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-rose-600" />
                Share Your Story
              </CardTitle>
              <CardDescription>
                Have you been helped by our platform? We'd love to hear about your experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Your story could inspire and help others on their health journey. 
                Share how AI-powered healthcare has made a difference in your life.
              </p>
              <Button className="bg-rose-600 hover:bg-rose-700">
                Submit Your Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
