const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const initialBlogs = require('./test_helper').initialBlogs

describe('dummy', () => {
    test('dummy returns one', () => {
        const initialBlogs = []

        const result = listHelper.dummy(initialBlogs)
        assert.strictEqual(result, 1)
    })
})

describe('calculateTotalLikes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.calculateTotalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list has five initialBlogs, equals the likes of those', () => {
        const result = listHelper.calculateTotalLikes(initialBlogs)
        assert.strictEqual(result, 36)
    })
})

describe('determineFavoriteBlog', () => {
    test('when list has five initialBlogs, the one with the most likes are returned', () => {
        const result = listHelper.determineFavoriteBlog(initialBlogs)
        assert.deepStrictEqual(result, initialBlogs[2])
    })

    test('when list has no initialBlogs, null is returned', () => {
        const initialBlogs = []
        const result = listHelper.determineFavoriteBlog(initialBlogs)
        assert.deepStrictEqual(result, null)
    })
})
