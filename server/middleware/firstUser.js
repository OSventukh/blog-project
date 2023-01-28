const { User } = require('../models');

const firstUser = (req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      if (user) {
        return next();
      }
      if (req.method === 'GET') {
        return res.render('admin/users/create-admin', {
          pageTitle: 'Create admin',
          templateName: 'create-root-admin',
        });
      }
      return next();
    })
    .catch((error) => next(error));
};

module.exports = firstUser;
