import email
from .models import Users
from .serializer import RegisterSerializer
from .serializer import LoginSerializer
from rest_framework import status
from rest_framework import viewsets

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
import uuid
import hashlib
import re
from rest_framework.exceptions import APIException



class UserViewSet(viewsets.ViewSet):
    
    # initialise le serializer pour permettre a la fonction create de CreateModelMixin de serializer les donnée en fonction des models
    # serializer_class = RegisterSerializer

    #override de la fonction post pour ajouter la méthode post au methode authoriser sur l'api register
    # POST /api/user/register/
    @action(detail=False, methods=["post"])
    def register(self, request):

        #transfert des données de la requete aux donnée de l'objets CreateModelMixin prcq il veut que ça alors qu'on transmet l'objet requete dans la fonction create mais bon on y peut rien c'est codé avec le cul #mathis

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        Users.create_user(nom=serializer.validated_data["nom"], prenom=serializer.validated_data["prenom"], email=serializer.validated_data["email"], clearpwd=serializer.validated_data["MotherPwd"])

        return Response(data={'status': "ok"}, status=status.HTTP_201_CREATED)
    
    # POST /api/user/login/
    @action(detail=False, methods=["post"])
    def login(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = Users.objects.get(email=serializer.validated_data["email"])

        if user.check_password(serializer.validated_data["clearpwd"]):
            return Response(data={'status': "ok"})
        else:
            raise APIException.AuthenticationFailed()


    # POST /api/user/verif-email/{XXXX}/
    @action(detail=True, methods=["get"])
    # /api/users
    def verif_mail(self, request, pk=None):
        pass



class LoginViewSet(mixins.ListModelMixin, generics.GenericAPIView):
    
    queryset = Users.objects.all() 
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True) 
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        #request.data(les données de la request) vs serializer.data(les données de la db)

        for user in serializer.data:

            sel = user['MotherPwd'][0:len(user['MotherPwd'])//2]
            poivre = open("/fraise/backend/api/poivre.txt", "r").read()
            mdp  = request.data["MotherPwd"]
            securisation = sel+mdp+poivre
            securise = hashlib.sha256(securisation.encode('utf-8')).hexdigest()
            mdpSecuriser = sel+securise


            if user['email'] == request.data['email'] and user['MotherPwd'] == mdpSecuriser:
                if user['is_active'] == False:
                    return Response(data={'status': "unactive"}, status=status.HTTP_401_UNAUTHORIZED)

                return Response(data={'status': 'ok','donnes': {'email': user['email'],
                                                                    'nom': user['nom'],
                                                                    'prenom': user['prenom'],
                                                                    'uuid': user['uuid']}}, status=status.HTTP_200_OK)
                
        return Response(data={'status': "ko"}, status=status.HTTP_401_UNAUTHORIZED)


class VerifMailViewSet(mixins.UpdateModelMixin, generics.GenericAPIView):

    serializer_class = RegisterSerializer
    
    # def get(self, request, uuid):
    #     queryset = Users.objects.get(uuid=uuid) 

    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(queryset)
    #     return Response(serializer.data)

    def put(self, request,  uuid, **keyargs):
        queryset = Users.objects.get(uuid=uuid)

        print(queryset)
        serializer = RegisterSerializer(queryset, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)