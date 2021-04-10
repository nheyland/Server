const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('auth')
    !token && res.status(401).send('Access Denied')
    try {
        req.user = jwt.verify(token, process.env.TOKEN)
        next()

    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth


