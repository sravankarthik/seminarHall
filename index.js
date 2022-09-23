const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors");

const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const requestRoutes = require("./routes/request");
const seminarRoutes = require("./routes/seminar");
const calandarRoutes = require("./routes/calendar")

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", requestRoutes);
app.use("/api", seminarRoutes);
app.use("/api", calandarRoutes);



//DB connection
const port = 4000
// mongoose.connect('mongodb://localhost:27017/seminar')
//     .then(() => { console.log("DB connected...") });
mongoose.connect('mongodb+srv://test:test@cluster0.5wsh5.mongodb.net/test')
    .then(() => { console.log("DB connected...") });
//Server connection
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})