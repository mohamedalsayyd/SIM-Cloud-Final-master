const passport       = require('passport')
const express        = require('express')
const router         = express.Router()
const User           = require('../models/User')
const path           = require('path')

const { isAuthenticated, isNotAuthenticated } = require('../controllers/auth')





// login and register pages
router.get('/register', isNotAuthenticated, function (req, res) {
  res.status(401).sendFile(path.join(__dirname,"../public/register.html"));
})

router.get('/login', isNotAuthenticated, function (req, res) {
  res.status(401).sendFile(path.join(__dirname,"../public/login.html"));
})

router.post('/login', isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})) // passport.authenticate('local') is for authenticating user credentials from POST body. You should use this only for login route.

router.post('/register', isNotAuthenticated, async (req, res, next) => {
    try {
      const { name, password, email } = req.body;
      console.log(name, password, email)
      const user = await User.create({ name, password, email });
      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.redirect('/register')
    }
  });

  router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error)
        }
        res.redirect('/login')
    })
}) // user should be authenticated in order to logout

// authentication route 
router.use('/', isAuthenticated, function(req, res) {
  res.status(200).send('User Authenticated')
})

module.exports = router