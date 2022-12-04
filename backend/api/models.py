from datetime import date
from django.db import models
import django.contrib.auth
from django.db import models, IntegrityError
from django.utils import timezone

# Create your models here.
class Users(models.Model):
    uuid = models.TextField(default="rien")
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    MotherPwd = models.TextField()
    is_active = models.BooleanField(default=False)
    
    # @classmethod
    # def create(nom, prenom, email, MotherPwd):
    #     Users.save()
    #     return Users
    def __str__(self):
        return self.uuid




class Password(models.Model):
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
    pwd = models.TextField()
    siteOrigine = models.TextField()
    description = models.TextField()
    dateCreation = models.DateField()

    def __str__(self):
        return self.users