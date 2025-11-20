import { useState, useEffect } from 'react';
import Note from './components/Note';

import noteService from './services/notes';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    const handleAddNote = (event) => {
        event.preventDefault();

        const newNoteObject = {
            content: newNote,
            important: Math.random() < 0.5
        };

        noteService.create(newNoteObject).then((createdNote) => {
            setNotes(notes.concat(createdNote));
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

        noteService.update(id, changedNote).then((updatedNote) => {
            const nextNotes = notes.map((note) =>
                note.id === id ? updatedNote : note
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
