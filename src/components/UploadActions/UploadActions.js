const UploadActions = ({ id, fileName, type, downloadFile, deleteUpload }) => {
    return (
        <div className={type}>
            <p className="b dib">{fileName}</p>
            <span className="ml3">––</span>
            <p className="underline pointer dib ml3" onClick={() => downloadFile(id)}>Download</p>
            <p className="underline pointer dib ml3" onClick={() => deleteUpload(type, id)}>Delete</p>
        </div>
    )
}

export default UploadActions;