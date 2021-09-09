const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Teacher extends Model {
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        isAlphanumeric: true, // added isAlphanumeric to ensure no accidental chars are entered
      },
    },
  },
  {
    hooks: {
      // hooks to hash the password, trim unnecessary spaces in user input, and convert user input to lowercase before POST requests
      beforeCreate: async (newTeacherData) => {
        newTeacherData.password = await bcrypt.hash(newTeacherData.password, 10);
        newTeacherData.firstName = await newTeacherData.firstName.trim().toLowerCase();
        newTeacherData.lastName = await newTeacherData.lastName.trim().toLowerCase();
        newTeacherData.email = await newTeacherData.email.trim().toLowerCase();
        return newTeacherData;
      },
      // hooks to hash the password, trim unnecessary spaces in user input, and convert user input to lowercase before PUT requests
      beforeUpdate: async (updatedTeacherData) => {
        updatedTeacherData.password = await bcrypt.hash(updatedTeacherData.password, 10);
        updatedTeacherData.firstName = await updatedTeacherData.firstName.trim().toLowerCase();
        updatedTeacherData.lastName = await updatedTeacherData.lastName.trim().toLowerCase();
        updatedTeacherData.email = await updatedTeacherData.email.trim().toLowerCase();
        return updatedTeacherData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Teacher",
  }
);

module.exports = Teacher;
