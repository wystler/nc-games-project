const format = require('pg-format');
const db = require("./db/connection.js");

const checkExists = async (table, column, value) => {
  // %I is an identifier in pg-format
  const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
  const dbOutput = await db.query(queryStr, [value]);
  if (dbOutput.rows.length === 0) {
    // resource does NOT exist
    return Promise.reject({ status: 404, msg: 'Resource not found' });
  }
};

module.exports = checkExists