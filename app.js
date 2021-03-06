const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express();

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongoose db');
});

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));



//initilize
app.use(passport.initialize());
app.use(passport.session());

//setup view engine
app.set('view engine', 'ejs');

//serve static files
app.use(express.static('assets'));

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to requests at ${port}`);
})
