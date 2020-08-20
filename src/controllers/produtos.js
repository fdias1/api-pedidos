const express = require('express')
const router = express.Router()
const Produto = require('../models/produto')
const Usuario = require('../models/usuario')
const {checarCredenciais} = require('./auth')

// funções das rotas
const criar = async (req,res) => {
    const {
        nome,
        descricao,
        pathFoto,
        preco,
        escolhas,
    } = req.body

    const produto = new Produto({
        nome,
        descricao,
        pathFoto,
        preco,
        escolhas,
        usuario:req.user.id
    })
    produto.save((err,novoProduto) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(novoProduto)
        }
    })
}

const ler = async (req,res) => {
    try {
        const produto = await Produto.findOne({_id:req.params.produto})
        if (produto) {
            res.status(200).send(produto)
        } else {
            res.status(400).send({message:'produto não encontrada'})
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const lerTodos = async (req,res) => {
    try {
        const produto = await Produto.find({})
        res.status(200).send(produto)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const lerTodosPorUsuario = async (req,res) => {
    try {
        const produto = await Produto.find({usuario:req.user.id})
        res.status(200).send(produto)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const editar = async (req,res) => {
    try {
        const updatedProduto = await Produto.updateOne({_id:req.params.produto},req.body)
        res.status(200).send(updatedProduto)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const deletar = async (req,res) => {
    try {
        const deletedProduto = await produto.deleteOne({_id:req.params.produto})
        res.status(200).send(deletedProduto)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const atrelarEscolha = async (req,res) => {
    try {
        const produto = await Produto.findOne({_id:req.params.produto})
        const escolhas = produto.escolhas
        escolhas.push(req.query.escolha)
        await Produto.updateOne({_id:req.params.produto},{escolhas})
        res.status(200).send({message:"Escolha atrelada"})
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const removerEscolha = async (req,res) => {
    try {
        const produto = await Produto.findOne({_id:req.params.produto})
        let escolhas = produto.escolhas
        escolhas = escolhas.filter(escolha => escolha != req.query.escolha)
        await Produto.updateOne({_id:req.params.produto},{escolhas})
        res.status(200).send({message:"Escolha removida"})
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

//rotas
router.use(checarCredenciais(1))
router.post('/',criar)
router.get('/this',lerTodosPorUsuario)
router.get('/:produto',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:produto',editar)
router.delete('/:produto',deletar)

router.put('/:produto/atrelar',atrelarEscolha)
router.delete('/:produto/remover',removerEscolha)

module.exports = router
