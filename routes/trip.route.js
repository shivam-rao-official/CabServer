const express = require('express')
const TripTable = require('../model/trip.model')
const UserTable = require('../routes/routes.user')

const router = express.Router()

/**
 * 
 *      View ALl Trips
 * 
 */
router.get('/viewAllTrips', async (req, res) => {
    await TripTable.find((err, data) => {
        if(err) {
            return res.json({
                status: false,
                msg: err.message
            })
        }
        if(data.length == 0) {
            return res.json({
                status: true,
                msg: `No data in the DB`
            })
        }
        return res.json({
            status: true,
            msg: data
        })
    })
})

/**
 *  
 * 
 *  View Trps User Wise
 * 
 */

 router.post('/viewTrips', async (req, res) => {
     const empId = req.body.empId;

    await TripTable.find({empId},(err, data) => {
        if(err) {
            return res.json({
                status: false,
                msg: err.message
            })
        }
        if(data.length == 0) {
            return res.json({
                status: false,
                msg: null
            })
        }
        // if(data.empId == empId){
            return res.json({
                status: true,
                msg: data
            })
        // }
    })
})

/**
 * 
 *      VIEW Trip Summary for the USER
 * 
 */

router.post('/tripDetail/:uid', (req, res) => {
    const uid = req.params.uid;

    TripTable.findById(uid,(err, data) => {
        if(err) {
            return res.json({
                status: false,
                msg: err.message
            })
        }
        return res.json({
            status: true,
            msg: data
        })
    })
})
/**
 * 
 *      Create Trip
 * 
 */
router.post('/createTrip', async(req, res) => {
    const empId = req.body.empId;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const vehicleType = req.body.vehicleType;
    const confirmed = false;

    
    const TripSchema = new TripTable({
        empId,
        origin,
        destination,
        vehicleType,
        vehicleNum: "null",
        driverNum: "null",
        confirmedBy: "null",
        confirmed
    })

    
    await TripSchema.save((err) => {
        if(err){
            return res.json({
                status: false,
                msg: err.message
            })
        }
        return res.json({
            status: true,
            msg: `Trip Created Successfully`
        })
    })
})

/**
 * 
 *      Confirm Trip
 * 
 */
router.put('/confirmTrip/:uid', async (req, res) => {
    const uid = req.params.uid

    const update = req.body
    const options = {new: true}
    await TripTable.findByIdAndUpdate(uid, update, options)
    .then(done => {
        if(done) {
            return res.json({
                status: true,
                msg: `Trip Confirm Successfully`
            })
        }
    })
    .catch(err => {
        return res.json({
            status: false,
            msg: err
        })
    })

})
module.exports = router