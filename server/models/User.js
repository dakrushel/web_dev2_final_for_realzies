const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Custom password hashing (simple hash for demonstration)
UserSchema.methods.hashPassword = function (password) {
  return password
    .split('')
    .reverse()
    .join(''); // Example: Simple reversal (not secure)
};

// Compare password with hashed version
UserSchema.methods.comparePassword = function (password) {
  return this.password === this.hashPassword(password);
};

// Hash password before saving
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
