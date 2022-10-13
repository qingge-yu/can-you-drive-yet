var express = require('express');
var router = express.Router();
const drinksCtrl = require('../controllers/drinks')
const isLoggedIn = require('../config/auth')

router.get('/', drinksCtrl.index)
router.get('/new', drinksCtrl.new)
router.post('/', drinksCtrl.create)
router.get('/:id', isLoggedIn, drinksCtrl.show)


module.exports = router;
