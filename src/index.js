const express = require("express");
const mongoose = require("mongoose");
const dotenv=require("dotenv").config();
const cors=require("cors")
const userRouter = require("../Routers/userRoute");
const noteRouter = require("../Routers/noteRoute");
const { log } = require("console");


const app = express();
app.use(cors());

// **Important** → JSON data parse karne ke liye
app.use(express.json());


app.use((req,res,next)=>{
    console.log("HTTP Mehtod -" + req.method + ", URL -" + req.url);
    next();
})



// Routes
app.use("/users", userRouter);
app.use("/note", noteRouter);

// Default Route
app.get("/", (req, res) => {
    res.send("Hello my name is Pritam");
});

const PORT=process.env.PORT || 5000;

// DB Connect & Server Start
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected ✅");
        app.listen(PORT, () => {
            console.log("Server started on port no. " + PORT);
        });
    })
    .catch((error) => {
        console.log("Database connection error ❌", error);
    });
