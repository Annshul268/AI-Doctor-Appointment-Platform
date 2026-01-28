const User = require('../models/User');
const jwt = require('jsonwebtoken');
const memoryStorage = require('../utils/memoryStorage');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password, phone, role = 'patient', dateOfBirth, gender, address } = req.body;

    // Check if user exists
    let userExists;
    try {
      userExists = await User.findOne({ email });
    } catch (error) {
      // MongoDB not available, use in-memory storage
      userExists = memoryStorage.findUserByEmail(email);
    }
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    let user;
    try {
      user = await User.create({
        name,
        email,
        password,
        phone,
        role,
        dateOfBirth,
        gender,
        address
      });
    } catch (error) {
      // MongoDB not available, use in-memory storage
      user = memoryStorage.createUser({
        name,
        email,
        password,
        phone,
        role,
        dateOfBirth,
        gender,
        address
      });
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    let user;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      // MongoDB not available, use in-memory storage
      user = memoryStorage.findUserByEmail(email);
    }

    if (user && (user.password === password)) { // Simple password check for in-memory storage
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    let user;
    try {
      user = await User.findById(req.user._id).select('-password');
    } catch (error) {
      // MongoDB not available, use in-memory storage
      user = memoryStorage.findUserById(req.user._id);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
      user.gender = req.body.gender || user.gender;
      user.address = req.body.address || user.address;
      user.emergencyContact = req.body.emergencyContact || user.emergencyContact;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
}; 