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
        const firstBlog = {
            title: 'first blog',
            author: 'First Author',
            url: 'https://first-example.url/blog'
        }

        const secondBlog = {
            title: 'second blog',
            author: 'Second Author',
            url: 'https://second-example.url/blog'
        }

        beforeEach(async ({ page }) => {
            await loginWith(page, exampleUser.username, exampleUser.password)
        })

        test('a new blog can be created', async ({ page }) => {
            await addNewBlog(
                page,
                firstBlog.title,
                firstBlog.author,
                firstBlog.url
            )

            await expect(
                page.getByText(
                    `✅ Added new blog: ${firstBlog.title} - ${firstBlog.author} ✅`
                )
            ).toBeVisible()

            await expect(
                page.getByText(
                    `${firstBlog.title} - ${firstBlog.author} expand`
                )
            ).toBeVisible()

            await expect(
                page.getByRole('button', { name: 'expand' })
            ).toBeVisible()

            await page.getByRole('button', { name: 'expand' }).click()

            await expect(page.getByText(firstBlog.url)).toBeVisible()
            await expect(page.getByText('likes 0 like')).toBeVisible()
            await expect(
                page.getByText('Added by: Lauretta Erminia')
            ).toBeVisible()
            await expect(
                page.getByRole('button', { name: 'hide' })
            ).toBeVisible()
        })

        describe('and a blog is added', () => {
            beforeEach(async ({ page }) => {
                await addNewBlog(
                    page,
                    firstBlog.title,
                    firstBlog.author,
                    firstBlog.url
                )
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
                        `You are going to delete blog ${firstBlog.title} by ${firstBlog.author}`
                    )
                    dialog.accept()
                })
                await page.getByRole('button', { name: 'remove' }).click()

                await expect(
                    page.getByText(
                        `${firstBlog.title} - ${firstBlog.author} expand`
                    )
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

            // NOTE: this test might be flaky c:
            test('and another blog is added, and the like buttons of the blogs are clicked, then the blogs are ordered in descending order by the number of likes', async ({
                page
            }) => {
                test.setTimeout(10000)
                await page.getByRole('button', { name: 'expand' }).click()

                // clicking the firstBlog's like button
                const firstBlogLikeButton = page
                    .locator('div.blog')
                    .filter({
                        hasText: `${firstBlog.title} - ${firstBlog.author}`
                    })
                    .locator('button:has-text("like")')
                await firstBlogLikeButton.click()

                await addNewBlog(
                    page,
                    secondBlog.title,
                    secondBlog.author,
                    secondBlog.url
                )

                await page.getByRole('button', { name: 'expand' }).click()

                // grab both blogs' div container
                const ids = await page
                    .locator('div.blog')
                    .evaluateAll((divs) => divs.map((d) => d.id))

                const secondBlogLikeButton = page
                    .locator('div.blog')
                    .filter({
                        hasText: `${secondBlog.title} - ${secondBlog.author}`
                    })
                    .locator('button:has-text("like")')

                // clicking the secondBlog's like button
                await secondBlogLikeButton.click()

                // wait until the like button click is rendered for the second blog
                await expect(
                    page.locator('div.blog').filter({ hasText: 'likes 1' })
                ).toHaveCount(2)

                // clicking the secondBlog's like button for the 2nd time
                await secondBlogLikeButton.click()

                await expect(page.getByText('likes 2')).toBeVisible()

                const idsAfterClicks = await page
                    .locator('div.blog')
                    .evaluateAll((divs) => divs.map((d) => d.id))

                expect(ids).toEqual(idsAfterClicks.reverse())
            })
        })
    })
})
