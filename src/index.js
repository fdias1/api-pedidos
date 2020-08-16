//.end configuration
require('dotenv').config()

//express
const express = require('express')
const { json, urlencoded } = require('express')
const session = require('express-session')
const flash = require('express-flash')
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

//Controllers
const usuarios = require('./controllers/usuarios')
const clientes = require('./controllers/clientes')

//app configuration
const ExpressSessionConfig = {
    secret:process.env.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}

const isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/usuarios/login')
    }
}

const isNotAuthenticated = (req,res,next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/home')
    }
}

app.set('view engine','ejs')
app.set('views',__dirname+'\\views')
app.use(urlencoded({extended:false}))
app.use(json())
app.use(flash())
app.use(session(ExpressSessionConfig))
app.use(passport.initialize())
app.use(passport.session())

// routes cofiguration
// main route
app.get('/',isAuthenticated,(req,res) => res.render('index.ejs'))
// cotrolled routes
app.use('/usuarios',usuarios)
app.use('/clientes',clientes)
app.get('/usuarios',(req,res,next) => res.redirect('/'))
app.get('/clientes',(req,res,next) => res.redirect('/'))



// starting app
app.listen(process.env.PORT || 3000, )