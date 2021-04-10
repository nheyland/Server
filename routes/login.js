const User = require('../models/user')
const router = require('express').Router();
const { loginValidation } = require('../tools/validations/login')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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