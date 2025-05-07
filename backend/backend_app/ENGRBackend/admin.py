from django.contrib import admin

from ENGRBackend.models import User, Course, Lesson, Enrollment

# Register your models here.
admin.site.register(User)
admin.site.register(Course)  
admin.site.register(Lesson)
admin.site.register(Enrollment)