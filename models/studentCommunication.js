const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class StudentCommunication extends Model {}

StudentCommunication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Student",
        key: "id",
      },
    },
    communicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Communication",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "studentCommunication",
  }
);

module.exports = StudentCommunication;
