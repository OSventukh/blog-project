const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    }
  }
  Message.init(
    {
      text: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );

  return Message;
};
