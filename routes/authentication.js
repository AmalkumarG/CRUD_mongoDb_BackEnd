var express=require("express")
var router=express.Router()
const {registerUser,userExist,change,login, deleteuser} =require("../Services/authentication.services")

router.post("/register",async(req,res,next)=>{
    let body =req.body
    let response=await registerUser(body)
    res.json(response)
})
router.get("/userExist",async(req,res,next)=>{
    let params =req.query
    let response=await userExist(params)
    res.json(response)
})
router.post("/change",async(req,res,next)=>{
    let body =req.body
    let response=await change(body)
    res.json(response)
})
router.post("/login",async(req,res,next)=>{
    let body =req.body
    let response=await login(body)
    res.json(response)
})
router.post("/delete",async(req,res,next)=>{
    let body =req.body
    let response=await deleteuser(body)
    res.json(response)
})
module.exports=router