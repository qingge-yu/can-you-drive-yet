const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    content: String
}, {
    timestamps: true
})


const drinkSchema = new Schema({
    name: String,
    amount: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: String,
    userAvatar: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Drink', drinkSchema)