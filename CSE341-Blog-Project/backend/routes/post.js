const express = require('express');
const router = express.Router();
require('dotenv').config();

const postController = require('../controllers/post');

//TODO https://localhost/post CRUD

router.post('/', postController.create);
router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostId);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;