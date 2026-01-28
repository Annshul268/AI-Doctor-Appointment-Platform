const API_BASE_URL = 'http://localhost:5001/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth API
export const authAPI = {
  signup: async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: any;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};

// Doctor API
export const doctorAPI = {
  getDoctors: async (filters?: { specialization?: string; rating?: number }) => {
    const params = new URLSearchParams();
    if (filters?.specialization) params.append('specialization', filters.specialization);
    if (filters?.rating) params.append('rating', filters.rating.toString());
    
    const response = await fetch(`${API_BASE_URL}/doctors?${params}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getDoctorById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getDoctorAvailability: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}/availability`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createDoctor: async (doctorData: any) => {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(doctorData),
    });
    return handleResponse(response);
  },

  updateDoctor: async (id: string, doctorData: any) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(doctorData),
    });
    return handleResponse(response);
  },
};

// Appointment API
export const appointmentAPI = {
  createAppointment: async (appointmentData: {
    doctorId: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    appointmentType: string;
    reason: string;
    symptoms?: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    return handleResponse(response);
  },

  getUserAppointments: async (userId: string, filters?: { status?: string; date?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.date) params.append('date', filters.date);
    
    const response = await fetch(`${API_BASE_URL}/appointments/user/${userId}?${params}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getDoctorAppointments: async (doctorId: string, filters?: { status?: string; date?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.date) params.append('date', filters.date);
    
    const response = await fetch(`${API_BASE_URL}/appointments/doctor/${doctorId}?${params}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getAppointmentById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateAppointment: async (id: string, appointmentData: any) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    return handleResponse(response);
  },

  cancelAppointment: async (id: string, reason?: string) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ cancellationReason: reason }),
    });
    return handleResponse(response);
  },

  completeAppointment: async (id: string, prescription?: any) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/complete`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ prescription }),
    });
    return handleResponse(response);
  },
};

// AI API
export const aiAPI = {
  imageAnalysis: async (data: { imageUrl: string; analysisType?: string }) => {
    const response = await fetch(`${API_BASE_URL}/ai/image-analysis`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  wearableAnalysis: async (data: { deviceType: string; data: any[] }) => {
    const response = await fetch(`${API_BASE_URL}/ai/wearables`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  emergencyAnalysis: async (data: {
    symptoms: string[];
    severity: string;
    location?: string;
    additionalInfo?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/ai/emergency`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  translateText: async (data: { text: string; targetLanguage: string; sourceLanguage?: string }) => {
    const response = await fetch(`${API_BASE_URL}/ai/translate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  communityInsights: async () => {
    const response = await fetch(`${API_BASE_URL}/ai/community-insights`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  healthAdvice: async (data: { symptoms: string[]; age?: number; gender?: string }) => {
    const response = await fetch(`${API_BASE_URL}/ai/health-advice`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
};

export default {
  auth: authAPI,
  doctor: doctorAPI,
  appointment: appointmentAPI,
  ai: aiAPI,
  healthCheck,
}; 