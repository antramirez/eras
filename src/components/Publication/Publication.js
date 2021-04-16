import './Publication.css';

const Publication = ({title, image, link, type}) => {
    return (
        <article className={`publication tc grow br3 pa3 ma3 dib bw2 shadow-5 mb4 ${type.toLowerCase()}-pub`}>
            <a className="w-100 h-100 db no-underline black" href={link}>
                <h3 className="f4 mv0 pa3 tl">{title}</h3>
                <img className="absolute pub-icon" src={image} alt={`${type} publication icon`}/>
            </a>
        </article>
    )
}

export default Publication;