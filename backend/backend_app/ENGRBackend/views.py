import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from ENGRBackend.models import User, Course, Lesson, Enrollment
from django.core.serializers import serialize

def hello_world(request):
    return HttpResponse("Hello ENGRLeaks!")

def get_all_courses(request):
    courses = Course.objects.all()
    courses_data = []
    for course in courses:
        course_data = {
            'id': course.id,
            'creator': course.creator.account_name,
            'course_name': course.course_name,
            'total_lessons': course.total_lessons,
            'created_at': course.created_at.isoformat(),
        }
        courses_data.append(course_data)
    return JsonResponse(courses_data, safe=False, json_dumps_params={'ensure_ascii': False})

def get_course_byid(request, course_id):
    course = Course.objects.filter(id=course_id).values('id', 'creator', 'course_name', 'total_lessons', 'created_at').first()
    if course:
        return JsonResponse(course, status=200)
    else:
        return JsonResponse({'error': 'Course not found'}, status=404)

def get_all_lessons(request):
    # Query all lessons
    lessons = Lesson.objects.all()

    # Prepare a list to hold the formatted lesson data
    lessons_data = []

    # Iterate through each lesson and format the data
    for lesson in lessons:
        # Parse the body field (it's a string containing JSON)
        body_data = json.loads(lesson.body)

        # Create a structured dictionary to return
        lesson_data = {
            'id': lesson.id,
            'course': lesson.course.id,  # Assuming you want the course ID
            'lesson_name': lesson.lesson_name,
            'body': body_data,  # Parsed JSON from the body field
            'created_at': lesson.created_at.isoformat(),
        }

        # Append the formatted lesson data to the list
        lessons_data.append(lesson_data)

    # Return the data as JSON
    return JsonResponse(lessons_data, safe=False, json_dumps_params={'ensure_ascii': False})

def get_lesson_byid(request, lesson_id):
    lesson = Lesson.objects.filter(id=lesson_id).first()
    if lesson:
        body_data = json.loads(lesson.body)

        # Create a structured dictionary to return
        lesson_data = {
            'id': lesson.id,
            'course': lesson.course.id,  # Assuming you want the course ID
            'lesson_name': lesson.lesson_name,
            'body': body_data,  # Parsed JSON from the body field
            'created_at': lesson.created_at.isoformat(),
        }
        return JsonResponse(lesson_data, status=200)
    else:
        return JsonResponse({'error': 'Lesson not found'}, status=404)

def get_all_lessons_by_course(request, course_id):
    # Fetch all lessons for the given course ID
    lessons = Lesson.objects.filter(course_id=course_id).all()

    lessons_data = []

    # Iterate through each lesson and format the data
    for lesson in lessons:
        # Parse the body field (it's a string containing JSON)
        body_data = json.loads(lesson.body)

        # Create a structured dictionary to return
        lesson_data = {
            'id': lesson.id,
            'course': lesson.course.id,  # Assuming you want the course ID
            'lesson_name': lesson.lesson_name,
            'body': body_data,  # Parsed JSON from the body field
            'created_at': lesson.created_at.isoformat(),
        }

        # Append the formatted lesson data to the list
        lessons_data.append(lesson_data)
    
    # Return a JsonResponse with the lesson data
    return JsonResponse({'lessons': lessons_data}, status=200)

def get_all_users(request):
    # Fetch all users and return as a list of dictionaries
    users = User.objects.values('id', 'email', 'account_name', 'name', 'surname', 'role', 'created_at')
    
    # Return a JsonResponse with the user data
    return JsonResponse({'users': list(users)}, status=200)

def get_user_byid(request, user_id):
    user = User.objects.filter(id=user_id).values('id', 'email', 'account_name', 'name', 'surname', 'role', 'created_at').first()
    if user:
        return JsonResponse(user, status=200)
    else:
        return JsonResponse({'error': 'User not found'}, status=404)
    
def get_all_enrollments(request):
    # Fetch all enrollments and return as a list of dictionaries
    enrollments = Enrollment.objects.values('user__account_name', 'course__course_name', 'learned_lesson')
    
    # Return a JsonResponse with the enrollment data
    return JsonResponse({'enrollments': list(enrollments)}, status=200)

def get_enrollments_by_user(request, user_id):
    try:
        # Fetch all enrollments for the user
        enrollments = Enrollment.objects.filter(user_id=user_id)
        
        # Serialize the data (you can use Django's serializers or manually create a list)
        enrollment_data = []
        for enrollment in enrollments:
            enrollment_data.append({
                'user': enrollment.user.account_name,
                'course': enrollment.course.course_name,
                'learned_lesson': enrollment.learned_lesson,
            })
        
        # Return a JsonResponse with the serialized data
        return JsonResponse({'enrollments': enrollment_data}, status=200)

    except Enrollment.DoesNotExist:
        # If no enrollments are found for the user
        return JsonResponse({'error': 'No enrollments found for this user.'}, status=404)