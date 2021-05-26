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
                saveError: '',
                isSaving: true,
                saveSuccess: false
            }
        case 'save_success':
            return {
                ...state,
                isSaving: false,
                saveSuccess: true
            }
        case 'save_error':
            return {
                ...state,
                saveError: action.payload,
                isSaving: false,
                saveSuccess: false
            }
        case 'logout':
            return {
                ...state,
                logoutError: '',
                isLoggingOut: true,
                logoutSuccess: false
            }
        case 'logout_success':
            return {
                ...state,
                isLoggingOut: false,
                logoutSuccess: true
            }
        case 'logout_error':
            return {
                ...state,
                logoutError: action.payload,
                isLoggingOut: false,
                saveSuccess: false
            }
        default:
            return;
    }
}