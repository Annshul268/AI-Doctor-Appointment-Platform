const express = require('express');
const router = express.Router();
const { protect, admin, doctor } = require('../middleware/authMiddleware');
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAvailability,
} = require('../controllers/doctorController');

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/availability', getDoctorAvailability);

// Protected routes
router.post('/', protect, admin, createDoctor);
router.put('/:id', protect, doctor, updateDoctor);
router.delete('/:id', protect, admin, deleteDoctor);

module.exports = router; 