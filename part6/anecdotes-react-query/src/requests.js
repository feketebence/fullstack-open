const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error(`Failed to fetch anecdotes from ${baseUrl}`)
    }

    return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error(`Failed to create new anecdote at ${baseUrl}`)
    }

    return await response.json()
}
