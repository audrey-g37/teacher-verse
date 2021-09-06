const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class AssignmentFeedback extends Model {}

AssignmentFeedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    submissionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    scoreEarned: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assignment",
        key: "id",
      },
    },

    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Student",
        key: "id",
      },
    },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "AssignmentFeedback",
  }
);

module.exports = AssignmentFeedback;
