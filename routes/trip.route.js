const express = require('express')
const TripTable = require('../model/trip.model')
const UserTable = require('../routes/routes.user')

const router = express.Router()

/**
 * 
 *      View ALl Trips
 *      response now returned sorted data.
 * 
 */
router.get('/viewAllTrips', async (req, res) => {
    var data = await TripTable.find((err, data) => {
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
    }).sort({
        updatedAt: -1
    })

        return res.json({
            status: true,
            msg: data
        })
})

/**
 * 
 *      View Filtered Trips
 *      Filters made for: vehicle type and confirm status.
 * 
 */
router.post('/viewFilteredTrips', async (req, res) => {

    const isConfirmed = req.body.isConfirmed;
    const vehicleType = req.body.vehicleType;
    // const fromDate = req.body.fromDate;
   

    await TripTable.find({
        vehicleType, 
        confirmed:isConfirmed
    },(err, data) => {
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

    var data = await TripTable.find({empId},(err, data) => {
        if(err) {
            return res.json({
                status: false,
                msg: err.message
            })
        }
        if(data.length == 0) {
            return res.json({
                status: false,
                msg: [{msg: "No Data found"}]
            })
        }
    }).sort({
        'createdAt': -1
    })

    return res.json({
        status: true,
        msg: data
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
        vehicleNum: "Not Confirmed",
        driverNum: "Not Confirmed",
        confirmedBy: "false",
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


/**
 * 
 *      View recent trip.
 * 
 */
router.get('/recentTrip', async (req, res) => {
    const empId = req.body.empId;

    var data = await TripTable.find({empId, confirmed: true},(err, data) => {
        if(err) {
            return res.json({
                status: false,
                msg: err.message
            })
        }
        if(data.length == 0) {
            return res.json({
                status: false,
                msg: [{msg: "No Data found"}]
            })
        }
    }).sort({
        updatedAt: -1
    }).limit(1)

    return res.json({
        status: true,
        msg: data
    })
})

module.exports = router