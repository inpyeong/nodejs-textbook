var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error(err);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Comment.update({
      comment: req.body.comment
    }, {
      where: { id: req.params.id }
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Comment.destroy({
      where: { id: req.params.id }
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
