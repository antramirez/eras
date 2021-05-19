import editPNG from './../../assets/edit.png';
import './Publication.css';

const Publication = ({title, image, link, type, handleEdit}) => {
    return (
        <article className={`publication tc grow br3 pa3 ma3 dib bw2 shadow-5 mb4 ${type.toLowerCase()}-pub`}>
            <a className="w-100 h-100 db no-underline black" href={link} target="_blank" rel="noreferrer">
                <h3 className="f4 mv0 pa3 tl">{title}</h3>
                <button className="bg-transparent bn b grow absolute pointer" onClick={handleEdit} ><img src={editPNG} alt="Edit button"/></button>
                <img className="absolute pub-icon" src={image} alt={`${type} publication icon`}/>
            </a>
        </article>
    )
}

export default Publication;