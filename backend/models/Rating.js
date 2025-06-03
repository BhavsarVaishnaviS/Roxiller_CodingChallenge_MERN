const { DataTypes } = require("sequelize");
const connection = require("../config/db");
const User = require("./User");
const Store = require("./Store");

const Rating = connection.define("Rating", {
  score: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
  },
});

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports = Rating;
