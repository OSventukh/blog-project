const { User } = require('../../models');
const { Op } = require('sequelize');

const hashedPassword = require('../../utils/hashPass')

exports.createAdmin = async (req, res, next) => {
  const email = req.body.email;
  const nickname = req.body.nickname;
  const password = req.body.password;

  const admin = await User.create({
    email: email,
    nickname: nickname,
    password: await hashedPassword(password),
    role: 'admin',
    status: 'active',
    confirmationCode: null,
    confirmationCodeExpiration: null
  });

  req.session.user = admin;
  req.session.isLoggedIn = true;
  return res.redirect('/admin/settings')
}
exports.getAllUsers = (req, res, next) => {
  User.findAll().then((users) => {
    res.render('admin/users/all-users', {
      pageTitle: 'Users',
      users: users,
      templateName: 'user-list'
    });
  });
};

exports.postDeleteUsers = (req, res, next) => {
  const { values } = req.body;
  console.log(req.body)
  if (!values || values.length === 0) {
    return res.status(404).json({
      message: 'Post id is undefined',
    });
  }

  User.destroy({
    where: {
      id: {
        [Op.in]: values
      }
    }
  })
  .then(() => {
    res.status(200).json({
      message: 'User was successfully deleted'
    })
  })
  .catch((error) => res.status(500).json({
    message: 'User deleting failed',
  }))
}
