import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  Bot,
  User,
  Headphones,
  HelpCircle,
  FileText,
  Zap,
  Shield,
  Globe,
  AlertTriangle,
  CheckCircle,
  Star,
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'support' | 'bot';
  message: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium"
  });
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hi! I'm Alex, your AI support assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const supportTopics = [
    { id: 'technical', title: 'Technical Issues', icon: Zap },
    { id: 'account', title: 'Account & Billing', icon: User },
    { id: 'medical', title: 'Medical Questions', icon: Heart },
    { id: 'privacy', title: 'Privacy & Security', icon: Shield },
    { id: 'feedback', title: 'Feedback & Suggestions', icon: Star },
    { id: 'emergency', title: 'Emergency Support', icon: AlertTriangle }
  ];

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our AI assistant or human agents",
      icon: MessageCircle,
      action: "Start Chat",
      available: "24/7",
      response: "< 1 minute"
    },
    {
      title: "Email Support", 
      description: "Send detailed questions and get comprehensive responses",
      icon: Mail,
      action: "Send Email",
      available: "24/7",
      response: "< 2 hours"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our medical and technical experts",
      icon: Phone,
      action: "Call Now",
      available: "Mon-Fri 8AM-8PM",
      response: "Immediate"
    },
    {
      title: "Video Call",
      description: "Face-to-face support for complex technical issues",
      icon: User,
      action: "Schedule Call",
      available: "Mon-Fri 9AM-6PM",
      response: "Same day"
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you! Your message has been sent. We'll respond within 2 hours.");
    setFormData({ name: "", email: "", subject: "", message: "", priority: "medium" });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: chatInput,
      timestamp: new Date(),
      status: 'sent'
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me help you with that. Can you provide more details?",
        "That's a great question! I'll connect you with a specialist who can assist you better.",
        "I've found some relevant information that might help. Would you like me to share it?",
        "Thank you for reaching out. I'm transferring you to a human agent who specializes in this area.",
        "I can definitely help with that! Here are some immediate steps you can take..."
      ];

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-4">
              Contact & Support
            </h1>
            <p className="text-xl text-healthcare-blue-700/80 max-w-3xl mx-auto">
              Get help from our AI-powered support team. We're here 24/7 to assist with technical issues, 
              medical questions, and everything in between.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div key={index} className="glass-card p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-healthcare-blue-700 mb-2">{method.title}</h3>
                <p className="text-sm text-healthcare-blue-600 mb-4">{method.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Available:</span>
                    <span className="text-healthcare-green-600 font-medium">{method.available}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Response:</span>
                    <span className="text-healthcare-blue-600 font-medium">{method.response}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500"
                  onClick={() => {
                    if (method.title === "Live Chat") {
                      setShowChat(true);
                    } else {
                      alert(`${method.title} integration would be implemented here`);
                    }
                  }}
                >
                  {method.action}
                </Button>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6">Send us a Message</h2>
              
              {/* Support Topics */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-healthcare-blue-700 mb-3">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {supportTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                        selectedTopic === topic.id
                          ? 'border-healthcare-blue-500 bg-healthcare-blue-50'
                          : 'border-gray-200 hover:border-healthcare-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <topic.icon className={`w-4 h-4 ${
                          selectedTopic === topic.id ? 'text-healthcare-blue-600' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          selectedTopic === topic.id ? 'text-healthcare-blue-700' : 'text-gray-700'
                        }`}>
                          {topic.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-healthcare-blue-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-healthcare-blue-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-healthcare-blue-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-healthcare-blue-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Standard support</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-healthcare-blue-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 resize-none"
                    placeholder="Please describe your issue or question in detail..."
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-lg py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information & FAQ */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-blue-700">Email Support</h3>
                      <p className="text-healthcare-blue-600">support@aihealthcare.com</p>
                      <p className="text-sm text-gray-500">Response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-blue-700">Phone Support</h3>
                      <p className="text-healthcare-blue-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri 8AM-8PM PST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-blue-700">Headquarters</h3>
                      <p className="text-healthcare-blue-600">123 Innovation Drive<br />San Francisco, CA 94105</p>
                      <p className="text-sm text-gray-500">Visitors by appointment</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-healthcare-blue-700">Emergency Support</h3>
                      <p className="text-healthcare-blue-600">Available 24/7</p>
                      <p className="text-sm text-gray-500">For critical medical issues</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  {[
                    {
                      question: "How accurate is the AI diagnosis?",
                      answer: "Our AI has a 95% accuracy rate, validated by medical professionals and FDA-approved for diagnostic assistance."
                    },
                    {
                      question: "Is my medical data secure?",
                      answer: "Yes, we use end-to-end encryption and blockchain technology to ensure your medical data remains private and secure."
                    },
                    {
                      question: "Can I use this for emergency situations?",
                      answer: "Our platform includes emergency mode, but for life-threatening emergencies, always call 911 first."
                    },
                    {
                      question: "Do you accept insurance?",
                      answer: "We work with most major insurance providers. Check with your insurance company for coverage details."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <h3 className="font-semibold text-healthcare-blue-700 mb-2">{faq.question}</h3>
                      <p className="text-sm text-healthcare-blue-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link to="/faq" className="inline-flex items-center text-healthcare-blue-600 hover:text-healthcare-blue-700 font-medium">
                    View all FAQs
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center p-6">
          <div className="glass-card w-full max-w-md h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-healthcare-blue-700">Live Support</h3>
                  <p className="text-sm text-healthcare-green-600">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                ×
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-end space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-healthcare-blue-500' 
                          : 'bg-gradient-to-r from-healthcare-teal-500 to-healthcare-green-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg px-3 py-2 ${
                        message.type === 'user'
                          ? 'bg-healthcare-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-healthcare-teal-500 to-healthcare-green-500 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500"
                  disabled={!chatInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
