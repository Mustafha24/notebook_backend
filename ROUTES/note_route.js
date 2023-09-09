const router = require("express").Router();
const { allnotes,addnote, updatenote,deletenote} = require("../CONTROLLERS/notes");
const { fetchUser } = require("../MIDDLEWARES/fetchUser");
router.get("/allnotes", fetchUser, allnotes);
router.post('/addnote',fetchUser,addnote)
router.put('/updatenote/:id',fetchUser,updatenote)
router.delete('/deletenote/:id',fetchUser,deletenote)
module.exports = { note_route: router };
