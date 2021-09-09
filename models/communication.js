const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Communication extends Model {}

Communication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    communicationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    dateOfCommunication: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    followUpNeeded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },

  {
    hooks: {
      beforeCreate: async (newCommunicationData) => {
        newCommunicationData.description = newCommunicationData.description.trim();
        return newCommunicationData;
      },
      beforeUpdate: async (updatedCommunicationData) => {
        updatedCommunicationData.description = updatedCommunicationData.description.trim();
        return updatedCommunicationData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Communication",
  }
);

module.exports = Communication;
