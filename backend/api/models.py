from django.db import models
from django.db import models, IntegrityError
from django.conf import settings
import uuid
import requests
import hashlib
from django.contrib.auth.models import User
from django.utils import timezone
import urllib.parse
import pyotp
if settings.USE_SENDINBLUE_API:
    from api.config_api import SENDINBLUE_API_KEY

# Create your models here.
class Users(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE, default="null")
    uuid = models.UUIDField(default=uuid.uuid4)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    email = models.EmailField(max_length=100, unique=True)
    MotherPwd = models.TextField()
    secret_totp = models.EmailField(max_length=100, unique=True, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    last_login = models.DateTimeField(blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['MotherPwd']
    is_anonymous = False
    is_authenticated = False

    @classmethod
    def create_user(cls, nom, prenom, email, clearpwd):
        user = Users()

        uuidaz = uuid.uuid4()
        sel = hashlib.sha256(str(uuidaz).encode("utf-8")).hexdigest()
        file = open("/fraise/backend/api/poivre.txt", "r")
        poivre = file.read()
        file.close()
        mdp = clearpwd
        securisation = sel + mdp + poivre
        securise = hashlib.sha256(securisation.encode("utf-8")).hexdigest()
        for i in range(0, 2001):
            securise = hashlib.sha256(securise.encode("utf-8")).hexdigest()
        mdpSecuriser = sel + securise

        user.nom = nom
        user.prenom = prenom
        user.email = email
        user.MotherPwd = mdpSecuriser
        
        try :
            user.save()
        except IntegrityError as e :
            return e
            
        return user

    def send_verif_mail(self):
        mailField = {
            "sender": {"name": "Fraise le gestionnaire", "email": "fraise@fraise.com"},
            "to": [{"email": self.email, "name": (self.nom + " " + self.prenom)}],
            "subject": "Mail de confirmation d'inscpition à Fraise",
            "htmlContent": "<html><head></head><body><h1>Bonjour, veuillez cliquer <a href='https://fraise.kwer.fr/verifEmail?uuid="
            + str(self.uuid)
            + "&email="+urllib.parse.quote_plus(self.email)+"'>Ici</a> afin de pouvoir activer votre compte, merci ! </h1></body></html>",
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
                "api-key": SENDINBLUE_API_KEY,
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
        for i in range(0, 2001):
            securise = hashlib.sha256(securise.encode("utf-8")).hexdigest()
        mdpSecuriser = sel + securise

        return self.MotherPwd == mdpSecuriser

    def activate_email(self):
        self.is_active = True
        self.save()

    def set_totp(self, secret_totp):
        if (self.secret_totp == None):
            self.secret_totp = secret_totp
            self.save()
            return 'ok'
        else:
            return 'totp already set'

    def verify_otp(self, totp):
        otp_cls = pyotp.TOTP(self.secret_totp)
        return otp_cls.verify(totp)
            


class Password(models.Model):
    users = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="passwords")
    website_uuid = models.UUIDField()
    uuid = models.UUIDField()
    website = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    dateCreation = models.DateField(auto_now=True)

    @classmethod
    def create_password(cls, user_id, website_uuid, uuid, website, email, password_chiffre):
        password_cls = Password()

        user = Users.objects.get(id=user_id)

        password_cls.users = user
        password_cls.website_uuid = website_uuid
        password_cls.uuid = uuid
        password_cls.website = website
        password_cls.email = email
        password_cls.password = password_chiffre
        
        try  :
            password_cls.save()
            return password_cls
        except IntegrityError as e :
            return e

    def change_password(self, email, password_chiffre):

        self.email = email
        self.password = password_chiffre
        
        try  :
            self.save()
            return self
        except IntegrityError as e :
            return e
