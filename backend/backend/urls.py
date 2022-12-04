from api.views import UserView
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include, path
from api.tests import ApiRegisterTestCase

# router = routers.DefaultRouter()
# router.register(r"users", UserView, basename="api_user")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', UserView.UserRegisterViewSet.as_view()),
    path('api/login', UserView.LoginViewSet.as_view()), 
    path('api/verifMail/<uuid:uuid>', UserView.VerifMailViewSet.as_view()),
]