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
      validation: {
        notEmpty: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        notEmpty: true,
      },
    },

    actionItems: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true,
      },
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
    hooks: {
      beforeCreate: async (newBehaviorData) => {
        newBehaviorData.title = newBehaviorData.title.trim();
        newBehaviorData.description = newBehaviorData.description.trim();
        newBehaviorData.actionItems = newBehaviorData.actionItems.trim();
        return newBehaviorData;
      },
      beforeUpdate: async (updatedBehaviorData) => {
        updatedBehaviorData.title = updatedBehaviorData.title.trim();
        updatedBehaviorData.description = updatedBehaviorData.description.trim();
        updatedBehaviorData.actionItems = updatedBehaviorData.actionItems.trim();
        return updatedBehaviorData;
      },
    },

    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Behavior",
  }
);

module.exports = Behavior;
