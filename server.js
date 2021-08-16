const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const UserRoute = require('./routes/routes.user')

const app = express();

const port = process.env.PORT || 5000
const uri = process.env.MONGODB

mongoose.connect(uri, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}, (err) =>{
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
    .use('/user',UserRoute)