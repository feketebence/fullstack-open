const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (!password) {
        return response
            .status(400)
            .json({ error: '`password` field is missing' })
    }

    if (password.length < 3) {
        return response
            .status(400)
            .json({
                error: '`password` field must be at least 3 characters long'
            })
    }

    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    if (user) {
        response.json(user)
    } else {
        response.status(404).end()
    }
})

module.exports = usersRouter
