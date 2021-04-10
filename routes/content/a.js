const router = require('express').Router();
const auth = require('../../tools/authorized')

router.get('', auth, (req, res) => {
    console.log(req)
    res.json({
        posts: {
            title: "a",

        }
    })
})

module.exports = router;


