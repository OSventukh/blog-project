const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/admin/index');
const articleControllers = require('../controllers/admin/articles');
const usersControllers = require('../controllers/admin/users');
const mediaControllers = require('../controllers/admin/media');
const settingsControllers = require('../controllers/admin/settings');

const accessUsersMiddleware = require('../middleware/accessUsersMiddleware');

const { body } = require('express-validator');

router.get('/', accessUsersMiddleware(['admin']), indexControllers.getIndex);

router.get(
  '/articles',
  accessUsersMiddleware(['admin']),
  articleControllers.getArticles
);

router.get(
  '/articles/categories',
  accessUsersMiddleware(['admin']),
  articleControllers.getArticleCategories
);

router.get(
  '/articles/add-category',
  accessUsersMiddleware(['admin']),
  articleControllers.getAddCategory
);

router.post(
  '/articles/add-category',
  accessUsersMiddleware(['admin']),
  body('categoryName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category name should not be empty'),
  body('categorySlug').trim(),
  articleControllers.postAddCategory
);

router.post('/articles/delete-category', articleControllers.postDeleteCategory);

router.get(
  '/users',
  accessUsersMiddleware(['admin']),
  usersControllers.getAllUsers
);

router.post('/delete-users', accessUsersMiddleware(['admin']), usersControllers.postDeleteUsers)

router.get(
  '/media',
  accessUsersMiddleware(['admin']),
  mediaControllers.getAllMedia
);

router.post(
  '/delete-media',
  accessUsersMiddleware(['admin']),
  mediaControllers.deleteMedia
);

router.get(
  '/settings',
  accessUsersMiddleware(['admin']),
  settingsControllers.getConfiguration
);

router.post(
  '/settings/generals',
  accessUsersMiddleware(['admin']),
  settingsControllers.postGeneralConfiguration
);

router.post('/create-admin', usersControllers.createAdmin)
module.exports = router;
