var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const User = require('../models/user');


router.get('/', (req, res, next) => {
    User.find()
      .populate('images')
      .then(users => {
        res.status(200).json({
            message: 'Users fetched successfully!',
            users: users
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
    const maxUserId = sequenceGenerator.nextId("users");
  
    const user = new User({
      id: maxUserId,
      username: req.body.username,
      profilePictureUrl: req.body.profilePictureUrl,
      images: req.body.images
    });
  
    user.save()
      .then(createdUser => {
        res.status(201).json({
          message: 'User added successfully',
          user: createdUser
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
    User.findOne({ id: req.params.id })
      .then(user => {
        user.username = req.body.username;
        user.profilePictureUrl = req.body.profilePictureUrl;
        user.images = req.body.images;
  
        User.updateOne({ id: req.params.id }, user)
          .then(() => {
            res.status(204).json({
              message: 'User updated successfully'
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
          message: 'User not found.',
          error: { user: 'User not found'}
        });
      });
  });


router.delete("/:id", (req, res, next) => {
    User.findOne({ id: req.params.id })
      .then(user => {
        User.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "User deleted successfully"
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
          message: 'User not found.',
          error: { user: 'User not found'}
        });
      });
  });