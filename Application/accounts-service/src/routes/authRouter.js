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
}))

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
})

router.get('/u', isAuthenticated, function (req, res) {
  const {name, email, createdAt } = req.user
  res.status(201).json({
    username: name, 
    email: email,
    createdAt
  })
})

// authentication route 
router.use(isAuthenticated, function(req, res) {
  res.status(200).send('User Authenticated')
})

module.exports = router