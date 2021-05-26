import { useRef, useState, useEffect } from 'react';
import uploadPNG from './../../assets/upload.png';

const FileUpload = ({state, type, label, handleUpload}) => {
    const fileToUploadRef = useRef(null);
    const uploadButtonContainerRef = useRef(null);
    
    // Destructure state from reducer
    const { isAddingTranscript, isAddingRecommendation, isAddingOther } = state;

    const [fileToUpload, setFileToUpload] = useState(null);
    const [fileName, setFileName] = useState(null);

    // Hide upload button container if no file is selected
    useEffect(() => {
        if(fileName) {
            if (uploadButtonContainerRef.current) {
                uploadButtonContainerRef.current.classList.remove('dn');
            }
        } else {
            if (uploadButtonContainerRef.current) {
                uploadButtonContainerRef.current.classList.add('dn');
            }
        }
    }, [fileName])

    // Handle file input change to set file to upload and the name of the file to display
    const handleFileChange = (e) => {
        const file = e.target.value.split('\\').pop();
        setFileToUpload(e.target.files[0]);
        setFileName(file); // will be empty string if file is removed
    }

    // Handle file upload
    const handleUploadFile = async (e) => {
        e.preventDefault();
        // Check if upload was successful
        const success = await handleUpload(type, fileToUpload);
        if (success) {
            setFileToUpload(null);
            setFileName('');
        }
    }

    return (
        <>
            <form>
                <div className="file_upload_container mw7 mt4 center relative flex align-center justify-center">
                    <input type="file" name={`${type}-file`} id={`${type}-file`} className="inputfile" ref={fileToUploadRef} onChange={handleFileChange} />
                    <label className="upload-label" htmlFor={`${type}-file`}>
                        {label}
                        <span className="absolute right-1"><img src={uploadPNG} alt="Upload icon"/></span>
                    </label>
                </div>
                <div className="file-name-container mb1 mw6 center tc dn" ref={uploadButtonContainerRef}>
                    <p className="f4 mt1 mb3">{fileName}<span>
                        <button className={`mt3 mb2 ml3 b ph3 pv2 input-reset f6 ba b--black bg-transparent ${isAddingTranscript || isAddingRecommendation || isAddingOther ? '' : 'grow pointer'}`} onClick={handleUploadFile} >
                            {(() => {
                                if (type === 'transcript') {
                                    return isAddingTranscript ? 'Uploading...' : 'Upload';
                                } else if (type === 'recommendation') {
                                    return isAddingRecommendation ? 'Uploading...' : 'Upload';
                                } else {
                                    return isAddingOther ? 'Uploading...' : 'Upload';
                                }
                            })()}
                        </button>
                    </span></p>
                </div>
            </form>
        </>
    )
}

export default FileUpload;