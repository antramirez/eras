import { Switch, Route, BrowserRouter } from "react-router-dom";
import Welcome from './../Welcome/Welcome';
import GoalsAndTasks from './../GoalsAndTasks/GoalsAndTasks';
import Academics from './../Academics/Academics';
import Experiences from './../Experiences/Experiences';
import Publications from './../Publications/Publications';
import Uploads from './../Uploads/Uploads';

const Home = ({signedIn}) => {
    return (
        <>
            {signedIn && 
                <Welcome />
            }
            <GoalsAndTasks />
            <Academics />
            <Experiences />
            <Publications />
            <Uploads />

            {/* <Switch>
                <Route exact path={`/academics`}>
                    <Academics />
                </Route>
                <Route exact path="/experiences">
                    <Experiences />
                </Route>
                <Route exact path="/publications">
                    <Publications />
                </Route>
                <Route exact path="/uploads">
                    <Uploads />
                </Route>
            </Switch> */}
        </>
    )    
}

export default Home;