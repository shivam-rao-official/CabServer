const mongoose = require('mongoose')


const TripSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleNum: {
        type: String,
        required: true
    },
    driverNum: {
        type: String,
        required: true
    },
    confirmedbBy: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
    }
},{
    timestamps: true,
})


module.exports = mongoose.model('TripModel', TripSchema)