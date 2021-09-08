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

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      // removed since the inputted value will be a STRING type and the validation wopuld always fail
      // validate: {
      //   isNumeric: true,
      // },
    },
  },

  {
    hooks: {
      beforeCreate: async (newGuardianData) => {
        newGuardianData.firstName = await newGuardianData.firstName.trim();
        newGuardianData.lastName = await newGuardianData.lastName.trim();
        newGuardianData.email = await newGuardianData.email.trim();
        newGuardianData.firstName = await newGuardianData.firstName.toLowerCase();
        newGuardianData.lastName = await newGuardianData.lastName.toLowerCase();
        newGuardianData.email = await newGuardianData.email.toLowerCase();
        newGuardianData.phoneNumber = await newGuardianData.phoneNumber.trim();
        return newGuardianData;
      },
      beforeUpdate: async (updatedGuardianData) => {
        updatedGuardianData.firstName = await updatedGuardianData.firstName.trim();
        updatedGuardianData.lastName = await updatedGuardianData.lastName.trim();
        updatedGuardianData.email = await updatedGuardianData.email.trim();
        updatedGuardianData.firstName = await updatedGuardianData.firstName.toLowerCase();
        updatedGuardianData.lastName = await updatedGuardianData.lastName.toLowerCase();
        updatedGuardianData.email = await updatedGuardianData.email.toLowerCase();
        updatedGuardianData.phoneNumber = await updatedGuardianData.phoneNumber.trim();
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
