const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content,
            votes: 0
        })
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

const increaseVotes = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch anecdote with id: ${id}`)
    }

    const existingAnecdote = await response.json()

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: existingAnecdote.content,
            votes: existingAnecdote.votes + 1
        })
    }
    const updateResponse = await fetch(`${baseUrl}/${id}`, options)

    if (!updateResponse.ok) {
        throw new Error(`Failed to update anecdote with id ${id}`)
    }

    return await updateResponse.json()
}

export default { getAll, createNew, increaseVotes }
