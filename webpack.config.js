const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './client-src/javascripts/index.js',
    article: './client-src/javascripts/pages/article.js',
    editor: {
      import: './client-src/javascripts/components/ckeditor/index.js',
    },
    messages: './client-src/javascripts/pages/messages.js',
    reset: './client-src/javascripts/pages/reset.js',
    signup: './client-src/javascripts/pages/signup.js',
    'user-articles': './client-src/javascripts/pages/user-articles.js',
    admin: './client-src/javascripts/admin/admin.js',
    media: './client-src/javascripts/admin/media.js',

  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public', 'js'),
  }
};