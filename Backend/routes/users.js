const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, isTeacher, isStudent } = require('../middleware/auth');

const router = express.Router();

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        fullName: req.user.fullName,
        email: req.user.email,
        userType: req.user.userType,
        department: req.user.department,
        ...(req.user.studentId && { studentId: req.user.studentId }),
        ...(req.user.teacherId && { teacherId: req.user.teacherId }),
        phoneNumber: req.user.phoneNumber,
        profilePicture: req.user.profilePicture,
        isEmailVerified: req.user.isEmailVerified,
        lastLogin: req.user.lastLogin,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      }
    }
  });
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('First name must be between 2 and 30 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Last name must be between 2 and 30 characters'),
  body('department')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Department must be between 2 and 50 characters'),
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
], handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, department, phoneNumber } = req.body;
    
    // Update user fields
    if (firstName) req.user.firstName = firstName;
    if (lastName) req.user.lastName = lastName;
    if (department) req.user.department = department;
    if (phoneNumber) req.user.phoneNumber = phoneNumber;
    
    await req.user.save();
    
    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: {
          id: req.user._id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          fullName: req.user.fullName,
          email: req.user.email,
          userType: req.user.userType,
          department: req.user.department,
          ...(req.user.studentId && { studentId: req.user.studentId }),
          ...(req.user.teacherId && { teacherId: req.user.teacherId }),
          phoneNumber: req.user.phoneNumber,
          profilePicture: req.user.profilePicture,
          isEmailVerified: req.user.isEmailVerified,
          updatedAt: req.user.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during profile update'
    });
  }
});

// @route   GET /api/users/students
// @desc    Get all students (teachers only)
// @access  Private (Teacher only)
router.get('/students', auth, isTeacher, async (req, res) => {
  try {
    const { page = 1, limit = 10, department, search } = req.query;
    
    let query = { userType: 'student', isActive: true };
    
    // Filter by department if specified
    if (department) {
      query.department = department;
    }
    
    // Search by name or email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }
    
    const students = await User.find(query)
      .select('-password -refreshTokens')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      status: 'success',
      data: {
        students,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching students'
    });
  }
});

// @route   GET /api/users/teachers
// @desc    Get all teachers (teachers only)
// @access  Private (Teacher only)
router.get('/teachers', auth, isTeacher, async (req, res) => {
  try {
    const { page = 1, limit = 10, department, search } = req.query;
    
    let query = { userType: 'teacher', isActive: true };
    
    // Filter by department if specified
    if (department) {
      query.department = department;
    }
    
    // Search by name or email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { teacherId: { $regex: search, $options: 'i' } }
      ];
    }
    
    const teachers = await User.find(query)
      .select('-password -refreshTokens')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      status: 'success',
      data: {
        teachers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching teachers'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics (teachers only)
// @access  Private (Teacher only)
router.get('/stats', auth, isTeacher, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ userType: 'student', isActive: true });
    const totalTeachers = await User.countDocuments({ userType: 'teacher', isActive: true });
    
    // Get department-wise statistics
    const departmentStats = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get user type statistics
    const userTypeStats = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$userType', count: { $sum: 1 } } }
    ]);
    
    res.json({
      status: 'success',
      data: {
        totalUsers: totalStudents + totalTeachers,
        totalStudents,
        totalTeachers,
        departmentStats,
        userTypeStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;
