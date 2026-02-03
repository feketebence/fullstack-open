const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', { name: 'username' }).click()
    await page.getByRole('textbox', { name: 'username' }).fill(username)
    await page.getByRole('textbox', { name: 'password' }).click()
    await page.getByRole('textbox', { name: 'password' }).fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const addNewBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
    await page.getByRole('button', { name: 'show blog creation form' }).click()
    await page.getByRole('textbox', { name: 'title' }).click()
    await page.getByRole('textbox', { name: 'title' }).fill(blogTitle)
    await page.getByRole('textbox', { name: 'author' }).click()
    await page.getByRole('textbox', { name: 'author' }).fill(blogAuthor)
    await page.getByRole('textbox', { name: 'url' }).click()
    await page.getByRole('textbox', { name: 'url' }).fill(blogUrl)
    await page.getByRole('button', { name: 'add new blog' }).click()
}

export { loginWith, addNewBlog }
