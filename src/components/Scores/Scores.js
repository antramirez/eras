import { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/apiRequests';
import EditScorePopUp from './../EditScorePopUp/EditScorePopUp';
import editPNG from './../../assets/edit.png';

const Scores = () => {
    // Booleans for whether pop ups should be displayed
    const [showPopUp1, setShowPopUp1] = useState(false);
    const [showPopUp2, setShowPopUp2] = useState(false);

    // Score values to be passed to edit pop up
    const [step1Score, setStep1Score] = useState(0);
    const [step2Score, setStep2Score] = useState(0);

    useEffect(() => {
        // if user is logged in
        apiRequest('account', 'GET', {}, data => {
            setStep1Score(data.step1);
            setStep2Score(data.step2);
        }, console.log);

        // TODO: uncomment when logged in state exists
        // if user is not logged in
        // setStep1Score(260);
        // setStep2Score(0);
    }, [])

    // Handlers for setting scores when submitting form
    const handleEdit1 = (score) => {
        // if user is logged in
        apiRequest('account', 'PATCH', {step1: score}, (data) => 
            {localStorage.setItem('currentUser', JSON.stringify(data))
            setStep1Score(score);
        }, console.log);

        // TODO: uncomment when logged in state exists
        // if user is not logged in
        // setStep1Score(score);
    }
    const handleEdit2 = (score) => {
        // if user is logged in
        apiRequest('account', 'PATCH', {step2: score}, (data) => 
            {localStorage.setItem('currentUser', JSON.stringify(data))
            setStep2Score(score);
        }, console.log);

        // TODO: uncomment when logged in state exists
        // if user is not logged in
        // setStep2Score(score);
    }

    return (
        <div className="scores-container flex center justify-center mw8 mb5">
            <div className="score-container   br bw1 b--black">
                <h2 className="f2 tc">Step 1</h2>
                <div className="flex center justify-center">
                    <p className="f1 mt1 tc">
                        {step1Score > 0 ? step1Score : '---'}
                    </p>
                    <button className="bg-transparent bn b grow" onClick={() => setShowPopUp1(true)}>
                        <img src={editPNG} alt="Edit button"/>
                    </button>
                </div>                
                <EditScorePopUp step={1} value={step1Score} visible={showPopUp1} handleClose={() => setShowPopUp1(false)} handleEdit={handleEdit1} />
            </div>
            <div className="score-container">
                <h2 className="f2 tc">Step 2</h2>
                <div className="flex center justify-center">
                    <p className="f1 mt1 tc">
                        {step2Score > 0 ? step2Score : '---'}
                    </p>
                    <button className="bg-transparent bn b grow" onClick={() => setShowPopUp2(true)}>
                        <img src={editPNG} alt="Edit button"/>
                    </button>
                </div>     
                <EditScorePopUp step={2} value={step2Score} visible={showPopUp2} handleClose={() => setShowPopUp2(false)} handleEdit={handleEdit2} />
            </div>
            
        </div>
    )
}

export default Scores;