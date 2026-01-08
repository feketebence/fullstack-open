import { useMatch, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'

import Notes from './components/Notes'
import Users from './components/Users'
import Home from './components/Home'
import Note from './components/Note'
import Login from './components/Login'
import Footer from './components/primitives/Footer'
import Page from './components/primitives/Page'
import Navigation from './components/primitives/Navigation'

const App = () => {
    const padding = {
        padding: 5,
        color: 'black'
    }

    const [notes, _setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const login = (user) => {
        setUser(user)
        setMessage(`Welcome ${user}`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const match = useMatch('/notes/:id')
    const note = match
        ? notes.find((note) => note.id === Number(match.params.id))
        : null

    return (
        <Page>
            {message && <div>{message}</div>}

            <Navigation>
                <Link style={padding} to="/">
                    home
                </Link>
                <Link style={padding} to="/notes">
                    notes
                </Link>
                <Link style={padding} to="/users">
                    users
                </Link>
                {user ? (
                    <em>{user} logged in</em>
                ) : (
                    <Link style={padding} to="/login">
                        login
                    </Link>
                )}
            </Navigation>

            <Routes>
                <Route path="/notes/:id" element={<Note note={note} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                <Route
                    path="/users"
                    element={
                        user ? <Users /> : <Navigate replace to="/login" />
                    }
                />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer>
                <br />
                <em>Note app, Department of Computer Science 2023</em>
            </Footer>
        </Page>
    )
}

export default App
