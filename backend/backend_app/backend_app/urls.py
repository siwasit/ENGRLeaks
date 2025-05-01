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

from ENGRBackend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello_world, name='hello_world'),
    path('lessons/', views.get_all_lessons, name='get_all_lessons'),
    path('users/', views.get_all_users, name='get_all_users'),
    path('enrollments/<int:user_id>/', views.get_enrollments_by_user, name='get_enrollments_by_user'),
    path('users/<int:user_id>/', views.get_user_byid, name='get_user_byid'),
    path('courses/', views.get_all_courses, name='get_all_courses'),
    path('courses/<int:course_id>/', views.get_course_byid, name='get_course_byid'),
    path('lessons/<int:lesson_id>/', views.get_lesson_byid, name='get_lesson_byid'),
    path('enrollments/', views.get_all_enrollments, name='get_all_enrollments'),
    path('lessons/course/<int:course_id>', views.get_all_lessons_by_course, name='get_all_lessons_by_course'),
]
