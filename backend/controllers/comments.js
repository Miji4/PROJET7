const jwt = require('jsonwebtoken');
const fs = require('fs');
//require('dotenv').config() 

const db = require('../models');


const { User } = db.sequelize.models;
const { Comment } = db.sequelize.models;
const { Post } = db.sequelize.models;

// creer un commentaire
exports.addComment = (req, res) => {
const comment = {
    content: req.body.content,
    username: req.auth.username,
    UserId : req.auth.userId,
    PostId : req.params.postId
  };
  Post.findOne({where: {id: req.params.postId}})
  .then(postFound =>{
    console.log(postFound)
    if(postFound){
        Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Commentaire créé' }))
    .catch(error => res.status(400).json({ error }))
    }else{
      return res.status(404).json({error: 'post non trouvé !'})
    }
  })
     .catch(error => res.status(400).json({ error }))
  
}

//modifier un commentaire
exports.modifyComment = (req, res) => {
  const id = req.params.id;
  const postId = req.params.postId;
  const userId = req.auth.userId;
  const username = req.auth.username;
  let updateComment = {
    content: req.body.content,
  }; 
  Comment.findOne({ where: {id: id} })
  .then((comment) => {
    if (comment.UserId == req.auth.userId || req.auth.isAdmin == true) {
     Comment.update(updateComment, { where: {id: id} })
     .then(() => { res.status(201).json({ message: 'Commentaire modifié'})})
     .catch(error => res.status(401).json({ error }));

    }else{
      return res.status(400).json({ message: "Seul l'auteur du commentaire peuvent le modifier !"})
    }
  })
  .catch(error => res.status(400).json({ error }));
}

// supprimer un commentaire
exports.deleteComment = (req, res) => {
  const id = req.params.id;
  Comment.findOne({ where: {id: id} })
  .then((comment) => {
    if ( comment.UserId == req.auth.userId || req.auth.isAdmin == true) {

          Comment.destroy({ where: {id: id} })
          .then(() => { res.status(201).json({ message: 'Commentaire supprimé' })})
          .catch(error => res.status(400).json({ error }));

        }else{
          return res.status(400).json({ message: "Seul un administrateur ou l'auteur du commentaire peuvent le supprimer !"})
        }
  })
  .catch(error => res.status(404).json({ error }));
}




// afficher un commentaire
exports.getOneComment = (req, res) => {
  const id = req.params.id;
  const postId = req.params.postId;
  Comment.findOne({ where: {id: id, postId: postId }, include: [{model: User}],
    order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
    .then(comment => {
      if(comment) {
          res.status(200).json(comment)
      } else {
          res.status(404).json({ message: 'Commentaire non trouvé' })
      }
  })
  .catch(error => res.status(400).json({ message: 'Impossible d\'afficher ce commentaire', error }));}


// afficher tous les commentaires
exports.getAllComment = (req, res) => {
  const postId = req.params.postId;
  Comment.findAll({
    order: [['createdAt', 'ASC']],
    include: [{model: User}, {model: Post}],
    where:{PostId: postId},
  
  })
  .then(comment => res.status(201).json({ comment }))
  .catch(error => res.status(400).json({ message: 'impossible d\afficher tous les commentaires'}));
}

