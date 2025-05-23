from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from ENGRBackend.views import user_views, course_views, enrollment_view

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/get_csrf/', user_views.get_csrf_token, name='get_csrf_token'),

    path('enrollments/', enrollment_view.get_all_enrollments, name='get_all_enrollments'),
    path('enrollments/<int:user_id>/', enrollment_view.get_enrollments_by_user, name='get_enrollments_by_user'),
    path('add_enroll/', enrollment_view.enroll, name='add_enrollment'),
    path('delete_enroll/', enrollment_view.unenroll, name='unenroll'),

    path('lessons/', course_views.get_all_lessons, name='get_all_lessons'),
    path('add_lesson/<str:course_id>', course_views.add_lesson, name='add_lesson'),
    path('lessons/<int:lesson_id>/', course_views.get_lesson_byid, name='get_lesson_byid'),
    path('lessons/course/<int:course_id>', course_views.get_all_lessons_by_course, name='get_all_lessons_by_course'),
    path('delete_lessons/<str:lesson_id>', course_views.delete_lesson_by_id, name='delete_lessons'),

    path('users/', user_views.get_all_users, name='get_all_users'),
    path('users/<int:user_id>/', user_views.get_user_byid, name='get_user_byid'),
    path('delete_user/<int:user_id>/', user_views.delete_user, name='delete_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
        # This serializer calls authenticate(username, password) 
        # If your /api/token/ endpoint is using JWT or similar stateless authentication, you can safely bypass CSRF for that specific endpoint. Let me know if you need more details on this!
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', user_views.RegisterView.as_view(), name='register'),
    path('api/update_user/<int:user_id>/', user_views.update_user, name='update_user'),

    path('courses/', course_views.get_all_courses, name='get_all_courses'),
    path('courses/<int:course_id>/', course_views.get_course_byid, name='get_course_byid'),
    path('add_course/', course_views.add_course, name='add_course'),
    path('delete_course/<int:course_id>/', course_views.delete_course, name='delete_course'),
    path('update_course/<int:course_id>/', course_views.update_course, name='update_course'),
]
