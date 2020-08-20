const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    sobrenome:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    senha:{
        type:String,
        required:true,
    },
    documento:{
        type:String,
        required:true,
        unique:true
    },
    tipoDocumento:{
        type:String,
        enum:['cpf','cnpj'],
        required:true,
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
