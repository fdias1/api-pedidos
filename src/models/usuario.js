const mongoose = require('mongoose')

const cpfRegExp = /[\d]{11}/
const cnpjRegExp = /[\d]{14}/

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
        unique:true,
        validate: [(valor) => {
            return cpfRegExp.test(valor) || cnpjRegExp.test(valor)
        },'Documento inválido']
    },
    tipoDocumento:{
        type:String,
        enum:['pf','pj'],
        required:true,
        lowercase:true
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
