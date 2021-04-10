
const router = require('express').Router();
const auth = require('../../tools/authorized')

router.get('', auth, (req, res) => {
    res.send('http://localhost:3000/api/user/register')

})

module.exports = router;