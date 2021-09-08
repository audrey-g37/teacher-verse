const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class StudentAttendance extends Model {}

StudentAttendance.init(
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
    attendanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Attendance",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "studentAttendance",
  }
);

module.exports = StudentAttendance;
