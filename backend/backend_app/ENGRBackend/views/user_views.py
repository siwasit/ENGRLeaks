from django.http import JsonResponse
from django.shortcuts import render
from ENGRBackend.models import User
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ENGRBackend.serializer import RegisterSerializer
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt

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

class RegisterView(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt  # Disable CSRF protection for this view only
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the user instance
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)