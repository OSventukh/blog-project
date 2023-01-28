const slugify = require('slugify');

const slugifyString = (string) => {
  return slugify(string, {
    lower: true,
    locale: 'uk',
  });
};

module.exports = slugifyString;
