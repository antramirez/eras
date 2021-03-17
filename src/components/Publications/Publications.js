import './Publications.css';
import AddButton from './../AddButton/AddButton';
import publicationPaperPNG from './../../assets/publication_paper.png';
import presentationPNG from './../../assets/presentations.png';
import geometricPNG from './../../assets/geometric.png';


const Publication = ({title, image, colorClassName}) => {
    return (
        <article className={`publication tc grow br3 pa3 ma3 dib bw2 shadow-5 mb4 ${colorClassName}`}>
            <h3 className="f4 mv0 pa3 tl">{title}</h3>
            <img className="absolute" src={image} alt=""/>
        </article>
    )
}

const AddPublicationPopUp = () => {
    return (
        <article className="add-publication-popup pa1 black-80 pr6 mw6 ">
            <form action="add_publication_submit" acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="title">Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="title"  id="title" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="add-publication-type">Type</label>
                        <select className="w-100 mt1" name="add-publication-type" id="add-publication-type">
                            <option value="" selected disabled hidden></option>
                            <option value="Research">Research</option>
                            <option value="Abstract">Abstract</option>
                            <option value="Presentation">Presentation</option>
                            <option value="Other">Other</option>
                        </select>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="publication-type"  id="publication-type" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="link">Link</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="link"  id="link" />
                    </div>
                </fieldset>
            </form>
        </article>
    )
}

const Publications = () => {
    return (
        <section id="publications" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Publications</h1>
            <AddButton />
            <div className="publications-container flex flex-wrap mw8 center justify-center">
                <Publication title={"Polyethylene Glycol Camouflaged Earthworm Hemoglobin"} image={publicationPaperPNG} colorClassName={"research-pub"} />
                <Publication title={"Abstract"} image={geometricPNG} colorClassName={"abstract-pub"} />
                <Publication title={"Polyethylene Glycol Camouflaged Earthworm Hemoglobin"} image={publicationPaperPNG} colorClassName={"research-pub"} />
                <Publication title={"Polyethylene Glycol Camouflaged Earthworm Hemoglobin"} image={publicationPaperPNG} colorClassName={"research-pub"} />
                <Publication title={"Polyethylene Glycol Camouflaged Earthworm Hemoglobin"} image={publicationPaperPNG} />
                <Publication title={"Presentation"} image={presentationPNG} colorClassName={"presentation-pub"} />
            </div>
            <AddPublicationPopUp />
        </section>
    )
}

export default Publications;