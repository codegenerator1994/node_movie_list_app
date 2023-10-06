const Sequelize = require("sequelize");
const db = require("../config/database");

const Movie = db.define("movie", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cast: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Movie;
