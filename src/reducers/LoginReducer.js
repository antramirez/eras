export function loginReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case 'login':
            return {
                ...state,
                error: '',
                isLoading: true
            }
        case 'success':
            return {
                ...state,
                isLoading: false,
                username: '',
                password: '',
            }
        case 'error':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                username: '',
                password: '',
            }
        default:
            return;
        }
}