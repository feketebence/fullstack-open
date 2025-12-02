import { useState } from 'react'

const NoteFrom = ({ createNoteFn }) => {
    const [newNote, setNewNote] = useState('')

    const handleAddNote = (event) => {
        event.preventDefault()

        createNoteFn({
            content: newNote,
            important: true
        })

        setNewNote('')
    }

    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={handleAddNote}>
                <input
                    type="text"
                    value={newNote}
                    onChange={(event) => setNewNote(event.target.value)}
                    placeholder="write note content here"
                />
                <button type="submit">add note</button>
            </form>
        </div>
    )
}

export default NoteFrom
