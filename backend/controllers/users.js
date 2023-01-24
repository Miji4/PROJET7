const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()

const db = require('../models');
const { response } = require('express');



const { User } = db.sequelize.models;
const { Comment } = db.sequelize.models;
const { Post } = db.sequelize.models;


// Creation du compte

const emailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordREGEX = /^(?=.*\d).{6,}$/;

exports.signup = (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  //Verification des champs remplis par l'utilisateur
  if (!email || !username || !password ) {
      return res.status(400).json({ 'error': 'Champ(s) manquant(s)'});
  }
  if (!emailREGEX.test(email)) {
      return res.status(400).json({ 'error': 'email non valide'});
  }
  if (!passwordREGEX.test(password)) {
      return res.status(400).json({ 'error': 'Le mot de passe doit compter minimum 6 caractères et inclure un chiffre'});
  }

  if(req.body.email === process.env.DEFAULT_ADMIN_EMAIL){
    req.body.isAdmin = true
  }else{
    req.body.isAdmin = false
  }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                username: req.body.username,
                email: req.body.email, 
                password: hash,
                isAdmin: req.body.isAdmin
            };
            User.create(user)
                .then(() => res.status(200).json({message: 'Votre compte a été créé avec succès!'}))
                
                .catch(error => res.status(400).json({message: 'Votre compte n\a pas pu être créé! '}));
        })
        .catch(error => res.status(500).json({ error }));
};


//Connexion
exports.login = (req, res) => {
  if (req.body.email == null || req.body.password == null) {
    return res.status(400).json({ error: 'Champ(s) manquant(s)'});
}
    User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Utilisateur non trouvé!" });
        } else {
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              } else {
                res.status(201).json({
                  userId: user.id,
                  isAdmin: user.isAdmin,
                  username: user.username,
                  token: jwt.sign(
                    { userId: user.id, isAdmin: user.isAdmin, username: user.username },
                    process.env.CLE_SECRETE,
                    { expiresIn: '24h'}),
                });
              }
            })
            .catch(error => res.status(500).json({ error }));
        }
  
      })
      .catch(error => res.status(500).json({ error }));
  };

// recuperer utilisateur

exports.getAllUser = (req, res, next) => {
    User.findAll()
     .then(User => res.status(200).json({ User }))
     .catch(error => res.status(400).json({ error }));
 };

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: {id: req.params.id} })
    .then(User => res.status(200).json({ User }))
    .catch(error => res.status(400).json({ error }));
};


// Modification compte
exports.modifyCompte = (req, res, next) => {
  console.log(req.body)
  User.findOne({ where: { id: req.params.id }})
  .then((user) => {
   if ( user.id == req.auth.userId ) {
    const userupadate = {}
    if(req.body?.username?.length){
      userupadate["username"]=req.body.username
    }
    if(req.body?.email?.length){
      userupadate["email"]=req.body.email
    }
    if(req.body?.password?.length){
      userupadate["password"]=req.body.password
      bcrypt.hash(req.body.password, 10)
      .then((hash) => {
         User.update(
          userupadate,
           {where: { id: req.params.id }
         })
           .then(() => res.status(201).json({ message: 'Compte modifié !' }))
           .catch(error => res.status(400).json({ error }));
     })

    }else{
      User.update(
        userupadate,
      
        {where: { id: req.params.id }
      })
        .then(() => res.status(201).json({ message: 'Compte modifié !' }))
        .catch(error => res.status(400).json({ error }));

    }


    }else{
      return res.status(400).json({ error: 'Unauthorized request!'});
    

    }
  })
  
 .catch(error => res.status(500).json({ error }));
    
};

exports.updateRole = (req, res, next) => {

        if (req.auth.isAdmin == true) {
          User.update(
            {isAdmin: req.body.isAdmin},
            { where: {id: req.params.id}
          })
        .then(() => res.status(201).json({message: "Update role !"}))
        }else{
          return res.status(400).json({ message: "Seul un administrateur peut modifier le role !"})
        }
}





  

exports.deleteCompte = (req, res, next) => {
  User.findOne({where: {id: req.params.id }})

  .then((user) => {
    console.log(user)
      if (!user) {
        return res.status(404).json({error: 'No such User!'});
      }
       if(req.auth.isAdmin === true || user.id === req.auth.userId ){
      Post.destroy({ where: {UserId: req.params.id}})
            .then(() => {
                Comment.destroy({ where: {UserId: req.params.id} })
                .then(() => {
                User.destroy({where: {id: req.params.id}})
                })
                .then(() => {res.status(201).json({ message: 'post supprimé' })})
                .catch(error => res.status(400).json({ error }));
              })
       
            .catch((error) => {res.status(400).json({error: error })})
          }else{
            return res.status(400).json({ message: "Seul un administrateur ou l'auteur de l'article peut supprimer ce post !"})
          }

  })
};
