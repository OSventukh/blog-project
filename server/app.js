const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const csurf = require('csurf');

const helmet = require('helmet');
const { sequelize } = require('./models');
const compression = require('compression');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const articleRouter = require('./routes/articles');
const adminRouter = require('./routes/admin');

// middlewares
const firstUser = require('./middleware/firstUser');
const settingsInit = require('./middleware/configs');
const articleCategory = require('./middleware/articleCategory');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'script-src': ["'self'", "https://cdn.jsdelivr.net", "https://cdn.socket.io"]
    }
  }
}));
app.use(compression());

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: 'veryLongString',
    store: new sequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/media', express.static(path.join(__dirname, '../media')));

// configure file storage and file name with multer
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'avatar') {
      cb(null, path.join('media', 'avatars'));
    }

    if (file.fieldname === 'upload') {
      cb(null, path.join('media', 'images'));
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'avatar') {
      cb(null, req.session.user.id + path.extname(file.originalname));
    }
    if (file.fieldname === 'upload') {
      cb(null, Math.random().toString() + path.extname(file.originalname));
    }
  },
});

// File extension filter for multer

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: imageStorage, fileFilter: fileFilter }).fields([
    { name: 'avatar' },
    { name: 'upload', totalCount: 1 },
  ])
);

app.use(csurf());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn || false;
  res.locals.loggedUser = req.session.user || undefined;
  next();
});
// setting default settings after first application start
// initializing article categories
app.use(settingsInit, articleCategory);

// creating admin after first application start;
app.use(firstUser);

app.use('/', indexRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(articleRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    pageTitle: err.message,
    csrfToken: req.csrfToken(),
    templateName: 'error',
  });
});

module.exports = app;
