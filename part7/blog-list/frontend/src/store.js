import { configureStore } from '@reduxjs/toolkit'

import notificationsReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
        blogs: blogReducer
    }
})

export default store
