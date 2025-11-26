import { useState, useEffect, useRef } from 'react'

import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/forms/LoginForm'
import Togglable from './components/Togglable'
import NoteFrom from './components/forms/NoteForm'

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)
    const noteFormRef = useRef()

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

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedNoteAppUser')
        noteService.setToken(null)
        setUser(null)
    }

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then((createdNote) => setNotes(notes.concat(createdNote)))
    }

    const doLogin = async (credentials) => {
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                'loggedNoteAppUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
        } catch {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true)

    return (
        <div>
            <h1>notes-app</h1>
            <Notification message={errorMessage} />

            <div className="container">
                {!user && (
                    <Togglable
                        revealButtonLabel="login"
                        hideButtonLabel="cancel"
                    >
                        <LoginForm doLoginFn={doLogin} />
                    </Togglable>
                )}
                {user && (
                    <>
                        <p>
                            <b>{user.name}</b> is logged in
                        </p>
                        <button onClick={handleLogout}>log out</button>

                        <Togglable
                            revealButtonLabel="show note creation form"
                            hideButtonLabel="close note form"
                            ref={noteFormRef}
                        >
                            <NoteFrom createNoteFn={addNote} />
                        </Togglable>
                    </>
                )}
            </div>

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
