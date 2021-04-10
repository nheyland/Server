const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const secret = require('./routes/protected')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware
app.use(express.json())


app.use('/login', authRoute)
app.use('/protected', secret)


app.get('/', (req, res) => {
    res.send('http://localhost:3000/api/user/register')
})



// http://localhost/3000/api/user/register
app.listen(3000, () => console.log('Server Running....'))

