# Doctor Appointment Application

## Overview

The Doctor Appointment Application is a full-stack web application that allows patients to book appointments with doctors online. It provides an easy and efficient way to manage doctor schedules and patient appointments digitally.

This project demonstrates backend API development, authentication, database integration, and real-time communication.

---

## 🚀 Features

- 👤 User Registration & Login (JWT Authentication)
- 🩺 View Available Doctors
- 📅 Book Appointments
- ❌ Cancel Appointments
- 📄 View Appointment History
- 🔔 Real-time updates using Socket.io
- 🔐 Secure environment variables using `.env`

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Nodemon

### Frontend (if applicable)
- React.js / HTML / CSS / JavaScript

---

## 📂 Project Structure

```
doctor-appointment/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── .env
│
└── frontend/ (if applicable)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/doctor-appointment.git
cd doctor-appointment
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

⚠️ Do NOT push your `.env` file to GitHub.

---

### 4️⃣ Run the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/register`
- `POST /api/login`

### Appointments
- `POST /api/appointments`
- `GET /api/appointments`
- `DELETE /api/appointments/:id`

---

## 🎯 Future Improvements

- Doctor availability management
- Admin dashboard
- Online payment integration
- Email/SMS notifications
- Deployment on cloud platforms (AWS, Render, Vercel)

---

## 📚 What I Learned

- Building REST APIs with Express.js
- Implementing secure authentication using JWT
- Working with MongoDB and Mongoose
- Managing environment variables
- Real-time communication with Socket.io

---

