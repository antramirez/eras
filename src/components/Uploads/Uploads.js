import { useRef, useState, useEffect } from 'react';
import './Uploads.css';
import uploadPNG from './../../assets/upload.png';

const FileUpload = ({type, label}) => {
    const fileToUploadRef = useRef(null);
    const uploadButtonRef = useRef(null);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [fileName, setFileName] = useState(null);

    // Hide upload button if no file is selected
    useEffect(() => {
        if(fileName) {
            if (uploadButtonRef.current) {
                uploadButtonRef.current.classList.remove('dn')
            }
        }
    }, [fileName])

    // Handle file input change to set file to upload and the name of the file to display
    const handleFileChange = (e) => {
        const file = e.target.value.split('\\').pop();
        setFileToUpload(e.target.value)
        setFileName(file)
    }

    // Handle file upload
    const handleUploadFile = (e) => {
        e.preventDefault();
        // TODO: upload
    }

    return (
        <>
            <div className="file_upload_container mw7 mt4 center relative flex align-center justify-center">
                <input type="file" name={`${type}-file`} id={`${type}-file`} className="inputfile" ref={fileToUploadRef} onChange={handleFileChange} value={fileToUpload}/>
                <label className="upload-label" htmlFor={`${type}-file`}>
                    {label}
                    <span className="absolute right-1"><img src={uploadPNG} alt="Upload icon"/></span>
                </label>
            </div>
            <div className="file-name-container mb1 mw6 center tc">
                <p className="f4 mt1 mb3">{fileName}<span><button className="mt3 mb2 ml3 b--black bg-transparent ba b ph3 pv2 grow pointer f6 dn" onClick={handleUploadFile} ref={uploadButtonRef}>Upload</button></span></p>
                
            </div>
        </>
        
    )
}

const Uploads = () => {
    return (
        <section id="uploads" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Uploads</h1>
            <div className="file_uploads ph3 pv3 pv4-ns ph4-m ph5-l">
                <FileUpload type={"transcript"} label={"Transcript"} />
                <FileUpload type={"recommendation"} label={"Letters of Recommendation"} />
                <FileUpload type={"other"} label={"Other documents"} />
            </div>
        </section>
    )
}

export default Uploads;