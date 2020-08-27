const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    User.find({}).then(users => {
        res.json(users)
    })
})

router.post('/', (req, res) => {
    const body = req.body
 
    if (!body.username || !body.password || !body.email) {
        return res.status(400).json({ error: 'content missing' })
    }
    
    const user = new User({
        username: body.username,
        password: body.password,
        email: body.email
    })
    
    user.save().then(savedUser => {
        res.json(savedUser)
    })
})

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

module.exports = router