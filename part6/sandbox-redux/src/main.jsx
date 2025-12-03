import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.subscribe(() => {
    console.log(`store's state: ${JSON.stringify(store.getState(), null, 2)}`)
})

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'the app state is in Redux store',
        important: false,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'state changes are made with actions',
        important: true,
        id: 2
    }
})

const App = () => {
    return (
        <div>
            <ul>
                {store.getState().map((note) => (
                    <li key={note.id}>
                        {note.content}{' '}
                        <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
