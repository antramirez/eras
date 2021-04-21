import { useState, useEffect, createContext } from 'react';

export const UserContext = createContext();
export const UserActionsContext = createContext();

function UserProvider({ children }) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [user, setUser] = useState({username: '', firstName: '', lastName: '', step1: 0, step2: 0, graduationYear: '', legalUS: '', needVisa: ''})

    useEffect(() => {
        const currUser = localStorage.getItem('currentUser');
        if (currUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(currUser));
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    return (
        <UserContext.Provider value={{ isLoggedIn, user }} >
            <UserActionsContext.Provider value={{ setIsLoggedIn, setUser }} >
                {children}
            </UserActionsContext.Provider>
        </UserContext.Provider>
    )
}
export default UserProvider;