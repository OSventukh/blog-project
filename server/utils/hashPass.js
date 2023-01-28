const bcrypt = require('bcryptjs');

const hashedPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 12);
  return hashed;
};

module.exports = hashedPassword;
