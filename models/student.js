const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");



class Student extends Model {}




Student.init(

{
id: {
type: DataTypes.INTEGER,
allowNull:false,
primaryKey: true,
autoIncrement: true,
},

firstName: {
type:DataTypes.STRING,
allowNull: false,

},

lastName: {
type:DataTypes.STRING,
allowNull: false,
},

gradeId:
{
type:DataTypes.DECIMAL,
allowNull: false,
},

parentId: {
type: DataTypes.INTEGER,
allowNull: false,

},
},
{
sequelize,
freezeTableName: true,
underscored: true,
modelName:'Student',
}
);


module.export = Student;