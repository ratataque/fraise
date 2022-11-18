from datetime import date
from django.db import models

# Create your models here.
class Users(models.Model):
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    dateNaissance = models.CharField(max_length=10)
    telephone = models.IntegerField(max_length=10)
    email = models.EmailField(max_length=30)
    MotherPwd = models.TextField()
    adresse = models.TextField()
    numAdresse = models.IntegerField()
    codePostal = models.IntegerField()
    pays = models.TextField()
    
    def __str__(self):
        return self.nom



    
class Password(models.Model):
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
    pwd = models.TextField()
    siteOrigine = models.TextField()
    description = models.TextField()
    dateCreation = models.DateField()

    def __str__(self):
        return self.users