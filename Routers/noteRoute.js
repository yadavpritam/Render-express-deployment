const express=require("express");
const auth=require("../middleware/auth")
const { getNote, createNote, deleteNote, updateNote } = require("../Controller/noteController");
const noteRouter=express.Router();

noteRouter.get("/",auth, getNote)
noteRouter.post("/",auth,createNote)
noteRouter.put("/:id",auth,updateNote)
noteRouter.delete("/:id",auth,deleteNote)


module.exports=noteRouter;