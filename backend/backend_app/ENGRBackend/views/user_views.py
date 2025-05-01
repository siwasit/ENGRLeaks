from django.http import JsonResponse
from django.shortcuts import render
from ENGRBackend.models import User
from django.core.serializers import serialize

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