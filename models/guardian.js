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
      allowNull: true,
      unique: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      validation: {
        notEmpty: true,
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
    hooks: {
      beforeCreate: async (newGuardianData) => {
        newGuardianData.firstName = await newGuardianData.firstName.trim().toLowerCase();
        newGuardianData.lastName = await newGuardianData.lastName.trim().toLowerCase();
        newGuardianData.email = await newGuardianData.email.trim().toLowerCase();
        newGuardianData.phoneNumber = await newGuardianData.phoneNumber.trim();
        return newGuardianData;
      },
      beforeUpdate: async (updatedGuardianData) => {
        updatedGuardianData.firstName = await updatedGuardianData.firstName.trim().toLowerCase();
        updatedGuardianData.lastName = await updatedGuardianData.lastName.trim().toLowerCase();
        updatedGuardianData.email = await updatedGuardianData.email.toLowerCase().toLowerCase();
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
