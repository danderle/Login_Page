require("dotenv").config();
const express = require("express");
// import express from 'express';
const mongoose = require("mongoose");
const User = require("./userModel.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
// import { getUser } from 
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

//routes
app.get("/users", async(req, res) => {
    try{
        console.log("users call");
        const users = await User.find({});
        console.log(users);
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post("/userexists", async(req, res) => {
    try{
        console.log("user exist check");
        console.log(req.body);
        const users = await User.find(req.body);
        console.log(users);
        if(!users.length){
            console.log("empty");
            res.status(200).json(false);
        } else {
            console.log(true);
            res.status(200).json(true);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post("/username", async(req, res) => {
    try{
        console.log("get user name");
        console.log(req.body);
        const users = await User.find(req.body);
        console.log(users);
        const result = users.length === 1;
        if(result){
            res.status(200).json(users[0].name);
        } else {
            res.status(404).json("User not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post("/login", async(req, res) => {
    try{
        console.log("login");
        console.log(req.body);

        const users = await User.find({email: req.body.email});
        console.log(users);
        const result = users.length === 1;
        if(result){
            if(await bcrypt.compare(req.body.password, users[0].password)){
                const username = users[0].name;
                console.log(username);
                const user = {name: username};
                console.log(user);
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
        console.log("user update");
        console.log(req.body);
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(req.body[1].password, 10);
            console.log(hashedPassword);
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


app.post("/register", async(req, res) => {
    try{
        console.log("register user");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const newUser = { name: req.body.name, email: req.body.email, password: hashedPassword};
        const user = await User.create(newUser);
        console.log(user);
        if(user){
            res.status(200).json(true);
        } else {
            res.status(404).json("User not registered");
        }

    } catch(error){
        console.log(error.message),
        res.status(500).json({message: error.message});
    }
});

app.delete("/deleteAll", async(req, res) => {
    try{
        console.log(req.params);
        const user = await User.deleteMany({});
        res.status(200).json(user);
    } catch(error){
        console.log(error.message),
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://admin:spacesecret@spaceusersdb.2ysuhsk.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5050, () => {
        console.log("Node API app is running on port 5050");
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