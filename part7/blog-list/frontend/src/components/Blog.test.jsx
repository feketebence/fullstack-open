import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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

    const likeClickHandler = vi.fn()

    beforeEach(() => {
        render(<Blog blog={blog} user={user} onLikeClick={likeClickHandler} />)
    })

    test('renders content', () => {
        const titleAndAuthor = screen.getByText(
            `${blog.title} - ${blog.author}`
        )
        expect(titleAndAuthor).toBeDefined()

        const url = screen.queryByText(blog.url)
        expect(url).toBeNull()

        const likes = screen.queryByText(`likes ${blog.likes}`)
        expect(likes).toBeNull()
    })

    test('after clicking expand, blog details are shown', async () => {
        const user = userEvent.setup()
        const expandButton = screen.getByRole('button', {
            name: /expand/i
        })
        await user.click(expandButton)

        const url = screen.getByText(blog.url)
        expect(url).toBeVisible()

        const likes = screen.queryByText(`likes ${blog.likes}`)
        expect(likes).toBeVisible()
    })

    test('after clicking like, number of likes handler is called', async () => {
        const user = userEvent.setup()
        const expandButton = screen.getByRole('button', {
            name: /expand/i
        })
        await user.click(expandButton)

        const likeButton = screen.getByRole('button', {
            name: /like/i
        })

        const numberOfLikeClicks = 2
        for (let i = 0; i < numberOfLikeClicks; i++) {
            await user.click(likeButton)
        }

        expect(likeClickHandler.mock.calls).toHaveLength(numberOfLikeClicks)
    })
})
