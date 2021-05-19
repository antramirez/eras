import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserContext, UserActionsContext } from './context/UserContext';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Home from './containers/Home/Home'
import LoginSignup from './containers/LoginSignup/LoginSignup';
import Account from './containers/Account/Account';
import Footer from './components/Footer/Footer';
import Page404 from './containers/Page404/Page404';

function App() {
  const { isLoggedIn }  = useContext(UserContext);
  const { setUser, setIsLoggedIn }  = useContext(UserActionsContext);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    // check if there's a user before setting isLoading to false
    const currUser = localStorage.getItem('currentUser');
    if (currUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(currUser));
    }

    setIsloading(false);
  }, [isLoggedIn])

  return (
    <>
      {isLoading && 
        <p className="pl3">Loading...</p>
      }
      {!isLoading && 
        <BrowserRouter>
        <div className="App center">
          <Navigation />
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route exact path="/account" >
              { !isLoggedIn ? <Redirect to="/signup" /> : <Account /> }
            </Route>
            <Route exact path="/signin" >
              { isLoggedIn ? <Redirect to="/" /> : <LoginSignup /> }
            </Route>
            <Route exact path="/signup" >
              { isLoggedIn ? <Redirect to="/" /> : <LoginSignup /> }
            </Route>
            <Route  path="*" >
              <Page404 />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter> 
      }
    </>
  );
}

export default App;
