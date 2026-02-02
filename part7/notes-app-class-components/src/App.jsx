import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            anecdotes: [],
            current: 0
        }
    }

    render() {
        if (this.state.anecdotes.length === 0) {
            return <div>no anecdotes.</div>
        }

        return (
            <div>
                <h1>anecdote of the day</h1>
                <div>{this.state.anecdotes[this.state.current].content}</div>
                <button>next</button>
            </div>
        )
    }
}

export default App
