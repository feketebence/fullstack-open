import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2
    }
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload

            state.push({
                id: generateId(),
                content,
                important: false
            })
            // NOTE: mutation is allowed here, because under the hood
            // the Redux Toolkit uses the Immer library to produce a
            // new, immutable state; based on the mutated state
        },

        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find((note) => note.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }

            return state.map((note) => (note.id !== id ? note : changedNote))
            // NOTE: in the case of this action, the state is not mutated
            // Instead of mutating, a new state is returned based on the current state.
        }
    }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer
