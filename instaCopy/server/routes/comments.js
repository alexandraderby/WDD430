var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Comment = require('../models/comment');


router.get('/', (req, res, next) => {
    Comment.find()
      .then(comments => {
        res.status(200).json({
            message: 'Comments fetched successfully!',
            comments: comments
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
    const maxCommentId = sequenceGenerator.nextId("comments");
  
    const comment = new Comment({
      id: maxCommentId,
      text: req.body.text,
      image: req.body.image,
      user: req.body.user
    });
  
    comment.save()
      .then(createdComment => {
        res.status(201).json({
          message: 'Comment added successfully',
          comment: createdComment
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


router.put('/:id', (req, res, next) => {
    Comment.findOne({ id: req.params.id })
      .then(comment => {
        comment.url = req.body.url;
        comment.text = req.body.text;
        comment.image = req.body.image,
        comment.user = req.body.user
  
        Comment.updateOne({ id: req.params.id }, comment)
          .then(() => {
            res.status(204).json({
              message: 'Comment updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Comment not found.',
          error: { comment: 'Comment not found'}
        });
      });
  });


router.delete("/:id", (req, res, next) => {
    Comment.findOne({ id: req.params.id })
      .then(comment => {
        Comment.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Comment deleted successfully"
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
          message: 'Comment not found.',
          error: { comment: 'Comment not found'}
        });
      });
  });