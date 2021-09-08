const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class StudentAssignmentFeedback extends Model {}

StudentAssignmentFeedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    assignmentFeedbackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "AssignmentFeedback",
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
    modelName: "StudentAssignmentFeedback",
  }
);

module.exports = StudentAssignmentFeedback;
