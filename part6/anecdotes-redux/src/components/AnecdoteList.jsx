import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { increaseAnecdoteVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter) {
            return anecdotes.filter((a) =>
                a.content.toLowerCase().includes(filter.toLowerCase())
            )
        }

        return anecdotes
    })

    const handleVote = (anecdote) => {
        dispatch(increaseAnecdoteVote(anecdote.id))
        dispatch(setNotification(`You voted "${anecdote.content}"`))
    }

    const anecdotesSorted = [...anecdotes].sort((a, b) => a.votes - b.votes)

    return (
        <>
            {anecdotesSorted.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes} votes{' '}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList
