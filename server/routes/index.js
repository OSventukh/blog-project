const express = require('express');

const router = express.Router();
const homePageController = require('../controllers/index').getHomePage;
const articleControllers = require('../controllers/articles');

/* GET home page. */
router.get('/', homePageController, articleControllers.getAllPosts);

module.exports = router;
