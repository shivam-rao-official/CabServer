const express = require('express')
const UserTable = require('../model/user.model')


const router = express.Router()

/**
 * 
 *      Admin API for viewing all user
 */
router.get('/viewAllUsers', (req, res) => {
    UserTable.find((err, docs)=>{
        if(err){
            return res.json({
                status: false,
                msg: err.message
            })
        } 
        if(docs.length == 0){
            return res.json({
                status: true,
                msg: `Empty DataBase`
            })
        }
        return res.json({
            status: true,
            data: docs
        })
    })
})


/**
 * 
 *      Sign Up
 */
router.post('/signUp', async (req, res) => {
    const empId = req.body.empId
    const name = req.body.name
    const phoneNum = req.body.phoneNum
    const passwd = req.body.passwd

    const checkEmpId = await UserTable.findOne({empId})
    if(checkEmpId) {
        return res.json({
            status: false,
            msg: `User Already exist with this Employee ID`
        })
    }

    const UserInstance = new UserTable({
        empId,
        name,
        phoneNum,
        passwd
    })

    await UserInstance.save((err) => {
        if(err){
            return res.json({
                status: false,
                msg: err.message
            })
        }
        return res.json({
            status: true,
            msg: `User Created Successfully`
        })
    })
})


module.exports = router