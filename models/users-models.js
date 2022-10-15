const checkExists = require('../utils.js')
const db = require("../db/connection.js");

const fetchUsers = async (username) => {

    let queryString = `SELECT * FROM users`
    
    if (username) {
        await checkExists('users', 'username', username)
        queryString += ` WHERE username='${username}'`}
        
    return db.query(queryString)
    .then((users) => {
        return users.rows
    })
}

module.exports = {fetchUsers}