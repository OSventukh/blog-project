const express = require('express');
const { body } = require('express-validator');
const { Post } = require('../models');

const articleControllers = require('../controllers/articles');

const router = express.Router();

const isAuth = require('../middleware/isAuth');
const accessUsersMiddleware = require('../middleware/accessUsersMiddleware');

router.post(
  '/add-post',
  [
    body('slug')
      .optional({ checkFalsy: true })
      .isSlug({ allowEmpty: true })
      .withMessage('Please, enter a valid slug string')
  ],
  accessUsersMiddleware(['admin', 'user']),
  articleControllers.postAddPost
);

router.get('/post/:slug', articleControllers.getSinglePost);

router.get(
  '/post-edit',
  accessUsersMiddleware(['admin', 'user']),
  articleControllers.getEditPost
);

router.get('/post-edit/:postId', articleControllers.getArticleData);

router.post(
  '/post/delete',
  accessUsersMiddleware(['admin', 'user']),
  articleControllers.postDeletePost
);

router.post(
  '/editor-upload-image',
  accessUsersMiddleware(['admin', 'user']),
  articleControllers.uploadFile
);
router.post(
  '/editor-url-image',
  accessUsersMiddleware(['admin', 'user']),
  articleControllers.urlImage
);

// router.get('/search-article', articleControllers.postSearchArticle);

router.post('/search', articleControllers.postSearchArticle);

router.get('/category/:categoryName', articleControllers.getAllPosts);

router.get('/tag/:tagName', articleControllers.getAllPosts);

router.post(
  '/article-comments',
  accessUsersMiddleware(['admin', 'user']),
  articleControllers.postComment
);

router.post('/delete-comment', articleControllers.postDeleteComment);

module.exports = router;
