const Drink = require('../models/drink')

module.exports = {
    create,
    index,
    update,
    delete: deleteReview
}


function create(req, res) {
    Drink.findById(req.params.id, function (err, drink) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        drink.reviews.push(req.body)
        drink.save(function (err) {
            console.log(drink)
            res.redirect(`/drinks`)
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
    console.log('I AM HERE', req.body)
    Drink.findById(req.params.drinksid, function (err, drink) {
        console.log("DRINK: " + drink)
        const reviewSubdoc = drink.reviews.id(req.params.reviewid)

        console.log("DRINK REVIEW: " + reviewSubdoc)
        if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/drinks/${drink._id}`)
        reviewSubdoc.content = req.body.content
        drink.save(function (err) {
            console.log(err)
            res.redirect(`/drinks/${drink._id}`)
        })
    })
}

function deleteReview(req, res) {
    Drink.findById(req.params.drinkid,
        function (err, drink) {
            console.log("-----" + drink)
            if (err) return res.redirect(`/drinks/${drink._id}`);
            drink.reviews.remove(req.params.reviewid);
            drink.save(function (err) {
                console.log("------" + err)
                return res.redirect(`/drinks/${drink._id}`);
            })
        });
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

