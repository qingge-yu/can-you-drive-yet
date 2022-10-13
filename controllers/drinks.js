const Drink = require('../models/drink')

module.exports = {
    index,
    new: newDrink,
    create,
    show,
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
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar
    const drink = new Drink(req.body)
    drink.save(function (err) {
        if (err) {
            console.log(err)
            return res.redirect('/drinks/new')
        }
        res.redirect('/drinks')
    })
}

function show(req, res) {
    Drink.findById(req.params.id, function (err, drink) {
        res.render('drinks/show', { title: 'Drink Details', drink })
    })
}

