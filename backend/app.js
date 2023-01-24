const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path'); // permet d'accèder aux chemins de fichiers et répertoire

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(cors());
// DB connect

require('./config/db.config')


// gestion des images dans le fichier image qui est statique
app.use('/images', express.static(path.join(__dirname, 'images')));



const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');


// Endpoint
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);






module.exports = app;
