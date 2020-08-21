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

module.exports = router