require('dotenv').config() // Dotenv
const { bgMagenta, bgYellow } = require('colors'); //Colors untuk console.log
const express = require('express')
const mongoose = require('mongoose')



const app = express();
const Port = process.env.PORT;



//ROUTES++++
const AuthRoutes = require('./src/routes/AuthRoutes')
const AdminRoutes = require('./src/routes/AdminRoutes')
const CategoryRoutes = require('./src/routes/categoryRoutes');
const ProductRoutes = require('./src/routes/productRoutes')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log(bgYellow.bold('....Database Telah Terhubung Di MongoDb....'))
});



app.use(express.json());




//ROUTES USER ____
app.use('/api', AuthRoutes);

// ROUTES ADMIN
app.use('/api', AdminRoutes);

// ROUTES CATEGORY
app.use('/api', CategoryRoutes);

// ROUTES PRODUCT
app.use('/api', ProductRoutes);




// SERVER MAIN
app.listen(Port || 5000, () => {
    console.log(bgMagenta(`-->>Server telah Berjalan di http://localhost:${Port}/<<-- `))
}) 