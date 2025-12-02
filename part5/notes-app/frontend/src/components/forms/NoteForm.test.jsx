import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'

describe('<NoteForm />', () => {
    test('updates parent state and calls onSubmit', async () => {
        const createNoteFn = vi.fn()
        const user = userEvent.setup()

        render(<NoteForm createNoteFn={createNoteFn} />)

        const input = screen.getByPlaceholderText('write note content here')
        const sendButton = screen.getByText('add note')

        await user.type(input, 'testing a form...')
        await user.click(sendButton)

        expect(createNoteFn.mock.calls).toHaveLength(1)
        expect(createNoteFn.mock.calls[0][0].content).toBe('testing a form...')
    })
})
