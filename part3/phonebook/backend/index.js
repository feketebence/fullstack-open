require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const crypto = require('crypto')

const Person = require('./models/person')

const assignRequestId = (request, response, next) => {
    request.id = crypto.randomUUID()
    next()
}
morgan.token('id', (request) => request.id)
morgan.token('body', (request) => JSON.stringify(request.body))

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(assignRequestId)
app.use(morgan(':id :method :url :response-time ms, request body: :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then((people) => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (!person) {
                return response.status(404).end()
            } else {
                return response.json(person)
            }
        })
        .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then((people) => {
            response.send(`Phonebook has info for ${people.length} ${
                people.length > 1 ? 'people' : 'person'
            }.
    <br />
    ${new Date().toISOString()}
    `)
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: '"name" field of the request body is missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: '"number" field of the request body is missing'
        })
    }

    Person.find({}).then((people) => {
        let personWithSameName = people.find((p) => p.name === body.name)
        if (personWithSameName) {
            return response.status(400).json({
                error: `Person with name '${body.name}' already exists.`
            })
        }

        const newPerson = new Person({
            name: body.name,
            number: body.number
        })

        newPerson
            .save()
            .then((savedPerson) => {
                response.json(savedPerson)
            })
            .catch((error) => next(error))
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then((person) => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// this has to be after the endpoint definitions
const unknownEndpointMiddleware = (request, response) => {
    response.status(404).send({ error: `unknown endpoint: ${request.path}` })
}
app.use(unknownEndpointMiddleware)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformed id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware
// also all the routes should be registered before this
app.use(errorHandler)

const PORT = process.env.port || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
