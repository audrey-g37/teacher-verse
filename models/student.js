const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true,
        isAlpha: true,
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true,
        isAlpha: true,
      },
    },

    //TODO:
    // Will we need this column? The grade will be derived from the assessmentFeedback "scoreEarned" column
    inProgressGrade: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    teacherId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Teacher",
        key: "id",
      },
    },
    attendanceId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Attendance",
        key: "id",
      },
    },
    behaviorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Behavior",
        key: "id",
      },
    },
    guardianId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Guardian",
        key: "id",
      },
    },
    communicationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Communication",
        key: "id",
      },
    },
    assignmentFeedbackId: {
      type: DataTypes.INTEGER,
      references: {
        model: "AssignmentFeedback",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newStudentData) => {
        newStudentData.firstName = await newStudentData.firstName.trim().toLowerCase();
        newStudentData.lastName = await newStudentData.lastName.trim().toLowerCase();
        return newStudentData;
      },
      beforeUpdate: async (updatedStudentData) => {
        updatedStudentData.firstName = await updatedStudentData.firstName.trim().toLowerCase();
        updatedStudentData.lastName = await updatedStudentData.lastName.trim().toLowerCase();
        return updatedStudentData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Student",
  }
);

module.exports = Student;
