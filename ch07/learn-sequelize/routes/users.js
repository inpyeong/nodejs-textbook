var express = require('express');
var User = require('../models').User;

var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.age,
    });
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
