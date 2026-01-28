const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const { specialization, rating, availability } = req.query;
    
    let query = { isAvailable: true };
    
    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    const doctors = await Doctor.find(query)
      .populate('userId', 'name email phone')
      .select('-__v');

    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email phone dateOfBirth gender address')
      .select('-__v');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res) => {
  try {
    const {
      userId,
      specialization,
      licenseNumber,
      experience,
      education,
      certifications,
      languages,
      consultationFee,
      availability,
      bio
    } = req.body;

    // Check if doctor already exists for this user
    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor profile already exists for this user' });
    }

    // Check if license number is unique
    const existingLicense = await Doctor.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({ message: 'License number already exists' });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      licenseNumber,
      experience,
      education,
      certifications,
      languages,
      consultationFee,
      availability,
      bio
    });

    // Update user role to doctor
    await User.findByIdAndUpdate(userId, { role: 'doctor' });

    const populatedDoctor = await Doctor.findById(doctor._id)
      .populate('userId', 'name email phone');

    res.status(201).json(populatedDoctor);
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Doctor
const updateDoctor = async (req, res) => {
  try {
    const {
      specialization,
      experience,
      education,
      certifications,
      languages,
      consultationFee,
      availability,
      bio,
      isAvailable
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the logged-in user is the doctor or admin
    if (doctor.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this doctor' });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        specialization,
        experience,
        education,
        certifications,
        languages,
        consultationFee,
        availability,
        bio,
        isAvailable
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone');

    res.json(updatedDoctor);
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update user role back to patient
    await User.findByIdAndUpdate(doctor.userId, { role: 'patient' });

    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: 'Doctor removed' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get doctor availability
// @route   GET /api/doctors/:id/availability
// @access  Public
const getDoctorAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('availability isAvailable');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({
      isAvailable: doctor.isAvailable,
      availability: doctor.availability
    });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAvailability,
}; 