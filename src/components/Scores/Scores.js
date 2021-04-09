import { useState } from 'react';
import EditScorePopUp from './../EditScorePopUp/EditScorePopUp';
import editPNG from './../../assets/edit.png';


const Scores = ({score1, score2}) => {
    // Booleans for whether pop ups should be displayed
    const [showPopUp1, setShowPopUp1] = useState(false);
    const [showPopUp2, setShowPopUp2] = useState(false);

    // Score values to be passed to edit pop up
    const [step1Score, setStep1Score] = useState(score1)
    const [step2Score, setStep2Score] = useState(score2)

    // Handlers for displaying/closing pop ups
    const handleClick1 = (e) => {
        setShowPopUp1(true);
    }
    const handleClose1 = () => {
        setShowPopUp1(false);
    }
    const handleClick2 = (e) => {
        setShowPopUp2(true);
    }
    const handleClose2 = () => {
        setShowPopUp2(false);
    }

    // Handlers for setting scores when submitting form
    const handleEdit1 = (score) => {
        setStep1Score(score);
    }
    const handleEdit2 = (score) => {
        setStep2Score(score);
    }

    return (
        <div className="scores-container flex center justify-center mw8 mb5">
            <div className="score-container   br bw1 b--black">
                <h2 className="f2 tc">Step 1</h2>
                <div className="flex center justify-center">
                    <p className="f1 mt1 tc">
                        {step1Score > -1 ? step1Score : '---'}
                    </p>
                    <button className="bg-transparent bn b grow" onClick={handleClick1}>
                        <img src={editPNG} alt="Edit button"/>
                    </button>
                </div>                
                <EditScorePopUp step={1} value={step1Score} visible={showPopUp1} handleClose={handleClose1} handleEdit={handleEdit1} />
            </div>
            <div className="score-container">
                <h2 className="f2 tc">Step 2</h2>
                <div className="flex center justify-center">
                    <p className="f1 mt1 tc">
                        {step2Score > -1 ? step2Score : '---'}
                    </p>
                    <button className="bg-transparent bn b grow" onClick={handleClick2}>
                        <img src={editPNG} alt="Edit button"/>
                    </button>
                </div>     
                <EditScorePopUp step={2} value={step2Score} visible={showPopUp2} handleClose={handleClose2} handleEdit={handleEdit2} />
            </div>
            
        </div>
    )
}

export default Scores;