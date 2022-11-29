from api.views import UserRegisterViewSet
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r"users", UserRegisterViewSet, basename="api_user")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', UserRegisterViewSet.as_view()),
]