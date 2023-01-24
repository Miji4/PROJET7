# PROJET7
Reseau social interne Groupomania.

# Fonctionnalités

- Création d'un compte utilisateur ainsi que sa modification et suppression.
- Connexion/deconnexion
- Création d'un post ainsi que sa modification et sa suppression
- mot de passe sécurisé
- application résponsive
- roles: admin/user

# Tech Stack
- NodeJS
- Express
- sequelize
- Mysql
- VueJs

# Backend

Ouvrir le dossier backend dans le terminal et executer la commande npm install ensuite lancer le serveur en tapant la commande nodemon serve.

. Le serveur doit fonctionner sur http://localhost:3000/.

# Frontend

Ouvrir le dossier frontend dans le terminal puis executer la commande npm install ensuite lancer le serveur en tapant la commande npm run serve.

. Le serveur doit fonctionner sur http://localhost:8080/.

# Base de données

Au lancement du serveur backend, la base de données sera créée automatiquement. Le fichier .env dans le dossier backend regroupe les informations de connexion à la base de données: 
DB_USER=root
DB_PASS=root
DB_NAME=Groupomania

# Note

l' utilisateur administrateur sera enregistré avec l'email suivant :

DEFAULT_ADMIN_EMAIL=admin@groupomania.com

