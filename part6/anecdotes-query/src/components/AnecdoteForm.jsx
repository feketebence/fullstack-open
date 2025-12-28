import { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { createAnecdote } from '../requests'
import NotificationsContext from '../NotificationContext'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const { notificationsDispatch } = useContext(NotificationsContext)

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(
                ['anecdotes'],
                anecdotes.concat(newAnecdote)
            )

            notificationsDispatch({
                type: 'addSuccess',
                payload: newAnecdote.content
            })
        },
        onError: (error) => {
            notificationsDispatch({
                type: 'addError',
                payload: error.message
            })
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        newAnecdoteMutation.mutate({
            content,
            votes: 0
        })

        setTimeout(() => {
            notificationsDispatch({ type: 'remove' })
        }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
