import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  ChevronDown, 
  Mic, 
  Volume2, 
  Brain, 
  CheckCircle,
  Sparkles,
  Zap
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  aiSupported: boolean;
  voiceSupported: boolean;
}

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void;
  showAITranslation?: boolean;
  className?: string;
}

export default function LanguageSelector({ 
  onLanguageChange, 
  showAITranslation = true, 
  className = "" 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationDemo, setTranslationDemo] = useState("");

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', aiSupported: true, voiceSupported: true },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', aiSupported: true, voiceSupported: true },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', aiSupported: true, voiceSupported: true },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', aiSupported: true, voiceSupported: true },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', aiSupported: true, voiceSupported: true },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', aiSupported: true, voiceSupported: true },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', aiSupported: true, voiceSupported: true },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', aiSupported: true, voiceSupported: true },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', aiSupported: true, voiceSupported: true },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', aiSupported: true, voiceSupported: true },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', aiSupported: true, voiceSupported: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', aiSupported: true, voiceSupported: true },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', aiSupported: true, voiceSupported: false },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', aiSupported: true, voiceSupported: false },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', aiSupported: true, voiceSupported: false },
  ];

  useEffect(() => {
    // Set default language to English
    const defaultLang = languages.find(lang => lang.code === 'en');
    if (defaultLang) {
      setSelectedLanguage(defaultLang);
    }
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    
    // Simulate AI translation
    if (language.code !== 'en' && showAITranslation) {
      setIsTranslating(true);
      
      setTimeout(() => {
        const translations = {
          'es': '¡Bienvenido a AI HealthCare! Tu compañero de salud inteligente.',
          'fr': 'Bienvenue chez AI HealthCare ! Votre compagnon de santé intelligent.',
          'de': 'Willkommen bei AI HealthCare! Ihr intelligenter Gesundheitsbegleiter.',
          'zh': '欢迎来到AI医疗保健！您的智能健康伙伴。',
          'ja': 'AI ヘルスケアへようこそ！あなたのスマートヘルスコンパニオン。',
          'ar': 'مرحباً بك في AI HealthCare! رفيقك الذكي للصحة.',
          'hi': 'AI हेल्थकेयर में आपका स्वागत है! आपका स्मार्ट स्वास्थ्य साथी।'
        };
        
        setTranslationDemo(translations[language.code as keyof typeof translations] || 'Translation available');
        setIsTranslating(false);
      }, 1500);
    }
    
    onLanguageChange?.(language);
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Language Selector Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="glass-button flex items-center space-x-2 min-w-[140px]"
      >
        <Globe className="w-4 h-4" />
        <span className="flex items-center space-x-2">
          <span>{selectedLanguage?.flag}</span>
          <span className="hidden md:inline">{selectedLanguage?.name}</span>
          <span className="md:hidden">{selectedLanguage?.code.toUpperCase()}</span>
        </span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-healthcare-blue-600">
              <Brain className="w-4 h-4" />
              <span className="font-semibold">AI-Powered Translation</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Real-time AI translation with voice support
            </p>
          </div>
          
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className="w-full px-4 py-3 text-left hover:bg-healthcare-blue-50 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{language.flag}</span>
                  <div>
                    <div className="font-medium text-gray-800">{language.name}</div>
                    <div className="text-sm text-gray-500">{language.nativeName}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {language.aiSupported && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-healthcare-blue-100 text-healthcare-blue-600 rounded-full text-xs">
                      <Brain className="w-3 h-3" />
                      <span>AI</span>
                    </div>
                  )}
                  {language.voiceSupported && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-healthcare-green-100 text-healthcare-green-600 rounded-full text-xs">
                      <Volume2 className="w-3 h-3" />
                      <span>Voice</span>
                    </div>
                  )}
                  {selectedLanguage?.code === language.code && (
                    <CheckCircle className="w-4 h-4 text-healthcare-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500">
              <strong>50+ languages supported</strong> with real-time AI translation
            </div>
          </div>
        </div>
      )}

      {/* AI Translation Demo */}
      {showAITranslation && selectedLanguage?.code !== 'en' && (
        <div className="mt-4 p-4 bg-healthcare-blue-50 rounded-lg border border-healthcare-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-healthcare-blue-500" />
              <span className="text-sm font-semibold text-healthcare-blue-700">AI Translation Active</span>
            </div>
            {selectedLanguage?.voiceSupported && translationDemo && (
              <Button
                onClick={() => speakText(translationDemo, selectedLanguage.code)}
                size="sm"
                variant="outline"
                className="glass-button"
              >
                <Volume2 className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          {isTranslating ? (
            <div className="flex items-center space-x-2 text-healthcare-blue-600">
              <div className="animate-spin w-4 h-4 border-2 border-healthcare-blue-500 border-t-transparent rounded-full"></div>
              <span className="text-sm">Translating to {selectedLanguage?.name}...</span>
            </div>
          ) : translationDemo ? (
            <div className="text-sm text-healthcare-blue-700">
              {translationDemo}
            </div>
          ) : null}
        </div>
      )}

      {/* Voice Input Demo */}
      {selectedLanguage?.voiceSupported && (
        <div className="mt-2">
          <Button
            size="sm"
            variant="outline"
            className="glass-button w-full"
            onClick={() => {
              alert(`Voice input activated for ${selectedLanguage.name}. Speak now... (Demo)`);
            }}
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice Input in {selectedLanguage.name}
          </Button>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
