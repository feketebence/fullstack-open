const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!request.body.likes) {
        blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    if (!request.body.title) {
        return response.status(400).json({ error: '"title" field is missing' })
    }

    if (!request.body.url) {
        return response.status(400).json({ error: '"url" field is missing' })
    }

    let existingBlog = await Blog.findById(request.params.id)
    if (!existingBlog) {
        return response.status(404).end()
    }

    existingBlog.title = request.body.title
    existingBlog.url = request.body.url
    if (request.body.author) {
        existingBlog.author = request.body.author
    }
    if (!request.body.likes) {
        existingBlog.likes = 0
    } else {
        existingBlog.likes = request.body.likes
    }

    const updatedBlog = await existingBlog.save()
    response.json(updatedBlog)
})

module.exports = blogsRouter
