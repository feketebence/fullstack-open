const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    const exampleUser = {
        name: 'Lauretta Erminia',
        username: 'lerminia',
        password: 'chiaveSuperSegreta'
    }

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: exampleUser
        })

        await page.goto('/')
    })

    test('login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(
            page.getByRole('textbox', { name: 'username' })
        ).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(
            page.getByRole('textbox', { name: 'password' })
        ).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, exampleUser.username, exampleUser.password)

            await expect(
                page.getByText('✅ logged in successfully ✅')
            ).toBeVisible()
            await expect(
                page.getByRole('heading', { name: 'blogs' })
            ).toBeVisible()
            await expect(
                page.getByText(`${exampleUser.name} is logged in`)
            ).toBeVisible()
            await expect(
                page.getByRole('button', { name: 'log out' })
            ).toBeVisible()
            await expect(
                page.getByRole('button', { name: 'show blog creation form' })
            ).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, exampleUser.username, 'wrongPassword')

            await expect(
                page.getByText('❌ wrong credentials ❌')
            ).toBeVisible()
            await expect(
                page.getByRole('heading', { name: 'Login' })
            ).toBeVisible()
            await expect(
                page.getByRole('heading', { name: 'blogs' })
            ).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, exampleUser.username, exampleUser.password)
        })

        test('a new blog can be created', async ({ page }) => {
            await page
                .getByRole('button', { name: 'show blog creation form' })
                .click()
            await page.getByRole('textbox', { name: 'title' }).click()
            await page
                .getByRole('textbox', { name: 'title' })
                .fill('new example blog')
            await page.getByRole('textbox', { name: 'author' }).click()
            await page
                .getByRole('textbox', { name: 'author' })
                .fill('Some Author')
            await page.getByRole('textbox', { name: 'url' }).click()
            await page
                .getByRole('textbox', { name: 'url' })
                .fill('https://some-example.url/blog')
            await page.getByRole('button', { name: 'add new blog' }).click()

            await expect(
                page.getByText(
                    '✅ Added new blog: new example blog - Some Author ✅'
                )
            ).toBeVisible()

            await expect(
                page.getByText('new example blog - Some Author expand')
            ).toBeVisible()

            await expect(
                page.getByRole('button', { name: 'expand' })
            ).toBeVisible()

            await page.getByRole('button', { name: 'expand' }).click()

            await expect(
                page.getByText('https://some-example.url/blog')
            ).toBeVisible()
            await expect(page.getByText('likes 0 like')).toBeVisible()
            await expect(
                page.getByText('Added by: Lauretta Erminia')
            ).toBeVisible()
            await expect(
                page.getByRole('button', { name: 'hide' })
            ).toBeVisible()
        })
    })
})
