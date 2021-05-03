export function accountReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case 'save':
            return {
                ...state,
                error: '',
                isLoading: true,
                success: false
            }
        case 'success':
            return {
                ...state,
                isLoading: false,
                success: true
            }
        case 'error':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                success: false
            }
        default:
            return;
    }
}