from api.views import *
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include, path
from api.tests import ApiRegisterTestCase
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r"user", UserViewSet, basename="register")
router.register(r"password", PasswordViewSet, basename="create")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/login', LoginViewSet.as_view()),
    # path('api/verifMail/<uuid:uuid>', VerifMailViewSet.as_view()),
]
