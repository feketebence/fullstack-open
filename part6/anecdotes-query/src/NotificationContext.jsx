import { useReducer, createContext } from 'react'

const getId = () => Math.floor(Math.random() * 1_000_000)

const notificationsReducer = (state, action) => {
    switch (action.type) {
        case 'addSuccess':
            return state.concat({
                id: getId(),
                content: `Anecdote '${action.payload}' added.`
            })
        case 'addError':
            return state.concat({
                id: getId(),
                content: `Cannot add anecdote because: ${action.payload}`
            })
        case 'vote':
            return state.concat({
                id: getId(),
                content: `Anecdote '${action.payload}' voted.`
            })
        case 'remove': {
            return state.slice(1)
        }
        default:
            return state
    }
}

const NotificationsContext = createContext()

export const NotificationsContextProvider = (props) => {
    const [notifications, notificationsDispatch] = useReducer(
        notificationsReducer,
        []
    )

    return (
        <NotificationsContext.Provider
            value={{ notifications, notificationsDispatch }}
        >
            {props.children}
        </NotificationsContext.Provider>
    )
}

export default NotificationsContext
