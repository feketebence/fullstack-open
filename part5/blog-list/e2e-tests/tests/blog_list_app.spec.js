const { test, expect, beforeEach, describe } = require('@playwright/test')

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
            await page.getByRole('textbox', { name: 'username' }).click()
            await page
                .getByRole('textbox', { name: 'username' })
                .fill(exampleUser.username)
            await page.getByRole('textbox', { name: 'password' }).click()
            await page
                .getByRole('textbox', { name: 'password' })
                .fill(exampleUser.password)
            await page.getByRole('button', { name: 'login' }).click()

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
            await page.getByRole('textbox', { name: 'username' }).click()
            await page
                .getByRole('textbox', { name: 'username' })
                .fill(exampleUser.username)
            await page.getByRole('textbox', { name: 'password' }).click()
            await page
                .getByRole('textbox', { name: 'password' })
                .fill('wrongPassword')
            await page.getByRole('button', { name: 'login' }).click()

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
})
