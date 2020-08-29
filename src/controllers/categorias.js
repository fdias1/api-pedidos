const express = require('express')
const router = express.Router()
const Categoria = require('../models/categoria')
const Usuario = require('../models/usuario')
const {checarCredenciais} = require('./auth')

// funções das rotas
const criar = async (req,res) => {
    const {
        nome,
    } = req.body

    const categoria = new Categoria({
        nome,
        usuario:req.user.id
    })
    categoria.save((err,novaCategoria) => {
        if(err) {
            res.status(400).send({ok:false,retorno:null,mensagem:err})
        } else {
            res.status(200).send({ok:true,mensagem:null,retorno:novaCategoria})
        }
    })
}

const ler = async (req,res) => {
    try {
        const categoria = await Categoria.findOne({_id:req.params.categoria})
        if (categoria) {
            res.status(200).send({ok:true,mensagem:null,retorno:categoria})
        } else {
            res.status(400).send({ok:false,retorno:null,mensagem:'categoria não encontrada'})
        }
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const lerTodos = async (req,res) => {
    try {
        const categoria = await Categoria.find({})
        res.status(200).send({ok:true,mensagem:null,retorno:categoria})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const lerTodosPorUsuario = async (req,res) => {
    try {
        const categoria = await Categoria.find({usuario:req.user._id})
        res.status(200).send({ok:true,mensagem:null,retorno:categoria})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const editar = async (req,res) => {
    try {
        await Categoria.updateOne({_id:req.params.categoria},req.body)
        const updatedCategoria = await Categoria.findOne({_id:req.params.categoria})
        res.status(200).send({ok:true,mensagem:null,retorno:updatedCategoria})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const deletar = async (req,res) => {
    try {
        const deletedCategoria = await Categoria.findOne({_id:req.params.categoria})
        await Categoria.deleteOne({_id:req.params.categoria})
        res.status(200).send({ok:true,mensagem:null,retorno:deletedCategoria})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const atrelarProduto = async (req,res) => {
    try {
        const categoria = await Categoria.findOne({_id:req.params.categoria})
        const produtos = categoria.produtos
        produtos.push(req.query.produto)
        await Categoria.updateOne({_id:req.params.categoria},{produtos})
        res.status(200).send({ok:true,mensagem:null,retorno:"Produto atrelado"})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const removerProduto = async (req,res) => {
    try {
        const categoria = await Categoria.findOne({_id:req.params.categoria})
        let produtos = categoria.produtos
        produtos = produtos.filter(produto => produto != req.query.produto)
        await Categoria.updateOne({_id:req.params.categoria},{produtos})
        res.status(200).send({ok:true,mensagem:null,retorno:"Produto removido"})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

//rotas
router.use(checarCredenciais(1))
router.post('/',criar)
router.get('/this',lerTodosPorUsuario)
router.get('/:categoria',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:categoria',editar)
router.delete('/:categoria',deletar)

router.put('/:categoria/atrelar',atrelarProduto)
router.delete('/:categoria/remover',removerProduto)

module.exports = router
