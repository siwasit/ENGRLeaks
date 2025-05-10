// import axios from "axios";
// import { getCsrfTokenFromCookies } from "./getCsrfToken";
// import { getUserIdFromToken } from "./getUserIdFromToken";

// const addLesson = async (courseId: string, lessonName: string, body: string): Promise<number | null> => {
//   const csrfToken = getCsrfTokenFromCookies(); // Fetch CSRF token
//   console.log(csrfToken)
//   if (!csrfToken) {
//     alert("CSRF token not found.");
//     return null;
//   }

//   const userId = await getUserIdFromToken();

//   if (!userId) {
//     alert("User ID not found.");
//     return null;
//   }

//   try {
//     const response = await axios.post(
//       `https://engrleaks-backend.onrender.com/add_lesson/${courseId}`,
//       {
//         lesson_name: lessonName,
//         body: body,
//         user_id: userId,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrfToken, // Include CSRF token
//         },
//         withCredentials: true, // Include cookies in the request
//       }
//     );

//     if (response.status === 201) {
//       // alert("Lesson created successfully!");
//     }
//     return response.status; // Return the status code
//   } catch (error) {
//     console.error("Error creating lesson:", error);
//     alert("Failed to create lesson. Please try again.");
//     return null; // Return null in case of an error
//   }
// };

// export default addLesson;

import axios from "axios";
import { getCsrfTokenFromCookies } from "./getCsrfToken";
import { getUserIdFromToken } from "./getUserIdFromToken";

const addLesson = async (courseId: string, lessonName: string, body: string): Promise<number | null> => {
  try {
    // Await the CSRF token promise
    const csrfResponse = await getCsrfTokenFromCookies();
    const csrfToken = csrfResponse.token; // Assuming the response has a 'token' property
    
    if (!csrfToken) {
      alert("CSRF token not found.");
      return null;
    }

    const userId = await getUserIdFromToken();

    if (!userId) {
      alert("User ID not found.");
      return null;
    }

    const response = await axios.post(
      `https://engrleaks-backend.onrender.com/add_lesson/${courseId}`,
      {
        lesson_name: lessonName,
        body: body,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Now using the resolved token string
        },
        withCredentials: true,
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error creating lesson:", error);
    alert("Failed to create lesson. Please try again.");
    return null;
  }
};

export default addLesson;