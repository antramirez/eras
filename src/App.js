import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Home from './containers/Home/Home'
import LoginSignup from './containers/LoginSignup/LoginSignup';
import Account from './containers/Account/Account';
import Footer from './components/Footer/Footer';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  // temporary handler to change state to signed in
  const handleLogin = () => {
    setSignedIn(true)
  }

  return (
    <BrowserRouter>
      <div className="App center">
        <Navigation signedIn={signedIn} />
        <Switch>

          <Route exact path="/" >
            <Home signedIn={signedIn} />
          </Route>
          <Route  path="/account" >
            <Account signedIn={signedIn} />
          </Route>
          <Route  path="/signin" >
            <LoginSignup signedIn={signedIn} handleLogin={handleLogin} />        
          </Route>
          <Route  path="/signup" >
            <LoginSignup signedIn={signedIn} handleLogin={handleLogin} />        
          </Route>
          
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
