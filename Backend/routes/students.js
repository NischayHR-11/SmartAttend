const express = require('express');
const Student = require('../models/Student');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/students/register
// @desc    Register a new student from teachers dash board.
// @access  Private (Teachers only)
router.post('/register', auth, async (req, res) => {
  try {
    const { name, usn, rollNo, branch, semester } = req.body;

    // Log incoming form data
    console.log('📝 STUDENT REGISTRATION REQUEST');
    console.log('==========================================');
    console.log('📋 Form Data Received:');
    console.log(`   • Name: ${name}`);
    console.log(`   • USN: ${usn}`);
    console.log(`   • Roll Number: ${rollNo}`);
    console.log(`   • Branch: ${branch}`);
    console.log(`   • Semester: ${semester}`);
    console.log('👨‍🏫 Request From:');
    console.log(`   • Teacher: ${req.user.firstName} ${req.user.lastName}`);
    console.log(`   • Email: ${req.user.email}`);
    console.log(`   • User Type: ${req.user.userType}`);
    console.log('==========================================');

    // Check if user is a teacher
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({
        status: 'error',
        message: 'Only teachers can register students'
      });
    }

    // Check if student with USN already exists
    const existingStudent = await Student.findOne({ usn: usn.toUpperCase() });
    if (existingStudent) {
      return res.status(400).json({
        status: 'error',
        message: 'Student with this USN already exists'
      });
    }

    // Create new student
    const student = new Student({
      name,
      usn: usn.toUpperCase(),
      rollNo,
      branch,
      semester,
      registeredBy: req.user._id
    });

    await student.save();

    // Populate the registeredBy field for response
    await student.populate('registeredBy', 'firstName lastName email');

    // Log successful student registration details
    console.log('✅ STUDENT REGISTERED SUCCESSFULLY');
    console.log('==========================================');
    console.log('📋 Student Details:');
    console.log(`   • Name: ${student.name}`);
    console.log(`   • USN: ${student.usn}`);
    console.log(`   • Roll Number: ${student.rollNo}`);
    console.log(`   • Branch: ${student.branch} (${student.fullBranchName})`);
    console.log(`   • Semester: ${student.semester}`);
    console.log(`   • Student ID: ${student._id}`);
    console.log(`   • Registration Date: ${student.createdAt}`);
    console.log('👨‍🏫 Registered By:');
    console.log(`   • Teacher: ${student.registeredBy.firstName} ${student.registeredBy.lastName}`);
    console.log(`   • Email: ${student.registeredBy.email}`);
    console.log(`   • Teacher ID: ${student.registeredBy._id}`);
    console.log('==========================================');

    res.status(201).json({
      status: 'success',
      message: 'Student registered successfully',
      data: {
        student: {
          id: student._id,
          name: student.name,
          usn: student.usn,
          rollNo: student.rollNo,
          branch: student.branch,
          fullBranchName: student.fullBranchName,
          semester: student.semester,
          registeredBy: student.registeredBy,
          createdAt: student.createdAt
        }
      }
    });

  } catch (error) {
    console.error('❌ STUDENT REGISTRATION FAILED');
    console.error('==========================================');
    console.error('Error Details:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      console.error('🔴 Validation Errors:');
      errors.forEach(err => console.error(`   • ${err}`));
      console.error('==========================================');
      
      // Create a more user-friendly error message
      let userFriendlyMessage = 'Validation error: ';
      if (errors.length === 1) {
        userFriendlyMessage = errors[0];
      } else {
        userFriendlyMessage = `Multiple validation errors: ${errors.join(', ')}`;
      }
      
      return res.status(400).json({
        status: 'error',
        message: userFriendlyMessage,
        errors,
        details: 'Please check all required fields and their formats'
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      console.error('🔴 Duplicate Entry Error: Student with this USN already exists');
      console.error('==========================================');
      
      // Extract the field that caused the duplicate error
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      
      return res.status(400).json({
        status: 'error',
        message: `Student with USN '${value}' already exists`,
        field,
        value,
        details: 'Please use a different USN or update the existing student record'
      });
    }

    // Handle other errors
    console.error('🔴 Registration Error:', error.message);
    console.error('==========================================');
    
    res.status(500).json({
      status: 'error',
      message: 'Registration failed due to server error',
      details: 'Please try again later or contact support if the problem persists',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/students
// @desc    Get all students (with pagination and filtering)
// @access  Private (Teachers only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({
        status: 'error',
        message: 'Only teachers can view students'
      });
    }

    const { page = 1, limit = 10, branch, semester, search } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: {
        path: 'registeredBy',
        select: 'firstName lastName email'
      }
    };

    // Build filter object
    const filter = { isActive: true };
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { usn: { $regex: search, $options: 'i' } },
        { rollNo: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.paginate(filter, options);

    res.json({
      status: 'success',
      data: {
        students: students.docs.map(student => ({
          id: student._id,
          name: student.name,
          usn: student.usn,
          rollNo: student.rollNo,
          branch: student.branch,
          fullBranchName: student.fullBranchName,
          semester: student.semester,
          registeredBy: student.registeredBy,
          createdAt: student.createdAt
        })),
        pagination: {
          currentPage: students.page,
          totalPages: students.totalPages,
          totalStudents: students.totalDocs,
          limit: students.limit,
          hasNext: students.hasNextPage,
          hasPrev: students.hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private (Teachers only)
router.get('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({
        status: 'error',
        message: 'Only teachers can view student details'
      });
    }

    const student = await Student.findById(req.params.id)
      .populate('registeredBy', 'firstName lastName email');

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        student: {
          id: student._id,
          name: student.name,
          usn: student.usn,
          rollNo: student.rollNo,
          branch: student.branch,
          fullBranchName: student.fullBranchName,
          semester: student.semester,
          registeredBy: student.registeredBy,
          createdAt: student.createdAt,
          updatedAt: student.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student details
// @access  Private (Teachers only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({
        status: 'error',
        message: 'Only teachers can update student details'
      });
    }

    const { name, rollNo, branch, semester } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (rollNo) updateData.rollNo = rollNo;
    if (branch) updateData.branch = branch;
    if (semester) updateData.semester = semester;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('registeredBy', 'firstName lastName email');

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Student updated successfully',
      data: {
        student: {
          id: student._id,
          name: student.name,
          usn: student.usn,
          rollNo: student.rollNo,
          branch: student.branch,
          fullBranchName: student.fullBranchName,
          semester: student.semester,
          registeredBy: student.registeredBy,
          updatedAt: student.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Update student error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete/Deactivate student
// @access  Private (Teachers only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({
        status: 'error',
        message: 'Only teachers can delete students'
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Student deactivated successfully'
    });

  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
