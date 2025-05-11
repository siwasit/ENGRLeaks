export function getUserIdFromToken() {
    if (typeof window === 'undefined') {
        console.error('This code is running outside the browser environment');
        return null;
    }

    if (!window.localStorage) {
        console.error('LocalStorage is not available');
        return null;
    }

    const access_token = localStorage.getItem('access_token');
    //('Access token:', access_token);  // Check what's in localStorage
    if (!access_token) {
        return null;
    }

    try {
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const decodedUserID = JSON.parse(jsonPayload);
        return decodedUserID.user_id;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}
