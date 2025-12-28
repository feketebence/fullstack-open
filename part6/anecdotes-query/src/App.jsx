import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { getAnecdotes, updateAnecdote } from './requests'
import NotificationsContext from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const queryClient = useQueryClient()
    const { notificationsDispatch } = useContext(NotificationsContext)

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const updatedAnecdotes = anecdotes.map((anecdote) =>
                anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
            )
            queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
        }
    })

    const handleVote = (anecdote) => {
        console.log(
            `Voting for anecdote with id '${anecdote.id}' and content '${anecdote.content}'`
        )

        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        })

        notificationsDispatch({
            type: 'vote',
            payload: anecdote.content
        })

        setTimeout(() => {
            notificationsDispatch({ type: 'remove' })
        }, 5000)
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1
    })

    if (result.isLoading) {
        return <div>Loading anecdotes...</div>
    }

    if (result.isError) {
        return <div>Anecdote app is not available due to server errors...</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
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
        </div>
    )
}

export default App
