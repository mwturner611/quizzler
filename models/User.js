const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: "Email is Required",
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({length}) => length >= 8, "Password should be 8 characters or more."]
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    decks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Deck"
        }
    ]


});

const User = mongoose.model("User", UserSchema);

module.exports = User;