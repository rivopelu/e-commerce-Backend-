require('dotenv').config() // Dotenv
const { bgMagenta, bgYellow } = require('colors'); //Colors untuk console.log
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');



const app = express();
const Port = process.env.PORT;



//ROUTES++++
const userRoutes = require('./src/routes/userRoutes')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log(bgYellow.bold('....Database Telah Terhubung Di MongoDb....'))
});



app.use(express.json());
app.use(bodyParser())



//ROUTES USER ____
app.use('/api', userRoutes);




// SERVER MAIN
app.listen(Port || 5000, () => {
    console.log(bgMagenta(`-->>Server telah Berjalan di http://localhost:${Port}/<<-- `))
}) 