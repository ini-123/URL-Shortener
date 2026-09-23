const mongose = require('mongoose');

const urlSchema = new mongose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim : true
    },
    shortUrl: {
        type: String,
        required: true,
        trim : true
    }, 
    clicks : {
        type: Number,
        default: 0
    }, 
    clickHistory : [
        {
            clickedAt : {
                type : Date, 
                default : Date.now
            },
            userAgent : {
                type : String,
                trim : true
            },
            referrer : {
                type : String,
                trim : true
            }
        }
    ],
    isActive : {
        type : Boolean,
        required : true
    }
}, {
    timestamps : true
});

module.exports = mongose.model('Url', urlSchema);