"use client";
import { getTokens } from '@/utils/cookies';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
    first_name: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);


    // Load user from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Check if refresh token is present in cookies, otherwise log out user
    useEffect(() => {
        const checkRefreshToken = async () => {
            const refreshToken = await getTokens();
            if (!refreshToken) {
                setUser(null); // Log out user
            }
        };

        // Run the check on component mount
        checkRefreshToken();

        // Optional: You can set up an interval to re-check periodically if needed
        const interval = setInterval(checkRefreshToken, 60000); // Every 60 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
