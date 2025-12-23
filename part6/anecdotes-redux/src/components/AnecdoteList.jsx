import { useDispatch, useSelector } from 'react-redux'

import { notificationChange } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
        dispatch(voteAnecdote(anecdote.id))
        dispatch(notificationChange(`You voted "${anecdote.content}"`))

        setTimeout(() => {
            dispatch(notificationChange(''))
        }, 5000)
    }

    const anecdotesSorted = [...anecdotes].sort((a, b) => a.votes - b.votes)

    return (
        <>
            {anecdotesSorted.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
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
