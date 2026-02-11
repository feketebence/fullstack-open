const currentUserStorageKey = 'loggedInBlogListAppUser'

const storeCurrentUser = (currentUser) => {
    window.localStorage.setItem(
        currentUserStorageKey,
        JSON.stringify(currentUser)
    )
}

const loadCurrentUser = () => {
    const loggedInUserJSON = window.localStorage.getItem(currentUserStorageKey)
    return JSON.parse(loggedInUserJSON)
}

const removeCurrentUser = () => {
    window.localStorage.removeItem(currentUserStorageKey)
}

export default { storeCurrentUser, loadCurrentUser, removeCurrentUser }
