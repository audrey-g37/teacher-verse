const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require ("../config/connection");

class Teacher extends Model {
checkPassword (loginPW) {
 return bcrypt.compareSync(loginPW, this.password);
}
}


Teacher.init(
{
id:{
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},

userName: {
type: DataTypes.STRING,
allowNull: false,
},

email: {
type: DataTypes.STRING,
allowNull : false,
unique: true,
validate: {
isEmail: true,
},
},


password: {
type: DataTypes.STRING,
allowNull: false,
validate:{
len:[6],
},
},
},
{
hooks: {
async beforeCreate(newTeacherData){
newTeacherData.password= await bcrypt.hash(newTeacherData.password, 10);
return newTeacherData;
},
},

sequelize,
timestamps:false,
freezeTableName: true,
underscored:true,
modelName: 'Teacher',
},
);



module.exports = Teacher;