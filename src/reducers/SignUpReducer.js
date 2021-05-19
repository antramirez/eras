export function signUpReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case 'signup':
            return {
                ...state,
                error: '',
                isLoading: true
            }
        case 'success':
            return {
                ...state,
                firstName: '',
                lastName: '',
                graduationYear: '',
                email: '',
                password: '',
                legalUS: '',
                isLoading: false,
                success: true
            }
        case 'error':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                password: '',
            }
        default:
            return;
        }
}