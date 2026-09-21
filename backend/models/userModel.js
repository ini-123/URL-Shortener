const mongose = requre('mongoose');

const UserSchema = new mongose.Schema({
    firstName: {
        type: String,
        required: true
    }, 

    lastName: {
        type: String,
        required: true 
    }, 

    email :  {
        type: String,
        required: true
    }, 

    numberPhone : {
        type: String,
        required: true
    }, 
    // Hashpassword for securit
    password : {
        type: String,
        required: true
    },

    role : {
        enum : ['user', 'admin'],
        required : true
    },
    // Important for user account is active or not
    isActive : {
        type : Boolean,
        required : true
    }
}, {
    timestamps : true
});

module.exports = mongose.model('User', UserSchema);