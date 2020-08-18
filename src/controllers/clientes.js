const express = require('express')
const router = express.Router()
const {Endereco} = require('../models/endereco')
const Cliente = require('../models/cliente')
const {checarCredenciais} = require('./auth')

// funções das rotas
const criar = async (req,res,next) => {
    const {
        nome,
        telefone
    } = req.body
    const cliente = new Cliente({
        nome,
        telefone,
    })
    cliente.save((err,novoCliente) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(novoCliente)
        }
    })
}

const ler = async (req,res) => {
    try {
        const cliente = await Cliente.findOne({_id:req.params.cliente})
        if (cliente) {
            res.status(200).send(cliente)
        } else {
            res.status(400).send({message:'Cliente não encontrado'})
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const lerTodos = async (req,res) => {
    try {
        const clientes = await Cliente.find({})
        if (clientes) {
            res.status(200).send(clientes)
        } else {
            res.status(400).send({message:'Não há clientes'})
        }
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const editar = async (req,res,next) => {
    try {
        const updatedCliente = await Cliente.updateOne({_id:req.params.cliente},req.body)
        res.status(200).send(updatedCliente)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const deletar = async (req,res,next) => {
    try {
        const deletedCliente = await Cliente.deleteOne({_id:req.params.cliente})
        res.status(200).send(deletedCliente)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar operação'})
    }
}

const cadastrarEndereco = async (req,res,next) => {
    try {
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
        const cliente = await Cliente.findOne({_id:req.params.cliente})
        cliente.enderecos.push(endereco)
        const enderecos = cliente.enderecos
        const updatedCliente = await Cliente.updateOne({_id:req.params.cliente},{enderecos})
        res.status(200).send(updatedCliente)
    } catch (err) {
        res.status(400).send({message:'Erro ao realizar a operação'})
    }   
}

const excluirEndereco = async (req,res,next) => {
    try {
        const index = req.params.index
        const cliente = await Cliente.findOne({_id:req.params.cliente})
        if (index >= cliente.enderecos.length || index < 0) {
            res.status(400).send({message:'Falha ao alterar endereco'})
        } else {
            /**
             * não consegui excluir de outra maneira, então estou separando o array 
             * de enderecos, filtrando o valor com o indice a ser excluido e pushando 
             * todo o array de volta ao objeto
             */
            const novoEnderecos = cliente.enderecos.filter((valor,indiceAtual) => index != indiceAtual)
            const updatedCliente = await Cliente.updateOne(req.body.cliente,{enderecos:novoEnderecos})
            res.status(200).send(updatedCliente)
        }        
    } catch (err) {
        res.status(400).send({message:'falha ao realizar a operação'})
    }
}

const editarEndereco = async (req,res,next) => {
    try {
        const index = req.params.index
        const cliente = await Cliente.findOne({_id:req.params.cliente})
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
            const enderecos = cliente.enderecos
            const updatedCliente = await Cliente.updateOne({_id:req.params.cliente},{enderecos})
            res.status(200).send(updatedCliente)
        }
    } catch (err) {
        res.status(400).send({message:'falha ao realizar a operação'})
    }
}
    
//rotas
router.post('/',criar)
router.get('/:cliente',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:cliente',editar)
router.delete('/:cliente',checarCredenciais(2),deletar)

router.post('/:cliente/novoendereco',cadastrarEndereco)
router.put('/:cliente/:index',editarEndereco)
router.delete('/:cliente/:index',excluirEndereco)

module.exports = router
