const {fetchUsers} = require('../models/users-models.js')

const getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => {
        res.status(200)
        .send(users)
    })
    .catch(next)
}

const getUserByUsername = (req, res, next) => {
    fetchUsers(req.params.username)
    .then((user) => {
        res.status(200)
        .send(user[0])
    })
    .catch(next)
}

module.exports = {getUsers, getUserByUsername} 
