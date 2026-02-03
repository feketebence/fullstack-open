import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    const addBlogFn = vi.fn()

    const inputBlog = {
        title: 'this is a new blog',
        author: 'Someone',
        url: 'https://some.url/blog'
    }

    beforeEach(() => {
        render(<BlogForm addBlogFn={addBlogFn} />)
    })

    test('after clicking like, number of likes handler is called', async () => {
        const user = userEvent.setup()

        const titleInput = screen.getByRole('textbox', {
            name: /title/i
        })
        const authorInput = screen.getByRole('textbox', {
            name: /author/i
        })
        const urlInput = screen.getByRole('textbox', {
            name: /url/i
        })

        await user.type(titleInput, inputBlog.title)
        await user.type(authorInput, inputBlog.author)
        await user.type(urlInput, inputBlog.url)

        const addBlogButton = screen.getByRole('button', {
            name: /add new blog/i
        })
        await user.click(addBlogButton)

        expect(addBlogFn.mock.calls).toHaveLength(1)
        expect(addBlogFn.mock.calls[0][0]).toStrictEqual(inputBlog)
    })
})
