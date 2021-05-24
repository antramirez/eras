export function experienceReducer(state, action) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case 'fetch':
            return {
                ...state,
                isFetching: true
            }
        case 'add':
            return {
                ...state,
                editError: '',
                isAdding: true
            }
        case 'edit':
            return {
                ...state,
                editError: '',
                isEditing: true,
                editSuccess: false
            }
        case 'delete':
            return {
                ...state,
                deleteError: '',
                isDeleting: true,
                deleteSuccess: false
            }
        case 'add_success':
            return {
                ...state,
                addError: '',
                isAdding: false,
                addSuccess: true
            }
        case 'fetch_success':
            return {
                ...state,
                isFetching: false,
                fetchError: '',
                fetchSuccess: true
            }
        case 'edit_success':
            return {
                ...state,
                editError: '',
                isEditing: false,
                editSuccess: true
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
        case 'edit_error':
            return {
                ...state,
                editError: action.payload,
                isEditing: false,
                editSuccess: false
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