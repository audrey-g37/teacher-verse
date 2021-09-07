const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Assignments extends Model {}

Assignments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    assignedStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Assignments",
  }
);

module.exports = Assignment;
