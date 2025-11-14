const express = require('express');

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

const app = express();
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(express.static('dist'));

const generateId = () => {
    const maxId =
        notes.length > 0
            ? Math.max(...notes.map((note) => Number(note.id)))
            : 0;
    return String(maxId + 1);
};

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>');
});

app.get('/api/notes', (request, response) => {
    response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find((note) => note.id === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
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

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    };

    notes = notes.concat(note);

    response.json(note);
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

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
