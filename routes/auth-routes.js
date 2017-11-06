const router = require('express').Router();
const passport = require('passport');

// route for facebook authentication and login
// different scopes while logging in
router.get('/facebook',
  passport.authenticate('facebook'));


//callback route for user
router.get('/redirect', passport.authenticate('facebook'), (req, res) => {
  console.log(req.user);
  res.redirect('/profile');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})
module.exports = router;