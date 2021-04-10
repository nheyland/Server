const User = require('../models/user')
const router = require('express').Router();
const { registerValidation, loginValidation } = require('../models/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

router.post('/register', async (req, res) => {
    // Validation
    registerValidation(req).error && res.status(400).send(registerValidation(req).error.message)

    // Check if email exsists
    const uniqueEmail = await User.findOne({ email: req.body.email })
    uniqueEmail && res.status(400).send('Email already exists in database')

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)


    // Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });

    // Send to Database
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/login', async (req, res) => {

    // Sanitize PostData
    loginValidation(req).error && res.status(400).send(loginValidation(req).error.message)

    // Check if user exists
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(400).send('Incorrect!')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    !validPass && res.status(400).send('Incorrect! Pass')


    // Assign Token
    const token = jwt.sign({
        id: user._id,
        auth: true,
    }, process.env.TOKEN)
    console.log(token)
    res.header('auth', token).send('Logged In')
})



module.exports = router;