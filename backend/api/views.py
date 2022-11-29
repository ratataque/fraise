from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import RegisterSerializer
from .serializer import LoginSerializer

from rest_framework.response import Response
from rest_framework import mixins


class UserRegisterViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, APIView):

    def post(self, request):
        
        serialized = RegisterSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.save()
        return Response(serialized.data)
    
    # def list(self, request):
    #     serialized = RegisterSerializer(data=request.data)
    #     return Response({"status": "ok", "data": serialized.data})