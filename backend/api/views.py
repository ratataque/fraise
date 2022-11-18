from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import UserSerializer
from .models import Users

class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer