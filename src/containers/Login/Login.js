import { useContext, useReducer, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { loginReducer } from '../../reducers/LoginReducer';
import { UserActionsContext } from '../../context/UserContext';
import { apiRequest } from '../../utils/apiRequests';
import { Fade } from 'react-reveal';

const Login = () => {
    const { setIsLoggedIn, setUser } = useContext(UserActionsContext);

    const [state, dispatch] = useReducer(loginReducer, { email: '', password: '', isLoading: '', error: '', success: false, userData: {} });
    const {email, password, isLoading, error, success, userData} = state;

    // variables to redirect user back to homepage after login
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        let isMounted = true;

        // check that component is still mounted and set user if login is successful
        if (isMounted) {
            if (success) {
                setUser(userData);
                setIsLoggedIn(true);
            }
        }

        return () => {
            isMounted = false; // state will only be updated on mounted components
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    const handleClick = async (e) => {
        e.preventDefault();

        // make sure each field is valid before attempting to make api request
        if (email.trim() === '' || password.trim() === '') {
            dispatch({ type: 'error', payload: 'Please fill out every field.' })
        }
        else {
            dispatch({ type: 'login' });

            await apiRequest('login', 'POST', {email: email.toLowerCase(), password}, (data) => {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('currentUser', JSON.stringify(data.user))

                dispatch({ type: 'field', fieldName: 'userData', payload: data.user});
                dispatch({ type: 'success' });
    
                history.replace(from);
            }, (e) => { dispatch({ type: 'error', payload: e.error || 'An error occurred, please try again later.' }) });
        }
    }

    return (
        <article className="pa1 black-80 pr6 br bw1 b--black">
            <Fade top>
                <h1 className="f1 tc mb2">Login</h1>
            </Fade>
            <Fade delay={400}>
            <form acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Login</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="email">Email</label>
                        <input 
                            className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" 
                            type="email"
                            name="email"
                            value={email} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'email',
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
            </Fade>
        </article>
    )
}

export default Login;
