from rest_framework import status
from rest_framework.test import APIClient
from unittest import TestCase
from rest_framework.test import APIRequestFactory
from api.views import UserViewSet 
from .models import Users

class ApiRegisterTestCase(TestCase):
    def test01_create(self):
        view = UserViewSet.as_view({"post": "register"})
        client = APIRequestFactory()

        request = client.post(
            "/api/user/register",
            data={
                "nom": "test01",
                "prenom": "test01",
                "email": "test01@test.com",
                "MotherPwd": "password01",
            },
            follow=True
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "ok")
        


    def test02_mail_used(self):
        view = UserViewSet.as_view({"post": "register"})
        client = APIRequestFactory()

        request = client.post(
            "/api/user/register",
            data={
                "nom" : "test02",
                "prenom" : "test02",
                "email" : "test02@test.com",
                "MotherPwd" : "password02",
            },
            follow=True
        )
        response = view(request)       
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "ok")
        
        request = client.post(
            "/api/user/register",
            data={
                "nom" : "test02",
                "prenom" : "test02",
                "email" : "test02@test.com",
                "MotherPwd" : "password02",
            },
            follow=True
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(response.data["status"], "mail_used")
        
    

    def test03_login_unactive(self):
        view = UserViewSet.as_view({"post": "login"})
        client = APIRequestFactory()

        request = client.get("/api/user/login", follow=True)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        request = client.post(
            "/api/user/login",
            data={"email": "wrong.test01@test.com", "clearpwd": "password01"},
            follow=True
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["status"], "ko")

        request = client.post(
            "/api/user/login",
            data={"email": "test01@test.com", "clearpwd": "password01_wrong"},
            follow=True
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["status"], "unactive")

        request = client.post(
            "/api/user/login", data={"email": "test01@test.com", "clearpwd": "password01"},
            follow=True
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["status"], "unactive")


    def test04_verif_mail(self):
        client = APIClient()

        response = client.get(f"/api/user/{Users.objects.get(email='test01@test.com').uuid}/verif_mail/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["status"], True)


    def test05_login(self):
        view = UserViewSet.as_view({"post": "login"})
        client = APIRequestFactory()

        request = client.get("/api/user/login", follow=True)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        request = client.post(
            "/api/user/login",
            data={"email": "test01@test.com", "clearpwd": "password01"},
            follow=True
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "ok")
        self.assertEqual(response.data["donnes"]["nom"], "test01")
        self.assertEqual(response.data["donnes"]["prenom"], "test01")
        self.assertEqual(response.data["donnes"]["email"], "test01@test.com")