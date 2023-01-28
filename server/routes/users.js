const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user');

const isAuth = require('../middleware/isAuth');
const accessUsersMiddleware = require('../middleware/accessUsersMiddleware');

/* GET users listing. */

router.get(
  '/profile/:username',
  accessUsersMiddleware(['admin', 'user']),
  userControllers.getUserProfile
);

router.post(
  '/profile',
  accessUsersMiddleware(['admin', 'user']),
  userControllers.postUserProfile
);

router.get('/my-articles', accessUsersMiddleware(['admin', 'user']), userControllers.getUserArticles);

router.get('/messages',  accessUsersMiddleware(['admin', 'user']), userControllers.getMessages);

router.get('/user-messages/:userId',  accessUsersMiddleware(['admin', 'user']), userControllers.getUserMessages);

router.post('/user-messages',  accessUsersMiddleware(['admin', 'user']), userControllers.postUserMessages);


module.exports = router;
