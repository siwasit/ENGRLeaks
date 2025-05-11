import axios from "axios";
import { getCsrfTokenFromCookies } from "./getCsrfToken";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { API } from "./api";

const addLesson = async (courseId: string, lessonName: string, body: string): Promise<number | null> => {
  const csrfToken = getCsrfTokenFromCookies(); // Fetch CSRF token
  //(csrfToken)
  if (!csrfToken) {
    alert("CSRF token not found.");
    return null;
  }

  const userId = await getUserIdFromToken();

  if (!userId) {
    alert("User ID not found.");
    return null;
  }

  try {
    const response = await axios.post(
      // add_lesson/${courseId}
      API.addLesson(courseId),
      {
        lesson_name: lessonName,
        body: body,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Include CSRF token
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    if (response.status === 201) {
      // alert("Lesson created successfully!");
    }
    return response.status; // Return the status code
  } catch (error) {
    console.error("Error creating lesson:", error);
    alert("Failed to create lesson. Please try again.");
    return null; // Return null in case of an error
  }
};

export default addLesson;
