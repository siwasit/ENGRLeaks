export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://engrleaks-backend.onrender.com';

export const API = {
  csrfToken: `${API_BASE_URL}/api/get_csrf/`,

  // Auth
  register: `${API_BASE_URL}/api/register/`,
  token: `${API_BASE_URL}/api/token/`,
  refreshToken: `${API_BASE_URL}/api/token/refresh/`,

  // Enrollments
  allEnrollment: `${API_BASE_URL}/enrollments/`,
  enrollmentByUserId: (id: number | string) => `${API_BASE_URL}/enrollments/${id}/`,
  addEnroll: `${API_BASE_URL}/add_enroll/`,
  deleteEnroll: `${API_BASE_URL}/delete_enroll/`,

  // Lessons
  allLessons: `${API_BASE_URL}/lessons/`,
  addLesson: (courseId: string) => `${API_BASE_URL}/add_lesson/${courseId}`,
  lessonById: (lessonId: number) => `${API_BASE_URL}/lessons/${lessonId}/`,
  lessonsByCourseId: (courseId: number) => `${API_BASE_URL}/lessons/course/${courseId}`,
  deleteLesson: (lessonId: string) => `${API_BASE_URL}/delete_lessons/${lessonId}`,

  // Users
  allUsers: `${API_BASE_URL}/users/`,
  userById: (userId: number) => `${API_BASE_URL}/users/${userId}/`,
  deleteUser: (userId: number) => `${API_BASE_URL}/delete_user/${userId}/`,
  updateUser: (userId: number) => `${API_BASE_URL}/api/update_user/${userId}/`,

  // Courses
  allCourses: `${API_BASE_URL}/courses/`,
  courseById: (courseId: number) => `${API_BASE_URL}/courses/${courseId}/`,
  addCourse: `${API_BASE_URL}/add_course/`,
  deleteCourse: (courseId: number) => `${API_BASE_URL}/delete_course/${courseId}/`,
  updateCourse: (courseId: number) => `${API_BASE_URL}/update_course/${courseId}/`,
};
