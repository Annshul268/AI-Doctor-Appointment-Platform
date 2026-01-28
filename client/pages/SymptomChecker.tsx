import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Bot, 
  Send, 
  Mic, 
  MicOff,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Stethoscope,
  User,
  Sparkles,
  FileText,
  Calendar,
  MapPin,
  Camera,
  Upload,
  X,
  Eye,
  Skin,
  Download,
  Share,
  Zap,
  Target,
  TrendingUp,
  Award,
  Timer,
  Volume2
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  imageUrl?: string;
  analysisResult?: ImageAnalysisResult;
}

interface ImageAnalysisResult {
  confidence: number;
  detectedConditions: string[];
  visualFindings: string[];
  recommendations: string[];
  urgencyLevel: 'immediate' | 'within_24hrs' | 'routine';
}

interface SymptomAnalysis {
  symptoms: string[];
  possibleConditions: string[];
  recommendedSpecialists: Array<{
    name: string;
    specialization: string;
    urgency: 'immediate' | 'within_24hrs' | 'routine';
    reasoning: string;
    availability: string;
    rating: number;
  }>;
  urgencyLevel: 'immediate' | 'within_24hrs' | 'routine';
  recommendations: string[];
  preDiagnosisReport?: string;
  imageAnalysis?: ImageAnalysisResult;
}

