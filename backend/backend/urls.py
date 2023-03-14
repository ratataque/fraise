from api.views import *
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include, path
from api.tests import ApiRegisterTestCase

router = routers.DefaultRouter()
router.register(r"user", UserViewSet, basename="register")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    # path('api/login', LoginViewSet.as_view()),
    # path('api/verifMail/<uuid:uuid>', VerifMailViewSet.as_view()),
]
