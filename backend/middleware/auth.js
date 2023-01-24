const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports = (req, res, next) => {
    try {
        // Récupère le token du header en séparant "Bearer" du "token"
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.CLE_SECRETE);
        const userId = decodedToken.userId; // j'extrais l'ID utilisateur du token 
        const isAdmin = decodedToken.isAdmin;
        const username = decodedToken.username;
        req.auth = {userId, isAdmin, username};        // Si l'id existe mais qu'il est différent de celui récupéré dans le token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
};