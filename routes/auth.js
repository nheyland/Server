const User = require('../models/user')
const router = require('express').Router();
const { registerValidation } = require('../tools/validations/register')
const bcrypt = require('bcryptjs')

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

module.exports = router;