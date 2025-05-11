import { API } from "./api";

export const getCsrfTokenFromCookies = () => {
    if (typeof window === 'undefined') {
        console.log('getCsrfToken: Not in a browser environment');
        return null;
    }

    const cookies = document.cookie.split(';');
    const cookieName = 'csrftoken';

    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === cookieName) {
            console.log(`CSRF token found`);
            return value;
        }
    }

    console.log('CSRF token not found in cookies');
    return null;
};

//! Not a real function
export async function getCsrfToken() {
    // api/get_csrf/
    const response = await fetch(API.csrfToken, {
      credentials: 'include',
      mode: 'cors'
    });
    return await response.json();
  }