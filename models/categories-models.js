const db = require("../db/connection.js");

const fetchCategories = () => {
    return db.query("SELECT * FROM categories")
    .then((categories) => {
      return categories.rows;
    });
  };

module.exports = { fetchCategories }