import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft, 
  Upload, 
  Camera, 
  Image as ImageIcon,
  Brain,
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
  Stethoscope,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Shield,
  X,
  RotateCcw,
  Download,
  Share,
  FileText,
  Info
} from "lucide-react";

interface AnalysisResult {
  conditions: Array<{
    name: string;
    confidence: number;
    description: string;
    severity: 'mild' | 'moderate' | 'severe';
  }>;
  urgencyLevel: 'low' | 'medium' | 'high';
  recommendedSpecialist: {
    type: string;
    reasoning: string;
  };
  generalAdvice: string[];
  aiConfidence: number;
}

export default function ImageAnalysis() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated AI analysis based on image characteristics
  const analyzeImage = useCallback((imageData: string): AnalysisResult => {
    // This would be replaced with actual AI/ML API calls
    const analyses = {
      skin: {
        conditions: [
          { name: 'Contact Dermatitis', confidence: 87, description: 'Inflammatory skin reaction, possibly from allergens', severity: 'moderate' as const },
          { name: 'Eczema', confidence: 73, description: 'Chronic skin condition with dry, itchy patches', severity: 'mild' as const },
          { name: 'Allergic Reaction', confidence: 65, description: 'Skin response to potential allergen exposure', severity: 'mild' as const }
        ],
        urgencyLevel: 'medium' as const,
        recommendedSpecialist: {
          type: 'Dermatologist',
          reasoning: 'Skin conditions require specialized dermatological evaluation for proper diagnosis and treatment'
        },
        generalAdvice: [
          'Avoid scratching or rubbing the affected area',
          'Keep the area clean and dry',
          'Apply cool compresses if there is itching',
          'Avoid known allergens or irritants',
          'Consider over-the-counter antihistamines for itching'
        ],
        aiConfidence: 85
      },
      eye: {
        conditions: [
          { name: 'Conjunctivitis', confidence: 92, description: 'Inflammation of the eye\'s outer membrane', severity: 'mild' as const },
          { name: 'Stye', confidence: 78, description: 'Bacterial infection of eyelash follicle', severity: 'mild' as const },
          { name: 'Allergic Conjunctivitis', confidence: 67, description: 'Eye irritation from allergens', severity: 'mild' as const }
        ],
        urgencyLevel: 'medium' as const,
        recommendedSpecialist: {
          type: 'Ophthalmologist',
          reasoning: 'Eye symptoms require prompt evaluation to prevent complications and ensure proper treatment'
        },
        generalAdvice: [
          'Avoid touching or rubbing the eyes',
          'Use preservative-free artificial tears',
          'Apply warm compresses for comfort',
          'Maintain good hand hygiene',
          'Avoid wearing contact lenses until resolved'
        ],
        aiConfidence: 89
      },
      wound: {
        conditions: [
          { name: 'Minor Laceration', confidence: 94, description: 'Superficial cut requiring basic wound care', severity: 'mild' as const },
          { name: 'Abrasion', confidence: 82, description: 'Surface wound from friction or scraping', severity: 'mild' as const },
          { name: 'Contusion', confidence: 71, description: 'Bruising from blunt force trauma', severity: 'mild' as const }
        ],
        urgencyLevel: 'low' as const,
        recommendedSpecialist: {
          type: 'Family Medicine',
          reasoning: 'Minor wounds can typically be managed by primary care with proper wound assessment'
        },
        generalAdvice: [
          'Clean the wound gently with water',
          'Apply antibiotic ointment if available',
          'Cover with a sterile bandage',
          'Keep the wound dry and clean',
          'Monitor for signs of infection (redness, swelling, pus)'
        ],
        aiConfidence: 91
      }
    };

    // Simple logic to determine analysis type (in real implementation, this would be AI/ML)
    const filename = 'skin'; // Default fallback
    return analyses[filename as keyof typeof analyses] || analyses.skin;
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        setAnalysisResult(null);
        
        // Start AI analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          const result = analyzeImage(imageData);
          setAnalysisResult(result);
          setIsAnalyzing(false);
        }, 3000); // Simulate processing time
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPEG or PNG image file.');
    }
  }, [analyzeImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleCameraCapture = useCallback(() => {
    // In a real implementation, this would open camera
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  }, []);

  const speakResults = useCallback(() => {
    if (!analysisResult) return;
    
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const text = `AI Analysis Results: The top condition identified is ${analysisResult.conditions[0].name} with ${analysisResult.conditions[0].confidence}% confidence. ${analysisResult.conditions[0].description}. Urgency level is ${analysisResult.urgencyLevel}. I recommend consulting a ${analysisResult.recommendedSpecialist.type}. ${analysisResult.recommendedSpecialist.reasoning}`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onstart = () => setIsPlaying(true);
      
      speechSynthesis.speak(utterance);
    }
  }, [analysisResult, isPlaying]);

  const resetAnalysis = useCallback(() => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Clock;
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
                <span>AI Image Analysis</span>
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
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent mb-4">
              Upload an Image for Instant AI Health Insights
            </h1>
            <p className="text-xl text-healthcare-blue-700/80 max-w-3xl mx-auto leading-relaxed">
              Our advanced AI analyzes your uploaded image to suggest possible conditions and connect you with the right doctor. 
              Support for skin conditions, eye problems, wounds, and oral health.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="space-y-6">
              {!uploadedImage ? (
                /* Upload Area */
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-6 text-center">Upload Your Image</h2>
                  
                  {/* Drag and Drop Area */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      isDragOver 
                        ? 'border-healthcare-blue-500 bg-healthcare-blue-50' 
                        : 'border-healthcare-blue-300 hover:border-healthcare-blue-400 hover:bg-healthcare-blue-50/50'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto">
                        <ImageIcon className="w-12 h-12 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-2">
                          {isDragOver ? 'Drop your image here' : 'Drag & drop your image here'}
                        </h3>
                        <p className="text-healthcare-blue-600 mb-4">or click to browse</p>
                        <p className="text-sm text-gray-500">
                          Supports JPEG, PNG files • Max 10MB
                        </p>
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <Button 
                          className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="glass-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCameraCapture();
                          }}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                /* Image Preview */
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-healthcare-blue-700">Uploaded Image</h2>
                    <Button
                      onClick={resetAnalysis}
                      variant="outline"
                      size="sm"
                      className="glass-button"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Upload New
                    </Button>
                  </div>
                  
                  <div className="relative group">
                    <img
                      src={uploadedImage}
                      alt="Uploaded for analysis"
                      className="w-full h-80 object-cover rounded-xl border-2 border-healthcare-blue-200"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="glass-button">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full
                        </Button>
                        <Button size="sm" variant="outline" className="glass-button">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Processing Status */}
              {isAnalyzing && (
                <div className="glass-card p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-healthcare-blue-700">AI Analysis in Progress</h3>
                    <p className="text-healthcare-blue-600">Our advanced AI is analyzing your image...</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-healthcare-blue-500">
                        <div className="w-2 h-2 bg-healthcare-blue-500 rounded-full animate-bounce"></div>
                        <span>Detecting visual patterns</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-healthcare-blue-500">
                        <div className="w-2 h-2 bg-healthcare-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <span>Matching with medical database</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-healthcare-blue-500">
                        <div className="w-2 h-2 bg-healthcare-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        <span>Generating recommendations</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {analysisResult ? (
                <>
                  {/* Results Header */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-full flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-healthcare-blue-700">AI Analysis Results</h2>
                          <p className="text-sm text-healthcare-blue-600">Confidence: {analysisResult.aiConfidence}%</p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={speakResults}
                        variant="outline"
                        size="sm"
                        className="glass-button"
                      >
                        {isPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                        {isPlaying ? 'Stop' : 'Listen'}
                      </Button>
                    </div>
                    
                    <div className="bg-healthcare-blue-50 rounded-lg p-4 border border-healthcare-blue-200">
                      <p className="text-sm text-healthcare-blue-700">
                        ✨ Our AI has analyzed your image and identified potential conditions. 
                        Please review the results below and consult with a healthcare professional for proper diagnosis.
                      </p>
                    </div>
                  </div>

                  {/* Urgency Level */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">Urgency Assessment</h3>
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border ${getUrgencyColor(analysisResult.urgencyLevel)}`}>
                      {(() => {
                        const UrgencyIcon = getUrgencyIcon(analysisResult.urgencyLevel);
                        return <UrgencyIcon className="w-6 h-6" />;
                      })()}
                      <div>
                        <p className="font-semibold capitalize">{analysisResult.urgencyLevel} Priority</p>
                        <p className="text-sm opacity-80">
                          {analysisResult.urgencyLevel === 'high' && 'Seek medical attention soon'}
                          {analysisResult.urgencyLevel === 'medium' && 'Schedule appointment within a few days'}
                          {analysisResult.urgencyLevel === 'low' && 'Monitor and schedule routine appointment'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top Conditions */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">Top 3 Possible Conditions</h3>
                    <div className="space-y-4">
                      {analysisResult.conditions.map((condition, index) => (
                        <div key={index} className="bg-white/60 rounded-lg p-4 border border-healthcare-blue-100">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-lg font-semibold text-healthcare-blue-700">
                                  {index + 1}. {condition.name}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  condition.severity === 'severe' ? 'bg-red-100 text-red-700' :
                                  condition.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {condition.severity}
                                </span>
                              </div>
                              <p className="text-sm text-healthcare-blue-600 mb-2">{condition.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-healthcare-blue-600">{condition.confidence}%</div>
                              <div className="text-xs text-gray-500">confidence</div>
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 h-2 rounded-full"
                              style={{ width: `${condition.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Specialist */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">Recommended Specialist</h3>
                    <div className="bg-healthcare-green-50 rounded-lg p-4 border border-healthcare-green-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <Stethoscope className="w-6 h-6 text-healthcare-green-600" />
                        <div>
                          <h4 className="font-semibold text-healthcare-green-700">{analysisResult.recommendedSpecialist.type}</h4>
                          <p className="text-sm text-healthcare-green-600">Best suited for your condition</p>
                        </div>
                      </div>
                      <p className="text-sm text-healthcare-green-700 mb-4">{analysisResult.recommendedSpecialist.reasoning}</p>
                      
                      <Link to="/find-doctor">
                        <Button className="bg-gradient-to-r from-healthcare-green-500 to-healthcare-teal-500 hover:from-healthcare-green-600 hover:to-healthcare-teal-600">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          Book Recommended Doctor
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* General Advice */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-healthcare-blue-700 mb-4">General Care Advice</h3>
                    <div className="space-y-3">
                      {analysisResult.generalAdvice.map((advice, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-healthcare-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-healthcare-blue-700">{advice}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="glass-card p-6">
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Link to="/find-doctor" className="block">
                          <Button className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500">
                            <Stethoscope className="w-4 h-4 mr-2" />
                            Find Specialist
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full glass-button">
                          <Share className="w-4 h-4 mr-2" />
                          Share Results
                        </Button>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full glass-button"
                        onClick={() => {
                          const report = `AI Image Analysis Report\n\nTop Condition: ${analysisResult.conditions[0].name} (${analysisResult.conditions[0].confidence}% confidence)\nUrgency: ${analysisResult.urgencyLevel}\nRecommended Specialist: ${analysisResult.recommendedSpecialist.type}\n\nGenerated by AI HealthCare`;
                          const blob = new Blob([report], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'ai-analysis-report.txt';
                          a.click();
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </>
              ) : !isAnalyzing && (
                /* Getting Started */
                <div className="glass-card p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-healthcare-blue-400 to-healthcare-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-healthcare-blue-700 mb-4">AI-Powered Image Analysis</h2>
                  <p className="text-healthcare-blue-600 mb-6 leading-relaxed">
                    Upload an image to get instant AI insights about visible symptoms. Our advanced computer vision technology can help identify:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-healthcare-blue-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-healthcare-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-healthcare-blue-700 text-sm">Skin Conditions</h4>
                      <p className="text-xs text-healthcare-blue-600 mt-1">Rashes, moles, irritations</p>
                    </div>
                    
                    <div className="bg-healthcare-green-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-healthcare-green-700 text-sm">Eye Issues</h4>
                      <p className="text-xs text-healthcare-green-600 mt-1">Infections, irritations</p>
                    </div>
                    
                    <div className="bg-healthcare-teal-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-healthcare-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-healthcare-teal-700 text-sm">Wounds</h4>
                      <p className="text-xs text-healthcare-teal-600 mt-1">Cuts, bruises, injuries</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-purple-700 text-sm">Oral Health</h4>
                      <p className="text-xs text-purple-600 mt-1">Mouth, teeth, gums</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Get started by uploading an image on the left
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-12 glass-card p-6 bg-yellow-50 border border-yellow-200">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Medical Disclaimer</h3>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  <strong>This is not a medical diagnosis.</strong> The AI analysis is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. 
                  Always consult with a qualified healthcare provider regarding any medical concerns. In case of emergency, call 911 immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
