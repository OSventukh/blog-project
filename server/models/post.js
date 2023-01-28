const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
      this.belongsTo(models.PostCategory, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      this.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
    }
  }
  Post.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      tags: {
        type: DataTypes.TEXT,
        get() {
          return this.getDataValue('tags').split(', ');
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'draft',
        validate: {
          isIn: {
            args: [['draft', 'published']],
            msg: 'Incorect value',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
