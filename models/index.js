const Teacher = require("./teacher");
const Assignment = require("./assignment");
const Attendance = require("./attendence");
const Behavior = require("./behavior");
const Communication = require("./communication");
const Guardian = require("./guardian");
const Student = require("./student");
const { hasOne } = require("./teacher");

Student.hasOne(Teacher, {
  foreignKey: "teacher_id",
  onDelete: "CASCADE",
});

module.exports = {
  Teacher,
  Assignment,
  Attendance,
  Behavior,
  Communication,
  Guardian,
  Student,
};
