function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(302).redirect("/login")
    }
      next();
  }
  
  function isNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(302).redirect("/")
    } 
      next();
  }
  
  module.exports = { isAuthenticated, isNotAuthenticated };