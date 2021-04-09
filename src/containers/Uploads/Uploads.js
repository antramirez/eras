import FileUpload from '../../components/FileUpload/FileUpload';
import './Uploads.css';

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