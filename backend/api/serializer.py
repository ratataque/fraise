from rest_framework import serializers
from .models import Users

class RegisterSerializer(serializers.Serializer):
    nom = serializers.CharField(max_length=30) 
    prenom = serializers.CharField(max_length=30)
    email = serializers.EmailField(max_length=30)
    MotherPwd = serializers.CharField()

    # def create(self, validated_data):
    #     """
    #     Create and return a new `Snippet` instance, given the validated data.
    #     """
    #     return Users.objects.create(**validated_data)
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Users.objects.create(**validated_data)



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
