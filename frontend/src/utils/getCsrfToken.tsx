import { API } from "./api";

export const getCsrfTokenFromCookies = () => {
    if (typeof window === 'undefined') {
        //('getCsrfToken: Not in a browser environment');
        return null;
    }

    const cookies = document.cookie.split(';');
    const cookieName = 'csrftoken';

    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === cookieName) {
            //(`CSRF token found: ${value}`);
            return value;
        }
    }

    //('CSRF token not found in cookies');
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