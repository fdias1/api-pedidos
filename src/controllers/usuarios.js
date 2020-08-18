const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')
const {checarCredenciais} = require('./auth')


// funções das rotas
const criar = (req,res) => {
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

const ler = async (req,res,next) => {
    try {
        const usuario = await Usuario.findOne({_id:req.params.usuario})
        if (usuario) {
            res.status(200).send(usuario)
        } else {
            res.status(400).send({message:'Usuário não encontrado'})   
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar a operação'})   
    }
}

const lerTodos = async (req,res,next) => {
    try {
        const usuarios = await Usuario.find({})
        if (usuarios) {
            res.status(200).send(usuarios)
        } else {
            res.status(400).send({message:'Não foram encontrados usuarios'})   
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar a operação'})   
    }
}

const editar = async (req,res,next) => {
    try {
        const updatedUsuario = await Usuario.updateOne(req.params.id,req.body)
        res.status(200).send(updatedUsuario)   
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar a operação'})   
    }
}

const deletar = async (req,res,next) => {
    try {
        const deletedUsuario = await Usuario.deleteOne(req.params.id)
        res.status(200).send(deletedUsuario)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar a operação'})   
    }
}

// configuração das rotas
router.post('/',criar)
router.use(checarCredenciais(1))
router.get('/:usuario',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:usuario',editar)
router.delete('/:usuario',checarCredenciais(2),deletar)

module.exports = router
