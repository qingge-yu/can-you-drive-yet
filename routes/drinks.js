var express = require('express');
var router = express.Router();
const drinksCtrl = require('../controllers/drinks')

router.get('/', drinksCtrl.index)

module.exports = router;
