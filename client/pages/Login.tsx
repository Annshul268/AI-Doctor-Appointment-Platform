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
  Shield,
  Zap,
  Chrome,
  Github,
  Apple
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await authAPI.login({ email, password });
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      // Redirect based on user role
      if (response.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login integration would be implemented here`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-blue-50 via-white to-healthcare-green-50 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-r from-healthcare-blue-200 to-healthcare-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-r from-healthcare-green-200 to-healthcare-teal-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-healthcare-teal-300 to-healthcare-blue-300 rounded-full opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to access your AI health companion</p>
        </div>

        {/* Main Login Card */}
        <div className="glass-card p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 focus:border-transparent placeholder-gray-400 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare-blue-500 focus:border-transparent placeholder-gray-400 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-healthcare-blue-600 focus:ring-healthcare-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm text-healthcare-blue-600 hover:text-healthcare-blue-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-healthcare-blue-500 to-healthcare-teal-500 hover:from-healthcare-blue-600 hover:to-healthcare-teal-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Sparkles className="animate-spin h-5 w-5 mr-2" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              className="glass-button flex items-center justify-center py-3"
            >
              <Chrome className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Apple')}
              className="glass-button flex items-center justify-center py-3"
            >
              <Apple className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('GitHub')}
              className="glass-button flex items-center justify-center py-3"
            >
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-healthcare-blue-600 hover:text-healthcare-blue-500 font-semibold"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="glass p-4 rounded-xl">
            <Zap className="w-6 h-6 text-healthcare-blue-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600">AI-Powered</p>
          </div>
          <div className="glass p-4 rounded-xl">
            <Shield className="w-6 h-6 text-healthcare-green-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Secure & Private</p>
          </div>
          <div className="glass p-4 rounded-xl">
            <Heart className="w-6 h-6 text-healthcare-teal-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600">24/7 Care</p>
          </div>
        </div>
      </div>
    </div>
  );
}
