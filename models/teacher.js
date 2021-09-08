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
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
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
        newTeacherData.firstName = await newTeacherData.firstName.trim();
        newTeacherData.lastName = await newTeacherData.lastName.trim();
        newTeacherData.email = await newTeacherData.email.trim();
        newTeacherData.firstName = await newTeacherData.firstName.toLowerCase();
        newTeacherData.lastName = await newTeacherData.lastName.toLowerCase();
        newTeacherData.email = await newTeacherData.email.toLowerCase();
        return newTeacherData;
      },
      // hooks to hash the password, trim unnecessary spaces in user input, and convert user input to lowercase before PUT requests
      beforeUpdate: async (updatedTeacherData) => {
        updatedTeacherData.password = await bcrypt.hash(updatedTeacherData.password, 10);
        updatedTeacherData.firstName = await updatedTeacherData.firstName.trim();
        updatedTeacherData.lastName = await updatedTeacherData.lastName.trim();
        updatedTeacherData.email = await updatedTeacherData.email.trim();
        updatedTeacherData.firstName = await updatedTeacherData.firstName.toLowerCase();
        updatedTeacherData.lastName = await updatedTeacherData.lastName.toLowerCase();
        updatedTeacherData.email = await updatedTeacherData.email.toLowerCase();
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
