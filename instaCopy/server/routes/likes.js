var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Like = require('../models/like');


router.get('/', (req, res, next) => {
    Like.find()
      .then(likes => {
        res.status(200).json({
            message: 'Likes fetched successfully!',
            likes: likes
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });


router.post('/', (req, res, next) => {
    const maxLikeId = sequenceGenerator.nextId("likes");
  
    const like = new Like({
      id: maxLikeId,
      text: req.body.text,
      image: req.body.image,
      user: req.body.user
    });
  
    like.save()
      .then(createdLike => {
        res.status(201).json({
          message: 'Like added successfully',
          like: createdLike
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


router.delete("/:id", (req, res, next) => {
    Like.findOne({ id: req.params.id })
      .then(like => {
        Like.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Like deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Like not found.',
          error: { like: 'Like not found'}
        });
      });
  });