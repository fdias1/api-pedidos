//.env configuration
process.env.NODE_ENV !== 'prd' ? require('dotenv').config() : null


//test

const port = process.env.PORT || 3000

//express
const express = require('express')
const { json } = require('express')
const session = require('express-session')
const app = express()

//auth
const passport = require('passport')

//database
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false },
    err => err ? console.log('error:',err) : console.log('Database Connected')
)

//app configuration
const ExpressSessionConfig = {
    secret:process.env.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}

app.use(json())
app.use(session(ExpressSessionConfig))
app.use(passport.initialize())
app.use(passport.session())

//Controllers
const auth = require('./controllers/auth').router
const usuarios = require('./controllers/usuarios')
const clientes = require('./controllers/clientes')
const escolhas = require('./controllers/escolhas')
const produtos = require('./controllers/produtos')
const categorias = require('./controllers/categorias')
const catalogos = require('./controllers/catalogos')

// routes cofiguration
app.use('/auth',auth)
app.use('/usuarios',usuarios)
app.use('/clientes',clientes)
app.use('/escolhas',escolhas)
app.use('/produtos',produtos)
app.use('/categorias',categorias)
app.use('/catalogos',catalogos)

// starting app
app.listen(port, console.log(`Connected and listening port ${port}`))
