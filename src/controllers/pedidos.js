/**
 cliente
 pedido
 formaEntrega 
 */

const express = require('express')
const router = express.Router()
const Pedido = require('../models/pedido')
const {Endereco} = require('../models/endereco')
const {checarCredenciais} = require('./auth')

// funções das rotas
const criar = async (req,res) => {
    const {
        cliente,
        catalogo,
        formaEntrega
    } = req.body

    const pedido = new Pedido({
        cliente,
        catalogo,
        formaEntrega
    })
    pedido.save((err,novaPedido) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(novaPedido)
        }
    })
}

const ler = async (req,res) => {
    try {
        const pedido = await Pedido.findOne({_id:req.params.pedido})
        if (pedido) {
            res.status(200).send(pedido)
        } else {
            res.status(400).send({message:'pedido não encontrado'})
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const lerTodos = async (req,res) => {
    try {
        const pedido = await Pedido.find({})
        res.status(200).send(pedido)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const editar = async (req,res) => {
    try {
        const updatedPedido = await Pedido.updateOne({_id:req.params.pedido},req.body)
        res.status(200).send(updatedPedido)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const deletar = async (req,res) => {
    try {
        const deletedPedido = await Pedido.deleteOne({_id:req.params.pedido})
        res.status(200).send(deletedPedido)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

//rotas
router.use(checarCredenciais(1))
router.post('/',criar)
router.get('/this',lerTodosPorUsuario)
router.get('/:pedido',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:pedido',editar)
router.delete('/:pedido',deletar)


module.exports = router
