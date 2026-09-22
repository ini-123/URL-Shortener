const mongose = require('mongoose');

const UserSchema = new mongose.Schema({
    firstName: {
        type: String,
        required: true,
        trim : true
    }, 

    lastName: {
        type: String,
        required: true,
        trim : true 
    }, 

    email :  {
        type: String,
        required: true,
        unique : true,
        lowercase : true, 
        trim : true
    }, 

    phoneNumber : {
        type: String,
        required: true,
        unique : true
    }, 
    // Hashpassword for security
    password : {
        type: String,
        required: true,
        trim : true
    },

    role : {
        type : String,
        enum : ['user', 'admin'],
        required : true,
        default : 'user'  
    },
    // Important for user account is active or not
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpires : {
        type : Date
    }
}, {
    timestamps : true
});

module.exports = mongose.model('User', UserSchema);