from rest_framework import status
from rest_framework.test import APIClient
from unittest import TestCase
from rest_framework.test import APIRequestFactory
from api.views import UserViewSet 

class ApiRegisterTestCase(TestCase):
    def test01_create(self):
        view = UserViewSet.as_view('register')
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
        self.assertEqual(response.json()["status"], "ok")

    def test02_mail_used(self):
        client = APIClient()
        response = client.post(
            "/api/user/register",
            data={
                "nom" : "test_nom",
                "prenom" : "test_prenom",
                "email" : "email@test.com",
                "MotherPwd" : "testpwd",
            },
            follow=True
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["status"], "ok")
        
        response = client.post(
            "/api/user/register",
            data={
                "nom" : "test_nom2",
                "prenom" : "test_prenom2",
                "email" : "email@test.com",
                "MotherPwd" : "testpwd2",
            },
            follow=True
        )
        
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(response.json()["status"], "mail_used")
        
    

    def test03_login(self):
        client = APIClient()
        response = client.get("/api/user/login", follow=True)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        response = client.post(
            "/api/user/register",
            data={
                "nom": "test03",
                "prenom": "test03",
                "email": "test03@test.com",
                "MotherPwd": "password03",
            },
            follow=True
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["status"], "ok")
        response = client.post(
            "/api/user/login",
            data={"email": "test03@test.comwrong", "MotherPwd": "password03"},
            follow=True
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = client.post(
            "/api/user/login",
            data={"email": "test03@test.com", "MotherPwd": "password03Wrong"},
            follow=True
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = client.post(
            "/api/user/login", data={"email": "test03@test.com", "MotherPwd": "password03"},
            follow=True
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["status"], "ok")
        self.assertEqual(response.json()["donnes"]["nom"], "test03")
        self.assertEqual(response.json()["donnes"]["prenom"], "test03")
        self.assertEqual(response.json()["donnes"]["email"], "test03@test.com")
