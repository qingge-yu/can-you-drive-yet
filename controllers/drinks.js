const Drink = require('../models/drink')

module.exports = {
    index,
    new: newDrink,
    create,
}

function index(req, res) {
    Drink.find({}, function (err, drinks) {
        res.render('drinks/index', { title: 'Record Your Drinks', drinks })
    })
}

function newDrink(req, res) {
    res.render('drinks/new', { title: 'Add New Drink' })
}

function create(req, res) {
    const drink = new Drink(req.body)
    drink.save(function (err) {
        if (err) return res.redirect('/drinks/new')
        res.redirect('/drinks')
    })
}