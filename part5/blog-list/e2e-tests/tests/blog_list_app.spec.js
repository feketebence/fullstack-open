const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addNewBlog } = require('./helper')

describe('Blog app', () => {
    const exampleUser = {
        name: 'Lauretta Erminia',
        username: 'lerminia',
        password: 'chiaveSuperSegreta'
    }

    const otherExampleUser = {
        name: 'Livio Lamberto',
        username: 'lamberto',
        password: 'chiaveMegaSegreta'
    }

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')

        for (const user of [exampleUser, otherExampleUser])
            await request.post('/api/users', {
                data: user
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
            const title = 'new example blog'
            const author = 'Some Author'
            const url = 'https://some-example.url/blog'

            await addNewBlog(page, title, author, url)

            await expect(
                page.getByText(`✅ Added new blog: ${title} - ${author} ✅`)
            ).toBeVisible()

            await expect(
                page.getByText(`${title} - ${author} expand`)
            ).toBeVisible()

            await expect(
                page.getByRole('button', { name: 'expand' })
            ).toBeVisible()

            await page.getByRole('button', { name: 'expand' }).click()

            await expect(page.getByText(url)).toBeVisible()
            await expect(page.getByText('likes 0 like')).toBeVisible()
            await expect(
                page.getByText('Added by: Lauretta Erminia')
            ).toBeVisible()
            await expect(
                page.getByRole('button', { name: 'hide' })
            ).toBeVisible()
        })

        describe('and a blog is added', () => {
            const title = 'new example blog'
            const author = 'Some Author'
            const url = 'https://some-example.url/blog'

            beforeEach(async ({ page }) => {
                await addNewBlog(page, title, author, url)
            })

            test('the blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'expand' }).click()
                await expect(page.getByText('likes 0 like')).toBeVisible()

                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('likes 1 like')).toBeVisible()
            })

            test('the blog can be deleted by the user who added it', async ({
                page
            }) => {
                await page.getByRole('button', { name: 'expand' }).click()

                await expect(
                    page.getByRole('button', { name: 'remove' })
                ).toBeVisible()

                page.once('dialog', (dialog) => {
                    console.log(`Dialog message: ${dialog.message()}`)
                    expect(dialog.message()).toStrictEqual(
                        `You are going to delete blog ${title} by ${author}`
                    )
                    dialog.accept()
                })
                await page.getByRole('button', { name: 'remove' }).click()

                await expect(
                    page.getByText(`${title} - ${author} expand`)
                ).not.toBeVisible()

                await expect(
                    page.getByRole('button', { name: 'expand' })
                ).not.toBeVisible()
            })

            test('the delete button of the blog is only visible for the user who created the blog', async ({
                page
            }) => {
                await page.getByRole('button', { name: 'expand' }).click()

                await expect(
                    page.getByRole('button', { name: 'remove' })
                ).toBeVisible()

                await page.getByRole('button', { name: 'log out' }).click()

                await loginWith(
                    page,
                    otherExampleUser.username,
                    otherExampleUser.password
                )

                await expect(
                    page.getByText(`${otherExampleUser.name} is logged in`)
                ).toBeVisible()

                await page.getByRole('button', { name: 'expand' }).click()

                await expect(
                    page.getByRole('button', { name: 'remove' })
                ).not.toBeVisible()
            })
        })
    })
})
