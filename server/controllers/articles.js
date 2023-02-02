const path = require('path');
const { Post, Comment, User } = require('../models');
const slugifyString = require('../utils/slugify');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const contentDivider =
  '<div class="page-break" style="page-break-after:always;"><span style="display:none;">&nbsp;</span></div>';

exports.getAllPosts = (req, res, next) => {
  const { page, size } = req.query;
  const category = req.params.categoryName;
  const tag = req.params.tagName;

  let pageNumber = 1;
  let sizeNumber = 5;

  if (!Number.isNaN(+page) && +page > 0) {
    pageNumber = +page;
  }

  if (!Number.isNaN(+size) && +size >= 0) {
    sizeNumber = +size;
  }

  let whereArticle = {
    status: 'published',
  };

  if (category) {
    whereArticle = {
      ...whereArticle,
      categoryId: res.locals.articleCategory.find(
        (item) => item.category_slug === category
      ).id,
    };
  }

  if (tag) {
    whereArticle = {
      ...whereArticle,
      tags: {
        [Op.substring]: tag,
      },
    };
  }

  Post.findAndCountAll({
    include: ['author', 'comments'],
    where: whereArticle,
    order: [['createdAt', 'DESC']],
    limit: sizeNumber,
    offset: (pageNumber - 1) * sizeNumber,
    distinct: true,
  })
    .then((result) => {
      const totalPage = Math.ceil(result.count / sizeNumber);
      const transformedPost = result.rows.map((post) => {
        const dividedContent = post.content.split(contentDivider);
        const preview = dividedContent[0];
        return {
          id: post.id,
          previewContent: preview,
          title: post.title,
          createdAt: new Date(post.createdAt).toLocaleString(),
          author: post.author,
          commentsCount: post.comments.length,
          slug: post.slug,
        };
      });
      res.render('index', {
        pageTitle: '',
        posts: transformedPost,
        totalPage: totalPage,
        currentPage: pageNumber,
        templateName: 'index',
      });
    })
    .catch((error) => next(error));
};

exports.postAddPost = (req, res, next) => {
  const { title, category, tags, postId, postStatus, content, slug } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const transformTags = tags.replace(/[; ,]+/g, ', ').toLowerCase();

  if (!title || title.trim() === '') {
    return res.status(422).json({
      message: 'Title should not be empty',
    });
  }

  // if postId undefined we create new post
  if (!postId) {
    Post.findOne({
      where: {
        slug: slug || slugifyString(title),
      },
    })
      .then((post) => {
        if (post) {
          return res.status(401).json({
            message: 'Slug should be an unique',
          });
        }
        return Post.create({
          categoryId: category,
          title: title,
          content: content,
          tags: transformTags,
          userId: req.session.user.id,
          status: postStatus,
          slug: slug || slugifyString(title),
        }).then((post) => {
          res.status(201).json({
            message: 'Article successfully created',
            postId: post.id,
          });
        });
      })
      .catch((error) => next(error));
  }

  // if postId passing we update existing post
  if (postId) {
    Post.findByPk(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Article not found');
          error.statusCode = 404;
          throw error;
        }

        post.title = title;
        post.categoryId = category;
        post.content = content;
        post.tags = transformTags;
        post.status = postStatus;
        post.slug = slug || slugifyString(title);
        post.save().then((post) => {
          res.status(200).json({
            type: 'success',
            postId: post.id,
          });
        });
      })
      .catch((error) => next(error));
  }
};

