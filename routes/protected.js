const router = require('express').Router();
const auth = require('./TokenAuth')


router.get('/authd', auth, (req, res) => {
    res.json({
        posts: {
            title: "Herel",
            desc: "THIS is TopSecerTeee"
        }
    })
})



module.exports = router;


