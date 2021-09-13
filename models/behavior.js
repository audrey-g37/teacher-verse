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

    immediateActionTaken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    postActionComments: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Student",
        key: "id",
      },
    },
  },

  {
    hooks: {
      beforeCreate: async (newBehaviorData) => {
        newBehaviorData.title = newBehaviorData.title.trim();
        newBehaviorData.description = newBehaviorData.description.trim();
        newBehaviorData.immediateActionTaken =
          newBehaviorData.immediateActionTaken.trim();
        newBehaviorData.postActionComments =
          newBehaviorData.postActionComments.trim();
        return newBehaviorData;
      },
      beforeUpdate: async (updatedBehaviorData) => {
        updatedBehaviorData.title = updatedBehaviorData.title.trim();
        updatedBehaviorData.description =
          updatedBehaviorData.description.trim();
        newBehaviorData.immediateActionTaken =
          newBehaviorData.immediateActionTaken.trim();
        newBehaviorData.postActionComments =
          newBehaviorData.postActionComments.trim();
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
