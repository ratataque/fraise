from api.views import TrucViewSet
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'trucs', TrucViewSet, basename="truc")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/truc', include(router.urls)),
]