exports.getEditPost = (req, res, next) => {
  const { id } = req.query;
  Post.findByPk(id)
    .then((post) => {
      // rendering empty editor for creating new article
      if (!post) {
        return res.render('article/add-post', {
          postId: null,
          pageTitle: 'Add article',
          title: null,
          data: null,
          category: null,
          tags: null,
          status: null,
          categoryId: null,
          slug: null,
          templateName: 'add-post',
        });
      }

      // rendering editor with data for editing existed article

      res.render('article/add-post', {
        pageTitle: 'Edit article',
        postId: id,
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags,
        status: post.status,
        categoryId: post.categoryId,
        slug: post.slug,
        templateName: 'add-post',
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getArticleData = (req, res, next) => {
  const { postId } = req.params;

  Post.findByPk(postId).then((post) => {
    if (!post) {
      res.status(404).json({
        message: 'Post not find',
      });
    }
    res.status(200).json({
      content: post.content,
    });
  });
};

exports.getSinglePost = (req, res, next) => {
  const { slug } = req.params;

  Post.findOne({
    where: {
      slug: slug,
    },
    include: [
      {
        model: User,
        as: 'author',
      },
      {
        model: Comment,
        as: 'comments',
        include: {
          model: User,
          as: 'author',
        },
      },
    ],
  }).then((post) => {
    if (!post) {
      return res.redirect('/');
    }
    const contentWithoutDivider = post.content.replace(contentDivider, '');
    res.render('article/single-post', {
      id: post.id,
      pageTitle: post.title,
      title: post.title,
      text: contentWithoutDivider,
      category: res.locals.articleCategory.find(
        (category) => category.id === post.categoryId
      ),
      tags: post.tags,
      author: post.author,
      comments: post.comments,
      templateName: 'single-post',
    });
  });
};

exports.postDeletePost = (req, res, next) => {
  const { values } = req.body;

  if (!values || values.length === 0) {
    return res.status(404).json({
      message: 'Post id is undefined',
    });
  }

  Comment.destroy({
    where: {
      postId: { [Op.in]: values },
    },
  })

    .then(() => {
      return Post.destroy({
        where: {
          id: { [Op.in]: values },
        },
      });
    })
    .then(() => res.status(200).json({ message: 'success' }))
    .catch((error) => res.status(500).json({message: 'Something went wrong'}));
};

exports.uploadFile = (req, res, next) => {
  const imagePath = path.join('media', 'images', req.files.upload[0].filename);
  res.json({
    url: '/' + imagePath,
    // ... and any additional fields you want to store, such as width, height, color, extension, etc
  });
};

exports.urlImage = (req, res, next) => {
  res.json({
    success: 1,
    file: {
      url: req.body.url,
    },
  });
};

exports.postSearchArticle = (req, res, next) => {
  const { page, size } = req.query;
  const searchQuery = req.body.search.trim();

  let pageNumber = 1;
  let sizeNumber = 5;

  if (!Number.isNaN(+page) && +page > 0) {
    pageNumber = +page;
  }

  if (!Number.isNaN(+size) && +size >= 0) {
    sizeNumber = +size;
  }

  // if user searching with empty input
  if (!searchQuery) {
    return res.render('search', {
      pageTitle: 'Search',
      posts: [],
      templateName: 'search',
    });
  }

  Post.findAll({
    include: ['author', 'comments'],
    where: {
      [Op.or]: [
        {
          content: {
            [Op.like]: '%' + searchQuery + '%',
          },
        },
        {
          title: {
            [Op.like]: '%' + searchQuery + '%',
          },
        },
        {
          '$comments.text$': {
            [Op.like]: '%' + searchQuery + '%',
          },
        },
      ],
      status: 'published',
    },
    order: [['createdAt', 'DESC']],
    distinct: true,
  })
    .then((result) => {
      const transformedPost = result.map((post) => {
        const dividedContent = post.content.split(contentDivider);
        const preview = dividedContent[0];
        return {
          id: post.id,
          previewContent: preview,
          title: post.title,
          createdAt: new Date(post.createdAt).toLocaleString(),
          author: post.author,
          commentsCount: post.comments.length,
          slug: post.slug,
        };
      });
      res.render('index', {
        pageTitle: '',
        posts: transformedPost,
        totalPage: 1,
        currentPage: 1,
        templateName: 'index',
      });
    })
    .catch((error) => next(error));
};

exports.postComment = (req, res, next) => {
  const { comment, articleId } = req.body;
  if (comment.trim() === '') {
    return res.redirect('back');
  }
  Comment.create({
    text: comment.trim(),
    postId: articleId,
    userId: req.session.user.id,
  })
    .then(() => res.redirect('back'))
    .catch((error) => next(error));
};

exports.postDeleteComment = (req, res, next) => {
  const { commentId } = req.body;

  if (!req.session.user) {
    return res.status(401).json({
      message: 'You do not have the right to perform this action',
    });
  }
  Comment.findByPk(commentId, {
    include: 'author',
  }).then((comment) => {
    if (!comment) {
      return res.status(404).json({
        message: 'This comment does not exist',
      });
    }
    if (
      comment.author.id === req.session.user.id ||
      req.session.user.role === 'admin'
    ) {
      return comment
        .destroy()
        .then(() => res.status(200).json({ message: 'success' }));
    }

    return res.status(401).json({
      message: 'You do not have the right to perform this action',
    });
  });
};
