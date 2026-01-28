const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'http://localhost:5001/api';

async function testAPI() {
  console.log('🧪 Testing Doctor Appointment API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);

    // Test signup
    console.log('\n2. Testing user signup...');
    const testEmail = `test${Date.now()}@example.com`;
    const signupResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: 'password123',
        phone: '+1234567890',
        role: 'patient'
      })
    });
    
    if (signupResponse.ok) {
      const signupData = await signupResponse.json();
      console.log('✅ Signup successful:', signupData.name);
      
      // Test login
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'password123'
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login successful:', loginData.name);
        
        const token = loginData.token;
        
        // Test get doctors (public endpoint)
        console.log('\n4. Testing get doctors...');
        const doctorsResponse = await fetch(`${API_BASE_URL}/doctors`);
        if (doctorsResponse.ok) {
          const doctorsData = await doctorsResponse.json();
          console.log('✅ Get doctors successful:', doctorsData.length, 'doctors found');
        } else {
          console.log('❌ Get doctors failed:', doctorsResponse.status);
        }
        
        // Test AI endpoints
        console.log('\n5. Testing AI endpoints...');
        const aiResponse = await fetch(`${API_BASE_URL}/ai/image-analysis`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            imageUrl: 'https://example.com/test.jpg',
            analysisType: 'skin'
          })
        });
        
        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          console.log('✅ AI image analysis successful:', aiData.analysisId);
        } else {
          console.log('❌ AI image analysis failed:', aiResponse.status);
        }
        
        // Test community insights
        const insightsResponse = await fetch(`${API_BASE_URL}/ai/community-insights`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (insightsResponse.ok) {
          const insightsData = await insightsResponse.json();
          console.log('✅ Community insights successful:', insightsData.insights.length, 'insights');
        } else {
          console.log('❌ Community insights failed:', insightsResponse.status);
        }
        
      } else {
        console.log('❌ Login failed:', loginResponse.status);
      }
    } else {
      const errorData = await signupResponse.json();
      console.log('❌ Signup failed:', signupResponse.status, errorData);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI(); 