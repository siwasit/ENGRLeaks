# serializers.py
from rest_framework import serializers
from ENGRBackend.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'account_name', 'name', 'surname', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            account_name=validated_data['account_name'],
            name=validated_data['name'],
            surname=validated_data['surname'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user

