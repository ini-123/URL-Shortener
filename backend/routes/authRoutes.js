const express = require("express");

const {
    register,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
} = require("../validations/authValidation");

const router = express.Router();


// Register
router.post(
    "/register",
    registerValidation,
    register
);


// Login
router.post(
    "/login",
    loginValidation,
    login
);


// Forgot password
router.post(
    "/forgot-password",
    forgotPasswordValidation,
    forgotPassword
);


// Reset password
router.post(
    "/reset-password/:token",
    resetPasswordValidation,
    resetPassword
);


module.exports = router;
