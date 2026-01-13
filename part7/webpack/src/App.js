import React from 'react' // we need this now also in component files
import { useState } from 'react'

const App = () => {
    const [counter, setCounter] = useState(0)
    const [values, setValues] = useState([])

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }

    return (
        <div className="container">
            <div>hola webpack!</div>
            <div>current counter value: {counter}</div>
            <button onClick={handleClick}>increase counter</button>

            <div>
                Previous counter values: {values.map((value) => value + ' ')}
            </div>
        </div>
    )
}

export default App
