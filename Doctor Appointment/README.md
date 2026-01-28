# Doctor Appointment Backend API

A comprehensive Node.js + Express + MongoDB backend for a doctor appointment system with AI-powered features and real-time communication.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control
- 👨‍⚕️ **Doctor Management**: CRUD operations for doctors with availability tracking
- 📅 **Appointment System**: Book, manage, and track appointments
- 🤖 **AI Features**: Mock AI responses for image analysis, wearable data, emergency alerts, and more
- 🔄 **Real-time Communication**: WebSocket integration for live updates and notifications
- 🛡️ **Security**: Helmet, CORS, input validation, and secure password hashing
- 📊 **Database**: MongoDB with Mongoose ODM

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Doctors
- `GET /api/doctors` - Get all doctors (with filters)
- `GET /api/doctors/:id` - Get specific doctor
- `GET /api/doctors/:id/availability` - Get doctor availability
- `POST /api/doctors` - Create doctor (admin only)
- `PUT /api/doctors/:id` - Update doctor (doctor/admin)
- `DELETE /api/doctors/:id` - Delete doctor (admin only)

### Appointments
- `POST /api/appointments` - Create appointment (protected)
- `GET /api/appointments/user/:userId` - Get user appointments (protected)
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments (protected)
- `GET /api/appointments/:id` - Get specific appointment (protected)
- `PUT /api/appointments/:id` - Update appointment (protected)
- `PUT /api/appointments/:id/cancel` - Cancel appointment (protected)
- `PUT /api/appointments/:id/complete` - Complete appointment (doctor only)

### AI Features
- `POST /api/ai/image-analysis` - Analyze medical images
- `POST /api/ai/wearables` - Analyze wearable device data
- `POST /api/ai/emergency` - Emergency analysis and recommendations
- `POST /api/ai/translate` - Medical text translation
- `GET /api/ai/community-insights` - Community health insights
- `POST /api/ai/health-advice` - AI-powered health advice

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/doctor-appointment
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGO_URI in .env
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

### Database Setup

The application will automatically create the necessary collections when you first use the API. However, you can also create some sample data:

```javascript
// Sample admin user
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "+1234567890",
  "role": "admin"
}

// Sample doctor
{
  "name": "Dr. John Smith",
  "email": "john.smith@hospital.com",
  "password": "doctor123",
  "phone": "+1234567891",
  "role": "doctor",
  "specialization": "Cardiology",
  "licenseNumber": "MD123456",
  "experience": 10,
  "consultationFee": 150
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/doctor-appointment |
| `JWT_SECRET` | JWT signing secret | your-super-secret-jwt-key |
| `NODE_ENV` | Environment mode | development |

## API Usage Examples

### User Registration
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Doctors
```bash
curl -X GET "http://localhost:5000/api/doctors?specialty=cardiology&rating=4"
```

### Book Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "doctorId": "doctor_id_here",
    "appointmentDate": "2024-01-15",
    "startTime": "09:00",
    "endTime": "09:30",
    "reason": "Regular checkup",
    "symptoms": ["fatigue", "headache"]
  }'
```

## WebSocket Events

### Client Events
- `join-user-room` - Join user's personal room
- `join-doctor-room` - Join doctor's room
- `join-emergency-room` - Join emergency room
- `emergency-alert` - Send emergency alert
- `chat-message` - Send chat message
- `ai-chat-message` - Send AI chat message

### Server Events
- `emergency-alert` - Receive emergency alert
- `appointment-reminder` - Receive appointment reminder
- `chat-message` - Receive chat message
- `ai-chat-response` - Receive AI chat response
- `appointment-status-update` - Receive appointment status update
- `doctor-status-update` - Receive doctor status update

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for patients, doctors, and admins
- **Input Validation**: Request validation and sanitization
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: HTTP headers security
- **Rate Limiting**: Built-in protection against abuse

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource not found)
- 500: Internal Server Error (server errors)

## Development

### Project Structure
```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── doctorController.js # Doctor management
│   ├── appointmentController.js # Appointment logic
│   └── aiController.js     # AI features
├── middleware/
│   └── authMiddleware.js   # JWT authentication
├── models/
│   ├── User.js            # User model
│   ├── Doctor.js          # Doctor model
│   └── Appointment.js     # Appointment model
├── routes/
│   ├── authRoutes.js      # Auth routes
│   ├── doctorRoutes.js    # Doctor routes
│   ├── appointmentRoutes.js # Appointment routes
│   └── aiRoutes.js        # AI routes
├── utils/
│   └── websocket.js       # WebSocket utilities
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md             # This file
```

### Adding New Features

1. **Create Model**: Add new schema in `models/` directory
2. **Create Controller**: Add business logic in `controllers/` directory
3. **Create Routes**: Add API endpoints in `routes/` directory
4. **Update Server**: Register new routes in `server.js`

## Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Test all endpoints
# Use tools like Postman or curl to test the API endpoints
```

## Deployment

### Production Considerations
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Use environment variables for sensitive data
6. Set up monitoring and logging
7. Configure SSL/TLS certificates

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Support

For issues and questions:
1. Check the API documentation
2. Review error logs
3. Test with Postman or similar tools
4. Verify environment configuration

## License

This project is licensed under the ISC License.
