const fs = require('fs/promises')

const getPaths = (req, res) => {
    fs.readFile('./endpoints.json')
    .then((manual) => {
        res.status(200)
        .send(JSON.parse(manual)
    )}
)}

module.exports = getPaths