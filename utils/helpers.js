function findById(el) {
  return el.studentId === req.params.id;
}

// function storeTeacherId(id) {
//   return localStorage.setItem("teacherId", id)
// }

module.exports = {findById};
