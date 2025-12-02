const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
    await User.deleteMany({})
    await Note.deleteMany({})

    response.status(204).end()
})

module.exports = router
