from api.views import UsersView
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include, path

router = routers.DefaultRouter()
router.register("", UsersView, basename="userview")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]