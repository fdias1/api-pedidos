const mongoose = require('mongoose')
const {enderecoSchema} = require('./endereco')

const telefoneRegExp = /^[\d]{11}$/
const nomeRegExp = /^[\w\s]{3,32}$/

const clienteSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        validate:[nomeRegExp,'Nome inválido ou muito longo']

    },
    enderecos:{
        type:[enderecoSchema],
        required:true,
        default:[],
    },
    telefone:{
        type:String,
        required:true,
        unique:true,
        validate:[telefoneRegExp,'Telefone inválido']
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Cliente = mongoose.model('Cliente', clienteSchema)

module.exports = Cliente
