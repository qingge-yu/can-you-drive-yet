const express = require('express')
const router = express.Router()
const reviewsCtrl = require('../controllers/reviews')
const isLoggedIn = require('../config/auth')

router.get('/drinks/:id/reviews', isLoggedIn, reviewsCtrl.index)
router.post('/drinks/:id/reviews', isLoggedIn, reviewsCtrl.create)
router.put('/drinks/:id', isLoggedIn, reviewsCtrl.update)


module.exports = router