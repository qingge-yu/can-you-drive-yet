const Drink = require('../models/drink')

module.exports = {
    create,
    index,
    update
}


function create(req, res) {
    Drink.findById(req.params.id, function (err, drink) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        drink.reviews.push(req.body)
        drink.save(function (err) {
            res.redirect(`/drinks/${drink._id}/reviews`)
        })
    })
}

function index(req, res) {
    Drink.find({}, function (err, drinks, reviews) {
        if (err) {
            console.log(err)
            return res.render('drinks/index', { title: "Record Your Drinks", review: [] })
        }
        // console.log(reviews)
        res.render('drinks/index', { title: 'Record Your Drinks', reviews, drinks })
    })
}

function update(req, res) {
    console.log('I AM HERE')
    Drink.findOne({ 'review._id': req.params.id }, function (err, drink) {
        console.log(drink)
        const reviewSubdoc = drink.reviews.id(req.params.id)
        console.log(drink.reviews)
        if (!reviewSubdoc.id.equals(req.user._id)) return res.redirect(`/drinks/${drink._id}`)
        reviewSubdoc.content = req.body.content
        drink.save(function (err) {
            console.log('UPDATE ERROR: ' + err)
            res.redirect(`/drinks/${drink._id}`)
        })
    })
}


// function update(req, res) {
//     Drink.findOneAndUpdate(
//         { _id: req.params.id },
//         req.body,
//         { new: true },
//         function (err, review, drink) {
//             if (err || !review) return res.redirect('/drinks')
//             res.redirect(`/drinks/${drink._id}`)
//         }
//     )
// }

