const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')
const {checarCredenciais} = require('./auth')


// funções das rotas
const criar = (req,res) => {
    const {
        tipoDocumento,
        documento,
        nome,
        email,
        senha,
    } = req.body

    const usuario = new Usuario({
        nome,
        email,
        senha:bcrypt.hashSync(senha,10),
        documento,
        tipoDocumento,
    })
    usuario.save((err,novoUsuario) => {
        if(err) {
            res.status(400).send({ok:false,retorno:null,mensagem:err})
        } else {
            res.status(200).send({ok:true,mensagem:null,retorno:novoUsuario})
        }
    })
}

const ler = async (req,res,next) => {
    try {
        const usuario = await Usuario.findOne({_id:req.params.usuario})
        if (usuario) {
            res.status(200).send({ok:true,mensagem:null,retorno:usuario})
        } else {
            res.status(400).send({ok:false,retorno:null,mensagem:'Usuário não encontrado'})   
        }
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar a operação'})   
    }
}

const lerUsuarioLogado = async (req,res,next) => {
    try {
        const usuario = await Usuario.findOne({_id:req.user.id})
        if (usuario) {
            res.status(200).send({ok:true,mensagem:null,retorno:usuario})
        } else {
            res.status(400).send({ok:false,retorno:null,mensagem:'Usuário não encontrado'})   
        }
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar a operação'})   
    }
}

const lerTodos = async (req,res,next) => {
    try {
        const usuarios = await Usuario.find({})
        if (usuarios) {
            res.status(200).send({ok:true,mensagem:null,retorno:usuarios})
        } else {
            res.status(400).send({ok:false,retorno:null,mensagem:'Não foram encontrados usuarios'})   
        }
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar a operação'})   
    }
}

const editar = async (req,res,next) => {
    try {
        const updatedUsuario = await Usuario.updateOne({_id:req.params.usuario},req.body)
        res.status(200).send({ok:true,mensagem:null,retorno:updatedUsuario})   
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar a operação'})   
    }
}

const deletar = async (req,res,next) => {
    try {
        const deletedUsuario = await Usuario.deleteOne({_id:req.params.usuario})
        res.status(200).send({ok:true,mensagem:null,retorno:deletedUsuario})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar a operação'})   
    }
}

// configuração das rotas
router.post('/',criar)
router.use(checarCredenciais(1))
router.get('/this',lerUsuarioLogado)
router.get('/:usuario',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:usuario',editar)
router.delete('/:usuario',checarCredenciais(2),deletar)

module.exports = router
