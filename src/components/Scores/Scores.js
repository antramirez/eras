import { useState, useEffect, useContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import { apiRequest } from '../../utils/apiRequests';
import { scoresReducer } from '../../reducers/ScoresReducer';
import EditScorePopUp from './../EditScorePopUp/EditScorePopUp';
import editPNG from './../../assets/edit.png';

const Scores = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(scoresReducer, { _id: 0, step1: 0, step2: 0, step1Field: '', step2Field: '', isEditing: false, isDeleting: false, editSuccess: false, deleteSuccess: false, editError: '', deleteError: '' });
    const { step1, step2 } = state;

    // Booleans for whether pop ups should be displayed
    const [showPopUp1, setShowPopUp1] = useState(false);
    const [showPopUp2, setShowPopUp2] = useState(false);

    useEffect(() => {
        // retrieve scores if user is logged in, otherwise use fake scores
        if (isLoggedIn) {
            apiRequest('account', 'GET', {}, data => {
                dispatch({ type: 'field', fieldName: 'step1', payload: data.step1 });
                dispatch({ type: 'field', fieldName: 'step2', payload: data.step2 });
            }, console.log);
        } else {
            dispatch({ type: 'field', fieldName: 'step1', payload: 260 });
            dispatch({ type: 'field', fieldName: 'step2', payload: 0 });
        }        
    }, [isLoggedIn])

    // Handlers for setting scores when submitting form
    const handleEdit1 = async (score) => {
        dispatch({ type: 'edit' });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('account', 'PATCH', {step1: score}, (data) => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                dispatch({ type: 'field', fieldName: 'step1', payload: score });
                dispatch({ type: 'edit_success' });
                success = true;
            }, (e) => {
                dispatch({ type:'edit_error', payload: e.error });
                success = false;
            });
        } else {
            dispatch({ type: 'field', fieldName: 'step1', payload: score });
            dispatch({ type: 'edit_success' });
            success = true;
        }

        return success;
    }
    const handleEdit2 = async (score) => {
        dispatch({ type: 'edit' });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('account', 'PATCH', {step2: score}, (data) => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                dispatch({ type: 'field', fieldName: 'step2', payload: score });
                dispatch({ type: 'edit_success' });
                success = true;
            }, (e) => {
                dispatch({ type:'edit_error', payload: e.error });
                success = false;
            });
        } else {
            dispatch({ type: 'field', fieldName: 'step2', payload: score });
            dispatch({ type: 'edit_success' });
            success = true;
        }

        return success;
    }

    // Handlers for "deleting" scores (edit score to 0 so it doesn't show up)
    const handleDelete1 = async () => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('account', 'PATCH', {step1: 0}, (data) => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                dispatch({ type: 'field', fieldName: 'step1', payload: 0 });
                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            dispatch({ type: 'field', fieldName: 'step1', payload: 0 });
            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
    }
    const handleDelete2 = async () => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('account', 'PATCH', {step2: 0}, (data) => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                dispatch({ type: 'field', fieldName: 'step2', payload: 0 });
                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            dispatch({ type: 'field', fieldName: 'step2', payload: 0 });
            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
    }

    return (
        <div className="scores-container flex center justify-center mw8 mb5">
            <div className="score-container   br bw1 b--black">
                <h2 className="f2 tc">Step 1</h2>
                <div className="flex center justify-center">
                    <p className="f1 mt1 tc">
                        {step1 > 0 ? step1 : '---'}
                    </p>
                    <button className="bg-transparent bn b grow" onClick={() => setShowPopUp1(true)}>
                        <img src={editPNG} alt="Edit button"/>
                    </button>
                </div>
                <EditScorePopUp step={1} state={state} dispatch={dispatch} visible={showPopUp1} handleClose={() => setShowPopUp1(false)} handleEdit={handleEdit1} handleDelete={handleDelete1} />
            </div>
            <div className="score-container">
                <h2 className="f2 tc">Step 2</h2>
                <div className="flex center justify-center">
                    <p className="f1 mt1 tc">
                        {step2 > 0 ? step2 : '---'}
                    </p>
                    <button className="bg-transparent bn b grow" onClick={() => setShowPopUp2(true)}>
                        <img src={editPNG} alt="Edit button"/>
                    </button>
                </div>     
                <EditScorePopUp step={2} state={state} dispatch={dispatch} visible={showPopUp2} handleClose={() => setShowPopUp2(false)} handleEdit={handleEdit2} handleDelete={handleDelete2} />
            </div>
        </div>
    )
}

export default Scores;