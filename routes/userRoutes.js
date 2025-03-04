const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();
const {body} = require('express-validator')

router.post('/create', [
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 character long'),
    body('firstName').isLength({min:3}).withMessage('first name should be atleast 3 character long')
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 character long'),  
],loginUser)

router.put('/update',updateUser)
router.delete('/delete',deleteUser)




module.exports = router