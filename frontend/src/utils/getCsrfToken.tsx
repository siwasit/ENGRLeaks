export const getCsrfTokenFromCookies = (): string | null => {
    if (typeof document === 'undefined') {
        // Return null if running on the server side
        console.log('Document not found. Running on the server.');
        return null;
    }

    const cookieName = 'csrftoken=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length);
        }
    }
    return null;
};
