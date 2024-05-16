const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserAuthModel } = require('../models');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserAuthModel.create({ username, email, password: hashedPassword });
    const token = generateToken(user.id);
    res.success(user);
  } catch (error) {
    res.failed(error.message, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserAuthModel.findOne({ where: { email } });
    if (!user) {
        return res.failed('User not found', 404);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.failed('Invalid password', 401);
    }
    const token = generateToken(user);
    res.success({user: user, token: token});
  } catch (error) {
    res.failed(error.message, 500);
  }
};

const forgotPassword = async (req, res) => {
  // Implement forgot password logic here
};

module.exports = { register, login, forgotPassword };
