const { User } = require('../../models');
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
