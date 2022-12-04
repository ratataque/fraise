from .models import Users
from .serializer import RegisterSerializer
from .serializer import LoginSerializer
from rest_framework import status

from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics




class UserView(mixins.CreateModelMixin, generics.ListAPIView):
    class UserRegisterViewSet(mixins.CreateModelMixin, generics.GenericAPIView):
        
        # initialise le serializer pour permettre a la fonction create de CreateModelMixin de serializer les donnée en fonction des models
        serializer_class = RegisterSerializer

        #override de la fonction post pour ajouter la méthode post au methode authoriser sur l'api register
        def post(self, request, *args, **kwargs):

            #transfert des données de la requete aux donnée de l'objets CreateModelMixin prcq il veut que ça alors qu'on transmet l'objet requete dans la fonction create mais bon on y peut rien c'est codé avec le cul #mathis
            self.data = request.data

            #create renvoie un un objet reponse, c'est qu'on vas return aussi mais dans la réponse de create t'as les info de l'utilisateur et ça on veut pas alors 
            # on check le code de la réponse si c'est 201 CREATED alors on envoie une réponse avec status ok en data qu'on checkera coté client pour validé la creation
            code = self.create(self, request, *args, **kwargs).status_code
            if code == 201:
                return Response(status=code, data={"status": "ok"})
            else:
                return Response(status=code, data={"status": "ko"})


    class LoginViewSet(mixins.ListModelMixin, generics.GenericAPIView):
        
        queryset = Users.objects.all()
        serializer_class = RegisterSerializer

        def post(self, request, *args, **kwargs):
            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            #request.data(les données de la requete) vs serializer.data(les données de la db)
            
            for user in serializer.data:
                if user['email'] == request.data['email'] and user['MotherPwd'] == request.data['MotherPwd']:
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