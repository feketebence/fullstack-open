const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'show note creation form' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'add note' }).click()
}

export { loginWith, createNote }
