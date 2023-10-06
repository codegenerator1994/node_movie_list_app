const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movieController");

router.get("/", MovieController.listMovies);

router.get("/new", (req, res) => {
  res.render("new-movie", { pageTitle: "Add New Movie" });
});

router.post("/", MovieController.addMovie);

router.get("/:id/edit", MovieController.editMovie);

router.put("/:id", MovieController.updateMovie);

router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
