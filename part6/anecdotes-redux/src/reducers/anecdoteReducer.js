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
            const changedAnecdote = action.payload

            return state.map((anecdote) =>
                anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
            )
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const initialAnecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(initialAnecdotes))
    }
}

export const appendAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
    }
}

export const increaseAnecdoteVote = (id) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdotesService.increaseVotes(id)
        dispatch(voteAnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer
