const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/register", (req, res) => {
  res.render("register", { pageTitle: "Register" });
});

router.post("/register", UserController.registerUser);

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: "Login" });
});

router.post("/login", UserController.loginUser);

router.get("/logout", UserController.logoutUser);

module.exports = router;
