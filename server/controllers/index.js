exports.getHomePage = (req, res, next) => {
  const isLoginPage = req.query.hasOwnProperty('login');
  // redirect to home page from login page (url query /?login) if user already logged in
  if (req.session.isLoggedIn && isLoginPage) {
    res.redirect('/');
  }
  next();
};
