const express = require('express')
const router = express.Router()
const Catalogo = require('../models/catalogo')
const {Pedido} = require('../models/pedido')
const {Endereco} = require('../models/endereco')
const {checarCredenciais} = require('./auth')

// funções das rotas
const criar = async (req,res) => {
    const {
        titulo,
        descricao,
        pathFoto,
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        numero,
        uf,
        whatsapp
    } = req.body

    const catalogo = new Catalogo({
        titulo,
        descricao,
        pathFoto,
        endereco:new Endereco({
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            numero,
            uf
        }),
        telefone:whatsapp,
        whatsapp,
        destaque:[],
        estilo:{},
        rotina:{},
        formasEntrega:[],
        formasPagamento:[],
        categorias:[],
        usuario:req.user.id
    })
    catalogo.save((err,novaCatalogo) => {
        if(err) {
            res.status(400).send({ok:false,retorno:null,mensagem:err})
        } else {
            res.status(200).send({ok:true,mensagem:null,retorno:novaCatalogo})
        }
    })
}

const ler = async (req,res) => {
    try {
        const catalogo = await Catalogo.findOne({_id:req.params.catalogo})
        if (catalogo) {
            res.status(200).send({ok:true,mensagem:null,retorno:catalogo})
        } else {
            res.status(400).send({ok:false,retorno:null,mensagem:'catalogo não encontrado'})
        }
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const lerTodos = async (req,res) => {
    try {
        const catalogo = await Catalogo.find({})
        res.status(200).send({ok:true,mensagem:null,retorno:catalogo})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const lerTodosPorUsuario = async (req,res) => {
    try {
        const catalogo = await Catalogo.find({usuario:req.user._id})
        res.status(200).send({ok:true,mensagem:null,retorno:catalogo})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const editar = async (req,res) => {
    try {
        await Catalogo.updateOne({_id:req.params.catalogo},req.body)
        const updatedCatalogo = await Catalogo.findOne({_id:req.params.catalogo})
        res.status(200).send({ok:true,mensagem:null,retorno:updatedCatalogo})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const deletar = async (req,res) => {
    try {
        const deletedCatalogo = await Catalogo.findOne({_id:req.params.catalogo})
        if (!deletedCatalogo) throw new Error('Inexistente')
        await Catalogo.deleteOne({_id:req.params.catalogo})
        res.status(200).send({ok:true,mensagem:null,retorno:deletedCatalogo})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const atrelarCategoria = async (req,res) => {
    try {
        const catalogo = await Catalogo.findOne({_id:req.params.catalogo})
        const categorias = catalogo.categorias
        categorias.push(req.query.categoria)
        await Catalogo.updateOne({_id:req.params.catalogo},{categorias})
        res.status(200).send({ok:true,mensagem:null,retorno:"Categoria atrelada"})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const removerCategoria = async (req,res) => {
    try {
        const catalogo = await Catalogo.findOne({_id:req.params.catalogo})
        let categorias = catalogo.categorias
        categorias = categorias.filter(categoria => categoria != req.query.categoria)
        await Catalogo.updateOne({_id:req.params.catalogo},{categorias})
        res.status(200).send({ok:true,mensagem:null,retorno:"Categoria removida"})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const atrelarDestaque = async (req,res) => {
    try {
        const catalogo = await Catalogo.findOne({_id:req.params.catalogo})
        const destaques = catalogo.destaques
        destaques.push(req.query.destaque)
        await Catalogo.updateOne({_id:req.params.catalogo},{destaques})
        res.status(200).send({ok:true,mensagem:null,retorno:"Destaque adicionado"})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const removerDestaque = async (req,res) => {
    try {
        const catalogo = await Catalogo.findOne({_id:req.params.catalogo})
        let destaques = catalogo.destaques
        destaques = destaques.filter(destaque => destaque != req.query.destaque)
        await Catalogo.updateOne({_id:req.params.catalogo},{destaques})
        res.status(200).send({ok:true,mensagem:null,retorno:"Destaque removido"})
    } catch (err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar operação'})
    }
}

const listarPedidos = async (req,res) => {
    try{
        const pedidos = await Pedido.find({catalogo:req.params.catalogo})
        res.status(200).send({ok:true,mensagem:null,retorno:pedidos})
    } catch(err) {
        res.status(400).send({ok:false,retorno:null,mensagem:'Erro ao realizar o processo'})
    }
}

//rotas
router.use(checarCredenciais(1))
router.post('/',criar)
router.get('/this',lerTodosPorUsuario)
router.get('/:catalogo',ler)
router.get('/',checarCredenciais(2),lerTodos)
router.put('/:catalogo',editar)
router.delete('/:catalogo',deletar)

router.put('/:catalogo/atrelarcategoria',atrelarCategoria)
router.delete('/:catalogo/removercategoria',removerCategoria)

router.put('/:catalogo/atrelardestaque',atrelarDestaque)
router.delete('/:catalogo/removerdestaque',removerDestaque)

router.get('/:catalogo/pedidos',listarPedidos)

module.exports = router
