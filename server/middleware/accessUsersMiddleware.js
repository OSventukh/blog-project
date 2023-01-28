const accessUsersMiddleware = (roles) => {
  return (req, res, next) => {
    if (req.session.isLoggedIn && roles.includes(req.session.user.role)) {
      return next();
    }
    res.redirect('/');
  };
};

module.exports = accessUsersMiddleware;
