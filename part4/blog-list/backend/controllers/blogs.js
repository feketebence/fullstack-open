const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        const populatedBlog = blog.populate('user', { username: 1, name: 1 })
        response.json(populatedBlog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const users = await User.find({})
    const randomUser = users[0]

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: randomUser._id
    })

    const savedBlog = await blog.save()
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
    await randomUser.save()

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
