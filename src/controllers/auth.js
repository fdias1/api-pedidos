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
            return done(null,false)
        }
        const usuario = await Usuario.findOne({email})
        if (usuario) {
            const autenticado = bcrypt.compareSync(senha,usuario.senha)
            if (autenticado) {
                return done(null,usuario)
            } else {
                return done(null,false)
            }
        } else {
            return done(null,false)
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

// funções 
const logOut = (req,res) => {
    req.logOut()
    res.status(200).send({ok:true,mensagem:null,retorno:"sessão encerrada"})
}

/**
 * Existem 3 tipos de credenciais:
 * 1 - Não logado
 * 2 - Logado
 * 3 - Administrador
 * 
 * Esta função deve conferir qual das tres categorias o usuario pertence, e decidir
 * se a requisição deve seguir, ou ser devolvida como codigo 401
 */

 const checarCredenciais = nivelNecessario => {
    const auth = (req,res,next) => {
        var credencial = 0
        if(req.isAuthenticated()){
            credencial = 1
            if(req.user.id === process.env.ADMIN) {
                credencial = 2
            }
        }
        credencial >= nivelNecessario ? next() : res.status(401).send({ok:false,retorno:null,mensagem:'não autorizado'})
    }
    return auth
 }

// configuração das rotas
router.post('/login',passport.authenticate('local'),(req,res) => res.send({ok:true,mensagem:null,retorno:'Login realizado com sucesso'}))

router.delete('/logout',logOut)

module.exports = {router,checarCredenciais}
