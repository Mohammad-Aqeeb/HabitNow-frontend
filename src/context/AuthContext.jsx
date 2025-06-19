"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEfect Called")  
        async function fetchToken() {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (token) {
                setIsAuthenticated(true);
            }
            setLoading(false);    
        }
        fetchToken();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);