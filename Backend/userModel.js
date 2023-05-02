const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a username"]
        },
        email:{
            type: String,
            required: [true, "Enter an email"]
        },
        password: {
            type: String,
            required: [true, "Enter a password"]
        },
        resetToken: {
            type: String,
            default: "",
            required: [false, "Only for password reset"]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

