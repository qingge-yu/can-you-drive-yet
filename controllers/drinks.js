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

async function create(req, res) {
    req.body.user = req.user._id
    let drink = await Drink.create(req.body)
    try {
        if (drink) {
            drink.save(function (err) {
                res.redirect(`/drinks`)
            })
        }
    } catch (err) {
        res.redirect('/drinks/new')
        console.log(err.message)
    }
}

// function create(req, res) {
//     console.log(req.body.name)
//     req.body.user = req.user._id
//     req.body.userName = req.user.name
//     req.body.userAvatar = req.user.avatar
//     const drink = new Drink(req.body)
//     drink.save(function (err) {
//         if (err) {
//             console.log(err)
//             return res.redirect('/drinks/new')
//         }
//         res.redirect(`/drinks/index`)
//     })
// }

function show(req, res) {
    Drink.findById(req.params.id, function (err, drink) {
        console.log(drink)
        res.render('drinks/show', { title: 'Drink Details', drink })
    })
}



// function update(req, res) {
//     console.log('I AM HERE')
//     Drink.findById(req.params.id, function (err, drink, review) {
//         console.log("DRINK: " + drink)
//         //const drinkSubdoc = drink._id(req.params.id)
//         // console.log("DRINK REVIEW: " + drink.reviews)
//         //if (!drinkSubdoc.user.equals(req.user._id)) return res.redirect(`/drinks/${drink._id}`)
//         drink.reviews.content = req.body.reviews.content
//         drink.save(function (err) {
//             console.log('UPDATE ERROR: ' + err)
//             res.redirect(`/drinks/${drink._id}`)
//         })
//     })
// }

// function update(req, res) {
//     Drink.findOneAndUpdate(
//         { _id: req.params.id, user: req.user._id },
//         req.body,
//         { new: true },
//         function (err, drink) {
//             if (err) {
//                 console.log(err)
//                 return res.redirect('/drinks')
//             }
//             res.redirect(`/drinks`)
//         }
//     )
// }