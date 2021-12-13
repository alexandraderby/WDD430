var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Image = require('../models/image');


router.get('/', (req, res, next) => {
    Image.find()
    .populate('likes')
    .populate('comments')
    .sort({"id":-1})
      .then(images => {
        res.status(200).json({
            message: 'Images fetched successfully!',
            images: images
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
    const maxImageId = sequenceGenerator.nextId("images");
  
    const image = new Image({
      id: maxImageId,
      url: req.body.url,
      caption: req.body.caption,
      user: req.body.user,
      likes: req.body.likes,
      comments: req.body.comments
    });
  
    image.save()
      .then(createdImage => {
        res.status(201).json({
          message: 'Image added successfully',
          image: createdImage
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
    Image.findOne({ id: req.params.id })
      .then(image => {
        image.url = req.body.url;
        image.caption = req.body.caption;
        image.user = req.body.user,
        image.likes = req.body.likes,
        image.comments = req.body.comments
  
        Image.updateOne({ id: req.params.id }, image)
          .then(() => {
            res.status(204).json({
              message: 'Image updated successfully'
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
          message: 'Image not found.',
          error: { image: 'Image not found'}
        });
      });
  });


router.delete("/:id", (req, res, next) => {
    Image.findOne({ id: req.params.id })
      .then(image => {
        Image.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Image deleted successfully"
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
          message: 'Image not found.',
          error: { image: 'Image not found'}
        });
      });
  });