export default function SymptomChecker() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Health Assistant with advanced computer vision and voice recognition. You can:\n\n🗣️ Describe symptoms with voice\n📱 Type your symptoms\n📷 Upload images of visible conditions (skin, eyes, mouth)\n\nI'll analyze everything using AI to recommend the right specialist. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [currentVoiceText, setCurrentVoiceText] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for voice support
    const hasVoiceSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setVoiceSupported(hasVoiceSupport);
    
    if (hasVoiceSupport) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
    }
    
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI analysis with image processing
  const analyzeSymptoms = (symptomText: string, images?: File[]): SymptomAnalysis => {
    const lowerText = symptomText.toLowerCase();
    
    // Enhanced keyword analysis with image context
    const keywordAnalysis = {
      skin: {
        conditions: ['Eczema', 'Psoriasis', 'Dermatitis', 'Acne', 'Rash'],
        specialists: [
          { name: 'Dr. Sarah Martinez', specialization: 'Dermatologist', urgency: 'routine' as const, reasoning: 'Skin conditions require dermatological expertise', availability: 'Available today', rating: 4.9 },
          { name: 'Dr. James Wilson', specialization: 'Dermatology (Pediatric)', urgency: 'routine' as const, reasoning: 'Specialized in pediatric skin conditions', availability: 'Available tomorrow', rating: 4.8 }
        ],
        urgency: 'routine' as const
      },
      eye: {
        conditions: ['Conjunctivitis', 'Dry Eye', 'Stye', 'Allergic Reaction'],
        specialists: [
          { name: 'Dr. Emily Chen', specialization: 'Ophthalmologist', urgency: 'within_24hrs' as const, reasoning: 'Eye symptoms need prompt evaluation', availability: 'Available in 2 hours', rating: 4.9 },
          { name: 'Dr. Michael Brown', specialization: 'Optometrist', urgency: 'within_24hrs' as const, reasoning: 'Comprehensive eye examination needed', availability: 'Available today', rating: 4.7 }
        ],
        urgency: 'within_24hrs' as const
      },
      chest: {
        conditions: ['Angina', 'Heart Arrhythmia', 'Anxiety', 'Muscle Strain'],
        specialists: [
          { name: 'Dr. Robert Davis', specialization: 'Cardiologist', urgency: 'immediate' as const, reasoning: 'Chest symptoms require immediate cardiac evaluation', availability: 'Available now - Emergency', rating: 4.9 },
          { name: 'Dr. Lisa Thompson', specialization: 'Emergency Medicine', urgency: 'immediate' as const, reasoning: 'Urgent assessment needed for chest pain', availability: 'Emergency Room', rating: 4.8 }
        ],
        urgency: 'immediate' as const
      },
      headache: {
        conditions: ['Tension Headache', 'Migraine', 'Sinusitis', 'Cluster Headache'],
        specialists: [
          { name: 'Dr. Amanda Rodriguez', specialization: 'Neurologist', urgency: 'within_24hrs' as const, reasoning: 'Persistent headaches need neurological evaluation', availability: 'Available tomorrow', rating: 4.8 },
          { name: 'Dr. Kevin Park', specialization: 'Family Medicine', urgency: 'routine' as const, reasoning: 'Primary care assessment for headache patterns', availability: 'Available today', rating: 4.6 }
        ],
        urgency: 'within_24hrs' as const
      },
      fever: {
        conditions: ['Viral Infection', 'Bacterial Infection', 'Flu', 'COVID-19'],
        specialists: [
          { name: 'Dr. Maria Garcia', specialization: 'Internal Medicine', urgency: 'within_24hrs' as const, reasoning: 'Fever requires medical evaluation for underlying cause', availability: 'Available today', rating: 4.7 },
          { name: 'Dr. David Kim', specialization: 'Family Medicine', urgency: 'within_24hrs' as const, reasoning: 'Comprehensive assessment for febrile illness', availability: 'Available in 4 hours', rating: 4.8 }
        ],
        urgency: 'within_24hrs' as const
      }
    };

    // Detect keywords and determine primary concern
    let matchedAnalysis = keywordAnalysis.fever; // default
    let imageAnalysis: ImageAnalysisResult | undefined;

    for (const [keyword, data] of Object.entries(keywordAnalysis)) {
      if (lowerText.includes(keyword)) {
        matchedAnalysis = data;
        break;
      }
    }

    // Simulate image analysis if images are provided
    if (images && images.length > 0) {
      imageAnalysis = analyzeUploadedImages(images, lowerText);
      
      // Adjust recommendations based on image analysis
      if (imageAnalysis.urgencyLevel === 'immediate') {
        matchedAnalysis.urgency = 'immediate';
        matchedAnalysis.specialists = matchedAnalysis.specialists.map(s => ({
          ...s,
          urgency: 'immediate' as const,
          availability: 'Emergency - Available now'
        }));
      }
    }

    const extractedSymptoms = Object.keys(keywordAnalysis).filter(keyword => 
      lowerText.includes(keyword)
    );

    return {
      symptoms: extractedSymptoms.length > 0 ? extractedSymptoms : ['general discomfort'],
      possibleConditions: matchedAnalysis.conditions,
      recommendedSpecialists: matchedAnalysis.specialists,
      urgencyLevel: matchedAnalysis.urgency,
      recommendations: [
        'Monitor symptoms closely and track changes',
        'Stay hydrated and maintain adequate rest',
        'Avoid strenuous activities until evaluation',
        'Book appointment with recommended specialist',
        'Seek immediate care if symptoms worsen',
        ...(imageAnalysis ? ['Review uploaded images with healthcare provider'] : [])
      ],
      preDiagnosisReport: generatePreDiagnosisReport(symptomText, matchedAnalysis, imageAnalysis),
      imageAnalysis
    };
  };

  // Simulate AI image analysis
  const analyzeUploadedImages = (images: File[], symptomContext: string): ImageAnalysisResult => {
    // This would be replaced with actual computer vision API
    const imageName = images[0].name.toLowerCase();
    
    if (imageName.includes('skin') || imageName.includes('rash') || symptomContext.includes('skin')) {
      return {
        confidence: 0.87,
        detectedConditions: ['Possible Dermatitis', 'Inflammatory Skin Condition'],
        visualFindings: [
          'Redness and inflammation detected',
          'Irregular texture patterns observed',
          'No signs of severe infection visible'
        ],
        recommendations: [
          'Consult dermatologist for proper diagnosis',
          'Avoid scratching or irritating the area',
          'Document any changes in appearance'
        ],
        urgencyLevel: 'routine'
      };
    } else if (imageName.includes('eye') || symptomContext.includes('eye')) {
      return {
        confidence: 0.92,
        detectedConditions: ['Possible Conjunctivitis', 'Eye Irritation'],
        visualFindings: [
          'Redness in conjunctiva detected',
          'Mild swelling observed',
          'No discharge visible in image'
        ],
        recommendations: [
          'See ophthalmologist within 24 hours',
          'Avoid touching or rubbing eyes',
          'Use preservative-free artificial tears'
        ],
        urgencyLevel: 'within_24hrs'
      };
    }
    
    return {
      confidence: 0.75,
      detectedConditions: ['Visual abnormality detected'],
      visualFindings: ['Requires professional medical evaluation'],
      recommendations: ['Consult appropriate specialist for accurate diagnosis'],
      urgencyLevel: 'routine'
    };
  };

  const generatePreDiagnosisReport = (symptoms: string, analysis: any, imageAnalysis?: ImageAnalysisResult): string => {
    let report = `PATIENT SYMPTOMS: ${symptoms}\n\n`;
    report += `PRELIMINARY ASSESSMENT:\n`;
    report += `- Primary concerns: ${analysis.conditions.join(', ')}\n`;
    report += `- Recommended specialist: ${analysis.specialists[0].specialization}\n`;
    report += `- Urgency level: ${analysis.urgency.replace('_', ' ').toUpperCase()}\n\n`;
    
    if (imageAnalysis) {
      report += `IMAGE ANALYSIS RESULTS:\n`;
      report += `- AI Confidence: ${(imageAnalysis.confidence * 100).toFixed(1)}%\n`;
      report += `- Visual findings: ${imageAnalysis.visualFindings.join(', ')}\n`;
      report += `- Detected conditions: ${imageAnalysis.detectedConditions.join(', ')}\n\n`;
    }
    
    report += `RECOMMENDATIONS:\n`;
    report += analysis.specialists[0].reasoning;
    
    return report;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages(prev => [...prev, ...files]);
      
      // Generate preview URLs
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleVoiceInput = () => {
    if (!voiceSupported || !recognitionRef.current) {
      alert('Voice recognition is not supported in your browser.');
      return;
    }

    if (!isListening) {
      setIsListening(true);
      setCurrentVoiceText('');
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setCurrentVoiceText(finalTranscript || interimTranscript);
        if (finalTranscript) {
          setInputValue(finalTranscript);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setCurrentVoiceText('');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && uploadedImages.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue || "I've uploaded images for analysis",
      timestamp: new Date(),
      imageUrl: imagePreview[0] // For display purposes
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    const currentImages = [...uploadedImages];
    
    setInputValue('');
    setUploadedImages([]);
    setImagePreview([]);
    setIsAnalyzing(true);

    // Simulate AI processing time
    setTimeout(() => {
      const analysisResult = analyzeSymptoms(currentInput, currentImages);
      setAnalysis(analysisResult);

      let responseContent = `I've analyzed your symptoms${currentImages.length > 0 ? ' and uploaded images' : ''}:\n\n`;
      responseContent += `**Possible Conditions:** ${analysisResult.possibleConditions.join(', ')}\n\n`;
      responseContent += `**Recommended Specialist:** ${analysisResult.recommendedSpecialists[0].specialization}\n\n`;
      responseContent += `**Urgency Level:** ${analysisResult.urgencyLevel.replace('_', ' ').toUpperCase()}\n\n`;
      responseContent += `**Reasoning:** ${analysisResult.recommendedSpecialists[0].reasoning}\n\n`;
      
      if (analysisResult.imageAnalysis) {
        responseContent += `**Image Analysis (${(analysisResult.imageAnalysis.confidence * 100).toFixed(1)}% confidence):**\n`;
        responseContent += `• ${analysisResult.imageAnalysis.visualFindings.join('\n• ')}\n\n`;
      }
      
      responseContent += `Would you like me to book an appointment or generate a detailed pre-diagnosis report?`;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseContent,
        timestamp: new Date(),
        analysisResult: analysisResult.imageAnalysis
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-600 bg-red-50 border-red-200';
      case 'within_24hrs': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'routine': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return AlertTriangle;
      case 'within_24hrs': return Clock;
      case 'routine': return CheckCircle;
      default: return Clock;
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
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
                <span>Enhanced AI + Computer Vision</span>
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Chat Interface */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 h-[75vh] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center animate-pulse-glow">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-healthcare-blue-700">Enhanced AI Health Assistant</h2>
                      <p className="text-sm text-healthcare-blue-600/70">Computer Vision + Voice Recognition + NLP</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-healthcare-blue-600">AI Online</span>
                    </div>
                    {voiceSupported && (
                      <div className="flex items-center space-x-1 text-xs text-healthcare-green-600">
                        <Mic className="w-3 h-3" />
                        <span>Voice Ready</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-healthcare-blue-500' 
                              : 'bg-gradient-to-r from-healthcare-teal-500 to-healthcare-green-500'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-healthcare-blue-500 text-white'
                              : 'bg-white shadow-soft border border-healthcare-blue-100'
                          }`}>
                            <p className={`text-sm whitespace-pre-line ${
                              message.type === 'user' ? 'text-white' : 'text-healthcare-blue-700'
                            }`}>
                              {message.content}
                            </p>
                            
                            {/* Display uploaded image */}
                            {message.imageUrl && (
                              <div className="mt-2">
                                <img 
                                  src={message.imageUrl} 
                                  alt="Uploaded symptom" 
                                  className="max-w-48 h-32 object-cover rounded-lg border-2 border-white/50"
                                />
                              </div>
                            )}
                            
                            {/* Display AI image analysis */}
                            {message.analysisResult && (
                              <div className="mt-3 p-3 bg-healthcare-green-50 rounded-lg border border-healthcare-green-200">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-semibold text-healthcare-green-700">AI Image Analysis</span>
                                  <span className="text-xs text-healthcare-green-600">
                                    {(message.analysisResult.confidence * 100).toFixed(1)}% confidence
                                  </span>
                                </div>
                                <ul className="text-xs text-healthcare-green-600 space-y-1">
                                  {message.analysisResult.visualFindings.map((finding, idx) => (
                                    <li key={idx}>• {finding}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-2">
                              <p className={`text-xs ${
                                message.type === 'user' ? 'text-blue-100' : 'text-healthcare-blue-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                              {message.type === 'ai' && (
                                <button
                                  onClick={() => speakText(message.content)}
                                  className="text-xs text-healthcare-blue-500 hover:text-healthcare-blue-600 flex items-center space-x-1"
                                >
                                  <Volume2 className="w-3 h-3" />
                                  <span>Listen</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-healthcare-teal-500 to-healthcare-green-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white shadow-soft border border-healthcare-blue-100 rounded-2xl px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-4 h-4 text-healthcare-blue-500 animate-spin" />
                            <p className="text-sm text-healthcare-blue-700">
                              Analyzing with AI + Computer Vision...
                            </p>
                          </div>
                          <div className="mt-2 flex items-center space-x-2 text-xs text-healthcare-blue-500">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-healthcare-blue-400 rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-healthcare-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-1 bg-healthcare-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span>Processing images and symptoms...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Image Preview */}
                {imagePreview.length > 0 && (
                  <div className="mb-4 p-3 bg-healthcare-blue-50 rounded-lg border border-healthcare-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-healthcare-blue-700">
                        📷 Images for Analysis ({imagePreview.length})
                      </span>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img 
                            src={preview} 
                            alt={`Upload ${index + 1}`} 
                            className="w-20 h-20 object-cover rounded-lg border-2 border-healthcare-blue-300"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Voice Recognition Feedback */}
                {isListening && (
                  <div className="mb-4 p-3 bg-healthcare-green-50 rounded-lg border border-healthcare-green-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-healthcare-green-700">Listening...</span>
                    </div>
                    {currentVoiceText && (
                      <p className="text-sm text-healthcare-green-600 mt-1 italic">
                        "{currentVoiceText}"
                      </p>
                    )}
                  </div>
                )}

                {/* Enhanced Input */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Describe symptoms, or upload images..."
                        className="w-full px-4 py-3 rounded-xl border border-healthcare-blue-200 focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                        disabled={isAnalyzing}
                      />
                    </div>
                    
                    {/* Image Upload */}
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="icon"
                      className="rounded-xl glass-button"
                      disabled={isAnalyzing}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                    
                    {/* Voice Input */}
                    <Button
                      onClick={handleVoiceInput}
                      variant="outline"
                      size="icon"
                      className={`rounded-xl ${isListening ? 'bg-red-50 border-red-200 text-red-600' : 'glass-button'}`}
                      disabled={isAnalyzing || !voiceSupported}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    {/* Send Button */}
                    <Button
                      onClick={handleSendMessage}
                      className="rounded-xl bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600"
                      disabled={isAnalyzing || (!inputValue.trim() && uploadedImages.length === 0)}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Input Methods Info */}
                  <div className="flex items-center justify-center space-x-4 text-xs text-healthcare-blue-500">
                    <div className="flex items-center space-x-1">
                      <Mic className="w-3 h-3" />
                      <span>Voice</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Camera className="w-3 h-3" />
                      <span>Images</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Brain className="w-3 h-3" />
                      <span>AI Analysis</span>
                    </div>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Enhanced Analysis Results */}
            <div className="space-y-6">
              {analysis && (
                <>
                  {/* Urgency Assessment */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">Urgency Assessment</h3>
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border ${getUrgencyColor(analysis.urgencyLevel)}`}>
                      {(() => {
                        const UrgencyIcon = getUrgencyIcon(analysis.urgencyLevel);
                        return <UrgencyIcon className="w-6 h-6" />;
                      })()}
                      <div>
                        <p className="font-semibold capitalize">{analysis.urgencyLevel.replace('_', ' ')} Priority</p>
                        <p className="text-sm opacity-80">
                          {analysis.urgencyLevel === 'immediate' && 'Seek medical attention immediately'}
                          {analysis.urgencyLevel === 'within_24hrs' && 'Schedule appointment within 24 hours'}
                          {analysis.urgencyLevel === 'routine' && 'Can schedule routine appointment'}
                        </p>
                      </div>
                    </div>
                    
                    {analysis.imageAnalysis && (
                      <div className="mt-4 p-3 bg-healthcare-teal-50 rounded-lg border border-healthcare-teal-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-healthcare-teal-700">Image Analysis Results</span>
                          <span className="text-sm text-healthcare-teal-600">
                            {(analysis.imageAnalysis.confidence * 100).toFixed(1)}% AI Confidence
                          </span>
                        </div>
                        <div className="space-y-1">
                          {analysis.imageAnalysis.detectedConditions.map((condition, idx) => (
                            <div key={idx} className="text-sm text-healthcare-teal-600">• {condition}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Specialist Recommendations */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">AI-Recommended Specialists</h3>
                    <div className="space-y-4">
                      {analysis.recommendedSpecialists.map((specialist, index) => (
                        <div key={index} className="bg-healthcare-blue-50 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-healthcare-blue-700">{specialist.name}</h4>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3 h-3 rounded-full ${
                                        i < Math.floor(specialist.rating) ? 'bg-healthcare-green-400' : 'bg-gray-200'
                                      }`}
                                    />
                                  ))}
                                  <span className="text-xs text-healthcare-blue-600 ml-1">{specialist.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-healthcare-blue-600 mb-1">{specialist.specialization}</p>
                              <p className="text-xs text-healthcare-blue-500 mb-2">{specialist.reasoning}</p>
                              <div className="flex items-center space-x-4 text-xs">
                                <span className="text-healthcare-green-600">⚡ {specialist.availability}</span>
                                <span className={getUrgencyColor(specialist.urgency).split(' ')[0]}>{specialist.urgency.replace('_', ' ')}</span>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Link to="/find-doctor">
                                <Button size="sm" className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Book Now
                                </Button>
                              </Link>
                              <Button size="sm" variant="outline" className="glass-button">
                                <Eye className="w-4 h-4 mr-1" />
                                Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Pre-Diagnosis Report */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-healthcare-blue-700">AI Pre-Diagnosis Report</h3>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setShowReport(!showReport)}
                          variant="outline"
                          size="sm"
                          className="glass-button"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          {showReport ? 'Hide' : 'View'}
                        </Button>
                        {showReport && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-button"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {showReport && analysis.preDiagnosisReport && (
                      <div className="bg-healthcare-blue-50 rounded-lg p-4">
                        <pre className="text-sm text-healthcare-blue-700 leading-relaxed whitespace-pre-wrap font-sans">
                          {analysis.preDiagnosisReport}
                        </pre>
                        <div className="mt-4 pt-4 border-t border-healthcare-blue-200">
                          <p className="text-xs text-healthcare-blue-500">
                            🤖 This AI-generated report will be automatically shared with your chosen healthcare provider for efficient consultation.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/find-doctor" className="block">
                        <Button className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-sm">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          Find Specialists
                        </Button>
                      </Link>
                      <Link to="/image-analysis" className="block">
                        <Button variant="outline" className="w-full glass-button text-sm">
                          <Camera className="w-4 h-4 mr-2" />
                          AI Image Analysis
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full glass-button text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Emergency Care
                      </Button>
                      <Button variant="outline" className="w-full glass-button text-sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share Report
                      </Button>
                      <Link to="/ai-health-advice" className="block">
                        <Button variant="outline" className="w-full glass-button text-sm">
                          <Brain className="w-4 h-4 mr-2" />
                          Health Tips
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {!analysis && (
                <div className="glass-card p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-healthcare-blue-400 to-healthcare-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-2">Enhanced AI Ready</h3>
                  <p className="text-sm text-healthcare-blue-600/70 mb-4">
                    Advanced computer vision and voice recognition powered by cutting-edge AI
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-healthcare-blue-50 rounded-lg">
                      <Brain className="w-6 h-6 text-healthcare-blue-500 mx-auto mb-1" />
                      <span className="text-xs text-healthcare-blue-600">NLP Analysis</span>
                    </div>
                    <div className="p-3 bg-healthcare-green-50 rounded-lg">
                      <Eye className="w-6 h-6 text-healthcare-green-500 mx-auto mb-1" />
                      <span className="text-xs text-healthcare-green-600">Computer Vision</span>
                    </div>
                    <div className="p-3 bg-healthcare-teal-50 rounded-lg">
                      <Mic className="w-6 h-6 text-healthcare-teal-500 mx-auto mb-1" />
                      <span className="text-xs text-healthcare-teal-600">Voice Recognition</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
