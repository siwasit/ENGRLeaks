import json
from django.http import JsonResponse
from django.shortcuts import render
from ENGRBackend.models import Course, Lesson
from django.core.serializers import serialize
from django.db.models import F

def get_all_courses(request):
    courses = Course.objects.all()
    courses_data = []
    for course in courses:
        course_data = {
            'id': course.id,
            'creator': course.creator.account_name,
            'course_name': course.course_name,
            # 'course_id': course.course_id,
            'course_description': course.description,
            'total_lessons': course.total_lessons,
            'total_exercises': course.total_exercises,
            'created_at': course.created_at.isoformat(),
        }
        courses_data.append(course_data)
    return JsonResponse(courses_data, safe=False, json_dumps_params={'ensure_ascii': False})

def get_course_byid(request, course_id):
    course = Course.objects.filter(id=course_id).annotate(
        creator_name=F('creator__account_name')
    ).values('id', 'creator_name', 'course_name', 'description', 'total_lessons', 'total_exercises', 'created_at').first()
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
            'creator': f"{lesson.creator.name} {lesson.creator.surname}",  # Assuming 'username' is a field in the User model
            'course': lesson.course.id,  # Assuming you want the course ID
            'lesson_name': lesson.lesson_name,
            'body': body_data,  # Parsed JSON from the body field
            'created_at': lesson.created_at.isoformat(),
        }

        # Append the formatted lesson data to the list
        lessons_data.append(lesson_data)
    
    # Return a JsonResponse with the lesson data
    return JsonResponse({'lessons': lessons_data}, status=200)

def add_course(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        course_name = data.get('course_name')
        description = data.get('description')
        total_lessons = data.get('total_lessons')
        creator_id = data.get('creator_id')

        # Create a new course instance
        new_course = Course(
            course_name=course_name,
            description=description,
            total_lessons=total_lessons,
            creator_id=creator_id
        )
        new_course.save()

        return JsonResponse({'message': 'Course created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def delete_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        course.delete()
        return JsonResponse({'message': 'Course deleted successfully'}, status=200)
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found'}, status=404)

def update_course(request, course_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        course_name = data.get('course_name')
        description = data.get('description')
        total_lessons = data.get('total_lessons')

        try:
            course = Course.objects.get(id=course_id)
            course.course_name = course_name
            course.description = description
            course.total_lessons = total_lessons
            course.save()

            return JsonResponse({'message': 'Course updated successfully'}, status=200)
        except Course.DoesNotExist:
            return JsonResponse({'error': 'Course not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def delete_lesson_by_id(request, lesson_id):
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        lesson.delete()
        return JsonResponse({'message': 'Lesson deleted successfully'}, status=200)
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Lesson not found'}, status=404)