export const getCsrfTokenFromCookies = () => {
    const cookieName = 'csrftoken=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        while (cookie.startsWith(' ')) {
            cookie = cookie.substring(1);
        }
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length);
        }
    }
    return null;
};
