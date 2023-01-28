const { PostCategory } = require('../models/');

const articleCategory = (req, res, next) => {
  PostCategory.findAll()
    .then((result) => {
      if (result.length === 0) {
        PostCategory.create({
          category_name: 'Uncategorized',
          category_slug: 'uncategorized',
        });
      }
      res.locals.articleCategory = result;
      next();
    })
    .catch((error) => next(error));
};

module.exports = articleCategory;
