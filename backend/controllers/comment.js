const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;


exports.createComment = async (req, res, next) => {
    const comment = {
        content: req.body.content,
        userId: req.body.userId,
        postId: req.body.postId,
    }
    Comment.create(comment)
    .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = async (req, res, next) => {
  //console.log("PostIdParams: " + req.query.postId);
  Comment.findAll({ where: { postId: req.query.postId },
  include: User.name })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.deleteComment = (req, res, next) => {
  console.log ("commentId" + req.params.id )
  Comment.destroy({where: {id: req.params.id}})
  .then((comment) => { res.status(200).json(comment);})
};