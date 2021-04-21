import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import FileUpload from '../../components/FileUpload/FileUpload';
import { apiRequest } from '../../utils/apiRequests';
import './Uploads.css';

const Uploads = () => {
    const { isLoggedIn } = useContext(UserContext);
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            apiRequest('uploads', 'GET', {}, setUploads, console.log);
        }
        // TODO: user not logged in
    }, [isLoggedIn])

    const handleUpload =  (type, data) => {
        if (isLoggedIn) {
            const formData = new FormData();
            formData.append('data', data);
            formData.append('type', type);
            
            apiRequest('uploads', 'POST', formData, (newUpload) => {
                setUploads([... uploads, newUpload]);
            }, console.log);
        }
        // TODO: user not logged in
    }

    return (
        <section id="uploads" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Uploads</h1>
            <div className="file_uploads ph3 pv3 pv4-ns ph4-m ph5-l">
                <FileUpload type={"transcript"} label={"Transcript"} handleUpload={handleUpload} />
                <FileUpload type={"recommendation"} label={"Letters of Recommendation"} handleUpload={handleUpload} />
                <FileUpload type={"other"} label={"Other documents"} handleUpload={handleUpload} />
                {/* // TODO: map each upload to corresponding section */}
                {uploads.map(u => <p key={u._id}>{u.type} - {u.fileName}</p>)}
            </div>
        </section>
    )
}

export default Uploads;