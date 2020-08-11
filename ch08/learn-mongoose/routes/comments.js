var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error(error);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  try {
    const result = comment.save();
    Comment.populate(result, { path: 'commenter' });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Comment.update({ _id: req.params.id }, { comment: req.body.comment });
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Comment.remove({ _id: req.params.id });
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
