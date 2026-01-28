import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SymptomChecker from "./pages/SymptomChecker";
import FindDoctor from "./pages/FindDoctor";
import AIHealthAdvice from "./pages/AIHealthAdvice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Emergency from "./pages/Emergency";
import ImageAnalysis from "./pages/ImageAnalysis";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DoctorDashboard from "./pages/DoctorDashboard";
import Appointments from "./pages/Appointments";
import WearableIntegration from "./pages/WearableIntegration";
import MultilingualTranslation from "./pages/MultilingualTranslation";
import CommunityHealthInsights from "./pages/CommunityHealthInsights";
import BlockchainHealthRecords from "./pages/BlockchainHealthRecords";
import ARHospitalNavigation from "./pages/ARHospitalNavigation";
import OfflineAIMode from "./pages/OfflineAIMode";
import PredictiveHealthAnalytics from "./pages/PredictiveHealthAnalytics";
import Testimonials from "./pages/Testimonials";
import HowItWorks from "./pages/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/ai-health-advice" element={<AIHealthAdvice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/image-analysis" element={<ImageAnalysis />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/wearable-integration" element={<WearableIntegration />} />
          <Route path="/multilingual-translation" element={<MultilingualTranslation />} />
          <Route path="/community-health-insights" element={<CommunityHealthInsights />} />
          <Route path="/blockchain-health-records" element={<BlockchainHealthRecords />} />
          <Route path="/ar-hospital-navigation" element={<ARHospitalNavigation />} />
          <Route path="/offline-ai-mode" element={<OfflineAIMode />} />
          <Route path="/predictive-health-analytics" element={<PredictiveHealthAnalytics />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
