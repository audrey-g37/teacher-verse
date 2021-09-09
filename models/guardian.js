const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Guardian extends Model {}

Guardian.init(
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

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        notEmpty: true,
      },
      // removed since the inputted value will be a STRING type and the validation wopuld always fail
      // validate: {
      //   isNumeric: true,
      // },
    },
  },

  {
    hooks: {
      beforeCreate: async (newGuardianData) => {
        newGuardianData.firstName = await newGuardianData.firstName.trim().toLowerCase();
        newGuardianData.lastName = await newGuardianData.lastName.trim().toLowerCase();
        newGuardianData.email = await newGuardianData.email.trim().toLowerCase();
        newGuardianData.phoneNumber = await newGuardianData.phoneNumber.trim().toLowerCase();
        return newGuardianData;
      },
      beforeUpdate: async (updatedGuardianData) => {
        updatedGuardianData.firstName = await updatedGuardianData.firstName.trim().toLowerCase();
        updatedGuardianData.lastName = await updatedGuardianData.lastName.trim().toLowerCase();
        updatedGuardianData.email = await updatedGuardianData.email.toLowerCase();
        updatedGuardianData.phoneNumber = await updatedGuardianData.phoneNumber.trim().toLowerCase();
        return updatedGuardianData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Guardian",
  }
);

module.exports = Guardian;
