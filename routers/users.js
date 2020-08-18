const express = require('express')
const router = express.Router()

let users = [
    {
        username: "TimCalas",
        password: "secret"
    }
]

router.get('/', (req, res) => {
    return res.json(users)
})

router.post('/', (req, res) => {
    let inArray = false
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    for (let user of users) {
        if (user.username === req.body.username) {
            inArray = true;
        }
    }
    if (inArray) {
        return res.status(400).end()
    } else {
        users = users.concat(newUser)
        return res.json(newUser)
    }
})

module.exports = router