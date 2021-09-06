const {Model, DataTypes} = require('sequelize');
const sequelize = require ("../config/connection");




class Guardian extends Model {}


Guardian.init(

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

email: {
type: DataTypes.STRING,
allowNull : false,
unique: true,
validate: {
isEmail: true,
},
},

phone_number : {
type:DataTypes.INTEGER,
allowNull: false,
validate:{
isMobileNumber: true,
},
},
},

{
sequelize,
freezeTableName: true,
underscored: true,
modelName:'Guardian',
}
);


module.exports = Guardian;