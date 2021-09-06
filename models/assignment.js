const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Assignments extends Model {}


Assignments.init(

{

id: {
type: DataTypes.STRING,
allowNull:false,
primaryKey:true,
},

text: {
type: DataTypes.STRING,
allowNull: false,
},


status: {
    type:DataTypes.STRING,
    allowNull: false,
},

score: {
    type:DataTypes.DECIMAL,
    allowNull: false,
}
},



{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName:'Assignments',
},


);




module.exports = Assignments;