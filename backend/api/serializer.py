from rest_framework import serializers
from .models import Users


class RegisterSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(required=False, max_length=30)
    prenom = serializers.CharField(required=False, max_length=30)
    email = serializers.EmailField(required=False, max_length=100)
    MotherPwd = serializers.CharField(required=False)

    class Meta:
        model = Users
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    clearpwd = serializers.CharField()


class VerifMailSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()

    
class AddPasswordSerializer(serializers.Serializer):
    website = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=100)
    password = serializers.CharField(max_length=100)
