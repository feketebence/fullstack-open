import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async (id, newBlog) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
    return response.data
}

const increaseLikes = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${baseUrl}/${id}`)
    if (!response.status === 200) {
        throw new Error(`Failed to fetch blog with id: ${id}`)
    }
    const existingBlog = response.data
    const updatedBlog = {
        ...existingBlog,
        likes: existingBlog.likes + 1
    }

    const updateResponse = await axios.put(
        `${baseUrl}/${id}`,
        updatedBlog,
        config
    )

    return updateResponse.data
}

const deleteBlog = async (blogToDelete) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
    return response.data
}

export default { getAll, create, update, increaseLikes, deleteBlog, setToken }
