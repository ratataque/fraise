from .models import Users, Password
from .serializer import *
from rest_framework import status
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_protect 
from django.utils.decorators import method_decorator

from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import IntegrityError
import rest_framework_simplejwt.views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from django.forms.models import model_to_dict
from django.db.models import Prefetch



class UserViewSet(viewsets.ViewSet):

    # initialise le serializer pour permettre a la fonction create de CreateModelMixin de serializer les donnée en fonction des models
    # serializer_class = RegisterSerializer

    # override de la fonction post pour ajouter la méthode post au methode authoriser sur l'api register
    # POST /api/user/register/
    @action(detail=False, methods=["post"])
    def register(self, request):

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        user = Users.create_user(
            nom=serializer.validated_data["nom"],
            prenom=serializer.validated_data["prenom"],
            email=serializer.validated_data["email"],
            clearpwd=serializer.validated_data["MotherPwd"],
        )
        
        if type(user) == IntegrityError :
            return Response(data={"status": "mail_used"}, status=status.HTTP_409_CONFLICT)                                 
            
        else :
            user.send_verif_mail()
            return Response(data={"status": "ok"}, status=status.HTTP_201_CREATED)




    # POST /api/user/login/
    @action(detail=False, methods=["post"])
    @method_decorator(csrf_protect)
    def login(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = Users.objects.prefetch_related("passwords").get(email=serializer.validated_data["email"])
        # try:
        # except:
        #     return Response(data={"status": "ko"}, status=status.HTTP_401_UNAUTHORIZED)                                 

        if user.is_active == False:
            return Response(
                data={"status": "unactive"}, status=status.HTTP_401_UNAUTHORIZED
            )

        if user.check_password(serializer.validated_data["clearpwd"]):

            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)

            return Response(
                data={
                    "status": "ok",
                    "donnes": {
                        "email": user.email,
                        "nom": user.nom,
                        "prenom": user.prenom,
                        "passwords": {password.website: {password.email: password.password} for password in user.passwords.all()},
                        "access_token": str(refresh),
                        "refresh_token": str(refresh.access_token),
                    },
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(data={"status": "ko"}, status=status.HTTP_401_UNAUTHORIZED)

    # GET /api/user/{XXXX}/verif_mail/
    @action(detail=True, methods=["get"])
    def verif_mail(self, request, pk=None):
        data = {"uuid": pk}

        serializer = VerifMailSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        try:
            user = Users.objects.get(uuid=serializer.validated_data["uuid"])
        except: 
            return Response(data={"status": "ko"}, status=status.HTTP_401_UNAUTHORIZED)

        user.activate_email()

        return Response(data={"status": user.is_active})



#------------------------------------password actions --------------------------------------------------------

