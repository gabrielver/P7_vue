const Comment = require('../models/Comment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var asyncLib = require('async');
require('dotenv').config({path:'./.env'}); 


exports.getAllComment = async (req, res, next) => {
    const comments = await Comment.findAll({
        order : [['id', 'DESC']]
    });
    return res.status(200).json(comments);
};

exports.createComment = (req, res ,next) => {
    delete req.body.user_id;
    const date = new Date();
   // date.getTime();
    console.log(date)
    const comment =  Comment.create({
        post_id: req.body.post_Id,
        user_id: req.body.user_Id,
        message: req.body.message       
             // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.getOneComment = (req, res, next) => {
    var url = req.originalUrl;
    var commentid = url.substring(url.lastIndexOf('=') + 1);
    console.log(commentid)
    Comment.findOne({ 
        where: {id: commentid }})
        .then((comment) => {
        if (!comment) {
          return res.status(404).send(new Error('Product not found!'));
        }
        //product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
        res.status(200).json(comment);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
  };
  
  exports.deleteComment = (req, res, next) => {
    var url = req.originalUrl;
    var commentid = url.substring(url.lastIndexOf('=') + 1);
    Comment.findOne({ 
        where: {id: commentid }})
    .then(comment => {
        //const filename = sauce.imageUrl.split('/images/')[1];
        //fs.unlink(`images/${filename}`, () => {
            Comment.destroy({ 
                where: {id: commentid }})
            .then(() => res.status(200).json({message : 'deleted'}))
            .catch(error => res.status(400).json({error: error}));
        
    })
    .catch(error => res.status(500).json({ error }));
};



exports.likeComment = (req, res, next) => {
    const like = req.body.like
    const userId = req.body.userId
    var url = req.originalUrl;
    var commentid = url.substring(url.lastIndexOf('=') + 1);
    
    // console.log(req.body.like)
    //console.log(req.body.userId)
    Comment.findOne({ 
        where: {id: commentid }})
        .then(comment => {
            if (like === 1) {
                
                console.log("liked")
               console.log(comment.usersLiked.indexOf(userId))
                if (comment.usersLiked.indexOf(userId) === -1) {
                    comment.usersLiked.push(userId);//we add +1 to the likes
                    comment.likes = comment.usersLiked.length;
                    console.log(comment)
                    Comment.update()
                        .then(() => res.status(200).json(sauce))
                        .catch(error => res.status(500).json({error: error}));
                }
            } else if (like === 0) {
                console.log("unliked")
                console.log(comment.usersLiked.indexOf(userId));
                if (comment.usersLiked.indexOf(userId) !== -1) {
                    comment.usersLiked.splice(comment.usersLiked.indexOf(userId));
                    comment.likes = comment.usersLiked.length;
                }
                console.log(comment.usersDisliked.indexOf(userId));
                if (comment.usersDisliked.indexOf(userId) !== -1) {
                    comment.usersDisliked.splice(comment.usersDisliked.indexOf(userId));
                    comment.dislikes = comment.usersDisliked.length;
                }

                Comment.update()
                    .then(() => res.status(200).json(comment))
                    .catch(error => res.status(500).json({error: error}));
            } else if (like === -1) {
                console.log("disliked")
                console.log(comment.usersDisliked.indexOf(userId));
                if (comment.usersDisliked.indexOf(userId) === -1) {
                    comment.usersDisliked.push(userId);
                    comment.dislikes = comment.usersLiked.length;
                    Comment.update()
                        .then(() => res.status(200).json(comment))
                        .catch(error => res.status(500).json({error: error}));
                }
            }
        })
        .catch(error => res.status(404).json({error: error}));
}