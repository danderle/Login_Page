const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel.js");
const cors = require("cors");
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
app.use(cors());

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

app.post("/findUser", async(req, res) => {
    try{
        console.log("find user call");
        console.log(req.body);
        const user = await User.find(req.body);
        console.log(user);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.put("/users/update", async(req, res) => {
    try{
        console.log(req.body);
        const user = await User.findOneAndUpdate(req.body[0], { $set: req.body[1]});
        console.log(user);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


app.post("/users", async(req, res) => {
    try{
        console.log("create user");
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(200).json(user);
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