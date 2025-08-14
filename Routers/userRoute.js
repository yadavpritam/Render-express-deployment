const express = require("express");
const { signin, signup } = require("../Controller/userController");

const userRouter = express.Router();

// Signup route
userRouter.post("/signup", signup);

// Signin route
userRouter.post("/signin", signin);

module.exports = userRouter;
