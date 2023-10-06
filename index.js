const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const flash = require("connect-flash");
const db = require("./config/database");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error: " + err));

app.use(express.static("public"));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./views/layout");

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
