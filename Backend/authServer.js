require("dotenv").config();
const express = require("express");
// import express from 'express';
const mongoose = require("mongoose");
const User = require("./userModel.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

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

app.post("/login", async(req, res) => {
    try{
        const users = await User.find({email: req.body.email});
        const result = users.length === 1;
        if(result){
            if(await bcrypt.compare(req.body.password, users[0].password)){
                const username = users[0].name;
                const user = {name: username};
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({ name: username, token: token});
            } else{
                res.status(200).json("wrong password");    
            }
        } else {
            res.status(404).json("User not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


app.put("/usersupdate", authenticateToken, async (req, res) => {
    try{
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(req.body[1].password, 10);
            const userUpdate = {name: req.body[1].name, email: req.body[1].email, password: hashedPassword }
            const user = await User.findOneAndUpdate(req.body[0], { $set: userUpdate});

        }else {
            const userUpdate = {name: req.body[1].name, email: req.body[1].email }
            const user = await User.findOneAndUpdate(req.body[0], { $set: userUpdate});
        }
        res.status(200).json(true);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://admin:spacesecret@spaceusersdb.2ysuhsk.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5555, () => {
        console.log("Node authentication API app is running on port 5555");
    });
}).catch((error) => {
    console.log(error);
});

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token check");
    if(!token){
        return res.sendStatus(401).json("Not Authorized");
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403).json("Not Authorized");
            }
            req.user = user;
            console.log("token verified");
            next();
        });
    }
}