from rest_framework import serializers
from .models import Users

class RegisterSerializer(serializers.Serializer):
    nom = serializers.CharField(max_length=30) 
    prenom = serializers.CharField(max_length=30)
    email = serializers.EmailField(max_length=30)
    MotherPwd = serializers.CharField()

    #implémentation appelé par serializer.save() dans la fonction create de l'objet CreateModelMixin si la sérialization est valide
    def create(self, validated_data):

        #crée un user avec les data transmise
        return Users.objects.create(**validated_data)



class LoginSerializer(serializers.Serializer):
    nom = serializers.CharField(max_length=30) 
    prenom = serializers.CharField(max_length=30)
    email = serializers.CharField()
    MotherPwd = serializers.CharField()
