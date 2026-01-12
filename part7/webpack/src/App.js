import React from 'react' // we need this now also in component files
import { useState } from 'react'

const App = () => {
    const [counter, setCounter] = useState(0)
    return (
        <div className="container">
            <div>hola webpack!</div>
            <div>number of clicks: {counter}</div>
            <button onClick={() => setCounter(counter + 1)}>increase</button>
        </div>
    )
}

export default App
