const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.findOne({ where: {email: req.body.email}})
    .then((user) => {
        if (!user){
            bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const user = User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                })
                .then((user) => {
                    res.status(201).json({message: 'Utilisateur cree !'});
                })
                .catch((error) => res.status(400).json({error}));
            })
            .catch((error) => res.status(500).json({error}));
        } else {
            res.status(401).json({ error: "Cette adresse email est déjà utilisée !"})
        }
    })
};

exports.login = (req, res, next) => {
    User
    .findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              username: user.username,
              token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
  };

  exports.getUser = (req, res,next) => {
    const id = req.params.id;
    User.findOne({ 
      attributes: [ 'id', 'username', 'email', 'isAdmin', 'createdAt', 'updatedAt' ],
      where: { id: id  }
    })
    .then((user) => {
      res.status(200).json({user});
    })
    .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé' }));
  };

  exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.findOne({ 
      attributes: [ 'id' ],
      where: { id: id  }
    })
    .then((user) => {
      User.destroy({where: {id: id}})
      res.status(200).json({message: 'Votre compte a été supprimé'});
    })
    .catch(error => res.status(500).json({ error: "une erreur s'est produite, le compte n'est pas supprimé" }));
  };

  exports.editAccount = (req, res ,next) => {
    if (!req.body.username && !req.body.password) {
      res.status(500).json({message: "Aucune modifications"})
    } else if (!req.body.username && req.body.password){
      bcrypt
      .hash(req.body.password, 10)
        .then((hash) => {
          let update = {
            password: hash
          }
          const id = req.params.id;
          User.update(update, {
            where: {
              id: id
            }
          })
        })
      res.status(200).json({message: "Mot de passe modifie"})
    } else if (req.body.username && !req.body.password){
      let updated = {
        username: req.body.username
      }
      const id = req.params.id;
      User.update(updated, {
        where: {
          id: id
        }
      })
      
      res.status(200).json({message: "nom d'utilisateur modifie"})
    } else if (req.body.username && req.body.password) {
      bcrypt
      .hash(req.body.password, 10)
        .then((hash) => {
          let update = {
            password: hash,
            username:req.body.username
          }
          const id = req.params.id;
          User.update(update, {
            where: {
              id: id
            }
          })
        })
      res.status(200).json({message: "nom d'utilisateur et mot de passe modifie"})
    }
  };

