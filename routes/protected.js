const router = require('express').Router();
const auth = require('./auth')


router.get('/authd', auth, (req, res) => {
    res.json({
        posts: {
            title: "Here",
            desc: "THIS is TopSecerTeee"
        }
    })
})



module.exports = router;


