function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).redirect("/login")
  }
  
  function isNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(200).redirect("/")
    } 
      next();
  }
  
  module.exports = { isAuthenticated, isNotAuthenticated };