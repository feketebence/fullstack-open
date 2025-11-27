const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('notes-app')
        await expect(locator).toBeVisible()
        await expect(
            page.getByText('Browser can execute only JavaScript')
        ).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()

        await page.getByLabel('username').fill('root')
        await page.getByLabel('password').fill('s3cr3t')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Superuser is logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('root')
            await page.getByLabel('password').fill('s3cr3t')
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
    })
})
