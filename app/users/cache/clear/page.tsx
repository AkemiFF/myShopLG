"use client"

import { useEffect } from "react";

import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";

const ClearCachePage = () => {
    Cookies.remove("refresh_token_main");
    Cookies.remove("access_token_main");
    Cookies.remove("refresh_token");
    Cookies.remove("access_token");
    const { user, setUser } = useUser();
    setUser(null);
    const clearCookies = () => {
        const cookies = document.cookie.split("; ");
        cookies.forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
    };

    // Fonction pour effacer localStorage, sessionStorage et les cookies
    const clearAllCaches = () => {
        // Efface localStorage
        localStorage.clear();

        // Efface sessionStorage
        sessionStorage.clear();

        // Efface les cookies
        clearCookies();

        alert("Tous les caches (cookies, localStorage, sessionStorage) ont été effacés !");
    };

    // Efface les caches automatiquement à l'ouverture de la page
    useEffect(() => {
        clearAllCaches();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Effacer les caches</h1>
            <p>Les caches ont été effacés automatiquement.</p>
            <button onClick={clearAllCaches} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Effacer à nouveau
            </button>
        </div>
    );
};

export default ClearCachePage;
