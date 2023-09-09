const router = require("express").Router();
const { register,login, details} = require("../CONTROLLERS/user");
const {fetchUser}=require('../MIDDLEWARES/fetchUser')

//Routers for Users
router.post("/register",register);
router.post("/login",login)
router.post("/details",fetchUser,details)

module.exports={"user_route":router}

