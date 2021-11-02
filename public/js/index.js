
// const fetchTeacher = async () => {
// const teacherData = await fetch("/teacher",{
// method:"GET",
// headers:{"Content-Type": "application/json"}
// });
// }

const setTeacherEmail = (email) =>{
localStorage.setItem("teacherEmail", email)
};

document.querySelector("logIn").addEventListener("click",setTeacherEmail)

module.exports = {setTeacherEmail};

