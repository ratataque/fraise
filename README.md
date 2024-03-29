<h1 align="center">🍓 Fraise 🍓</h1>


Fraise le gestionnaire de mot de passe

- [x] Mot de passe mère salé poivré, hashé 400k fois
- [x] Les mots de passe stocké par les utilisateurs sont chiffré symetriquement avec un hash du mot de passe mère + une string + (salé, poivré)
- [ ] faire que la string present dans la cle de dechiffrement soit uniquement present sur le telephone de l'utilisateur 
- [x] Proteger par csrf token 
- [x] Proteger par JWT (access + refresh token) 
- [x] JWT blacklist et rotation 
- [x] JWT blacklist tout les token d'un user si tentative de refresh avec un refresh token deja refresh 
- [x] Envoie d'email pour confirmer l'inscription
- [x] Auth avec TOTP
- [x] Bouttons copier coller
- [ ] Verification du mot de passe a l'inscription et prevenir que nous ne pouvons pas recouvrir les mot de passe stocke si le mot de passe mere est perdu

***
![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/auth.png)
![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/totp.png)
![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/add.png)
![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/show.png)

# Comment lancer le projet 

Avant de lancer le projet, il faut installer Docker et Git : 
<br>
https://www.docker.com/
<br>
https://git-scm.com/
<br><br>
Allez dans le dossier ou vous voulez mettre votre projet.


Lancer un cmd depuis ce dossier puis rentrez cette commande pour clone le repo:

<pre>
    <code>git clone https://github.com/ratataque/fraise.git</code>
</pre>

Et ensuite lancer le ficher sous (en ayant docker de lancé):

<pre>
    <code>fraise/bat/fullLanch.bat</code>
</pre>

***

<br>


 ### Une fois que tout est terminé voici l'état du projet: 
<br>

1. le backend run sur [http://localhost:8000](http://localhost:8000)

2. Le frontend run sur [http://localhost:3000](http://localhost:3000)

3. et la bdd sur le port **5432**

<br>

 ### Si vous voulez accedez au backend ou a la db, executez les fichier correspondant :

<pre>
    <code>#pour le backend
    fraise/bat/acces_backend.bat</code>
</pre>

<pre>
    <code>#pour la database
    fraise/bat/acces_db.bat</code</code>
</pre>


***
# Envoie du mail de confirmation avec SendinBlue API

<br>

 Changer le boolen en True de la variable a la ligne 29 du fichier **fraise/backend/backend/setting.py**
<pre>
    <code>29  USE_SENDINBLUE_API = True</code>
</pre>

<br>

 ensuite il faut avoir un fichier nomé **config_api.py** a cette emplacement **fraise/backend/api/config_api.py** avec ce contenue

<pre>
    <code>
        #!/usr/bin/env python3

        SENDINBLUE_API_KEY = "YOUR API KEY"
    </code>
</pre>

# Zoom sur le fontionnement

![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/fonctionnement.png)

# Zoom sur le JWT

![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/zoom_jwt.png)

# Zoom sur la securisation des mdp dans la db

![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/zoom_password.png)

# Base de donnée

![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/db.png)

# Point d'entrée API

![alt text](https://raw.githubusercontent.com/ratataque/fraise/main/images_git/api.png)