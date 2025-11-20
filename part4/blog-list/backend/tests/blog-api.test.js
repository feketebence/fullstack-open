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

test('if a blog is added without "likes" property, the number of likes defaults to 0', async () => {
    const titleOfNewBlog = 'New entry without likes'
    const newBlog = {
        title: titleOfNewBlog,
        author: 'SomebodyElse',
        url: 'https://another-url.com/'
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

    const addedBlog = blogsAfterOperation.find(
        (blog) => blog.title === titleOfNewBlog
    )
    assert.strictEqual(addedBlog.title, titleOfNewBlog)
    assert.strictEqual(addedBlog.likes, 0)
})

test('a blog can be updated with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updateData = {
        title: 'updated title',
        author: 'updated author',
        url: 'http://updated-author.dev',
        likes: 42
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()
    assert.strictEqual(blogsAfterOperation.length, helper.initialBlogs.length)

    const updatedBlog = blogsAfterOperation.find(
        (blog) => (blog.title = updateData.title)
    )

    assert.strictEqual(updatedBlog.title, updateData.title)
    assert.strictEqual(updatedBlog.url, updateData.url)
    assert.strictEqual(updatedBlog.author, updateData.author)
    assert.strictEqual(updatedBlog.likes, updateData.likes)
})

test('a blog can be updated with valid data, if "likes" field is not specified, it defaults to 0 ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updateData = {
        title: 'updated title without likes field',
        author: 'updated author',
        url: 'http://updated-author.dev'
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()
    assert.strictEqual(blogsAfterOperation.length, helper.initialBlogs.length)

    const updatedBlog = blogsAfterOperation.find(
        (blog) => (blog.title = updateData.title)
    )

    assert.strictEqual(updatedBlog.title, updateData.title)
    assert.strictEqual(updatedBlog.url, updateData.url)
    assert.strictEqual(updatedBlog.author, updateData.author)
    assert.strictEqual(updatedBlog.likes, 0)
})

test('a blog without title cannot be added', async () => {
    const invalidBlog = {
        author: 'Somebody',
        url: 'https://yetanotherurl.com/',
        likes: 7
    }

    const response = await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(
        response.body.error,
        'Blog validation failed: title: Path `title` is required.'
    )

    const blogsAfterOperation = await helper.blogsInDb()
    assert.strictEqual(blogsAfterOperation.length, helper.initialBlogs.length)
})

test('a blog without url cannot be added', async () => {
    const invalidBlog = {
        title: 'Blog without url',
        author: 'Somebody',
        likes: 5
    }

    const response = await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(
        response.body.error,
        'Blog validation failed: url: Path `url` is required.'
    )

    const blogsAfterOperation = await helper.blogsInDb()
    assert.strictEqual(blogsAfterOperation.length, helper.initialBlogs.length)
})

test('deleting of a blog with an existing id succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]
    const blogIdToDelete = blogToDelete.id
    console.log('blogIdToDelete:', blogIdToDelete)

    await api.delete(`/api/blogs/${blogIdToDelete}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((blog) => blog.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})
