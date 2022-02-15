const asyncLib = require('async')
const Likes = require('../models/like');
const Post = require('../models/Post');
const users = require('../models/User');
require('dotenv').config({path:'./.env'}); 



exports.getAllPost = async (req, res, next) => {
    const post = await Post.findAll({ include: 'users', order : [['id', 'DESC']]
    })
    return res.status(200).json(post);
};

exports.createPost = (req, res ,next) => {
    delete req.body.user_id;
    const post =  Post.create({
        userId: req.body.userId,
        content: req.body.content,
       // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.getOnePost = (req, res, next) => {
    var url = req.originalUrl;
    var postid = url.substring(url.lastIndexOf('=') + 1);
    console.log(postid)
    Post.findOne({ 
        where: {id: postid }})
        .then((post) => {
        if (!post) {
          return res.status(404).send(new Error('Product not found!'));
        }
        //product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
        res.status(200).json(post);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
  };
  
  exports.deletePost = (req, res, next) => {
    var url = req.originalUrl;
    var postid = url.substring(url.lastIndexOf('=') + 1);
    Post.findOne({ 
        where: {id: postid }})
    .then(post => {
        //const filename = sauce.imageUrl.split('/images/')[1];
        //fs.unlink(`images/${filename}`, () => {
            Post.destroy({ 
                where: {id: postid }})
            .then(() => res.status(200).json({message : 'deleted'}))
            .catch(error => res.status(400).json({error: error}));
        
    })
    .catch(error => res.status(500).json({ error }));
};


exports.likePost = (req, res, next) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    if(postId <= 0){
        return res.status(400).json({ 'error': 'invalid parameters'})
    }
    asyncLib.waterfall([
        function(done) {
          Post.findOne({
            where: { id: postId }
          })
          .then(function(messageFound) {
            done(null, messageFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify message' });
          });
        },
        function(messageFound, done) {
          if(messageFound) {
            users.findOne({
              where: { id: userId }
            })
            .then(function(userFound) {
              done(null, messageFound, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
            });
          } else {
            res.status(404).json({ 'error': 'post already liked' });
          }
        },
        function(messageFound, userFound, done) {
          if(userFound) {
            Likes.findOne({
              where: {
                postId: postId,
                userId: userId
              }
            })
            .then(function(userAlreadyLikedFound) {
              done(null, messageFound, userFound, userAlreadyLikedFound);
            })
            .catch(function() {
                Likes.create({
                    postId: postId,
                    userId: userId
                })
            //   return res.status(500).json({ 'error': 'unable to verify is user already liked' });
            });
          } else {
            res.status(404).json({ 'error': 'user not exist' });
          }
        },
        function(messageFound, userFound, userAlreadyLikedFound, done) {
          if(!userAlreadyLikedFound) {
            messageFound.addUser(userFound, { isLike: LIKED })
            .then(function (alreadyLikeFound) {
              done(null, messageFound, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to set user reaction' });
            });
          } else {
            if (userAlreadyLikedFound.isLike === DISLIKED) {
              userAlreadyLikedFound.update({
                isLike: LIKED,
              }).then(function() {
                done(null, messageFound, userFound);
              }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update user reaction' });
              });
            } else {
              res.status(409).json({ 'error': 'message already liked' });
            }
          }
        },
        function(messageFound, userFound, done) {
            messageFound.update({
              likes: messageFound.likes + 1,
            }).then(function() {
              done(messageFound);
            }).catch(function(err) {
              res.status(500).json({ 'error': 'cannot update message like counter' });
            });
          },
        ], function(messageFound) {
          if (messageFound) {
            return res.status(201).json(messageFound);
          } else {
            return res.status(500).json({ 'error': 'cannot update message' });
          }
        });
      }
    // asyncLib.waterfall([
    //     function(done){
    //         Post.findOne({where: {id: postId}})
    // .then(function(messageFound){
    //     done(null, messageFound);
    // })
    // .catch(function(err){return res.status(500).json({ 'error': 'no message found'})
    // });
    //     },
    //     function(messageFound, done){
    //         if(messageFound){users.findOne({where: {id: userId}})
    //     .then(function(userFound){done(null, messageFound, userFound);
    //     })
    //     .catch(function(err){return res.status(500).json({ 'error': 'no user found'});
    //     });
    // }else{res.status(404).json({ 'error': 'post already liked'})
    // }
    //     },
    //     function(messageFound, userFound, done){
    //         if(userFound){Likes.findOne({where:{userId : userId,postId : postId}})
    //     .then(function(isUserAlreadyLiked){
    //         done(null, messageFound, userFound, isUserAlreadyLiked);
    //     })
    //     .catch(function(err){return res.status(500).json({ 'error': 'unable to verify if user already'});
    //     });
    // }else{res.status(404).json({ 'error': 'users not exist'});
    // }
    //     },
    //     function(messageFound, userFound, isUserAlreadyLiked, done){
    //         if(!isUserAlreadyLiked){
    //             messageFound.addUser(userFound)
    //             .then(function(alreadyLikeFound){
    //                 done(null, messageFound, userFound, isUserAlreadyLiked)
    //             })
    //             .catch(function(err){return res.status(500).json({ 'error': 'unable to to set user reaction'});
    //             });
    //         }else{res.status(404).json({ 'error': 'post already liked'})
    //         }
    //     },
    //     function(messageFound, userFound, done){
    //         messageFound.udate({
    //             likes: messageFound.likes + 1,
    //         }).then(function(){
    //             done(messageFound);
    //         }).catch(function(err){res.status(500).json({ 'error': 'cannot update post like'});
    //         }); 
    //     },
    // ],function(messageFound){
    // if(messageFound){
    //     return res.status(201).json(messageFound);
    // }else{
    //     return res.status(500).json({ 'error':'cannot update message'})
    // }
    // }); 
///}


// exports.likePost = (req, res, next) => {
//   const like = req.body.like
//   const userId = req.body.userId
//   var url = req.originalUrl;
//   var commentid = url.substring(url.lastIndexOf('=') + 1);
  
//   // console.log(req.body.like)
//   //console.log(req.body.userId)
//   Postlikes.findOne({ 
//       where: {id: commentid }})
//       .then(comment => {
//           if (like === 1) {
              
//               console.log("liked")
//              console.log(comment.usersLiked.indexOf(userId))
//               if (comment.usersLiked.indexOf(userId) === -1) {
//                   comment.usersLiked.push(userId);//we add +1 to the likes
//                   comment.likes = comment.usersLiked.length;
//                   console.log(comment)
//                   Post.update()
//                       .then(() => res.status(200).json(sauce))
//                       .catch(error => res.status(500).json({error: error}));
//               }
//           } else if (like === 0) {
//               console.log("unliked")
//               console.log(comment.usersLiked.indexOf(userId));
//               if (comment.usersLiked.indexOf(userId) !== -1) {
//                   comment.usersLiked.splice(comment.usersLiked.indexOf(userId));
//                   comment.likes = comment.usersLiked.length;
//               }
//               console.log(comment.usersDisliked.indexOf(userId));
//               if (comment.usersDisliked.indexOf(userId) !== -1) {
//                   comment.usersDisliked.splice(comment.usersDisliked.indexOf(userId));
//                   comment.dislikes = comment.usersDisliked.length;
//               }

//               Post.update()
//                   .then(() => res.status(200).json(comment))
//                   .catch(error => res.status(500).json({error: error}));
//           } else if (like === -1) {
//               console.log("disliked")
//               console.log(comment.usersDisliked.indexOf(userId));
//               if (comment.usersDisliked.indexOf(userId) === -1) {
//                   comment.usersDisliked.push(userId);
//                   comment.dislikes = comment.usersLiked.length;
//                   Post.update()
//                       .then(() => res.status(200).json(comment))
//                       .catch(error => res.status(500).json({error: error}));
//               }
//           }
//       })
//       .catch(error => res.status(404).json({error: error}));
// }

// exports.likePost = (req, res, next) => {
//     const userId = req.params.id;
//     const postId = req.params.postId;
//     if(postId <= 0){
//         return res.status(400).json({ 'error': 'invalid parameters'})
//     }

//     Post.findOne({where: {id: postId}})
//     .then(function(messageFound){done(null, messageFound);
//     })
//     .catch(function(err){return res.status(500).json({ 'error': 'no message found'})
//     });
    
//     if(messageFound){users.findOne({where: {id: userId}})
//         .then(function(userFound){done(null, messageFound, userFound);
//         })
//         .catch(function(err){return res.status(500).json({ 'error': 'no user found'});
//         });
//     }else{res.status(404).json({ 'error': 'post already liked'})
//     };

//     if(usersFound){Likes.findOne({where:{userId : userId,postId : postId}})
//         .then(function(isUserAlreadyLiked){
//             done(null, messageFound, userFound, isUserAlreadyLiked);
//         })
//         .catch(function(err){return res.status(500).json({ 'error': 'unable to verify if user already'});
//         });
//     }else{res.status(404).json({ 'error': 'users not exist'});
//     };

//     if(!isUserAlreadyLiked){
//         messageFound.addUser(userFound)
//         .then(function(alreadyLikeFound){
//             done(null, messageFound, userFound, isUserAlreadyLiked)
//         })
//         .catch(function(err){return res.status(500).json({ 'error': 'unable to to set user reaction'});
//         });
//     }else{res.status(404).json({ 'error': 'post already liked'})
//     };

//     messageFound.udate({
//         likes: messageFound.likes + 1,
//     }).then(function(){
//         done(messageFound);
//     }).catch(function(err){res.status(500).json({ 'error': 'cannot update post like'});
//     });

//     if(messageFound){
//         return res.status(201).json(messageFound);
//     }else{
//         return res.status(500).json({ 'error':'cannot update message'})
//     }
// }