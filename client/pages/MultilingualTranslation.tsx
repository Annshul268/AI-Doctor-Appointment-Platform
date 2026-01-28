import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Languages, Volume2, Mic, RotateCcw, Globe, Headphones, MessageCircle, Brain, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const MultilingualTranslation = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
  ];

  const commonMedicalPhrases = [
    { en: "I have a headache", es: "Tengo dolor de cabeza", category: "Symptoms" },
    { en: "Where is the pharmacy?", es: "¿Dónde está la farmacia?", category: "Navigation" },
    { en: "I need to see a doctor", es: "Necesito ver a un médico", category: "Emergency" },
    { en: "I am allergic to...", es: "Soy alérgico a...", category: "Allergies" },
    { en: "What time is my appointment?", es: "¿A qué hora es mi cita?", category: "Appointments" },
    { en: "I need help with pain", es: "Necesito ayuda con el dolor", category: "Symptoms" },
  ];

  const handleTranslate = () => {
    setIsTranslating(true);
    // Simulate translation
    setTimeout(() => {
      setTranslatedText("Esta es una traducción simulada del texto ingresado. En la implementación real, esto se conectaría a un servicio de traducción AI.");
      setIsTranslating(false);
    }, 2000);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setInputText("I have been experiencing chest pain for the past hour and need medical attention.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const playAudio = (text: string) => {
    // In real implementation, this would use text-to-speech
    console.log("Playing audio for:", text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Multilingual AI Translation</h1>
                <p className="text-sm text-gray-600">Break language barriers in healthcare communication</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              12 Languages
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Languages className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Medical Translation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Communicate with healthcare providers in any language. Our AI translator specializes in medical terminology 
            and ensures accurate, culturally sensitive translations for better patient care.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Translation Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Real-Time Medical Translation
                </CardTitle>
                <CardDescription>
                  Translate medical conversations instantly with AI-powered accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Language Selection */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-6"
                    onClick={() => {
                      const temp = sourceLanguage;
                      setSourceLanguage(targetLanguage);
                      setTargetLanguage(temp);
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Input Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Original Text</label>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleVoiceRecord}
                          className={isRecording ? "text-red-600" : "text-gray-600"}
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => playAudio(inputText)}>
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Type or speak your medical query..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[150px] resize-none"
                    />
                    {isRecording && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-sm">Recording...</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Translation</label>
                      <Button variant="ghost" size="sm" onClick={() => playAudio(translatedText)}>
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="min-h-[150px] p-3 bg-purple-50 rounded-md border border-purple-200">
                      {isTranslating ? (
                        <div className="flex items-center gap-2 text-purple-600">
                          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Translating...</span>
                        </div>
                      ) : (
                        <p className="text-gray-900">{translatedText || "Translation will appear here..."}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={handleTranslate} 
                    disabled={!inputText || isTranslating}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Translate
                  </Button>
                  <Button variant="outline" onClick={() => {setInputText(""); setTranslatedText("");}}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Common Medical Phrases */}
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Common Medical Phrases
                </CardTitle>
                <CardDescription>
                  Quick access to frequently used medical expressions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {commonMedicalPhrases.map((phrase, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors cursor-pointer"
                         onClick={() => setInputText(phrase.en)}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{phrase.category}</Badge>
                        <Button variant="ghost" size="sm" onClick={(e) => {e.stopPropagation(); playAudio(phrase.es);}}>
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{phrase.en}</p>
                      <p className="text-sm text-gray-600">{phrase.es}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features & Settings */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Translation Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Brain className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Medical AI</p>
                    <p className="text-xs text-gray-600">Specialized medical terminology</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Volume2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Voice Translation</p>
                    <p className="text-xs text-gray-600">Speak and hear translations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Real-time Translation</p>
                    <p className="text-xs text-gray-600">Instant conversation support</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Headphones className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-sm">Audio Assistance</p>
                    <p className="text-xs text-gray-600">Listen to pronunciations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle>Supported Languages</CardTitle>
                <CardDescription>Currently supporting 12 major languages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {languages.slice(0, 8).map((lang) => (
                    <div key={lang.code} className="flex items-center gap-2 text-sm">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Languages
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Headphones className="h-4 w-4 mr-2" />
                  Practice Pronunciation
                </Button>
                <Button className="w-full" variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Cultural Health Guide
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Translation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Medical Translation Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Speak or Type</h4>
              <p className="text-gray-600">Input your medical query through voice recording or text input in your preferred language.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. AI Processing</h4>
              <p className="text-gray-600">Our medical AI analyzes context and terminology to provide accurate, culturally appropriate translations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Instant Translation</h4>
              <p className="text-gray-600">Receive immediate translations with audio playback and pronunciation guidance for clear communication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultilingualTranslation;
