const jwt = require('jsonwebtoken')

const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFromClientRequest = (request) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const getAndCheckUser = async (request, response) => {
    const tokenFromRequest = getTokenFromClientRequest(request)
    const decodedToken = jwt.verify(tokenFromRequest, process.env.SECRET)

    if (!decodedToken.id) {
        // if the token does not contain the user's identity (decodedToken.id is undefined)
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({ error: 'userId missing or invalid' })
    }

    return user
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        const populatedBlog = await blog.populate('user', {
            username: 1,
            name: 1
        })
        console.log('populatedBlog:', populatedBlog)

        response.json(populatedBlog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await getAndCheckUser(request, response)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    logger.info(
        `User '${user.name}' created new blog with title '${blog.title}'`
    )

    const populatedBlog = await savedBlog.populate('user', {
        name: 1,
        username: 1
    })

    response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = await getAndCheckUser(request, response)

    // todo: only allow the deletion if the blog was created by the current user

    await Blog.findByIdAndDelete(request.params.id)

    logger.info(
        `User '${user.username}' deleted blog with id ${request.params.id}`
    )

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const user = await getAndCheckUser(request, response)

    if (!request.body.title) {
        return response.status(400).json({ error: '"title" field is missing' })
    }

    if (!request.body.url) {
        return response.status(400).json({ error: '"url" field is missing' })
    }

    let existingBlog = await Blog.findById(request.params.id).populate('user')
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

    logger.info(
        `User '${user.username}' updated blog [id: '${updatedBlog.id}', title '${updatedBlog.title}', created by: ${updatedBlog.user.username}]`
    )
    response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const comment = request.body.content
    const user = await getAndCheckUser(request, response)

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response
            .status(404)
            .json({ error: `blog with id=${request.params.id} not found` })
    }

    blog.comments.push(comment)
    const savedBlog = await blog.save()

    logger.info(
        `User '${user.username}' added comment ${comment} to blog [id: '${blog.id}', title '${blog.title}', created by: ${blog.user.username}]`
    )

    response.json(savedBlog)
})

module.exports = blogsRouter
