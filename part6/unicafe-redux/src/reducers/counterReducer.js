const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    console.log('action:', JSON.stringify(action, null, 2))
    switch (action.type) {
        case 'GOOD':
            return state
        case 'OK':
            return state
        case 'BAD':
            return state
        case 'RESET':
            return state
        default:
            return state
    }
}

export default counterReducer
