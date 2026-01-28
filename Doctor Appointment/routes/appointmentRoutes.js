const express = require('express');
const router = express.Router();
const { protect, doctor } = require('../middleware/authMiddleware');
const {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  completeAppointment,
} = require('../controllers/appointmentController');

// All routes are protected
router.use(protect);

// Appointment management
router.post('/', createAppointment);
router.get('/user/:userId', getUserAppointments);
router.get('/doctor/:doctorId', doctor, getDoctorAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.put('/:id/cancel', cancelAppointment);
router.put('/:id/complete', doctor, completeAppointment);

module.exports = router; 