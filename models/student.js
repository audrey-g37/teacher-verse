const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

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
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Student",
  }
);

module.exports = Student;
