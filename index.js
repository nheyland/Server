
const PORT = process.env.PORT || 5000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const register = require('./routes/secure/register')
const login = require('./routes/secure/login')

const a = require('./routes/content/a')
const b = require('./routes/content/b')


dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware
app.use(express.json())

// Routes
app.use('/register', register)
app.use('/login', login)
app.get('/', (req, res) => {
    res.send('Hello Wolrd')
})
app.use('/a', a)
app.use('/b', b)



app.listen(PORT, () => console.log('Server Running....'))

