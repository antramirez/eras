import './Navigation.css';
import userPNG from './../../assets/user.png';

const Navigation = () => {
    return (
        // <header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        // <nav className="f6 fw6 ttu">
        //     <div classNameName="links flex justify-between">
        //         <a className="link dim white dib mr3" href="#academics" title="Academics">Academics</a>
        //         <a className="link dim white dib mr3" href="#experiences" title="Experiences">Experiences</a>
        //         <a className="link dim white dib mr3" href="#publications" title="Publications">Publications</a>
        //         <a className="link dim white dib mr3" href="#uploads" title="Uploads">Uploads</a>
        //         {/* <a className="link dim white dib mr3" href="#account" title="Account"><img src={userPNG} alt="User icon"/></a> */}
        //     </div>
            
        // </nav>
        // </header>

<header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l top-0">
<nav className="f6 fw6 ttu tracked flex justify-end">
    <a className="link dim white dib mr3" href="#academics" title="Academics">Academics</a>
    <a className="link dim white dib mr3" href="#experiences" title="Experiences">Experiences</a>
    <a className="link dim white dib mr3" href="#publications" title="Publications">Publications</a>
    <a className="link dim white dib mr3" href="#uploads" title="Uploads">Uploads</a>
    <a className="link dim white dib mr3" href="#account" title="Account"><img src={userPNG} alt="User icon"/></a>
</nav>
</header>

    )
}

export default Navigation;