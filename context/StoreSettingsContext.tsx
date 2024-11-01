"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface StoreSettings {
    name: string;
    email: string;
    address: string;
    allowGuestCheckout: boolean;
    enableReviews: boolean;
    enableWishlist: boolean;
}

interface StoreSettingsContextType {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

const StoreSettingsContext = createContext<StoreSettingsContextType | undefined>(undefined);

export const StoreSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [storeSettings, setStoreSettings] = useState<StoreSettings>({
        name: 'ShopLg',
        email: 'contact@shoplg.com',
        address: '123 Rue du Commerce, 75001 Paris',
        allowGuestCheckout: true,
        enableReviews: true,
        enableWishlist: true,
    });

    return (
        <StoreSettingsContext.Provider value={{ storeSettings, setStoreSettings }}>
            {children}
        </StoreSettingsContext.Provider>
    );
};

export const useStoreSettings = (): StoreSettingsContextType => {
    const context = useContext(StoreSettingsContext);
    if (!context) {
        throw new Error('useStoreSettings must be used within a StoreSettingsProvider');
    }
    return context;
};
