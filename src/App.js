// import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Account from './components/Account/Account';
import Welcome from './components/Welcome/Welcome';
import GoalsAndTasks from './components/GoalsAndTasks/GoalsAndTasks';
import Academics from './components/Academics/Academics';
import Experiences from './components/Experiences/Experiences';
import Publications from './components/Publications/Publications';
import Uploads from './components/Uploads/Uploads';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App center">
      <Navigation />
      <LoginSignup />
      <Account />
      <Welcome />
      <GoalsAndTasks />
      <Academics />
      <Experiences />
      <Publications />
      <Uploads />
      <Footer />
    </div>
  );
}

export default App;
