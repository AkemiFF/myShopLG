"use client"
import { useStoreSettings } from '@/context/StoreSettingsContext';

export default function Layout() {
    const { storeSettings } = useStoreSettings();

    return (
        <div>
            <h1>{storeSettings.name}</h1>
            <p>{storeSettings.email}</p>
            {/* Autres contenus... */}
        </div>
    );
}
