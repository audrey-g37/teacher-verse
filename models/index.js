const Teacher = require("./teacher");
const Assignment = require("./assignment");
const AssignmentFeedback = require("./assignmentFeedback");
const Attendance = require("./attendence");
const Behavior = require("./behavior");
const Communication = require("./communication");
const Guardian = require("./guardian");
const Student = require("./student");

Teacher.hasMany(Student, {
  foreignKey: "teacherId",
  onDelete: "CASCADE",
});

Attendance.hasOne(Student, {
  foreignKey: "attendanceId",
  onDelete: "CASCADE",
});

Behavior.hasOne(Student, {
  foreignKey: "behaviorId",
  onDelete: "CASCADE",
});

Guardian.hasOne(Student, {
  foreignKey: "guardianId",
  onDelete: "CASCADE",
});

Communication.hasOne(Student, {
  foreignKey: "communicationId",
  onDelete: "CASCADE",
});

Assignment.hasMany(AssignmentFeedback, {
  foreignKey: "assignmentId",
  onDelete: "CASCADE",
});

Student.hasMany(AssignmentFeedback, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

module.exports = {
  Teacher,
  Assignment,
  AssignmentFeedback,
  Attendance,
  Behavior,
  Communication,
  Guardian,
  Student,
};
