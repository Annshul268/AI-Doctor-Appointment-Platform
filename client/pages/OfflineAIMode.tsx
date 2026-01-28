import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Wifi, WifiOff, Download, HardDrive, Smartphone, Brain, Shield, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const OfflineAIMode = () => {
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [syncOnConnect, setSyncOnConnect] = useState(true);

  const aiModels = [
    { 
      name: "Basic Symptom Checker", 
      size: "45 MB", 
      status: "Downloaded", 
      accuracy: "89%",
      lastUpdate: "2 days ago"
    },
    { 
      name: "Emergency Triage AI", 
      size: "78 MB", 
      status: "Downloaded", 
      accuracy: "94%",
      lastUpdate: "1 week ago"
    },
    { 
      name: "Medication Identifier", 
      size: "23 MB", 
      status: "Available", 
      accuracy: "92%",
      lastUpdate: "Available"
    },
    { 
      name: "First Aid Assistant", 
      size: "34 MB", 
      status: "Downloaded", 
      accuracy: "88%",
      lastUpdate: "3 days ago"
    },
    { 
      name: "Vital Signs Analyzer", 
      size: "56 MB", 
      status: "Available", 
      accuracy: "91%",
      lastUpdate: "Available"
    },
  ];

  const offlineFeatures = [
    { 
      title: "Symptom Assessment", 
      description: "Complete health questionnaires and get AI recommendations",
      available: true,
      icon: Brain
    },
    { 
      title: "Emergency Protocols", 
      description: "Access critical emergency procedures and guidance",
      available: true,
      icon: AlertTriangle
    },
    { 
      title: "Medication Info", 
      description: "Look up drug interactions and dosage information",
      available: true,
      icon: Shield
    },
    { 
      title: "Health Records", 
      description: "View and update your local health records",
      available: true,
      icon: HardDrive
    },
  ];

  const storageInfo = {
    total: "2.5 GB",
    used: "890 MB",
    available: "1.6 GB",
    models: "245 MB",
    records: "156 MB",
    cache: "489 MB"
  };

  const downloadModel = (modelName: string) => {
    console.log(`Downloading ${modelName}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Offline AI Mode</h1>
                <p className="text-sm text-gray-600">Access AI healthcare features without internet connection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-slate-600" />
              <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                Offline Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
            <Smartphone className="h-8 w-8 text-slate-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Healthcare, Anytime, Anywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access powerful AI health features even without internet connection. Download AI models 
            to your device for symptom checking, emergency guidance, and health monitoring offline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-slate-600 hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Download AI Models
            </Button>
            <Button variant="outline">
              <WifiOff className="h-4 w-4 mr-2" />
              Enable Offline Mode
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Models Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  Available AI Models
                </CardTitle>
                <CardDescription>
                  Download AI models to your device for offline healthcare assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiModels.map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Brain className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{model.name}</h4>
                          <p className="text-sm text-gray-600">Size: {model.size} • Accuracy: {model.accuracy}</p>
                          <p className="text-xs text-gray-500">Last updated: {model.lastUpdate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={model.status === 'Downloaded' ? 'default' : 'outline'}
                          className={model.status === 'Downloaded' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {model.status === 'Downloaded' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Download className="h-3 w-3 mr-1" />
                          )}
                          {model.status}
                        </Badge>
                        <Button 
                          variant={model.status === 'Downloaded' ? 'ghost' : 'outline'} 
                          size="sm"
                          onClick={() => downloadModel(model.name)}
                        >
                          {model.status === 'Downloaded' ? 'Update' : 'Download'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offline Features */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Offline Capabilities
                </CardTitle>
                <CardDescription>
                  Healthcare features available without internet connection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {offlineFeatures.map((feature, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 ${feature.available ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                          <feature.icon className={`h-4 w-4 ${feature.available ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={feature.available ? 'default' : 'secondary'}
                          className={feature.available ? 'bg-green-100 text-green-700' : ''}
                        >
                          {feature.available ? 'Available Offline' : 'Requires Internet'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connection Status Simulator */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WifiOff className="h-5 w-5 text-orange-600" />
                  Offline Mode Demo
                </CardTitle>
                <CardDescription>
                  Experience how the app works without internet connection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <WifiOff className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Offline Mode Active</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    You're now using cached AI models and local data. All core features remain functional.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Brain className="h-4 w-4 mr-2" />
                    Run Offline Symptom Check
                  </Button>
                  <Button className="w-full" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Access Emergency Protocols
                  </Button>
                  <Button className="w-full" variant="outline">
                    <HardDrive className="h-4 w-4 mr-2" />
                    View Local Health Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings & Storage */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-purple-600" />
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{storageInfo.used}</div>
                    <p className="text-sm text-gray-600">of {storageInfo.total} used</p>
                    <Progress value={35} className="mt-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>AI Models</span>
                      <span className="font-medium">{storageInfo.models}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Records</span>
                      <span className="font-medium">{storageInfo.records}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache</span>
                      <span className="font-medium">{storageInfo.cache}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Available</span>
                      <span className="font-medium">{storageInfo.available}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Manage Storage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Offline Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Offline Mode</p>
                    <p className="text-sm text-gray-600">Use downloaded AI models</p>
                  </div>
                  <Switch checked={offlineModeEnabled} onCheckedChange={setOfflineModeEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Download Updates</p>
                    <p className="text-sm text-gray-600">Update models on WiFi</p>
                  </div>
                  <Switch checked={autoDownload} onCheckedChange={setAutoDownload} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sync When Connected</p>
                    <p className="text-sm text-gray-600">Upload data when online</p>
                  </div>
                  <Switch checked={syncOnConnect} onCheckedChange={setSyncOnConnect} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-green-600" />
                  Connection Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <WifiOff className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-sm">Offline</p>
                      <p className="text-xs text-gray-600">Using cached models</p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    <p>Last sync: 2 hours ago</p>
                    <p>Next auto-sync: When connected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-100">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Models
                </Button>
                <Button className="w-full" variant="outline">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
                <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                  <Brain className="h-4 w-4 mr-2" />
                  Test Offline AI
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Offline AI Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Download Models</h4>
              <p className="text-gray-600">Download compact AI models to your device while connected to internet.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Local Processing</h4>
              <p className="text-gray-600">AI models run directly on your device, ensuring privacy and speed even offline.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Secure Sync</h4>
              <p className="text-gray-600">When connected, data syncs securely to the cloud while maintaining your privacy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineAIMode;
