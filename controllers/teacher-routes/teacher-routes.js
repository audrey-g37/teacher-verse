const router = require('express').Router();
const {Teacher, Student} = require('../../models');

// Current location  "http:localhost:3001/teacher/teacher"

router.get('/register', async (req,res) => {
try {
const teacherData = await Teacher.findAll({include:[{model:Student}]});
res.render('register')

}
catch(err){
res.status(500).json(err)
}
});

router.get('/', async (req,res) => {
    try {
    res.render('login')
    
    }
    catch(err){
    res.status(500).json(err)
    }
    });

router.get('/:id', async (req,res) => {
try {
const teacherData = await Teacher.findByPk(req.params.id);
if (!teacherData) {
res.status(404).json({message:`no teacher found with id of ${req.params.id}`});
}
res.status(200).json(teacherData);

}
catch(err){
res.status(500).json(err)
}
});



router.post('/', async (req,res) => {
    try{
const newTeacher = await Teacher.create({
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password: req.body.password,
    
});
res.status(200).json({message:"teacher Created!"});

    }
    catch(err){
        res.status(400).json(err)
    }
});



router.put('/:id', async (req,res) => {
    try {
const updatedTeacher = await Teacher.update(req.body, {where: {id:req.params.id}});
if (!updatedTeacher[0]) {
res.status(404).json({message:`no teacher found with the id of ${req.params.id}`})
}
res.status(200).json({message:`teacher with id of ${req.params.id} updated`})
    }
    catch(err){
res.status(500).json(err)
    }
})

router.delete ('/:id', async (req,res) => {
    try{
    const deletedTeacher = await Teacher.destroy({where:{id: req.params.id}});
if(!deletedTeacher){
res.status(404).json({message:`no teacher with id ${req.params.id} found`})
}
res.status(200).json({message:`teacher with id ${req.params.id} deleted`})
    }
    catch(err){
    res.status(500).json(err)
    }
});



//thunder client



module.exports = router;