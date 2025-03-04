const userCollection = require('../models/userCollection')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const {validationResult} = require('express-validator')


const registerUser = async(req,res)=>{

    let error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

     const {firstName, lastName , email , password} = req.body
try {

    let user = await userCollection.findOne({email})
    // console.log("user = ", user)
    if(user){
        return res.status(401).json({msg:"user already exists"})
    }
    let hashedPassword = bcrypt.hashSync(password, salt) // ajfh awk#$%^&*3t3 uryvcvjl
    let data = await userCollection.create({
        firstName,
        lastName,
        email,
        password:hashedPassword
     })
     res.status(201).json({msg:"user created successfully"})
} catch (error) {
    res.status(500).json({error:error.message})
}

}

const loginUser = async(req,res)=>{
    res.send("login is working")
}
const updateUser = async(req,res)=>{
    res.send("update is working")
}
const deleteUser = async(req,res)=>{
    res.send("delete is working")
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}