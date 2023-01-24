const jwt = require('jsonwebtoken');
const fs = require('fs');
//require('dotenv').config() 

const db = require('../models');
const { User } = db.sequelize.models;
const { Comment } = db.sequelize.models;
const { Post } = db.sequelize.models;

// Ajouter un post
exports.addPost = (req, res) => {
    // if (req.body.title == null || req.body.content == null) {
    //     return res.status(400).json({ error: 'Champ(s) manquant(s)'});
    // }else{
        const post = {
            title: req.body.title,
            content: req.body.content,
            image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
            UserId: req.auth.userId
        };
    //         if (req.body.title === null || req.body.content === null) {
    //     return res.status(400).json({ error: 'Champ(s) manquant(s)'});
    // }else{

        Post.create(post)
            .then(() => res.status(201).json({ message: 'post créé' }))
            .catch(erreur => res.status(400).json({ erreur }));
    // }
};

//Afficher tous les posts
exports.getAllPost = (req, res) => {
    Post.findAll({
        order : [['updatedAt', 'ASC']], 
        include: [{
            model: User, 
            attributes: ['username', 'isAdmin']},{model: Comment,}]
        })
    .then(posts => res.status(201).json({ posts }))
    .catch(error => res.status(400).json({ message: 'Impossible d\'afficher tous les posts' }));
}

//Afficher un post
exports.getOnePost = (req, res) => {
    const id = req.params.id;

    Post.findOne({ where: {id: id}, 
        include: [{
            model: User, 
            attributes: ['username', 'isAdmin']},{model: Comment,}]
        })
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(400).json({ message: 'Impossible d\afficher ce post' }));
}


//Modifier un post
exports.modifyPost = (req, res) => {
    const id = req.params.id;
    const UserId = req.auth.userId;

    let updatePost = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.image,
    }
    Post.findOne({ where: {id: id} })
    .then((post) => {
        console.log(post)
    if ( post.UserId == req.auth.userId || req.auth.isAdmin == true) {
    Post.update(updatePost, {where: {id:id, UserId: UserId}})
    .then(() => res.status(200).json({message: 'Votre post a bien été modifié!'}))
    .catch(error => res.status(400).json({message: 'impossible de modifier ce post'}))
    }else{
        return res.status(400).json({ message: "Seul un administrateur ou l'auteur de l'article peut modifier ce post !"})
    }
    })
    .catch(error => res.status(404).json({ error }));
}

// Suppression du post par l'utilisateur ou l'admin
exports.deletePost = (req, res) => {
    const id = req.params.id;
    const UserId = req.auth.userId
    Post.findOne({ where: {id: id} })
    .then((post) => {
         if(post.UserId == req.auth.userId || req.auth.isAdmin == true) {
            //  console.log(UserId)
            //  console.log(req.auth.isAdmin)
            Comment.destroy({ where: {PostId: id}})
            .then(() => {
                console.log(post)
                if(post.image){
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: {id: id} })
                .then(() => {res.status(201).json({ message: 'post supprimé' })})
                .catch(error => res.status(400).json({ error}));
                })
            }else{
                Post.destroy({ where: {id: id} })
                .then(() => {res.status(201).json({ message: 'post supprimé' })})
                .catch(error => res.status(400).json({ error}));
            }
            });
        
        }else{
            return res.status(400).json({ message: "Seul un administrateur ou l'auteur de l'article peut le supprimer !"})
            }
    })
    .catch(error => res.status(404).json({ error }));
}





















  