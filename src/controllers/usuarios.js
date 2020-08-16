const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const { authenticate } = require('passport')
const localStrategy = require('passport-local').Strategy
const Usuario = require('../models/usuario')

//função de autenticação
const autenticar = async (email, senha, done) => {
    try {
        if (!email || !senha) {
            return done(null,false,{message:'É necessário preencher usuário e senha'})
        }
        const usuario = await Usuario.findOne({email})
        if (usuario) {
            const autenticado = bcrypt.compareSync(senha,usuario.senha)
            if (autenticado) {
                return done(null,usuario)
            } else {
                return done(null,false,{message:'Usuário ou senha incorretos'})
            }
        } else {
            return done(null,false,{message:'Usuário ou senha incorretos'})
        }
    } catch (err) {
        done(err)
    }
}

// configuração da nova estratégia
passport.use(new localStrategy({ usernameField:'email',passwordField:'senha'},
autenticar))

passport.serializeUser((usuario,done) => {
    done(null,usuario.id)
})
passport.deserializeUser(async (id,done) => {
    const usuario = await Usuario.findOne({_id:id})
    return done(null, usuario)
})

// funções das rotas
const registrar = (req,res) => {
    const {
        nome,
        sobrenome,
        email,
        senha,
        documento,
        tipoDocumento,
    } = req.body

    const usuario = new Usuario({
        nome,
        sobrenome,
        email,
        senha:bcrypt.hashSync(senha,10),
        documento,
        tipoDocumento,
    })
    usuario.save((err,novoUsuario) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(novoUsuario)
        }
    })
}

const logOut = (req,res) => {
    req.logOut()
    res.redirect('/usuarios/login')
}

const isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

const isNotAuthenticated = (req,res,next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

// configuração das rotas
const passportAuthConfiguration = {
    successRedirect:'/',
    failureRedirect:'/usuarios/login',
    failureFlash:true
}

router.post('/registrar',isNotAuthenticated,registrar)
router.post('/login',isNotAuthenticated,passport.authenticate('local',passportAuthConfiguration))
router.get('/login',isNotAuthenticated,(req,res) => res.render('./usuarios/login.ejs',{user:req.user}))
router.get('/registrar',isNotAuthenticated,(req,res) => res.render('./usuarios/registrar.ejs'))
router.get('/logout',logOut)

module.exports = router