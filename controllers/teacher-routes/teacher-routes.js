const router = require("express").Router();
const { Teacher, Assignment, Student } = require("../../models");
const bcrypt = require("bcrypt");

// Current location  "http:localhost:3001/teacher"

router.get("/login", async (req, res) => {
  res.render("login");
});

// router.post("/login", async (req, res) => {
//   try {
//     const teacherData = await Teacher.findOne({
//       where: { email: req.body.email },
//     });
//     console.log(teacherData);
//     if (!teacherData) {
//       res.status(404).json({ message: "Login failed. Please try again!" });
//       return;
//     }
//     console.log(req.body.password);
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       teacherData.password
//     );
//     if (!validPassword) {
//       res.status(400).json({ message: "Login failed. Please try again!" });
//       return;
//     }
//     req.session.save(() => {
//       req.session.loggedIn = true;
//     });
//     res.status(200).json("Login Successful");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const dbAssignmentData = await Assignment.findAll({
      attributes: ["title", "dueDate"],
    });

    const assignmentData = dbAssignmentData.map((assignment) =>
      assignment.get({ plain: true })
    );
    res.render("homepage", { assignmentData, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id', async (req,res) => {
// try {
// const teacherData = await Teacher.findByPk(req.params.id);
// if (!teacherData) {
// res.status(404).json({message:`no teacher found with id of ${req.params.id}`});
// }
// res.status(200).json(teacherData);

// }
// catch(err){
// res.status(500).json(err)
// }
// });

// router.post('/', async (req,res) => {
//     try{
// const newTeacher = await Teacher.create({
//     firstName: req.body.firstName,
//     lastName:req.body.lastName,
//     email:req.body.email,
//     password: req.body.password,

// });
// res.status(200).json({message:"teacher Created!"});

//     }
//     catch(err){
//         res.status(400).json(err)
//     }
// });

// router.put('/:id', async (req,res) => {
//     try {
// const updatedTeacher = await Teacher.update(req.body, {where: {id:req.params.id}});
// if (!updatedTeacher[0]) {
// res.status(404).json({message:`no teacher found with the id of ${req.params.id}`})
// }
// res.status(200).json({message:`teacher with id of ${req.params.id} updated`})
//     }
//     catch(err){
// res.status(500).json(err)
//     }
// })

// router.delete ('/:id', async (req,res) => {
//     try{
//     const deletedTeacher = await Teacher.destroy({where:{id: req.params.id}});
// if(!deletedTeacher){
// res.status(404).json({message:`no teacher with id ${req.params.id} found`})
// }
// res.status(200).json({message:`teacher with id ${req.params.id} deleted`})
//     }
//     catch(err){
//     res.status(500).json(err)
//     }
// });

// //thunder client

module.exports = router;
