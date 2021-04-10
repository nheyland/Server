const router = require('express').Router();
const auth = require('../../tools/authorized')

router.get('', auth, (req, res) => {
    console.log(req.headers.auth)
    res.json({
        posts: {
            title: "a",

        }
    })
})

module.exports = router;


