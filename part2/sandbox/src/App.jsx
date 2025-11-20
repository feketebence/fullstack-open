import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/notes').then((response) => {
            setNotes(response.data);
        });
    }, []);

    const handleAddNote = (event) => {
        event.preventDefault();

        const newNoteObject = {
            content: newNote,
            important: Math.random() < 0.5
        };

        axios
            .post('http://localhost:3001/notes', newNoteObject)
            .then((response) => {
                console.log('Response from server to POST /notes:', response);
                setNotes(notes.concat(response.data));
                setNewNote('');
            });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`;
        const note = notes.find((n) => n.id === id);
        const changedNote = {
            ...note,
            important: !note.important
        };

        axios.put(url, changedNote).then((response) => {
            const nextNotes = notes.map((note) =>
                note.id === id ? response.data : note
            );
            setNotes(nextNotes);
        });
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    {' '}
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>

            <form onSubmit={handleAddNote}>
                <input
                    type="text"
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
