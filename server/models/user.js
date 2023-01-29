const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
      this.hasMany(models.Message, {
        foreignKey: 'senderId',
        as: 'sentMessages',
      });
      this.hasMany(models.Message, {
        foreignKey: 'receiverId',
        as: 'receivedMessages',
      });
    }
  }
  User.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          if (!this.getDataValue('avatar')) {
            return 'images/default_avatar.jpg';
          }
          return this.getDataValue('avatar');
        },
        set(value) {
          const replacedSlash = value.replace(/\\/g, '/');
          this.setDataValue('avatar', replacedSlash);
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'active']],
            msg: 'Incorect value',
          },
        },
      },
      confirmationCode: {
        type: DataTypes.STRING,
      },
      confirmationCodeExpiration: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
