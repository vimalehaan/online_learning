import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);

        const now = Date.now() / 1000;
        return decoded.exp < now;
    } catch (err) {

        console.error('Error decoding token:', err);
        return true;
    }
};
