const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class StudentBehavior extends Model {}

StudentBehavior.init(
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
    behaviorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Behavior",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "studentBehavior",
  }
);

module.exports = StudentBehavior;
