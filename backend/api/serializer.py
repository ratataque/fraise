from rest_framework import serializers
from .models import Users


class RegisterSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(required=True, max_length=30)
    prenom = serializers.CharField(required=True, max_length=30)
    email = serializers.EmailField(required=True, max_length=100)
    MotherPwd = serializers.CharField(required=True)

    class Meta:
        model = Users
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    clearpwd = serializers.CharField()
    totp = serializers.CharField()


class VerifMailSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()

class SetTotpSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()
    secret_totp = serializers.CharField(max_length=200)

class AddPasswordSerializer(serializers.Serializer):
    website_uuid = serializers.UUIDField()
    uuid = serializers.UUIDField()
    website = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=200)
    password_chiffre = serializers.CharField(max_length=200)


class DeletePasswordSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()

class DeleteWebsiteSerializer(serializers.Serializer):
    website_uuid = serializers.UUIDField()