import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Lock, Key, FileText, Users, Clock, CheckCircle, AlertCircle, Download, Share, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlockchainHealthRecords = () => {
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [sharePermissions, setSharePermissions] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const healthRecords = [
    { 
      id: "HR001", 
      type: "Medical Report", 
      date: "2024-01-15", 
      provider: "Central Medical Center", 
      status: "Verified",
      hash: "0x7a8b9c2d...4e5f6a7b",
      size: "2.4 MB"
    },
    { 
      id: "HR002", 
      type: "Prescription", 
      date: "2024-01-12", 
      provider: "Family Health Clinic", 
      status: "Verified",
      hash: "0x1c2d3e4f...8g9h0i1j",
      size: "1.1 MB"
    },
    { 
      id: "HR003", 
      type: "Lab Results", 
      date: "2024-01-10", 
      provider: "LabCorp Diagnostics", 
      status: "Pending",
      hash: "0x5k6l7m8n...2o3p4q5r",
      size: "856 KB"
    },
    { 
      id: "HR004", 
      type: "Vaccination Record", 
      date: "2024-01-08", 
      provider: "Public Health Dept", 
      status: "Verified",
      hash: "0x9s0t1u2v...6w7x8y9z",
      size: "642 KB"
    },
  ];

  const accessLog = [
    { user: "Dr. Sarah Johnson", action: "Viewed Lab Results", time: "2 hours ago", location: "Central Medical" },
    { user: "Patient Portal", action: "Downloaded Report", time: "1 day ago", location: "Personal Device" },
    { user: "Dr. Michael Chen", action: "Added Prescription", time: "3 days ago", location: "Family Clinic" },
    { user: "LabCorp System", action: "Uploaded Results", time: "5 days ago", location: "Lab Network" },
  ];

  const sharedPermissions = [
    { provider: "Dr. Sarah Johnson", speciality: "Cardiologist", access: "Full", expires: "Dec 31, 2024" },
    { provider: "Family Health Clinic", speciality: "Primary Care", access: "Limited", expires: "Jun 30, 2024" },
    { provider: "Emergency Services", speciality: "Emergency", access: "Emergency Only", expires: "Permanent" },
  ];

  const blockchainStats = [
    { label: "Records Secured", value: "847", icon: FileText, color: "bg-blue-500" },
    { label: "Verifications", value: "1,203", icon: CheckCircle, color: "bg-green-500" },
    { label: "Access Grants", value: "45", icon: Users, color: "bg-purple-500" },
    { label: "Security Score", value: "99.8%", icon: Shield, color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Blockchain Health Records</h1>
                <p className="text-sm text-gray-600">Secure, verifiable, and decentralized health data management</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              Blockchain Secured
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Blockchain-Secured Health Records
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your health data, protected by cutting-edge blockchain technology. Immutable, verifiable, 
            and under your complete control. Share with providers securely and maintain full ownership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Shield className="h-4 w-4 mr-2" />
              Secure My Records
            </Button>
            <Button variant="outline">
              <Key className="h-4 w-4 mr-2" />
              Generate Keys
            </Button>
          </div>
        </div>

        {/* Blockchain Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {blockchainStats.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="records">My Records</TabsTrigger>
            <TabsTrigger value="permissions">Access Control</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="security">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Blockchain Health Records
                </CardTitle>
                <CardDescription>
                  All your health records are cryptographically secured and verifiable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{record.type}</h4>
                          <p className="text-sm text-gray-600">{record.provider}</p>
                          <p className="text-xs text-gray-500">Hash: {record.hash}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge 
                            variant={record.status === 'Verified' ? 'default' : 'secondary'}
                            className="mb-1"
                          >
                            {record.status === 'Verified' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {record.status}
                          </Badge>
                          <p className="text-xs text-gray-500">{record.date}</p>
                          <p className="text-xs text-gray-500">{record.size}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload New Record
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  Access Permissions
                </CardTitle>
                <CardDescription>
                  Manage who can access your health records and for how long
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sharedPermissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{permission.provider}</h4>
                          <p className="text-sm text-gray-600">{permission.speciality}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            {permission.access}
                          </Badge>
                          <p className="text-xs text-gray-500">Expires: {permission.expires}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Users className="h-4 w-4 mr-2" />
                  Grant New Access
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Access Activity Log
                </CardTitle>
                <CardDescription>
                  Complete audit trail of who accessed your records and when
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessLog.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Eye className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{log.user}</h4>
                          <p className="text-sm text-gray-600">{log.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{log.time}</p>
                        <p className="text-xs text-gray-500">{log.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-indigo-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-red-600" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your blockchain security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">End-to-End Encryption</p>
                      <p className="text-sm text-gray-600">Encrypt all records before blockchain storage</p>
                    </div>
                    <Switch checked={encryptionEnabled} onCheckedChange={setEncryptionEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic Sharing</p>
                      <p className="text-sm text-gray-600">Allow emergency access in critical situations</p>
                    </div>
                    <Switch checked={sharePermissions} onCheckedChange={setSharePermissions} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Backup</p>
                      <p className="text-sm text-gray-600">Automatically backup to multiple blockchain nodes</p>
                    </div>
                    <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-indigo-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Blockchain Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">Network Connected</p>
                        <p className="text-xs text-gray-600">Ethereum Mainnet</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Key className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">Keys Secured</p>
                        <p className="text-xs text-gray-600">256-bit encryption active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Smart Contract</p>
                        <p className="text-xs text-gray-600">v2.1.4 - Audited & Verified</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Private Keys
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* How It Works Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Blockchain Health Records Work</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Secure Encryption</h4>
              <p className="text-gray-600">Your health records are encrypted with military-grade security before being stored on the blockchain.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Blockchain Storage</h4>
              <p className="text-gray-600">Records are distributed across multiple blockchain nodes, making them tamper-proof and always accessible.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Controlled Access</h4>
              <p className="text-gray-600">You control who can access your records and for how long, with full audit trails of all access.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainHealthRecords;
