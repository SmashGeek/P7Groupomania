const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;

exports.createPost = (req, res, next) =>{
    if(!req.body.content && req.file){
        Post.create({
            imageUrl: req.file,
            userId: req.body.userId,
    })
        .then((post) => {
            res.status(201).json({
                message: " image post"
            })
        })
    } else if (req.body.content && !req.file){
        Post.create({
            userId: req.body.userId,
            content: req.body.content,
    })
        .then((post) => {
            res.status(201).json({
                message: "text post"
            })
        })
    } else if (req.body.content && req.file) {
        Post.create({
            userId: req.body.userId,
            content: req.body.content,
            imageUrl: req.file.filename,

    })
        .then((post) => {
            res.status(201).json({
                message: "full post"
            })
        })
    } else{
        res.status(500).json({message: "post vide"})
    }
}

exports.getAllPosts = async (req, res, next) => {
  Post.findAll({ include: User.name })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.getOnePost = async (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Comment,
        as: "comments"
      },
      {
        model: User,
        as: "user"
      }]
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.deletePost = (req, res, next) => {
  console.log ("postid" + req.params.id )
  Post.destroy({where: {id: req.params.id}})
  .then((post) => { res.status(200).json(post);})
};