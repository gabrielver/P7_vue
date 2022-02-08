const Post = require('../models/Post');
require('dotenv').config({path:'./.env'}); 



exports.getAllPost = async (req, res, next) => {
    const posts = await Post.findAll({
        order : [['id', 'DESC']]
    });
    return res.status(200).json(posts);
};

exports.createPost = (req, res ,next) => {
    delete req.body.user_id;
    const post =  Post.create({
        user_id: req.body.userId,
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
