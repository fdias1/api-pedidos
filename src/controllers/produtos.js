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
    const usuario = await Usuario.findOne({_id:req.user.id})
    const produtos = usuario.produtos
    produtos.push(produto.id)
    await Usuario.updateOne({_id:produto.usuario},{produtos})
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
        const produto = await Produto.findOne({_id:req.params.produto})
        const usuario = await Usuario.findOne({_id:produto.usuario})
        const produtos = usuario.produtos
        const updatedProdutos = produtos.filter(idProduto => idProduto != req.params.produto)
        Usuario.updateOne({_id:produto.usuario},{produtos:updatedProdutos})
        const deletedProduto = await produto.deleteOne({_id:req.params.produto})
        res.status(200).send(deletedProduto)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

/**
 * TO DO: funções de atrelar e desatrelar escolhas aos produtos.
 */

//rotas
//router.use(checarCredenciais(1))
router.post('/',criar)
router.get('/:produto',ler)
router.get('/',checarCredenciais(0),lerTodos)
router.put('/:produto',editar)
router.delete('/:produto',deletar)

module.exports = router
