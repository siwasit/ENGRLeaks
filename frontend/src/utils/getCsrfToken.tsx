export const getCsrfTokenFromCookies = () => {
    const cookieName = 'csrftoken=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
};

