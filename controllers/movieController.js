const Movie = require("../models/Movie");

module.exports = {
  listMovies: (req, res) => {
    Movie.findAll()
      .then((movies) => {
        res.render("movie-list", {
          pageTitle: "My Favorite Movies",
          movies,
        });
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        res.render("error", {
          pageTitle: "Error",
          errorMessage: "Error fetching movies",
        });
      });
  },

  addMovie: (req, res) => {
    const { name, rating, cast, genre, releaseDate } = req.body;

    Movie.create({
      name,
      rating,
      cast,
      genre,
      releaseDate,
    })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        console.error("Error adding a movie:", err);
        res.render("error", {
          pageTitle: "Error",
          errorMessage: "Error adding a movie",
        });
      });
  },

  editMovie: (req, res) => {
    const movieId = req.params.id;

    Movie.findByPk(movieId)
      .then((movie) => {
        if (!movie) {
          res.render("error", {
            pageTitle: "Error",
            errorMessage: "Movie not found",
          });
        } else {
          res.render("edit-movie", {
            pageTitle: "Edit Movie",
            movie,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching movie for editing:", err);
        res.render("error", {
          pageTitle: "Error",
          errorMessage: "Error fetching movie for editing",
        });
      });
  },

  updateMovie: (req, res) => {
    const movieId = req.params.id;
    const { name, rating, cast, genre, releaseDate } = req.body;

    Movie.findByPk(movieId)
      .then((movie) => {
        if (!movie) {
          res.render("error", {
            pageTitle: "Error",
            errorMessage: "Movie not found",
          });
        } else {
          movie.name = name;
          movie.rating = rating;
          movie.cast = cast;
          movie.genre = genre;
          movie.releaseDate = releaseDate;

          return movie.save();
        }
      })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        console.error("Error updating a movie:", err);
        res.render("error", {
          pageTitle: "Error",
          errorMessage: "Error updating a movie",
        });
      });
  },

  deleteMovie: (req, res) => {
    const movieId = req.params.id;

    Movie.findByPk(movieId)
      .then((movie) => {
        if (!movie) {
          res.render("error", {
            pageTitle: "Error",
            errorMessage: "Movie not found",
          });
        } else {
          return movie.destroy();
        }
      })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        console.error("Error deleting a movie:", err);
        res.render("error", {
          pageTitle: "Error",
          errorMessage: "Error deleting a movie",
        });
      });
  },
};
