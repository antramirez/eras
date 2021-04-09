import editPNG from './../../assets/edit.png';

const Experience = ({organization, image, position, startDate, endDate, description, handleEdit}) => {
    const handleClick = (organization, position, startDate, endDate, description) => {
        handleEdit(organization, position, startDate, endDate, description)
    }
    return (
        <article className="experience relative mw5 mw6-ns dib">
            <div className="experience-heading bb flex">
                <h3 className="f4 mv0 pv2">{organization}</h3>
                <button className="bg-transparent bn b grow"><img src={editPNG} alt="Edit button"  onClick={handleClick} /></button>
            </div>
            <img className="absolute" src={image} alt="Experience Type"/>
            <h4 className="mt2 mb1 i-ns">{`${position} (${startDate} - ${endDate})`}</h4>
            <div className="pa2">
                <p className="f6 f5-ns lh-copy measure mv0">{description}</p>
            </div>
        </article>
    )
}

export default Experience;