const express = require('express');
const { body } = require('express-validator');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.get('/signup', authControllers.getSignup);

router.post(
  '/signup',
  body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }),
  body('nickname')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Nickname must be longer than 3 characters')
    .isLength({ max: 30 })
    .withMessage('Nickname must be shorter than 30 characters'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be longer then 5 characters')
    .isLength({ max: 40 })
    .withMessage('Password must be shorter than 40 characters'),
  authControllers.postSignup
);

router.get('/user-confirm/:token', authControllers.getConfirmUser);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').trim(),
  authControllers.postLogin
);

router.post('/logout', authControllers.postLogout);

router.get('/reset', authControllers.getResetPassword);

router.post('/reset', authControllers.postResetPassword);

router.get('/new-password/:token', authControllers.getNewPassword);

router.post('/new-password', authControllers.postNewPassword);

module.exports = router;
