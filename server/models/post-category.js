const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, { foreignKey: 'categoryId', as: 'posts' });
    }
  }
  PostCategory.init(
    {
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      category_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'PostCategory',
    }
  );
  return PostCategory;
};
