//TODO: figure out req.session.logged in

const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Secret",
  loggedIn: false,
  cookie: {
    maxAge: 180,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/index"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
});
