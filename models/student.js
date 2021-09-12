const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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

    // inProgressGrade: {
    //   type: DataTypes.DECIMAL,
    //   allowNull: true,
    // },

    teacherId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Teacher",
        key: "id",
      },
    },
    // guardianId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "Guardian",
    //     key: "id",
    //   },
    // },
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
