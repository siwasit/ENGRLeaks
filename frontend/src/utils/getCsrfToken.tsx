// export const getCsrfTokenFromCookies = () => {
//     if (typeof window === 'undefined') {
//         console.log('getCsrfTokenFromCookies: Not in a browser environment');
//         return null;
//     }

//     const cookies = document.cookie.split(';');
//     const cookieName = 'csrftoken';

//     for (const cookie of cookies) {
//         const [key, value] = cookie.trim().split('=');
//         if (key === cookieName) {
//             console.log(`CSRF token found: ${value}`);
//             return value;
//         }
//     }

//     console.log('CSRF token not found in cookies');
//     return null;
// };

//! Not a real function
export async function getCsrfTokenFromCookies() {
    const response = await fetch(`https://engrleaks-backend.onrender.com/api/get_csrf/`, {
      credentials: 'include',
      mode: 'cors'
    });
    return await response.json();
  }