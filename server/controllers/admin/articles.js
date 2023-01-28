const { validationResult } = require('express-validator');
const { Post, PostCategory } = require('../../models');

const slugifyString = require('../../utils/slugify');

exports.getArticles = (req, res, next) => {
  const { size, page } = req.query;
  const status = req.query.status;

  let condition = {};

  let pageNumber = 1;
  let sizeNumber = 5;

  if (!Number.isNaN(+page) && +page > 0) {
    pageNumber = +page;
  }

  if (!Number.isNaN(+size) && +size >= 0) {
    sizeNumber = +size;
  }

  // checking if url query has 'status' property and if its value matches with one of the article status recorded in the article model;

  if ((status && status === 'draft') || status === 'published') {
    condition = {
      where: {
        status: status,
      },
    };
  }

  Post.findAndCountAll({
    ...condition,
    limit: sizeNumber,
    offset: (pageNumber - 1) * sizeNumber,
    include: 'author',
    order: [['createdAt', 'desc']],
  }).then((result) => {
    const totalPage = Math.ceil(result.count / sizeNumber);

    res.render('admin/articles/all-articles', {
      pageTitle: 'Articles',
      articles: result.rows,
      articlesCount: result.count,
      totalPage: totalPage,
      status: status,
      currentPage: pageNumber,
      templateName: 'articles-list'
    });
  });
};

exports.getArticleCategories = (req, res, next) => {
  PostCategory.findAndCountAll({
    include: 'posts',
  }).then((result) => {
    res.render('admin/articles/categories', {
      pageTitle: 'Article categories',
      categories: result.rows,
      totalPage: 1,
      templateName: 'article-categories'
    });
  });
};

exports.getAddCategory = (req, res, next) => {
  res.render('admin/articles/edit-category', {
    pageTitle: 'Add new category',
    message: '',
    templateName: 'add-article-category'
  });
};

exports.postAddCategory = (req, res, next) => {
  const { categoryName, categorySlug } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  PostCategory.create({
    category_name: categoryName,
    category_slug: categorySlug
      ? slugifyString(categorySlug)
      : slugifyString(categoryName),
  })
    .then(() => {
      res.redirect('/admin/articles/categories');
    })
    .catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          message: `${error.errors[0].message} (${error.errors[0].value})`,
        });
      }
    });
};

exports.postDeleteCategory = (req, res, next) => {
  const itemId = req.body.data;

  if (itemId === 1) {
    return res.redirect('back');
  }

  Post.findAll({
    where: {
      categoryId: itemId,
    },
  })
    .then((results) => {
      if (results) {
        return results.forEach((item) => {
          item.categoryId = 1;
          return item.save();
        });
      }
    })
    .then(() => {
      PostCategory.destroy({
        where: {
          id: itemId,
        },
      })
        .then((result) => {
          if (result) {
            return res.sendStatus(200);
          }
          res.sendStatus(400);
        })
        .catch((error) => next(res));
    });
};
