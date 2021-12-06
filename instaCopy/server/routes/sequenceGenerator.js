var Sequence = require('../models/sequence');

var maxUserId;
var maxLikeId;
var maxImageId;
var maxCommentId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxUserId = sequence.maxUserId;
      maxLikeId = sequence.maxLikeId;
      maxImageId = sequence.maxImageId;
      maxCommentId = sequence.maxCommentId;

    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'users':
      maxUserId++;
      updateObject = {maxUserId: maxUserId};
      nextId = maxUserId;
      break;
    case 'likes':
      maxLikeId++;
      updateObject = {maxLikeId: maxLikeId};
      nextId = maxLikeId;
      break;
    case 'images':
      maxImageId++;
      updateObject = {maxImageId: maxImageId};
      nextId = maxImageId;
      break;
      case 'comments':
        maxCommentId++;
        updateObject = {maxCommentId: maxCommentId};
        nextId = maxCommentId;
        break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();