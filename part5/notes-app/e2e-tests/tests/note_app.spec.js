const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
    const exampleUser = {
        name: 'Reinhilde Ingrid',
        username: 'ringrid',
        password: 's3cr3tPassw0rd'
    }

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: exampleUser
        })

        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('notes-app')
        await expect(locator).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await loginWith(page, exampleUser.username, exampleUser.password)

        await expect(
            page.getByText(`${exampleUser.name} is logged in`)
        ).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, exampleUser.username, 'wrongPassword')

        const errorDiv = page.locator('.error')

        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(0, 0, 0)')

        await expect(
            page.getByText(`${exampleUser.name} is logged in`)
        ).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, exampleUser.username, exampleUser.password)
        })

        test('a new note can be created', async ({ page }) => {
            const noteContent = 'a note created by playwright'
            await createNote(page, noteContent)

            await expect(page.getByText(noteContent)).toBeVisible()
        })

        describe('and several notes exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
            })

            test('one of those can be made non-important', async ({ page }) => {
                await page.pause()

                const buttonOfSecondNote = page
                    .getByRole('listitem')
                    .filter({
                        hasText: `second note - ${exampleUser.username}`
                    })
                    .getByRole('button')
                await buttonOfSecondNote.click()

                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })
})
