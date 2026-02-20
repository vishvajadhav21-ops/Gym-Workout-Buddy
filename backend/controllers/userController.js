const mongoose = require('mongoose');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

// token creation
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

// login 
exports.LoginPage = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token
    })



  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

// signup 
exports.SignupPage = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token
    })

  } catch (error) {
    res.status(400).json({
      error: error.message
    })

  }
}

