const express = require('express')
const app = express()
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database')

const homeRoutes = require('./routes/home')
const rankedRoute = require('./routes/ranked')
const authRoute = require('./routes/auth')
const mockRoute = require('./routes/mock')
const tierRoute = require('./routes/tier')

require('dotenv').config({path: './config/.env'})
require("./config/passport")(passport);

connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

app.use(
    session({
      secret: "R5KS74cNBsmt4E",
      resave: false,
      saveUninitialized: false,
      unset: "destroy",
      store: MongoStore.create({ mongoUrl: mongoose.connection._connectionString }),
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', homeRoutes)
app.use('/ranked', rankedRoute)
app.use('/auth', authRoute)
app.use('/mock', mockRoute)
app.use('/tier', tierRoute)

//For all non existing routes
app.get('*', function(req, res) {
    res.status(404).send("This page doesn't exist")
})
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})


