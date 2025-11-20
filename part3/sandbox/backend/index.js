require('dotenv').config();

const express = require('express');

const Note = require('./models/note');

let notes = [
    {
        id: '1',
        content: 'HTML is easy',
        important: true
    },
    {
        id: '2',
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: '3',
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
];

const app = express();
app.use(express.static('dist'));
app.use(express.json());

let requestIndex = 0;
const requestLoggerMiddleware = (request, response, next) => {
    console.log(`== Request nr. ${requestIndex++} ==`);
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);

    let body = 'N/A';
    if (request.body) {
        body = `\n` + JSON.stringify(request.body, null, 4);
    }
    console.log('Body: ', body);
    console.log('---\n');

    next();
};
app.use(requestLoggerMiddleware);

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then((notes) => {
        response.json(notes);
    });
});

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;
    const note = Note.findById(id)
        .then((note) => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: '"content" field of the request body is empty'
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    });

    note.save().then((savedNote) => {
        response.json(savedNote);
    });
});

app.put('/api/notes/:id', (request, response) => {
    // todo: fix this endpoint
    const id = request.params.id;

    const note = notes.find((note) => note.id === id);

    if (note) {
        const body = request.body;
        if (!body.content) {
            return response.status(400).json({
                error: '"content" field of the request body is empty'
            });
        }

        const updatedNote = {
            id: note.id,
            important: body.important || false,
            content: body.content
        };

        console.log('updatedNote:', updatedNote);

        notes = notes.filter((n) => n.id !== id);
        notes = notes.concat(updatedNote);

        response.json(note);
    } else {
        response.status(404).end();
    }
});

const unknownEndpointMiddleware = (request, response) => {
    response.status(404).send({ error: `unknown endpoint: ${request.path}` });
};

app.use(unknownEndpointMiddleware);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: `malformed id`
        });
    }

    next(error);
};

// this has to be the last loaded middleware
// also all the routes should be registered before this
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
