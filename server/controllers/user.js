const { User, Post, Message } = require('../models');

const { Op } = require('sequelize');
const io = require('../socket');

exports.getUserProfile = (req, res, next) => {
  const username = req.params.username;
  const edit = req.query.edit;

  User.findByPk(req.session.user.id)
    .then((user) => {
      if (!user) {
        return res.redirect('/');
      }
      const dayOfBirth = user.birthday
        ? `${new Date(user.birthday).getFullYear()}-${
            new Date(user.birthday).getMonth() + 1
          }-${new Date(user.birthday).getDate()}`
        : '';
      const userData = {
        userId: user.id,
        role: user.role,
        email: user.email,
        pageTitle: `${user.nickname}'s Profile`,
        nickname: user.nickname,
        name: user.name,
        birthday: dayOfBirth,
        country: user.country,
        city: user.city,
      };
      if (edit) {
        return res.render('user/user-profile-edit', {
          ...userData,
          templateName: 'user-profile-edit',
        });
      }
      res.render('user/user-profile', {
        ...userData,
        templateName: 'user-profile',
      });
    })
    .catch((error) => next(error));
};

exports.postUserProfile = (req, res, next) => {
  const userId = req.body.userId;
  const nickname = req.body.nickname;
  const name = req.body.name;
  const country = req.body.country;
  const city = req.body.city;
  const birthday = req.body.birthday;
  const avatarUrl = req.files.avatar ? req.files.avatar[0].path : null;

  console.log(avatarUrl)
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }

      if (nickname) {
        user.nickname = nickname;
      }

      if (avatarUrl) {
        user.avatar = avatarUrl;
      }

      if (name) {
        user.name = name;
      }

      if (country) {
        user.country = country;
      }

      if (city) {
        user.city = city;
      }

      if (birthday) {
        user.birthday = birthday;
      }

      return user.save().then((user) => {
        req.session.user = user;
        res.redirect(`/profile/${user.nickname}`);
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getUserArticles = (req, res, next) => {
  const userId = req.session.user.id;
  const { page, size, status } = req.query;

  let pageNumber = 1;
  let sizeNumber = 5;

  if (!Number.isNaN(+page) && +page > 0) {
    pageNumber = +page;
  }

  if (!Number.isNaN(+size) && +size >= 0) {
    sizeNumber = +size;
  }

  let whereArticle;

  if ((status && status === 'published') || status === 'draft') {
    whereArticle = {
      status: status,
    };
  }

  Post.findAndCountAll({
    include: ['author', 'comments'],
    where: {
      ...whereArticle,
      userId: userId,
    },
    distinct: true,
    order: [['createdAt', 'DESC']],
    limit: sizeNumber,
    offset: (pageNumber - 1) * sizeNumber,
  })
    .then((result) => {
      if (!result) {
        return next(error);
      }
      const totalPage = Math.ceil(result.count / sizeNumber);

      const transformedPost = result.rows.map((post) => {
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: new Date(post.createdAt).toLocaleString(),
          author: post.author,
          commentsCount: post.comments.length,
          slug: post.slug,
        };
      });
      res.render('user/user-articles', {
        pageTitle: 'My Articles',
        posts: transformedPost,
        totalPage: totalPage,
        currentPage: pageNumber,
        status: status,
        templateName: 'user-articles',
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getMessages = (req, res, next) => {
  User.findAll().then((users) => {
    if (!users) {
      const error = new Error('Users not found');
      error.statusCode = 404;
      throw error;
    }
    res.render('user/user-messages', {
      pageTitle: 'Messages',
      users: users.filter((user) => user.id !== req.session.user.id),
      templateName: 'user-messages',
    });
  });
};

exports.getUserMessages = (req, res, next) => {
  const receiverId = req.params.userId;

  Message.findAll({
    include: ['receiver', 'sender'],
    order: [['createdAt', 'ASC']],
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { receiverId: receiverId },
            { receiverId: req.session.user.id },
          ],
        },
        {
          [Op.or]: [
            { senderId: req.session.user.id },
            { senderId: receiverId },
          ],
        },
      ],
    },
  })
    .then((messages) => {
      if (!messages) {

        const error = new Error('messages not found');
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({
        messages: messages,
        unreadMessages:
          messages.filter(
            (message) =>
              message.seen === false &&
              message.receiverId === req.session.user.id
          ).length || null,
        userId: req.session.user.id,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};

exports.postUserMessages = (req, res, next) => {
  const { receiverId, message } = req.body;

  User.findByPk(receiverId).then((user) => {
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    Message.create({
      receiverId: receiverId,
      senderId: req.session.user.id,
      text: message,
    }).then((createdMessage) => {
      io.getSocket().emit('message', {
        action: 'send',
        message: createdMessage,
        userId: req.session.user.id,
      });
      res.status(200).json({
        message: createdMessage,
      });
    });
  });
};

exports.getUnreadSenders = (req, res, next) => {
  Message.findAll({
    where: {
      receiverId: req.session.user.id,
      seen: false,
    }
  })
  .then((messages) => {
    
    const senders = messages.map((message) => message.senderId)
    const uniqueSenders = new Set(senders);

    console.log(uniqueSenders)
    return res.status(200).json({
      messagesAmount: uniqueSenders.size,
    })

  })
  .catch((error) => res.status(500).json({
    message: 'Something went wrong'
  }))
}

exports.postSeenMessage = (req, res, next) => {
  const { senderId, receiverId } = req.body;

  if (receiverId != req.session.user.id) {
    return res.status(401).json({
      message: 'Invalid user',
    });
  }

  Message.findAll({
    where: {
      receiverId: req.session.user.id,
      senderId: senderId,
    },
  })
    .then((messages) => {
      return messages.forEach((message) => {
        message.seen = true;
        return message.save();
      });
    })
    .then(() => {
      console.log('success')
      res.status(200).json({
        message: 'Success'
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};
