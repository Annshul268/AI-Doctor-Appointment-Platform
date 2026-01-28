import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Activity, Heart, Watch, Wifi, Smartphone, Battery, Shield, TrendingUp, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const WearableIntegration = () => {
  const [heartRateMonitoring, setHeartRateMonitoring] = useState(true);
  const [stepTracking, setStepTracking] = useState(true);
  const [sleepAnalysis, setSleepAnalysis] = useState(false);
  const [glucoseMonitoring, setGlucoseMonitoring] = useState(false);

  const devices = [
    { name: "Apple Watch Series 9", status: "Connected", battery: 85, type: "Smartwatch" },
    { name: "Fitbit Charge 5", status: "Connected", battery: 67, type: "Fitness Tracker" },
    { name: "WHOOP 4.0", status: "Syncing", battery: 92, type: "Recovery Band" },
    { name: "Oura Ring Gen3", status: "Connected", battery: 78, type: "Smart Ring" },
    { name: "Freestyle Libre 3", status: "Offline", battery: 45, type: "CGM Sensor" },
  ];

  const healthMetrics = [
    { label: "Heart Rate", value: "72 BPM", trend: "+2%", color: "bg-red-500" },
    { label: "Steps Today", value: "8,247", trend: "+15%", color: "bg-blue-500" },
    { label: "Sleep Quality", value: "82%", trend: "+5%", color: "bg-purple-500" },
    { label: "Calories Burned", value: "1,845", trend: "+8%", color: "bg-orange-500" },
    { label: "Stress Level", value: "Low", trend: "-12%", color: "bg-green-500" },
    { label: "Blood Oxygen", value: "98%", trend: "±0%", color: "bg-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wearable & IoT Integration</h1>
                <p className="text-sm text-gray-600">Connect your devices for comprehensive health monitoring</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              4 Devices Connected
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Watch className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Seamless Health Device Integration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect all your health devices and get AI-powered insights from your real-time biometric data. 
            Monitor everything from heart rate to glucose levels in one unified dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Wifi className="h-4 w-4 mr-2" />
              Connect New Device
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Connected Devices */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  Connected Devices
                </CardTitle>
                <CardDescription>
                  Manage and monitor all your connected health devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{device.name}</h4>
                          <p className="text-sm text-gray-600">{device.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge 
                            variant={device.status === 'Connected' ? 'default' : device.status === 'Syncing' ? 'secondary' : 'destructive'}
                            className="mb-1"
                          >
                            {device.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Battery className="h-3 w-3" />
                            {device.battery}%
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Wifi className="h-4 w-4 mr-2" />
                  Add New Device
                </Button>
              </CardContent>
            </Card>

            {/* Health Metrics Dashboard */}
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Real-Time Health Metrics
                </CardTitle>
                <CardDescription>
                  Live data from your connected devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                        <Badge variant="outline" className="text-xs">
                          {metric.trend}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                        <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings & Controls */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Monitoring Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Heart Rate Monitoring</p>
                    <p className="text-sm text-gray-600">Continuous tracking</p>
                  </div>
                  <Switch checked={heartRateMonitoring} onCheckedChange={setHeartRateMonitoring} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Step Tracking</p>
                    <p className="text-sm text-gray-600">Daily activity goals</p>
                  </div>
                  <Switch checked={stepTracking} onCheckedChange={setStepTracking} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sleep Analysis</p>
                    <p className="text-sm text-gray-600">Nightly sleep quality</p>
                  </div>
                  <Switch checked={sleepAnalysis} onCheckedChange={setSleepAnalysis} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Glucose Monitoring</p>
                    <p className="text-sm text-gray-600">Blood sugar levels</p>
                  </div>
                  <Switch checked={glucoseMonitoring} onCheckedChange={setGlucoseMonitoring} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">8.4/10</div>
                  <p className="text-sm text-gray-600">Overall Health Score</p>
                </div>
                <Progress value={84} className="mb-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Activity Level</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sleep Quality</span>
                    <span className="text-blue-600">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heart Health</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stress Levels</span>
                    <span className="text-green-600">Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Health Check
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Book Doctor Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Wearable Integration Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Connect Devices</h4>
              <p className="text-gray-600">Securely connect your smartwatch, fitness tracker, or health monitoring device to our platform.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Real-Time Monitoring</h4>
              <p className="text-gray-600">Our AI continuously monitors your health data, detecting patterns and anomalies in real-time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. AI Insights</h4>
              <p className="text-gray-600">Receive personalized health insights and recommendations based on your unique biometric data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WearableIntegration;
