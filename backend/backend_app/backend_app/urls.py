"""
URL configuration for backend_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from ENGRBackend.views import user_views, course_views, enrollment_view

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/get_csrf/', user_views.get_csrf_token, name='get_csrf_token'),

    path('lessons/', course_views.get_all_lessons, name='get_all_lessons'),
    path('users/', user_views.get_all_users, name='get_all_users'),
    path('enrollments/<int:user_id>/', enrollment_view.get_enrollments_by_user, name='get_enrollments_by_user'),
    path('users/<int:user_id>/', user_views.get_user_byid, name='get_user_byid'),
    path('courses/', course_views.get_all_courses, name='get_all_courses'),
    path('courses/<int:course_id>/', course_views.get_course_byid, name='get_course_byid'),
    path('lessons/<int:lesson_id>/', course_views.get_lesson_byid, name='get_lesson_byid'),
    path('enrollments/', enrollment_view.get_all_enrollments, name='get_all_enrollments'),
    path('lessons/course/<int:course_id>', course_views.get_all_lessons_by_course, name='get_all_lessons_by_course'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
        # This serializer calls authenticate(username, password) 
        # If your /api/token/ endpoint is using JWT or similar stateless authentication, you can safely bypass CSRF for that specific endpoint. Let me know if you need more details on this!
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', user_views.RegisterView.as_view(), name='register'),
    path('api/update_user/<int:user_id>/', user_views.update_user, name='update_user'),
]
