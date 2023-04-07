from django.db import models
from django.db import models, IntegrityError
import uuid
import requests
import hashlib
from django.contrib.auth.models import User

# Create your models here.
class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default="null")
    uuid = models.UUIDField(default=uuid.uuid4)
    nom = models.CharField(max_length=30, default="null")
    prenom = models.CharField(max_length=30, default="null")
    email = models.EmailField(max_length=100, unique=True, default="null")
    MotherPwd = models.TextField(default="null")
    is_active = models.BooleanField(default=False)

    @classmethod
    def create_user(cls, nom, prenom, email, clearpwd):
        user = Users()

        try  :
            u = User.objects.create_user(username=email, password=clearpwd)
        except IntegrityError as e :
            return e

        uuidaz = uuid.uuid4()
        sel = hashlib.sha256(str(uuidaz).encode("utf-8")).hexdigest()
        file = open("/fraise/backend/api/poivre.txt", "r")
        poivre = file.read()
        file.close()
        mdp = clearpwd
        securisation = sel + mdp + poivre
        securise = hashlib.sha256(securisation.encode("utf-8")).hexdigest()
        for i in range(0, 439874):
            securise = hashlib.sha256(securise.encode("utf-8")).hexdigest()
        mdpSecuriser = sel + securise

        user.user = u
        user.nom = nom
        user.prenom = prenom
        user.email = email
        user.MotherPwd = mdpSecuriser
        
        user.save()
        return user

    def send_verif_mail(self):
        mailField = {
            "sender": {"name": "Fraise le gestionnaire", "email": "fraise@fraise.com"},
            "to": [{"email": self.email, "name": (self.nom + " " + self.prenom)}],
            "subject": "Mail de confirmation d'inscpition à Fraise",
            "htmlContent": "<html><head></head><body><h1>Bonjour, veuillez cliquer <a href='http://localhost:3000/verifEmail?uuid="
            + str(self.uuid)
            + "'>Ici</a> afin de pouvoir activer votre compte, merci ! </h1></body></html>",
            "headers": {
                "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
                "charset": "iso-8859-1",
            },
        }

        requete = requests.post(
            "https://api.sendinblue.com/v3/smtp/email",
            json=mailField,
            headers={
                "accept": "application/json",
                "Content-type": "application/json; charset=UTF-8",
                "api-key": "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",
            },
        )

    def check_password(self, clearpwd):

        sel = self.MotherPwd[0 : len(self.MotherPwd) // 2]
        file = open("/fraise/backend/api/poivre.txt", "r")
        poivre = file.read()
        file.close()
        mdp = clearpwd
        securisation = sel + mdp + poivre
        securise = hashlib.sha256(securisation.encode("utf-8")).hexdigest()
        for i in range(0, 439874):
            securise = hashlib.sha256(securise.encode("utf-8")).hexdigest()
        mdpSecuriser = sel + securise

        return self.MotherPwd == mdpSecuriser

    def activate_email(self):
        self.is_active = True
        self.save()


class Password(models.Model):
    users = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="passwords", default="null")
    website = models.CharField(max_length=100, default="null")
    email = models.EmailField(max_length=100, default="null")
    password = models.CharField(max_length=100, default="null")
    dateCreation = models.DateField(auto_now=True)

    @classmethod
    def create_password(cls, website, email, password):
        user = Password()

        # uuidaz = uuid.uuid4()
        # sel = hashlib.sha256(str(uuidaz).encode("utf-8")).hexdigest()
        # file = open("/fraise/backend/api/poivre.txt", "r")
        # poivre = file.read()
        # file.close()
        # mdp = clearpwd
        # securisation = sel + mdp + poivre
        # securise = hashlib.sha256(securisation.encode("utf-8")).hexdigest()
        # mdpSecuriser = sel + securise

        # user.nom = nom
        # user.prenom = prenom
        # user.email = email
        # user.MotherPwd = mdpSecuriser
        
        # try  :
        #     user.save()
        #     return user
        # except IntegrityError as e :
        #     return e
