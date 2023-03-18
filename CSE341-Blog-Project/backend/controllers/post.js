const db = require('../models');
const Post = db.post;
const ObjectId = require('mongodb').ObjectId;

module.exports.create = (req, res, next) => {
  // Create a Temple
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  // Save Temple in the database
  post
    .save(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Temple.',
      });
    });
};

module.exports.getAllPost = (req, res, next) => {
  try {
    Post.find({})
      .then((data) => {
        if (data[0] == null) res.status(404).send({ message: 'Not found or Empty.'});
        else res.status(200).send(data);
        // res.status(200).send(data);
      })
      .catch((err) => {  
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.getPostId = (req, res, next) => {
  try {
   const id = new ObjectId(req.params._id);
    Post.find({ id: id })
      .then((data) => {
        if (data[0] == null) res.status(404).send({ message: 'Not found.'});
        else res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params._id);
    if (!id) {
      res.status(400).send({ message: 'Invalid post id Supplied' });
      return;
    }
    Post.findOne({ id: id }, function (err, post) {
      post.title = req.params.title;
      post.content = req.body.content;
      post.status = req.body.status;
      post.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Error occurred while updating.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params._id);
    if (!id) {
      res.status(400).send({ message: 'Invalid post Id supplied' });
      return;
    }
    Post.deleteOne({ id: id }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Error occurred while deleting.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Error occurred while deleting.');
    next(err);
  }
};
