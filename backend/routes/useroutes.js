const express = require('express');

const User = require('../models/userModel');
const { LoginPage, SignupPage } = require('../controllers/userController');

const router = express.Router();




// user routs

// login
router.post('/login' , LoginPage )

//signup
router.post('/signup' , SignupPage )

module.exports = router;