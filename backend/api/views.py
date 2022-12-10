
from .models import Users
from .serializer import *
from rest_framework import status
from rest_framework import viewsets

from rest_framework.decorators import action
from rest_framework.response import Response


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

        user = Users.create_user(nom=serializer.validated_data["nom"], prenom=serializer.validated_data["prenom"], email=serializer.validated_data["email"], clearpwd=serializer.validated_data["MotherPwd"])

        user.send_verif_mail()

        return Response(data={'status': "ok"}, status=status.HTTP_201_CREATED)
    
    # POST /api/user/login/
    @action(detail=False, methods=["post"])
    def login(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = Users.objects.get(email=serializer.validated_data["email"])
        except:
            return Response(data={'status': "ko"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.is_active == False:
                    return Response(data={'status': "unactive"}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(serializer.validated_data["clearpwd"]):
            return Response(data={'status': 'ok','donnes': {'email': user.email,
                                                            'nom': user.nom,
                                                            'prenom': user.prenom,
                                                            'uuid': user.uuid}}, status=status.HTTP_200_OK)
        else:
            return Response(data={'status': "ko"}, status=status.HTTP_401_UNAUTHORIZED)



    # GET /api/user/{XXXX}/verif-email/
    @action(detail=True, methods=["get"])
    def verif_mail(self, request, pk=None):
        data = {'uuid': pk}

        serializer = VerifMailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        try:
            user = Users.objects.get(uuid=serializer.validated_data['uuid'])
        except:
            return Response(data={'status': "ko"}, status=status.HTTP_401_UNAUTHORIZED)

        user.activate_email()

        return Response(data={'status': user.is_active})
        