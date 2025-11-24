import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        const adminData = localStorage.getItem('isAdmin');
        if (adminData === 'true') {
            setIsAdmin(true);
        }

        const cartData = localStorage.getItem('cart');
        if (cartData) {
            let parsed = [];
            try { parsed = JSON.parse(cartData); } catch { parsed = []; }
            if (Array.isArray(parsed)) setCartItems(parsed);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const adminLogin = (username, password) => {
        const envUser = import.meta.env.VITE_ADMIN_USER;
        const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

        if (username === envUser && password === envPass) {
            setIsAdmin(true);
            localStorage.setItem('isAdmin', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        setUser(null);
        setIsAdmin(false);
    };

    const addToCart = (item) => {
        const next = [...cartItems, item];
        setCartItems(next);
        localStorage.setItem('cart', JSON.stringify(next));
    };

    const removeFromCart = (index) => {
        const next = [...cartItems];
        next.splice(index, 1);
        setCartItems(next);
        localStorage.setItem('cart', JSON.stringify(next));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, adminLogin, cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </AuthContext.Provider>
    );
};
