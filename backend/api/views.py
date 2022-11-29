from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import RegisterSerializer
from .serializer import LoginSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics

from .models import Users

class UserView(mixins.CreateModelMixin, generics.ListAPIView):
    class UserRegisterViewSet(mixins.CreateModelMixin, generics.GenericAPIView):

        queryset = Users.objects.all()
        serializer_class = RegisterSerializer

        def post(self, request, *args, **kwargs):
            self.data = request.data
            code = self.create(self, request, *args, **kwargs).status_code
            if code == 201:
                return Response(status=code, data={"status": "ok"})
            else:
                return Response(status=code, data={"status": "ko"})

        # def post(self, request):
            
        #     serialized = RegisterSerializer(data=request.data)
        #     serialized.is_valid(raise_exception=True)
        #     serialized.save()
        #     return Response({"status": "ok"})
        


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
            #request.data vs serializer.data
            return Response(data=request.data)


        # def get(self, request): 
        #     serialized = RegisterSerializer(data=request.data)
        #     serialized.is_valid(raise_exception=True)
        #     serialized.save()
        #     return Response({"status": "ok", "data": serialized.data})