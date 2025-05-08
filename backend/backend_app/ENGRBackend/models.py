from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, account_name, name, surname, role, password=None):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, account_name=account_name, name=name, surname=surname, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, account_name, name, surname, role, password=None):
        user = self.create_user(email, account_name, name, surname, role, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    account_name = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    role = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Staff user can access the admin site
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # Use email as the unique identifier for authentication
    REQUIRED_FIELDS = ['account_name', 'name', 'surname', 'role']  # Fields required for creating a superuser

    def __str__(self):
        return f"{self.name} {self.surname} ({self.email}) ({self.role})"

    def get_full_name(self):
        return f"{self.name} {self.surname}"

    def get_short_name(self):
        return self.name

class Course(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_courses')
    course_name = models.CharField(max_length=255)
    description = models.TextField()
    total_lessons = models.IntegerField()
    total_exercises = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default='Unenroll')  # e.g., 'draft', 'published'
    created_at = models.DateTimeField(auto_now_add=True)

    # def save(self, *args, **kwargs):
    #     if self.creator.role != "Teacher":
    #         raise ValueError("Only users with role 'Teacher' can create courses.")
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.course_name


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    lesson_name = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course} - {self.lesson_name}"


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    learned_lesson = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')  # optional: to prevent duplicate enrollments

    def __str__(self):
        return f"{self.user} enrolled in {self.course}"
