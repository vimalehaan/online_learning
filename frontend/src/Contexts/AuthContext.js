import React, {useState, useEffect, createContext} from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const token = Cookies.get("authToken");

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            console.log(decoded);
        }
    }, []);

    const logIn = (token) => {
        Cookies.set("authToken", token);
        console.log("Letoken", token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    }

    const logOut = ()  => {
        Cookies.remove("authToken");
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{ user, logIn, logOut, token }}>
            {children}
        </AuthContext.Provider>
    );
};
