const hasher = require('./hashGenerator.js');
const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel.js");
const cors = require("cors");
const nodemailer = require('nodemailer');
const app = express();

const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    console.log( `error ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).send(error.message)
  }

//middleware json
app.use(express.json());
app.use(errorHandler);
app.use(cors()); // kann eingegrenzt werden auf bestimmte urls


//connect to database
mongoose.connect("mongodb+srv://admin:spacesecret@spaceusersdb.2ysuhsk.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(4444, () => {
        console.log("Node API app is running on port 4444");
    });
}).catch((error) => {
    console.log(error);
});


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "61ab43495c9bd4",
      pass: "058daac2ac519e"
    }
})

//routes
app.put("/passwordresetmail", async (req, res) => {
    try{
        const hashedemail = await hasher.hash(req.body.email, 10);
        const pToken = {resetToken: hashedemail};
        console.log(pToken);
        const user = await User.findOneAndUpdate(req.body, { $set: pToken });
        if(user){
            console.log(user);
            const message = createMessage(user, hashedemail);
            transporter.sendMail(message, log)
            res.status(200).json(true);
        } else {
            res.status(404).json("User not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.put("/changepassword", async (req, res) => {
    try{
        const user = await User.findOne({resetToken: req.body.resetToken});
        if(user){
            if(user.resetToken === req.body.resetToken)
            {
                console.log("found");
                const hashedPassword = await hasher.hash(req.body.password, 10);
                const userUpdate = {password: hashedPassword, resetToken: ""};
                const result = await User.findOneAndUpdate({email: user.email}, {$set: userUpdate});
                console.log(result);
                res.status(200).json(true);
            } else {
                res.status(404).json("wrong password token");
            }
        } else {
            res.status(404).json("user not found");
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

function createMessage(user, hash){
    const message = {
        from: "emailServer@email.com",
        to: user.email,
        subject: "Password reset",
        html: `<di><h1>Password reset</h1><p>Copy the token to reset the password</p>${hash}</di>`
    }

    return message;
}

function log(err, info){
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
}