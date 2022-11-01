# fraise


zebi<br> 
zebi<br>
<br><br><br><br>
truc bidule




# Comment lancer le projet

<br>
Allez dans le dossier ou vous voulez mettre votre projet.

<br>
<br>

Lancer une cmd depuis ce dossier puis rentrez cette commande:

<pre>
    <code>git clone https://github.com/ORTSIOBTS/fraise.git</code>
</pre>

Et ensuite:

<pre>
    <code>docker-compose -p fraise -f docker-compose/docker-compose.yml up</code>
</pre>

***


### une fois que tout est terminé voici l'état du projet: ###
<br>

1. le backend run sur [https://localhost:8000](https://localhost:8000)

2. Le frontend run sur [https://localhost:3000](https://localhost:3000)

3. et la bdd sur le port **5432**

<br>

Si vous voulez accedez à l'invite de commande sur l'un des contenaires, rentrez une de ces commandes suivant ce que vous voulez :

<pre>
    <code>#pour le backend
    docker exec -it fraise-backend-1 bash</code>
</pre>

<pre>
    <code>#pour le frontend
    docker exec -it fraise-frontend-1 bash</code>
</pre>

<pre>
    <code>#pour la database
    docker exec -it fraise-db-1 bash</code>
</pre>

***
<br>

 Le user pour la db est **fraise**. 