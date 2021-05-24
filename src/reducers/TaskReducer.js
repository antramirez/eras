export function taskReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case 'add':
            return {
                ...state,
                editError: '',
                isAdding: true
            }
        case 'fetch':
            return {
                ...state,
                isFetching: true
            }
        case 'delete':
            return {
                ...state,
                deleteError: '',
                isDeleting: true,
                deleteSuccess: false
            }
        case 'fetch_success':
            return {
                ...state,
                isFetching: false,
                fetchError: '',
                fetchSuccess: true
            }
        case 'add_success':
            return {
                ...state,
                addError: '',
                isAdding: false,
                addSuccess: true            
            }
        case 'delete_success':
            return {
                ...state,
                deleteError: '',
                isDeleting: false,
                deleteSuccess: false
            }
        case 'fetch_error':
            return {
                ...state,
                fetchError: action.payload,
                isFetching: false,
                fetchSuccess: false
            }
        case 'add_error':
            return {
                ...state,
                addError: action.payload,
                isAdding: false,
                addSuccess: false
            }
        case 'delete_error':
            return {
                ...state,
                deleteError: action.payload,
                isDeleting: false,
                deleteSuccess: false
            }
        default:
            return;
    }
}