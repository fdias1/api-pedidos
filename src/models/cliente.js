const mongoose = require('mongoose')
const {enderecoSchema, Endereco} = require('./endereco')

const clienteSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    enderecos:{
        type:[enderecoSchema],
        required:true,
    },
    telefone:{
        type:String,
        required:true,
        unique:true
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Cliente = mongoose.model('Cliente', clienteSchema)

module.exports = Cliente