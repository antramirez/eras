import { useContext, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { loginReducer } from '../../reducers/LoginReducer';
import { UserActionsContext } from '../../context/UserContext';
import { apiRequest } from '../../utils/apiRequests';

const Login = () => {
    const { setIsLoggedIn, setUser } = useContext(UserActionsContext);

    const [state, dispatch] = useReducer(loginReducer, { username: '', password: '', isLoading: '', error: '' });
    const {username, password, isLoading, error} = state;

    // variables to redirect user back to homepage after login
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleClick = (e) => {
        e.preventDefault();

        // make sure each field is valid before attempting to make api request
        if (username === '' || password === '') {
            dispatch({ type: 'error', payload: 'Please fill out every field.' })
        }
        else {
            dispatch({ type: 'login' });

            apiRequest('login', 'POST', {username, password}, (data) => {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('currentUser', JSON.stringify(data.user))

                setUser(data.user);
                setIsLoggedIn(true);
                dispatch({ type: 'success' });
    
                history.replace(from);
            }, (e) => dispatch({ type: 'error', payload: 'Incorrect username/password.' }));
        }
    }

    return (
        <article className="pa1 black-80 pr6 br bw1 b--black">
            <h1 className="f1 tc mb2">Login</h1>
            <form acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Login</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="username">Username</label>
                        <input 
                            className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" 
                            type="text"
                            name="username"
                            value={username} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'username',
                                    payload: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" 
                            type="password"
                            name="password"
                            value={password} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'password',
                                    payload: e.target.value
                                })
                            }
                        />
                    </div>
                </fieldset>
                <div className="mt3 tc"><input disabled={isLoading} className="b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" value={isLoading ? "Logging in..." : "Login"} onClick={handleClick}/></div>
                <div><p className="f5 b red tc">{error}</p></div>
            </form>
        </article>
    )
}

export default Login;
