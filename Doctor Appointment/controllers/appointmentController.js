const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      startTime,
      endTime,
      appointmentType,
      reason,
      symptoms
    } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if doctor is available
    if (!doctor.isAvailable) {
      return res.status(400).json({ message: 'Doctor is not available' });
    }

    // Check if time slot is available
    const conflictingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      startTime,
      status: { $nin: ['cancelled', 'no-show'] }
    });

    if (conflictingAppointment) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    // Check if patient already has an appointment at this time
    const patientConflict = await Appointment.findOne({
      patientId: req.user._id,
      appointmentDate: new Date(appointmentDate),
      startTime,
      status: { $nin: ['cancelled', 'no-show'] }
    });

    if (patientConflict) {
      return res.status(400).json({ message: 'You already have an appointment at this time' });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime,
      appointmentType,
      reason,
      symptoms,
      amount: doctor.consultationFee
    });

    const createdAppointment = await Appointment.findById(appointment._id)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      });

    res.status(201).json(createdAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments/:userId
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    let query = { patientId: req.params.userId };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(new Date(date).setDate(new Date(date).getDate() + 1));
      query.appointmentDate = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      })
      .sort({ appointmentDate: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get doctor appointments
// @route   GET /api/appointments/doctor/:doctorId
// @access  Private/Doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    let query = { doctorId: req.params.doctorId };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(new Date(date).setDate(new Date(date).getDate() + 1));
      query.appointmentDate = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      })
      .sort({ appointmentDate: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is authorized to view this appointment
    if (req.user.role !== 'admin' && 
        appointment.patientId._id.toString() !== req.user._id.toString() &&
        appointment.doctorId.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this appointment' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is authorized to update this appointment
    if (req.user.role !== 'admin' && 
        appointment.patientId.toString() !== req.user._id.toString() &&
        appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patientId', 'name email phone')
     .populate({
       path: 'doctorId',
       populate: { path: 'userId', select: 'name email phone' }
     });

    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is authorized to cancel this appointment
    if (req.user.role !== 'admin' && 
        appointment.patientId.toString() !== req.user._id.toString() &&
        appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }

    // Check if appointment can be cancelled (not completed or already cancelled)
    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment cannot be cancelled' });
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = cancellationReason;
    appointment.cancelledBy = req.user.role === 'admin' ? 'admin' : 
                             appointment.patientId.toString() === req.user._id.toString() ? 'patient' : 'doctor';

    const updatedAppointment = await appointment.save();

    const populatedAppointment = await Appointment.findById(updatedAppointment._id)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      });

    res.json(populatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Complete appointment
// @route   PUT /api/appointments/:id/complete
// @access  Private/Doctor
const completeAppointment = async (req, res) => {
  try {
    const { prescription, notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is the doctor for this appointment
    if (appointment.doctorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to complete this appointment' });
    }

    appointment.status = 'completed';
    appointment.prescription = prescription;
    appointment.notes = notes;

    const updatedAppointment = await appointment.save();

    const populatedAppointment = await Appointment.findById(updatedAppointment._id)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone' }
      });

    res.json(populatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  completeAppointment,
}; 