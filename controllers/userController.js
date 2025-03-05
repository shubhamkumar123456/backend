const userCollection = require('../models/userCollection')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AbrakaDabra123@"



// 1+2+3+4+5+6+7+8+9+10 = 55

const registerUser = async (req, res) => {

    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { firstName, lastName, email, password } = req.body
    try {

        let user = await userCollection.findOne({ email })
        // console.log("user = ", user)
        if (user) {
            return res.status(401).json({ msg: "user already exists" })
        }
        let hashedPassword = bcrypt.hashSync(password, salt) // ajfh awk#$%^&*3t3 uryvcvjl
        let data = await userCollection.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        res.status(201).json({ msg: "user created successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const loginUser = async (req, res) => {
    //john@gmail.com
    // res.send("login is working")
    const { email, password } = req.body;
    let user = await userCollection.findOne({ email });

    if (user) {
        let comparePassword = bcrypt.compareSync(password, user.password)
        let obj = {
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
            email: user.email,
            bio: user.bio
        }

        if (comparePassword) {
            let token = jwt.sign({ _id: user._id }, JWT_SECRET,{expiresIn:'24h'});
            res.status(200).json({ msg: "login successfully", user: obj, token})
        }
        else {
            res.status(401).json({ msg: "invalid credentials" })
        }
    }
    else {
        res.status(404).json({ msg: "user not found!" })
    }

}
const updateUser = async (req, res) => {
    const { firstName, lastName, password, bio } = req.body
    // const id = req.params.id;
    const id = req.user._id

    let user = await userCollection.findByIdAndUpdate(id, req.body)
    res.send("updated successfully")


}
const deleteUser = async (req, res) => {
    res.send("delete is working")
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}