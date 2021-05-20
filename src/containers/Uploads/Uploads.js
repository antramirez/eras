import { useState, useEffect, useContext, useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import FileUpload from '../../components/FileUpload/FileUpload';
import UploadActions from '../../components/UploadActions/UploadActions';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import {uploadReducer} from '../../reducers/UploadReducer';
import download from 'downloadjs';
import cross from '../../assets/cross.svg';
import './Uploads.css';

const Uploads = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(uploadReducer, { transcript: '', recommendation: '', other: '', isAddingTranscript: false, isAddingRecommendation: false, isAddingOther: false, isDeletingTranscript: false, isDeletingRecommendation: false, isDeletingOther: false, addTranscriptSuccess: '', addRecommendationSuccess: '', addOtherSuccess: '', addTranscriptError: '', addRecommendationError: '', addOtherError: '', deleteTranscriptSuccess: false, deleteRecommendationSuccess: false, deleteOtherSuccess: false, deleteTranscriptError: '', deleteRecommendationError: '', deleteOtherError: '' });
    const { addTranscriptError, addRecommendationError, addOtherError, addTranscriptSuccess, addRecommendationSuccess, addOtherSuccess, deleteTranscriptError, deleteRecommendationError, deleteOtherError } = state;

    const [uploads, setUploads] = useState([]); 
    const [transcripts, setTranscripts] = useState([]); 
    const [recommendations, setRecommendations] = useState([]); 
    const [otherUploads, setOtherUploads] = useState([]);

    const popup = useRef();

    useEffect(() => {
        if (isLoggedIn) {
            apiRequest('uploads', 'GET', {}, (data) => {
                data.forEach(u => {
                    if (u.type === 'transcript') {
                        const t = transcripts;
                        t.push(u);
                        setTranscripts([...t]);
                    } else if (u.type === 'recommendation') {
                        const r = recommendations;
                        r.push(u);
                        setRecommendations([...r]);
                    } else {
                        const o = otherUploads;
                        o.push(u)
                        setOtherUploads([...o]);
                    }
                });
                setUploads(data);
            }, console.log);
        }
        // TODO: user not logged in
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    const handleUpload =  async (type, data) => {
        if (isLoggedIn) {
            if (type === 'transcript') {
                dispatch({ type: 'add_transcript' });
            } else if (type === 'recommendation') {
                dispatch({ type: 'add_recommendation' });
            } else {
                dispatch({ type: 'add_other' });
            }
            
            let success = false;
            
            const formData = new FormData();
            formData.append('data', data);
            formData.append('type', type);
            
            await apiRequest('uploads', 'POST', formData, (newUpload) => {
                if (type === 'transcript') {
                    setTranscripts([...transcripts, newUpload]);
                    dispatch({ type: 'add_transcript_success', payload: 'File uploaded successfully.' });
                } else if (type === 'recommendation') {
                    setRecommendations([...recommendations, newUpload]);
                    dispatch({ type: 'add_recommendation_success', payload: 'File uploaded successfully.' });
                } else {
                    setOtherUploads([...otherUploads, newUpload]);
                    dispatch({ type: 'add_other_success', payload: 'File uploaded successfully.' });
                }
                setUploads([...uploads, newUpload]);
                success = true;
            }, (e) => {
                if (type === 'transcript') {
                    dispatch({ type: 'add_transcript_error', payload: e.error});
                } else if (type === 'recommendation') {
                    dispatch({ type: 'add_recommendation_error', payload: e.error});
                } else {
                    dispatch({ type: 'add_other_error', payload: e.error});
                }
                success = false;
            });

            return success;
        } else {
            if (popup.current) {
                popup.current.classList.remove('dn');
                popup.current.classList.add('flex');
            }
        }
    }

    const closePopUp = () => {
        if (popup.current) {
            popup.current.classList.add('dn');
            popup.current.classList.remove('flex');
        }
    }

    const downloadFile = async (id) => {
        const upload = uploads.find(u => u._id === id);
        // create blob out of upload's data buffer array
        download(new Blob([new Uint8Array(upload.data.data)]), upload.fileName, upload.mimeType);
    }

    const deleteUpload = async (type, id) => {
        if (type === 'transcript') {
            dispatch({ type: 'delete_transcript' });
        } else if (type === 'recommendation') {
            dispatch({ type: 'delete_recommendation' });
        } else {
            dispatch({ type: 'delete_other' });
        }
        if (isLoggedIn) {
            await idApiRequest('uploads', id, 'DELETE', {}, () => {

                if (type === 'transcript') {
                    setTranscripts(transcripts.filter(u => u._id !== id))
                    dispatch({ type: 'delete_transcript_success' });
                } else if (type === 'recommendation') {
                    setRecommendations(recommendations.filter(u => u._id !== id))
                    dispatch({ type: 'delete_recommendation_success' });
                } else {
                    setOtherUploads(otherUploads.filter(u => u._id !== id))
                    dispatch({ type: 'delete_other_success' });
                }
                setUploads(uploads.filter(u => u._id !== id));
    
            }, (e) => {
                if (type === 'transcript') {
                    dispatch({ type: 'delete_transcript_error', payload: e.error });
                } else if (type === 'recommendation') {
                    dispatch({ type: 'delete_recommendation_error', payload: e.error });
                } else {
                    dispatch({ type: 'delete_other_error', payload: e.error });
                }
            });
        }
    }

    return (
        <section id="uploads" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Uploads</h1>
            <div className="file_uploads ph3 pv3 pv4-ns ph4-m ph5-l">
                <FileUpload state={state} dispatch={dispatch} type={"transcript"} label={"Transcript"} handleUpload={handleUpload} />
                <p className="f5 red b tc">{addTranscriptError ? addTranscriptError : ''}</p>
                <p className="f5 green b tc">{addTranscriptSuccess ? addTranscriptSuccess : ''}</p>
                <div className="transcript-uploads mw7 center">
                    {transcripts.map(u => <UploadActions key={u._id} id={u._id} fileName={u.fileName} type={u.type} downloadFile={downloadFile} deleteUpload={deleteUpload} />)}
                    <p className="f5 red b tc">{deleteTranscriptError ? deleteTranscriptError : ''}</p>
                </div>
                <FileUpload state={state} dispatch={dispatch} type={"recommendation"} label={"Letters of Recommendation"} handleUpload={handleUpload} />
                <p className="f5 red b tc">{addRecommendationError ? addRecommendationError : ''}</p>
                <p className="f5 green b tc">{addRecommendationSuccess ? addRecommendationSuccess : ''}</p>
                <div className="recommendation-uploads mw7 center">
                    {recommendations.map(u => <UploadActions key={u._id} id={u._id} fileName={u.fileName} type={u.type} downloadFile={downloadFile} deleteUpload={deleteUpload} />)}
                    <p className="f5 red b tc">{deleteRecommendationError ? deleteRecommendationError : ''}</p>
                </div>
                <FileUpload state={state} dispatch={dispatch} type={"other"} label={"Other documents"} handleUpload={handleUpload} />
                <p className="f5 red b tc">{addOtherError ? addOtherError : ''}</p>
                <p className="f5 green b tc">{addOtherSuccess ? addOtherSuccess : ''}</p>
                <div className="other-uploads mw7 center">
                    {otherUploads.map(u => <UploadActions key={u._id} id={u._id} fileName={u.fileName} type={u.type} downloadFile={downloadFile} deleteUpload={deleteUpload} />)}
                    <p className="f5 red b tc">{deleteOtherError ? deleteOtherError : ''}</p>
                </div>
            </div>
            <div className="must-signin-popup-container dn content-center justify-center items-center" ref={popup}>
                <div className="relative center pa4 br3">
                    <button className="bg-transparent bn b absolute pointer close-btn pa0" onClick={() => closePopUp()}><img className="h-100" src={cross} alt="Close navigation popup"/></button>
                    <p className="f3 mb1">You must be signed in to upload your documents.</p>
                    <button className="mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6"><Link className="link black" to='/signin'>Sign in</Link></button>
                    <p>New user? <Link to='/signup'>Create an account.</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Uploads;