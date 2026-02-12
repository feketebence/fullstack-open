import { configureStore } from '@reduxjs/toolkit'

import notificationsReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import currentUserReducer from './reducers/currentUserReducer'

const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
        blogs: blogReducer,
        currentUser: currentUserReducer,
        users: userReducer
    }
})

export default store
