const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    const exampleUser = {
        name: 'Reinhilde Ingrid',
        username: 'ringrid',
        password: 's3cr3tPassw0rd'
    }

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: exampleUser
        })

        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('notes-app')
        await expect(locator).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()

        await page.getByLabel('username').fill(exampleUser.username)
        await page.getByLabel('password').fill(exampleUser.password)

        await page.getByRole('button', { name: 'login' }).click()

        await expect(
            page.getByText(`${exampleUser.name} is logged in`)
        ).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByLabel('username').fill(exampleUser.username)
        await page.getByLabel('password').fill('wrongPassword')
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = page.locator('.error')
        console.log('errorDiv:', errorDiv)

        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(0, 0, 0)')

        await expect(
            page.getByText(`${exampleUser.name} is logged in`)
        ).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill(exampleUser.username)
            await page.getByLabel('password').fill(exampleUser.password)
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new note can be created', async ({ page }) => {
            await page
                .getByRole('button', { name: 'show note creation form' })
                .click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'add note' }).click()
            await expect(
                page.getByText('a note created by playwright')
            ).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await page
                    .getByRole('button', { name: 'show note creation form' })
                    .click()
                await page
                    .getByRole('textbox')
                    .fill('another note by playwright')
                await page.getByRole('button', { name: 'add note' }).click()
            })

            test('importance can be changed', async ({ page }) => {
                await page
                    .getByRole('button', { name: 'make not important' })
                    .click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })
})
