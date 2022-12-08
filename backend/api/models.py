from datetime import date
from django.db import models
import django.contrib.auth
from django.db import models, IntegrityError
from django.utils import timezone
import uuid
import hashlib

# Create your models here.
class Users(models.Model):
    uuid = models.TextField(default=uuid.uuid4())
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    email = models.EmailField(max_length=100)
    MotherPwd = models.TextField()
    is_active = models.BooleanField(default=False)
    
    # @classmethod
    # def create(nom, prenom, email, MotherPwd):
    #     Users.save()
    #     return Users
    def __str__(self):
        return self.uuid
    
    @classmethod
    def create_user(cls, nom, prenom, email, clearpwd):
        user = Users()

        uuidaz = uuid.uuid4()
        sel = hashlib.sha256(str(uuidaz).encode('utf-8')).hexdigest()
        poivre = open("/fraise/backend/api/poivre.txt", "r").read()
        mdp  = clearpwd
        securisation = sel+mdp+poivre
        securise = hashlib.sha256(securisation.encode('utf-8')).hexdigest()
        mdpSecuriser = sel+securise

        user.nom = nom
        user.prenom = prenom
        user.email = email
        user.MotherPwd = mdpSecuriser

        user.save()
        return user


    def check_password(self, clearpwd):

        sel = self.MotherPwd[0:len(self.MotherPwd)//2]
        poivre = open("/fraise/backend/api/poivre.txt", "r").read()
        mdp  = clearpwd
        securisation = sel+mdp+poivre
        securise = hashlib.sha256(securisation.encode('utf-8')).hexdigest()
        mdpSecuriser = sel+securise

        return self.MotherPwd == mdpSecuriser
            



class Password(models.Model):
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
    pwd = models.TextField()
    siteOrigine = models.TextField()
    description = models.TextField()
    dateCreation = models.DateField()

    def __str__(self):
        return self.users