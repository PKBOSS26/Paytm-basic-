
const mongoose = require('mongoose')

mongoose.connect('')//enter your mongo link
    .then("Mongo Connected")


// elegant schema
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};