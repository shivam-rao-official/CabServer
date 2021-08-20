const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const UserRoute = require('./routes/routes.user')
const TripRoute = require('./routes/trip.route')

const app = express();

const port = process.env.PORT || 5000
const uri = process.env.MONGODB

mongoose.connect(uri, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: true}, (err) =>{
    if(err){
        return console.log(`Error Occured, ${err.message}`);
    }
    return console.log(`DB successfully Conneccted`);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


app
    .use(express.json())
    .use(cors())
    .use('/user',UserRoute)
    .use('/trip', TripRoute)