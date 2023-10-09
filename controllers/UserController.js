const passport = require("passport");
const User = require("../models/User");

module.exports = {
  registerUser: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((existingUser) => {
        if (existingUser) {
          req.flash("error_msg", "Email is already registered");
          res.redirect("/register");
        } else {
          User.create({ email, password })
            .then((user) => {
              req.flash("success_msg", "You are now registered and can log in");
              res.redirect("/login");
            })
            .catch((err) => {
              console.error("Error registering user:", err);
              req.flash("error_msg", "Registration failed");
              res.redirect("/register");
            });
        }
      })
      .catch((err) => {
        console.error("Error checking existing user:", err);
        req.flash("error_msg", "An error occurred");
        res.redirect("/register");
      });
  },

  loginUser: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/movies",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  },

  logoutUser: (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  },
};
