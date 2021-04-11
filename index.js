
const PORT = process.env.PORT || 5000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const register = require('./routes/secure/register')
const login = require('./routes/secure/login')

const a = require('./routes/content/a')
const b = require('./routes/content/b')




const cool = require('cool-ascii-faces');
const path = require('path');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));




dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware
app.use(express.json())

// Routes
app.use('/register', register)
app.use('/login', login)
app.use('/a', a)
app.use('/b', b)



app.listen(PORT, () => console.log('Server Running....'))

