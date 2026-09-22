const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation} = require('../validations/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password/:token', resetPasswordValidation, authController.resetPassword);
router.get(
    '/protected',
    authMiddleware.protect,
    (req, res) => {
        res.status(200).json({
            message: 'You have access to this protected route',
            user: req.user
        });
    }
);

module.exports = router;