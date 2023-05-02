const hasher = require('./hashGenerator.js');
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
app.use(cors()); // kann eingegrenzt werden auf bestimmte urls

//connect to database
mongoose.connect("mongodb+srv://admin:spacesecret@spaceusersdb.2ysuhsk.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5050, () => {
        console.log("Node API app is running on port 5050");
    });
}).catch((error) => {
    console.log(error);
});


//routes
app.post("/userexists", async (req, res) => {
    try{
        const user = await User.findOne(req.body);
        if(!user){
            res.status(200).json(false);
        } else {
            res.status(200).json(true);
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post("/username", async(req, res) => {
    try{
        const user = await User.findOne(req.body);
        if(user){
            res.status(200).json(user.name);
        } else {
            res.status(404).json("User not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post("/register", async(req, res) => {
    try{
        const hashedPassword = await hasher.hash(req.body.password);
        console.log(hashedPassword);
        const newUser = { name: req.body.name, email: req.body.email, password: hashedPassword};
        console.log(newUser);
        const user = await User.create(newUser);
        if(user){
            res.status(200).json(true);
        } else {
            res.status(404).json("User not registered");
        }

    } catch(error){
        res.status(500).json({message: error.message});
    }
});

//only for testing
app.delete("/deleteAll", async(req, res) => {
    try{
        const user = await User.deleteMany({});
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

//only for testing
app.get("/users", async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});