import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { authAPI } from "@/lib/api";
import { 
  Heart, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  User,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  Chrome,
  Github,
  Apple
} from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToNewsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToNewsletter: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState("");

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return !value.trim() ? `${name === 'firstName' ? 'First' : 'Last'} name is required` : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value ? 'Email is required' : !emailRegex.test(value) ? 'Invalid email format' : '';
      case 'phone':
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        return !value ? 'Phone number is required' : !phoneRegex.test(value) ? 'Invalid phone format' : '';
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        return age < 13 ? 'Must be at least 13 years old' : '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
        return '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'agreeToTerms':
        return !value ? 'You must agree to the terms and conditions' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const stepFields = {
      1: ['firstName', 'lastName', 'email'],
      2: ['phone', 'dateOfBirth'],
      3: ['password', 'confirmPassword', 'agreeToTerms']
    };

    const fieldsToValidate = stepFields[step as keyof typeof stepFields] || [];
    const newErrors: FormErrors = {};
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    setSubmitError("");
    
    try {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        role: 'patient'
      };
      
      const response = await authAPI.signup(userData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setSubmitError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    alert(`${provider} signup integration would be implemented here`);
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    
    if (strength <= 25) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 50) return { strength, label: 'Fair', color: 'bg-orange-500' };
    if (strength <= 75) return { strength, label: 'Good', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue-50 via-white to-healthcare-green-50 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-r from-healthcare-blue-200 to-healthcare-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-r from-healthcare-green-200 to-healthcare-teal-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-healthcare-blue-600 to-healthcare-teal-600 bg-clip-text text-transparent">
              AI HealthCare
            </span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600">Join thousands who trust AI for their healthcare</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">
              Step {currentStep} of 3
            </span>
          </div>
        </div>

        {/* Main Signup Card */}
        <div className="glass-card p-8">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {submitError}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <p className="text-sm text-gray-600">Let's start with your basic details</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 placeholder-gray-400 bg-white/50 backdrop-blur-sm ${
                          errors.firstName ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 placeholder-gray-400 bg-white/50 backdrop-blur-sm ${
                          errors.lastName ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 placeholder-gray-400 bg-white/50 backdrop-blur-sm ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Social Signup Options */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('Google')}
                    className="glass-button flex items-center justify-center py-3"
                  >
                    <Chrome className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('Apple')}
                    className="glass-button flex items-center justify-center py-3"
                  >
                    <Apple className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('GitHub')}
                    className="glass-button flex items-center justify-center py-3"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-white font-semibold py-3 rounded-xl"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
                  <p className="text-sm text-gray-600">Help us personalize your experience</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 placeholder-gray-400 bg-white/50 backdrop-blur-sm ${
                        errors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 bg-white/50 backdrop-blur-sm ${
                        errors.dateOfBirth ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 glass-button py-3"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-white font-semibold py-3 rounded-xl"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Secure Your Account</h3>
                  <p className="text-sm text-gray-600">Create a strong password to protect your health data</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 placeholder-gray-400 bg-white/50 backdrop-blur-sm ${
                        errors.password ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Password strength</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.strength <= 25 ? 'text-red-600' :
                          passwordStrength.strength <= 50 ? 'text-orange-600' :
                          passwordStrength.strength <= 75 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 placeholder-gray-400 bg-white/50 backdrop-blur-sm ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="h-4 w-4 text-healthcare-blue-600 focus:ring-healthcare-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      I agree to the{" "}
                      <Link to="/terms" className="text-healthcare-blue-600 hover:text-healthcare-blue-500 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-healthcare-blue-600 hover:text-healthcare-blue-500 font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-xs text-red-600 flex items-center ml-6">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.agreeToTerms}
                    </p>
                  )}

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreeToNewsletter}
                      onChange={(e) => handleInputChange('agreeToNewsletter', e.target.checked)}
                      className="h-4 w-4 text-healthcare-blue-600 focus:ring-healthcare-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      I'd like to receive health tips and updates via email
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 glass-button py-3"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-white font-semibold py-3 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Sparkles className="animate-spin h-5 w-5 mr-2" />
                        Creating account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-healthcare-blue-600 hover:text-healthcare-blue-500 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
