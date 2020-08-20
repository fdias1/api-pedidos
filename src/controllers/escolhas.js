const express = require('express')
const router = express.Router()
const Escolha = require('../models/escolha')
const Usuario = require('../models/usuario')
const {checarCredenciais} = require('./auth')

// funções das rotas
const criar = async (req,res) => {
    const {
        nome,
        preco,
        tipo,
        qtdMax,
        qtdMin,
        vlrMax,
        vlrMin,
        listaOpcoes,
    } = req.body

    const escolha = new Escolha({
        nome,
        preco,
        tipo,
        qtdMax,
        qtdMin,
        vlrMax,
        vlrMin,
        listaOpcoes,
        usuario:req.user.id
    })
    escolha.save((err,novaEscolha) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(novaEscolha)
        }
    })
}

const ler = async (req,res) => {
    try {
        const escolha = await Escolha.findOne({_id:req.params.escolha})
        if (escolha) {
            res.status(200).send(escolha)
        } else {
            res.status(400).send({message:'Escolha não encontrada'})
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const lerTodos = async (req,res) => {
    try {
        const escolha = await Escolha.find({})
        res.status(200).send(escolha)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const lerTodosPorUsuario = async (req,res) => {
    try {
        const escolha = await Escolha.find({usuario:req.user.id})
        res.status(200).send(escolha)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const editar = async (req,res) => {
    try {
        const updatedEscolha = await Escolha.updateOne({_id:req.params.escolha},req.body)
        res.status(200).send(updatedEscolha)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const deletar = async (req,res) => {
    try {
        const deletedEscolha = await Escolha.deleteOne({_id:req.params.escolha})
        res.status(200).send(deletedEscolha)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

//rotas
router.use(checarCredenciais(1))
router.post('/',criar)
router.get('/this',lerTodosPorUsuario)
router.get('/:escolha',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:escolha',editar)
router.delete('/:escolha',deletar)

module.exports = router
