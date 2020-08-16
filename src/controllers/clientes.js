const axios = require('axios')
const express = require('express')
const router = express.Router()
const {Endereco} = require('../models/endereco')
const Cliente = require('../models/cliente')

//rotas
router.post('/registrar',async (req,res,next) => {
    const {
        nome,
        telefone,
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        numero,
        uf,
    } = req.body
    const endereco = new Endereco({
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        numero,
        uf
    })
    const cliente = new Cliente({
        nome,
        telefone,
        enderecos:[endereco]
    })
    cliente.save((err,novoCliente) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(novoCliente)
        }
    })
})

// recuperar usuario
router.get('/get/:telefone',async (req,res,next) => {
    const telefone = req.params.telefone
    const cliente = await Cliente.findOne({telefone})
    res.status(200).send(cliente)
})

// editar usuario
router.post('/:telefone/editar',async (req,res,next) => {
    const telefone = req.params.telefone
    const novoTelefone = req.body.telefone
    const novoNome = req.body.nome
    const cliente = await Cliente.findOne({telefone})
    cliente.telefone = novoTelefone
    cliente.nome = novoNome
    cliente.save((err,updatedCliente) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(updatedCliente)
        }
    })
})

//adicionar endereco
router.post('/:telefone/adicionarEndereco',async (req,res,next) => {
    const {
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        numero,
        uf
    } = req.body

    const endereco = new Endereco({
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        numero,
        uf
    })

    const telefone = req.params.telefone
    const cliente = await Cliente.findOne({telefone})
    cliente.enderecos.push(endereco)
    cliente.save((err,cliente) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(cliente)
        }
    })
    
})

//excluir endereco
router.delete('/:telefone/excluirEndereco/:index',async (req,res,next) => {
    const index = req.params.index
    const telefone = req.params.telefone
    const cliente = await Cliente.findOne({telefone})
    if (index >= cliente.enderecos.length || index < 0) {
        res.status(400).send({message:'Falha ao alterar endereco'})
    } else {

        /**
         * não consegui excluir de outra maneira, então estou separando o array 
         * de enderecos, filtrando o valor com o indice a ser excluido e pushando 
         * todo o array de volta ao objeto
         */
        cliente.enderecos = cliente.enderecos.filter((valor,indiceAtual) => index != indiceAtual)
        cliente.save((err,updatedCliente) => {
            if(err) {
                res.status(400).send(err)
            } else {
                res.status(200).send(updatedCliente)
            }
        })
    }
})

//editar endereco
router.put('/:telefone/editarEndereco/:index',async (req,res,next) => {
    const index = req.params.index
    const telefone = req.params.telefone
    const cliente = await Cliente.findOne({telefone})
    if (index >= cliente.enderecos.length || index < 0) {
        res.status(400).send({message:'Falha ao alterar endereco'})
    } else {
        const {
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            numero,
            uf
        } = req.body
        
        const endereco = new Endereco({
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            numero,
            uf
        })
        cliente.enderecos[index] = endereco
        cliente.save((err,updatedCliente) => {
            if(err) {
                res.status(400).send(err)
            } else {
                res.status(200).send(updatedCliente)
            }
        })
    }
})

// rotas para o frontend
router.get('/:telefone',async (req,res) => {
    const cliente = await Cliente.findOne({telefone:req.params.telefone})
    res.render('./clientes/cliente',{cliente})
})

module.exports = router