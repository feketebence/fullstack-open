import { createSlice } from '@reduxjs/toolkit'

import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
        },
        voteAnecdote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(
                (anecdote) => anecdote.id === id
            )
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }

            return state.map((anecdote) =>
                anecdote.id === id ? changedAnecdote : anecdote
            )
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const initialAnecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(initialAnecdotes))
    }
}

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
