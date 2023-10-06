const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const db = require("./config/database");

require("./config/passport")(passport);

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error: " + err));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
