const express = require("express");
const exphbrs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
});
