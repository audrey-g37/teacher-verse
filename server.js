const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({extend: true}));
app.use(routes);



sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
    });
});