require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workout')

//express app
const app = express();

// middleware
app.use(cors({origin: true, credentials: true}));
app.use(express.json())
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// })

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

// routes

app.use('/api/workouts', workoutRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URL).then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connection Successful. Listening on port', process.env.PORT);
    })

}).catch((error) => {
    console.log(error);
})