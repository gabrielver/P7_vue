const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/User');
var asyncLib = require('async');
require('dotenv').config({path:'./.env'}); 


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = users.create({
        name: req.body.name,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !', 
        userId: users.user_id,
        token: jwt.sign(
          { userId: users.user_id },process.env.APP_KEY,
          { expiresIn: '24h' }
        ) }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


  exports.login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
  users.findOne({ 
    where: {email: email }})
    .then(users => {
      if (users === null) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, users.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: users.user_id,
                token: jwt.sign(
                  { userId: users.user_id },process.env.APP_KEY,
                  { expiresIn: '24h' }
                )
              });
            })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };