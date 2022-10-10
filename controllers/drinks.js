const Drink = require('../models/drink')

module.exports = {
    index
}

function index(req, res) {
    res.render('drinks/index', { title: 'Record Your Drinks' })
}