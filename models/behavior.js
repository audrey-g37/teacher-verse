const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//This behavior model is for significant behavior that happens during the academic year

class Behavior extends Model {}

Behavior.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    actionItems: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isGood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    communicationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Communication",
        key: "id",
      },
    },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Behavior",
  }
);

module.exports = Behavior;
