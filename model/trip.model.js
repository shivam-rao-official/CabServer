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
    confirmedBy: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true,
    },
},{
    timestamps: new Date('<YYYY-mm-dd>'),
})


module.exports = mongoose.model('TripModel', TripSchema)