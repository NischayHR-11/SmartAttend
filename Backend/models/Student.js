const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  usn: {
    type: String,
    required: [true, 'USN is required'],
    unique: true,
    trim: true,
    uppercase: true,
    match: [
      /^[0-9]{1,2}[A-Z]{2,3}[0-9]{2}[A-Z]{2,3}[0-9]{3}$/,
      'Please provide a valid USN format (e.g., 1MS21CS001 or 01JST22UCS097)'
    ]
  },
  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: ['CSE', 'ISE', 'ECE', 'EEE', 'ME', 'CE', 'IE', 'BT']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ usn: 1 });
studentSchema.index({ branch: 1, semester: 1 });

// Virtual for full branch name
studentSchema.virtual('fullBranchName').get(function() {
  const branchNames = {
    'CSE': 'Computer Science Engineering',
    'ISE': 'Information Science Engineering',
    'ECE': 'Electronics & Communication Engineering',
    'EEE': 'Electrical & Electronics Engineering',
    'ME': 'Mechanical Engineering',
    'CE': 'Civil Engineering',
    'IE': 'Industrial Engineering',
    'BT': 'Biotechnology'
  };
  return branchNames[this.branch] || this.branch;
});

// Pre-save middleware to format USN
studentSchema.pre('save', function(next) {
  if (this.usn) {
    this.usn = this.usn.toUpperCase();
  }
  next();
});

// Add pagination plugin
studentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', studentSchema);
