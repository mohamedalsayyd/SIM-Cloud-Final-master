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
    const { name, password, phone, email } = req.body;
    await User.create({ name, password, phone, email });
    res.redirect('/login')
  } catch (error) {
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
  res.status(404).json(req.user)
})

router.get('/u/orders/add', isAuthenticated, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { orders: req.user.orders + 1}, { new: true });
  res.status(404).json(user)
})

// authentication route 
router.use(isAuthenticated, function(req, res) {
  res.status(200).send('User Authenticated')
})

module.exports = router