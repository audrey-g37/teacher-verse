// const fetchTeacher = async () => {
// const teacherData = await fetch("/teacher",{
// method:"GET",
// headers:{"Content-Type": "application/json"}
// });
// }
// const setTeacherEmail = (email) =>{
// localStorage.setItem("teacherEmail", email)
// };
// document.querySelector("logIn").addEventListener("click",setTeacherEmail)

const updateAttendance = async (event) => {
  event.preventDefault();
  let presenceArray = [];
  let studentIdArray = [];
  let timeArray = [];
  let notesArray = [];

  let isPresent = document.getElementsByClassName("isPresent");
  let time = document.getElementsByClassName("time");
  let notes = document.getElementsByClassName("notes");
  let studentId = document.getElementsByClassName("student-id");

  for (let i = 0; i < studentId.length; i++) {
    presenceArray.push(isPresent[i].value);
    timeArray.push(time[i].value);
    notesArray.push(notes[i].value);
    studentIdArray.push(studentId[i].value);
  }

  const dataToSend = {
    isPresent: presenceArray,
    time: timeArray,
    notes: notesArray,
    studentId: studentIdArray,
  };

  // console.log(dataToSend);

  await fetch("/teacher/attendance/update-attendance", {
    method: "PUT",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      console.log("update successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

document
  .getElementById("update-attendance-btn")
  .addEventListener("click", updateAttendance);
