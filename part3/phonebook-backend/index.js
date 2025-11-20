const express = require('express');
const morgan = require('morgan');
const crypto = require('crypto');

let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
];

const assignRequestId = (request, response, next) => {
    request.id = crypto.randomUUID();
    next();
};
morgan.token('id', (request) => request.id);
morgan.token('body', (request) => JSON.stringify(request.body));

const app = express();
app.use(express.json());
app.use(assignRequestId);
app.use(morgan(':id :method :url :response-time ms, request body: :body'));

const generateId = () => {
    const id = Math.ceil(Math.random() * 100_000);
    return String(id);
};

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find((p) => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.get('/info', (request, response) => {
    response.send(`
        Phonebook has info for ${persons.length} ${
        persons.length > 1 ? 'people' : 'person'
    }.
    <br />
    ${new Date().toISOString()}
        `);
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: '"name" field of the request body is missing'
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: '"number" field of the request body is missing'
        });
    }

    personWithSameName = persons.find((p) => p.name === body.name);
    if (personWithSameName) {
        return response.status(400).json({
            error: `Person with name '${body.name}' already exists.`
        });
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    persons = persons.concat(newPerson);

    response.json(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find((p) => p.id === id);

    if (person) {
        persons = persons.filter((p) => p.id !== person.id);
        response.status(204).end();
    } else {
        response.status(404).end();
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
