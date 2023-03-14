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

    # #implémentation appelé par serializer.save() dans la fonction create de l'objet CreateModelMixin si la sérialization est valide
    # def create(self, validated_data):

    #     #crée un user avec les data transmise
    #     return Users.objects.create(**validated_data)

    # def update(queryset, validated_data):

    #     #crée un user avec les data transmise
    #     return Users.objects.update(queryset, **validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    clearpwd = serializers.CharField()


class VerifMailSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()
