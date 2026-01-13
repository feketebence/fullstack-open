import React from 'react' // we need this now also in component files
import { useState, useEffect } from 'react'
import axios from 'axios'
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
    window.Promise = PromisePolyfill
}
console.log('BACKEND_URL:', BACKEND_URL)

const useNotes = (url) => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        axios.get(url).then((response) => {
            setNotes(response.data)
        })
    }, [url])

    return notes
}

const App = () => {
    const [counter, setCounter] = useState(0)
    const [values, setValues] = useState([])

    const notes = useNotes(BACKEND_URL)

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }

    return (
        <div className="container">
            <div>hola webpack!</div>
            <div>current counter value: {counter}</div>
            <button onClick={handleClick}>increase counter</button>
            <div>Previous counter values: {values.join(', ')}</div>
            <hr />
            There are {notes.length} notes on the server at {BACKEND_URL}
        </div>
    )
}

export default App
