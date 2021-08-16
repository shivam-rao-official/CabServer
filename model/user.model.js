const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    empId: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    passwd: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
})


module.exports = mongoose.model('User', UserSchema)