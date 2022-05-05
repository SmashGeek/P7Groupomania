const express = require('express');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const db = require("./models");
const path = require('path');

const app = express(); //initialisation express

//configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(express.json()); //transformation corps de la requete en objet JSON

  db.sequelize.sync();
  app.use('/api/auth', userRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/post', postRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

  module.exports = app;