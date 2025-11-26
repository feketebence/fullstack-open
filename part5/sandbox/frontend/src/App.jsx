import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/forms/LoginForm'
import Togglable from './components/Togglable'
import NoteFrom from './components/forms/NoteForm'

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
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

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

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedNoteAppUser',
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

        window.localStorage.removeItem('loggedNoteAppUser')
        noteService.setToken(null)
        setUser(null)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true)

    return (
        <div>
            <h1>notes-app</h1>
            <Notification message={errorMessage} />

            {!user && (
                <div className="container">
                    <Togglable
                        revealButtonLabel="login"
                        hideButtonLabel="cancel"
                    >
                        <LoginForm
                            username={username}
                            password={password}
                            handleUsernameChange={({ target }) =>
                                setUsername(target.value)
                            }
                            handlePasswordChange={({ target }) =>
                                setPassword(target.value)
                            }
                            handleSubmit={handleLogin}
                        />
                    </Togglable>
                </div>
            )}
            {user && (
                <div className="container">
                    <p>
                        <b>{user.name}</b> is logged in
                    </p>
                    <button onClick={handleLogout}>log out</button>

                    <Togglable
                        revealButtonLabel="show note creation form"
                        hideButtonLabel="close note form"
                    >
                        <NoteFrom
                            onSubmit={handleAddNote}
                            handleChange={({ target }) =>
                                setNewNote(target.value)
                            }
                        />
                    </Togglable>
                </div>
            )}

            <div className="container">
                <div>
                    <button onClick={() => setShowAll(!showAll)}>
                        {' '}
                        show {showAll ? 'important' : 'all'}
                    </button>
                </div>
                <ol>
                    {notesToShow.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            onToggleImportance={() =>
                                handleToggleImportance(note.id)
                            }
                        />
                    ))}
                </ol>
            </div>

            <Footer />
        </div>
    )
}

export default App
