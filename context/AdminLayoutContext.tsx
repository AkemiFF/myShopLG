"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserInfo {
    id: number;
    username: string;
    email: string;
}

interface AdminLayoutContextType {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo) => void;
}

const AdminLayoutContext = createContext<AdminLayoutContextType | undefined>(undefined);

export const AdminLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>({ id: 0, username: '', email: '' });

    useEffect(() => {
        const savedUserInfo = localStorage.getItem('user_info');
        savedUserInfo ? JSON.parse(savedUserInfo) : null;
    }, []);

    const saveUserInfo = (info: UserInfo) => {
        setUserInfo(info);
        localStorage.setItem('user_info', JSON.stringify(info));
    };

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('user_info', JSON.stringify(userInfo));
        }
    }, [userInfo]);

    return (
        <AdminLayoutContext.Provider value={{ userInfo, setUserInfo: saveUserInfo }}>
            {children}
        </AdminLayoutContext.Provider>
    );
};

export const useAdminLayoutContext = () => {
    const context = useContext(AdminLayoutContext);
    if (!context) {
        throw new Error('useAdminLayoutContext must be used within an AdminLayoutProvider');
    }
    return context;
};
