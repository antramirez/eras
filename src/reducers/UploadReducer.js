export function uploadReducer(state, action) {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                isFetching: true
            }
        case 'add_transcript':
            return {
                ...state,
                isAddingTranscript: true
            }
        case 'add_recommendation':
            return {
                ...state,
                isAddingRecommendation: true
            }
        case 'add_other':
            return {
                ...state,
                isAddingOther: true
            }
        case 'delete_transcript':
            return {
                ...state,
                deleteTranscriptError: '',
                isDeletingTranscript: true,
                deleteTranscriptSuccess: false
            }
        case 'delete_recommendation':
            return {
                ...state,
                deleteRecommendationError: '',
                isDeletingRecommendation: true,
                deleteRecommendationSuccess: false
            }
        case 'delete_other':
            return {
                ...state,
                deleteOtherError: '',
                isDeletingOther: true,
                deleteOtherSuccess: false
            }
        case 'fetch_success':
            return {
                ...state,
                isFetching: false,
                fetchError: '',
                fetchSuccess: true
            }
        case 'add_transcript_success':
            return {
                ...state,
                addTranscriptError: '',
                isAddingTranscript: false,
                addTranscriptSuccess: action.payload            
            }
        case 'add_recommendation_success':
            return {
                ...state,
                addRecommendationError: '',
                isAddingRecommendation: false,
                addRecommendationSuccess: action.payload            
            }
        case 'add_other_success':
            return {
                ...state,
                addOtherError: '',
                isAddingOther: false,
                addOtherSuccess: action.payload            
            }
        case 'delete_transcript_success':
            return {
                ...state,
                deleteTranscriptError: '',
                isDeletingTranscript: false,
                deleteTranscriptSuccess: false
            }
        case 'delete_recommendation_success':
            return {
                ...state,
                deleteRecommendationError: '',
                isDeletingRecommendation: false,
                deleteRecommendationSuccess: false
            }
        case 'delete_other_success':
            return {
                ...state,
                deleteOtherError: '',
                isDeletingOther: false,
                deleteROtherSuccess: false
            }
        case 'fetch_error':
            return {
                ...state,
                fetchError: action.payload,
                isFetching: false,
                fetchSuccess: false
            }
        case 'add_transcript_error':
            return {
                ...state,
                addTranscriptError: action.payload,
                isAddingTranscript: false,
                addTranscriptSuccess: false
            }
        case 'add_recommendation_error':
            return {
                ...state,
                addRecommendationError: action.payload,
                isAddingRecommendation: false,
                addRecommendationSuccess: false
            }
        case 'add_other_error':
            return {
                ...state,
                addOtherError: action.payload,
                isAddingOther: false,
                addOtherSuccess: false
            }
        case 'delete_transcript_error':
            return {
                ...state,
                deleteTranscriptError: action.payload,
                isDeletingTranscript: false,
                deleteTranscriptSuccess: false
            }
        case 'delete_recommendation_error':
            return {
                ...state,
                deleteRecommendationError: action.payload,
                isDeletingRecommendation: false,
                deleteRecommendationSuccess: false
            }
        case 'delete_other_error':
            return {
                ...state,
                deleteOtherError: action.payload,
                isDeletingOther: false,
                deleteOtherSuccess: false
            }
        default:
            return;
    }
}