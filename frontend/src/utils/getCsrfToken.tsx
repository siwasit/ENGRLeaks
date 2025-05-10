export const getCsrfTokenFromCookies = () => {
    if (typeof window === 'undefined') {
        console.log('getCsrfTokenFromCookies: Not in a browser environment');
        return null;
    }

    const cookies = document.cookie.split(';');
    const cookieName = 'csrftoken';

    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === cookieName) {
            console.log(`CSRF token found: ${value}`);
            return value;
        }
    }

    console.log('CSRF token not found in cookies');
    return null;
};
