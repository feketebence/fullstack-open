import { useState, useEffect } from 'react';
import Note from './components/Note';

import noteService from './services/notes';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService.getAll().then((response) => {
            setNotes(response.data);
        });
    }, []);

    const handleAddNote = (event) => {
        event.preventDefault();

        const newNoteObject = {
            content: newNote,
            important: Math.random() < 0.5
        };

        noteService.create(newNoteObject).then((response) => {
            setNotes(notes.concat(response.data));
            setNewNote('');
        });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const handleToggleImportance = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = {
            ...note,
            important: !note.important
        };

        noteService.update(id, changedNote).then((response) => {
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
                        onToggleImportance={() =>
                            handleToggleImportance(note.id)
                        }
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
