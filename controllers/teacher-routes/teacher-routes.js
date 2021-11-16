const router = require("express").Router();
const { Teacher, Assignment, Student } = require("../../models");
const bcrypt = require("bcrypt");
const randomFun = require("everyday-fun");
const moment = require("moment");

router.get("/", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
    }
    const dbAssignmentData = await Assignment.findAll({
      where: { teacherId: req.session.teacherId },
    });
    const assignmentData = dbAssignmentData.map((assignment) =>
      assignment.get({ plain: true })
    );
    // console.log(assignmentData);

    assignmentData.map((assignment) => {
      assignment.dueDate = moment(assignment.dueDate).format("MM-DD-YY");
    });

    let recentAssignments = [];

    if (assignmentData.length >= 8) {
      for (let i = assignmentData.length - 8; i < assignmentData.length; i++) {
        recentAssignments.push(assignmentData[i]);
      }
    } else {
      recentAssignments = assignmentData;
    }

    const teacherId = parseInt(req.session.teacherId);
    const dbTeacherData = await Teacher.findByPk(teacherId);

    const todaysDate = moment().format("MM-DD-YYYY");

    // let randomQuote;
    // let randomRiddle;
    // let randomFun;
    const randomQuote = randomFun.getRandomQuote();
    const randomRiddle = randomFun.getRandomRiddle();

    // if(req.session.newFun === true){
    //   randomQuote = randomFun.getRandomQuote();
    //   randomRiddle = randomFun.getRandomRiddle();
    //   req.session.newFun = false;
    // }
    // // else{

    // // }
    // console.log(randomFun)
    // console.log(req.session)

    const firstName = dbTeacherData.dataValues.firstName.toUpperCase();
    const lastName = dbTeacherData.dataValues.lastName.toUpperCase();

    const nameToDisplay = { first: firstName, last: lastName };

    res.render("homepage", {
      assignmentData: recentAssignments,
      teacherData: nameToDisplay,
      randomQuote: randomQuote,
      randomRiddle: randomRiddle,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.render("404");
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
    res.redirect("/login");
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
