import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const handleAddNote = (event) => {
        event.preventDefault()

        const newNoteObject = {
            content: newNote,
            important: Math.random() < 0.5
        }

        noteService.create(newNoteObject).then((createdNote) => {
            setNotes(notes.concat(createdNote))
            setNewNote('')
        })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const handleToggleImportance = (id) => {
        const note = notes.find((n) => n.id === id)
        const changedNote = {
            ...note,
            important: !note.important
        }

        noteService
            .update(id, changedNote)
            .then((updatedNote) => {
                const nextNotes = notes.map((note) =>
                    note.id === id ? updatedNote : note
                )
                setNotes(nextNotes)
            })
            .catch((error) => {
                console.log('Error:', error)

                setErrorMessage(
                    `Note "${note.content}" was already removed from the server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)

                const nextNotes = notes.filter((n) => n.id !== id)
                setNotes(nextNotes)
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(
            `logging in with username: '${username}' and password: '${password}'`
        )

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedNoteappUser')
        noteService.setToken(null)
        setUser(null)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true)

    const loginForm = () => (
        <div className="container">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username{' '}
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password{' '}
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const noteForm = () => (
        <div className="container">
            <h2>Add new note</h2>
            <form onSubmit={handleAddNote}>
                <input
                    type="text"
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">add note</button>
            </form>
        </div>
    )

    return (
        <div>
            <h1>notes-app</h1>
            <Notification message={errorMessage} />

            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogout}>log out</button>
                    {noteForm()}
                </div>
            )}

            <div className="container">
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
            </div>

            <Footer />
        </div>
    )
}

export default App
