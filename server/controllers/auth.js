const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const transporter = require('../utils/email');
const hashedPassword = require('../utils/hashPass');
const io = require('../socket');

exports.getSignup = (req, res, next) => {
  
  if (req.session.isLoggedIn) {
    return res.redirect('/');
  }
  res.render('auth/signup', {
    pageTitle: 'SignUp',
    templateName: 'signup',
  });
};

exports.postSignup = (req, res, next) => {
  const { email, nickname, password } = req.body;
  const host = req.get('Origin');

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  crypto.randomBytes(32, async (error, buffer) => {
    if (error) {
      const error = new Error('Crypto error');
      throw error;
    }
    const token = buffer.toString('hex');
    return User.create({
      nickname: nickname,
      email: email,
      password: await hashedPassword(password),
      confirmationCode: token,
      confirmationCodeExpiration: Date.now() + 86400000, // 1day
    })
      .then(() => {
        return transporter.sendMail({
          to: email,
          from: 'test@vethealth.com.ua',
          subject: 'Confirm you registration',
          html: `
                <p>You registered on site</p>
                <p>Click this <a style="color: red" href="${host}/user-confirm/${token}">link</a> to confirm tou registration</p>
              `,
        });
      })
      .then(() =>
        res.status(200).json({
          message: 'success',
        })
      )
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.nickname) {
            return res.status(403).json({
              message: 'This nickname is already in use',
            });
          }
          return res.status(403).json({
            message: 'User with this email already exists',
          });
        }
        next(error);
      });
  });
};

exports.getConfirmUser = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    where: {
      confirmationCode: token,
    },
  }).then((user) => {
    if (!user) {
      return res.redirect('/signup');
    }
    if (user.confirmationCodeExpiration < Date.now()) {
      return res.render('auth/expired-confirm', {
        pageTitle: 'Verification code has expired',
        templateName: 'expired-confirm',
      });
    }

    (user.status = 'active'),
      (user.confirmationCode = null),
      (user.confirmationCodeExpiration = null);

    user.save().then(() =>
      res.render('auth/confirmed', {
        pageTitle: 'Verified',
        templateName: 'confirmed',
      })
    );
  });
};
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  return User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        console.log('user', user);
        return res.status(400).json({
          message: 'User with this email not found',
        });
      }

      if (user.status === 'pending') {
        return res.status(400).json({
          message: 'User is not confirmed',
        });
      }
      bcrypt.compare(password, user.password).then((toMatch) => {
        if (toMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          io.getSocket().emit('userId', {
            userId: user.id,
          })
          return req.session.save(() =>
            res.status(200).json({
              message: 'success',
            })
          );
        }

        return res.status(400).json({
          message: 'Wrong password',
        });
      });
    })
    .catch((error) => next(error));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.locals.isAuthenticated = false;
      res.redirect('back');
    }
  });
};

exports.getResetPassword = (req, res, next) => {
  res.render('auth/reset', {
    pageTitle: 'Reset Password',
    confirmMessage: false,
    templateName: 'reset',
  });
};

exports.postResetPassword = (req, res, next) => {
  const { email, password } = req.body;
  const host = req.get('Origin');

  if (req.session.isLoggedIn) {
    User.findByPk(req.session.user.id)
      .then((user) => {
        if (!user) {
          const error = new Error('User not found');
          error.statusCode = 404;
          throw error;
        }

        bcrypt.compare(password, user.password).then((toMatch) => {
          if (toMatch) {
            return crypto.randomBytes(32, (error, buffer) => {
              if (error) {
                return next(error);
              }
              const token = buffer.toString('hex');
              user.confirmationCode = token;
              user.confirmationCodeExpiration = Date.now() + 300000;
              return user
                .save()
                .then(() => {
                  transporter.sendMail({
                    to: user.email,
                    from: 'test@vethealth.com.ua',
                    subject: 'Password reset',
                    html: `
                        <p>Hi, ${user.nickname}. You requested a password reset</p>
                        <p>Click this <a style="color: red" href="${host}/new-password/${token}">link</a> to set a new password</p>
                      `,
                  });
                })
                .then(() => res.status(200).json({ message: 'success' }));
            });
          }

          return res.status(401).json({
            message: 'Wrong password',
          });
        });
      })
      .catch((error) => next(error));
  } else {
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: 'User with this email not found',
          });
        }

        return crypto.randomBytes(32, (error, buffer) => {
          if (error) {
            return next(error);
          }
          const token = buffer.toString('hex');
          user.confirmationCode = token;
          user.confirmationCodeExpiration = Date.now() + 300000;
          return user
            .save()
            .then(() => {
              transporter.sendMail({
                to: user.email,
                from: 'test@vethealth.com.ua',
                subject: 'Password reset',
                html: `
                <p>Hi, ${user.nickname}. You requested a password reset</p>
                <p>Click this <a style="color: red" href="${host}/new-password/${token}">link</a> to set a new password</p>
              `,
              });
            })
            .then(() => res.status(200).json({ message: 'success' }));
        });
      })
      .catch((error) => next(error));
  }
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;

  console.log('TOKEN', token);
  User.findOne({
    where: {
      confirmationCode: token,
    },
  })
    .then((user) => {
      if (!user) {
        return res.redirect('/');
      }

      if (user.confirmationCodeExpiration < Date.now()) {
        return res.redirect('/');
      }

      res.render('auth/new-password', {
        pageTitle: 'New password',
        token: token,
        userId: user.id,
        templateName: 'new-password',
      });
    })
    .catch((error) => next(error));
};

exports.postNewPassword = (req, res, next) => {
  const token = req.body.token;
  const userId = req.body.userId;
  const newPassword = req.body.password;

  User.findOne({
    where: {
      id: userId,
      confirmationCode: token,
    },
  }).then((user) => {
    if (!user) {
      return res.redirect('/');
    }
    bcrypt.hash(newPassword, 12).then((hashedPassword) => {
      user.password = hashedPassword;
      (user.confirmationCode = null), (user.confirmationCodeExpiration = null);
      return user.save().then(() => {
        req.session.destroy((error) => {
          if (error) {
            return next(error);
          }
          res.redirect('/?login');
        });
      });
    });
  });
};
