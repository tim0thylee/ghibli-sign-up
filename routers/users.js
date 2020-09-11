const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    User.find({}).then(users => {
        res.json(users)
    })
})

router.post('/', async (req, res, next) => {
    const body = req.body
 
    if (!body.username || !body.password || !body.email) {
        return res.status(400).json({ error: 'content missing' })
    } else if (body.password.length > 35) {
        return res.status(400).json({error: 'password cannot be greater than 35 characters'})
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = new User({
        username: body.username,
        password: passwordHash,
        email: body.email
    })
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (e) {
        next(e)
    }
    // user.save().then(savedUser => {
    //     res.json(savedUser)
    // }).catch(error => next(error))
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