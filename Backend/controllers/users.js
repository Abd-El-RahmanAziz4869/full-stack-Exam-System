const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const registerSchema = require('../validation/authValidation');

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ status: 'fail', message: error.details[0].message });

  const existingUser = await userModel.findOne({ email: req.body.email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({ status: 'fail', message: 'Email already exists' });
  }

  let user = await userModel.create(req.body);
  user = await userModel.findById(user._id).select('-password');

  res.status(201).json({
    status: 'success',
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user._id,
    },
  });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "fail", message: "you must provide email and password to login" });
  }
  let user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ status: "fail", message: "invalid email or password" });
  }
  let isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ status: "fail", message: "invalid email or password" });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({
    status: 'success',
    data: { token },
  });
};

module.exports = { register, login };