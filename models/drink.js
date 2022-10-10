const mongoose = require('mongoose')
const Schema = mongoose.Schema

const drinkSchema = new Schema({
    name: String,
    amount: { type: Number, min: 1, default: 1 },
    // user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // userName: String,
    // userAvatar: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Drink', drinkSchema)