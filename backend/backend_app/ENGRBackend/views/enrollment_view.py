import json
from django.http import JsonResponse
from django.shortcuts import render
from ENGRBackend.models import Course, Enrollment, User
from django.core.serializers import serialize

def get_all_enrollments(request):
    # Fetch all enrollments and return as a list of dictionaries
    enrollments = Enrollment.objects.values('user__account_name', 'course__course_name', 'learned_lesson', 'course__id', 'user__id')
    
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
                'course_id': enrollment.course.id,
                'user_id': enrollment.user.id,
                'created_at': enrollment.created_at
            })
        
        # Return a JsonResponse with the serialized data
        return JsonResponse({'enrollments': enrollment_data}, status=200)

    except Enrollment.DoesNotExist:
        # If no enrollments are found for the user
        return JsonResponse({'error': 'No enrollments found for this user.'}, status=404)
    
def enroll(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id=data.get('user_id'))
        course = Course.objects.get(id=data.get('course_id'))
        learned_lesson = []

        # Create a new course instance
        new_enrollment = Enrollment(
            user=user,
            course=course,
            learned_lesson=learned_lesson,
        )
        new_enrollment.save()

        return JsonResponse({'message': 'Enrollment created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def unenroll(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            course_id = data.get('course_id')

            # Find the enrollment record
            enrollment = Enrollment.objects.get(user_id=user_id, course_id=course_id)
            
            # Delete the enrollment
            enrollment.delete()

            return JsonResponse({'message': 'Enrollment deleted successfully'}, status=200)
        except Enrollment.DoesNotExist:
            return JsonResponse({'error': 'Enrollment not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)