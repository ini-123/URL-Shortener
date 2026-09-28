const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const { successResponse, errorResponse } = require('../utils/response');

// Registers a new user
exports.register = async (req, res) => {
    try {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, errors.array());
        }

        // Get registration details from the request
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return errorResponse(res, 409, 'Email is already registered');
        }

        const existingPhone = await User.findOne({ phoneNumber });

        if (existingPhone) {
            return errorResponse(res, 409, 'Phone number is already registered');
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in MongoDB
        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword
        });

        // Return the user's information
        return successResponse( res, 201, 'Registration successful',
            {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                isActive: user.isActive
            }
        );

    } catch (error) {
    return errorResponse(res, 500, 'Registration failed');
    }
};


// Logs an existing user in
exports.login = async (req, res) => {
    try {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, errors.array());
        }

        // Get login details from the request
        const { email, password } = req.body;

        // Find the user using their email
        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        // Check if the user's account is active
        if (!user.isActive) {
            return errorResponse(res, 403, 'Your account is inactive');
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        // Create a JWT token after successful login
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        // Return the token and user's information
        return successResponse(res, 200, 'Login successful',
            {
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                }
            }
        );

    } catch (error) {
        return errorResponse(res, 500, 'Login failed');
    }
};


// Creates a temporary password reset token
exports.forgotPassword = async (req, res) => {
    try {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, errors.array());
        }

        // Get the user's email
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Use the same response whether the email exists or not
        if (!user) {
            return successResponse(res, 200, 'If an account exists with this email, a password reset link will be sent');
        }

        // Generate a random reset token
        const resetToken = crypto
            .randomBytes(32)
            .toString('hex');

        // Hash the token before storing it
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Make the reset token expire after 15 minutes
        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        // Save the reset token and expiry time
        await user.save();

        // Create the password reset link
        const resetLink =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Display the link in the terminal for testing
        // This will later be replaced with an email service
        console.log('Password reset link:', resetLink);

        return successResponse(res, 200, 'If an account exists with this email, a password reset link will be sent');

    } catch (error) {
        return errorResponse( res, 500, 'Unable to process password reset');
    }
};


// Resets the user's password
exports.resetPassword = async (req, res) => {
    try {

        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, errors.array());
        }

        // Get the reset token from the URL
        const { token } = req.params;

        // Get the new password from the request
        const { password } = req.body;

        // Hash the token so it can be compared with MongoDB
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find the user with the matching token and make sure the token has not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return errorResponse(res, 400, 'Reset token is invalid or has expired' );
        }

        // Hash the new password before saving it
        user.password = await bcrypt.hash(password, 10);

        // Remove the reset token so it cannot be reused
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the new password
        await user.save();

        return successResponse(res, 200, 'Password reset successful');

    } catch (error) {
        return errorResponse(res, 500, 'Password reset failed');
    }
};