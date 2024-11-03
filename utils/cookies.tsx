import Cookies from 'js-cookie';
import { API_BASE_URL } from './api';


// Function to set access and refresh tokens in cookies
export const setTokens = (accessToken: string, refreshToken: string) => {
    // Set tokens with an expiration time
    Cookies.set('access_token', accessToken, {
        expires: 1 / 48,
        secure: true,
        sameSite: 'Lax',
    });
    Cookies.set('refresh_token', refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'Lax',
    });
};


export const getTokens = () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    return { accessToken, refreshToken };
};

export const removeTokens = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
};

const getAccessToken = async () => {
    let accessToken = Cookies.get('access_token');

    if (!accessToken) {
        try {
            const response = await fetch(`${API_BASE_URL}api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: Cookies.get('refresh_token'),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }

            const data = await response.json();
            accessToken = data.access;

            // Set the new access token in cookies
            if (accessToken) {
                Cookies.set('access_token', accessToken, {
                    expires: 1 / 24,
                    secure: true,
                    sameSite: 'Lax',
                });
            }
        } catch (error) {
            // console.error('Error refreshing access token:', error);
            return null;
        }
    }

    return accessToken;
};
export default getAccessToken;