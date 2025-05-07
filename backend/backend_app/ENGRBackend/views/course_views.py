import json
from django.http import JsonResponse
from django.shortcuts import render
from ENGRBackend.models import Course, Lesson
from django.core.serializers import serialize

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