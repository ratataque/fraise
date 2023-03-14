from rest_framework import status
from rest_framework.test import APIClient
from unittest import TestCase


class ApiRegisterTestCase(TestCase):
    def test01_create(self):
        client = APIClient()
        response = client.post(
            "/api/register",
            data={
                "nom": "test01",
                "prenom": "test01",
                "email": "test01@test.com",
                "MotherPwd": "password01",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["status"], "ok")

    # pour Karl
    """
    def test02_cant_recreate_with_same_mail(self):
            client = APIClient()
            response = client.post(
                "/api/register",
                data={
                    "nom": "test02",
                    "prenom": "test02",
                    "email": "test02@test.com",
                    "MotherPwd": "password02",
                },
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json()["status"], "ok")
            response = client.post(
                "/api/register",
                data={
                    "nom": "test03",
                    "prenom": "test03",
                    "email": "test02@test.com",
                    "MotherPwd": "password03",
                },
            )
            self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
    """

    def test03_login(self):
        client = APIClient()
        response = client.get("/api/login")
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        response = client.post(
            "/api/register",
            data={
                "nom": "test03",
                "prenom": "test03",
                "email": "test03@test.com",
                "MotherPwd": "password03",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["status"], "ok")
        response = client.post(
            "/api/login",
            data={"email": "test03@test.comwrong", "MotherPwd": "password03"},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = client.post(
            "/api/login",
            data={"email": "test03@test.com", "MotherPwd": "password03Wrong"},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = client.post(
            "/api/login", data={"email": "test03@test.com", "MotherPwd": "password03"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["status"], "ok")
        self.assertEqual(response.json()["donnes"]["nom"], "test03")
        self.assertEqual(response.json()["donnes"]["prenom"], "test03")
        self.assertEqual(response.json()["donnes"]["email"], "test03@test.com")
