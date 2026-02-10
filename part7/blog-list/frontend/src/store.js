import { configureStore } from '@reduxjs/toolkit'

import notificationsReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        notifications: notificationsReducer
    }
})

export default store
