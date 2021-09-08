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
      validation: {
        notEmpty: true,
      },
    },

    submissionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    scoreEarned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true, // added validation to make sure an integer is entered. This will be converted into a decimal using a hook below
      },
    },

    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assignment",
        key: "id",
      },
    },
  },

  {
    hooks: {
      beforeCreate: async (newAssignmentFeedbackData) => {
        newAssignmentFeedbackData.feedback = newAssignmentData.feedback.trim();
        //convert inputted student score into a decimal to store in db as a decimal
        newAssignmentFeedbackData.scoreEarned = newAssignmentFeedbackData.scoreEarned / 100;
        return newAssignmentFeedbackData;
      },
      beforeUpdate: async (updatedAssignmentFeedbackData) => {
        updatedAssignmentFeedbackData.feedback = updatedAssignmentData.feedback.trim();
        //convert inputted student score into a decimal to store in db as a decimal
        updatedAssignmentFeedbackData.scoreEarned = updatedAssignmentFeedbackData.scoreEarned / 100;
        return updatedAssignmentFeedbackData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "AssignmentFeedback",
  }
);

module.exports = AssignmentFeedback;
