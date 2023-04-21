from typing import Any, Dict, Optional, Type, TypeVar
from rest_framework import serializers
from .models import Users

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings
if api_settings.ROTATE_REFRESH_TOKENS:
    from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
    from rest_framework_simplejwt.authentication import JWTAuthentication
    from datetime import datetime

    if api_settings.BLACKLIST_AFTER_ROTATION:
        from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken


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


class TokenRefreshSerializerCustom(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField(read_only=True)
    token_class = RefreshToken
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        refresh = self.token_class(attrs["refresh"])
        data = {"access": str(refresh.access_token)}
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass
            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            auth = JWTAuthentication()
            user = auth.get_user(validated_token=refresh)
            OutstandingToken.objects.create(
                user=user,
                jti=refresh[api_settings.JTI_CLAIM],
                token=str(refresh),
                created_at=datetime.fromtimestamp(refresh["iat"]),
                expires_at=datetime.fromtimestamp(refresh["exp"])
            )

            data["refresh"] = str(refresh)

        return data
