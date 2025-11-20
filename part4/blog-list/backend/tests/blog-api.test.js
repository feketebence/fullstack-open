const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('Database is cleared')

    await Blog.insertMany(helper.initialBlogs)

    console.log(
        `${helper.initialBlogs.length} ${
            helper.initialBlogs.length === 0 ? 'blog has' : 'blogs have'
        } been saved to the database`
    )
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier of a blog is named "id" and has correct format', async () => {
    const response = await api.get('/api/blogs')

    const firstBlogObjectKeys = Object.keys(response.body[0])

    const uniqueIdentifierFieldName = 'id'
    assert(firstBlogObjectKeys.includes(uniqueIdentifierFieldName))

    const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

    const uniqueIdentifier = response.body[0][uniqueIdentifierFieldName]
    assert.strictEqual(objectIdRegex.test(uniqueIdentifier), true)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New entry',
        author: 'Somebody',
        url: 'https://someurl.com/',
        likes: 53
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()
    assert.strictEqual(
        blogsAfterOperation.length,
        helper.initialBlogs.length + 1
    )

    const titles = blogsAfterOperation.map((blog) => blog.title)
    assert(titles.includes('New entry'))
})

after(async () => {
    await mongoose.connection.close()
})
