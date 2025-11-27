import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    test('renders content', () => {
        const blog = {
            title: 'Everything about tests',
            author: 'Testing Guru',
            url: 'https://guru.dev/testing',
            likes: 42,
            user: {
                username: 'john',
                name: 'John Doe',
                id: '6927276608d74a1c04ae9859'
            },
            id: '692727af08d74a1c04ae985d'
        }

        const user = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY2siLCJpZCI6IjY5MjcyNzY2MDhkNzRhMWMwNGFlOTg1OSIsImlhdCI6MTc2NDIzNjA3NiwiZXhwIjoxNzY0MjM5Njc2fQ.IMrZ3SKb2gBcsL3ymMXy0XqK1Wk0OYUqrN9HT8MS2Fs',
            username: 'jack',
            name: 'Jack Rabbit'
        }

        render(<Blog blog={blog} user={user} />)
        screen.logTestingPlaygroundURL()

        const titleAndAuthor = screen.getByText(
            `${blog.title} - ${blog.author}`
        )
        expect(titleAndAuthor).toBeDefined()

        const url = screen.queryByText(blog.url)
        expect(url).toBeNull()

        const likes = screen.queryByText(`likes ${blog.likes}`)
        expect(likes).toBeNull()
    })
})
