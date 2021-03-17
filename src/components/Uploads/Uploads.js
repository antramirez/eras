import './Uploads.css';
import uploadPNG from './../../assets/upload.png';

const FileUpload = ({type, label}) => {
    return (
        <div className="file_upload_container mw7 center relative mb4 flex align-center justify-center">
            <input type="file" name={`${type}-file`} id={`${type}-file`} className="inputfile" />
            <label className="upload-label" htmlFor={`${type}-file`}>
                {label}
                <span className="absolute right-1"><img src={uploadPNG} alt="Upload icon"/></span>
            </label>
        </div>
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