import './Experiences.css';
import AddButton from './../AddButton/AddButton';
import volunteeringPNG from './../../assets/experience_volunteering.png';
import tutoringPNG from './../../assets/experiences_work.png';
import editPNG from './../../assets/edit.png';

const Experience = ({type, image}) => {
    return (
        <article className="experience relative mw5 mw6-ns hidden  mv4        pa3 ma2 dib">
            <h3 className="f4 mv0 pv2 bb">{type} <span><img src={editPNG} alt="Edit button"/></span></h3>
            <img className="absolute" src={image} alt="Experience Type"/>
            <div className="pa2">
                <p className="f6 f5-ns lh-copy measure mv0">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                </p>
            </div>
        </article>
    )
}

const AddExperiencePopUp = () => {
    return (
        <article className="add-experience-popup pa1 black-80 pr6 mw6 ">
            <form action="add_experience_submit" acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="organization">Organization</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="organization"  id="organization" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="position">Position</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="position"  id="position" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="start-date">Start Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="start-date"  id="start-date" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="end-date">End Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="end-date"  id="end-date" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="description">Description</label>
                        <textarea className="experience-description pa2 input-reset bn w-100 measure" type="text" name="description"  id="description" />
                    </div>
                </fieldset>
            </form>
        </article>
    )
}

const Experiences = () => {
    return (
        // <section id="experiences" className="ph3 pv3 pv4-ns ph4-m ph5-l ">
        <section id="experiences" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Experiences</h1>
            <AddButton />
            <div className="experiences-container flex flex-wrap justify-between mw8 center">
                <Experience type={"Tutoring"} image={tutoringPNG} />
                <Experience type={"Volunteering"} image={volunteeringPNG} />
                <Experience type={"Volunteering"} image={volunteeringPNG} />
                <Experience type={"Volunteering"} image={volunteeringPNG} />
            </div>
            <AddExperiencePopUp />
        </section>
    )
}

export default Experiences;