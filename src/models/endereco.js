const mongoose = require('mongoose')

const cepRegExp = /[\d]{8}/
const textoRegExp = /^[\w\W]{0,150}$/


const enderecoSchema = new mongoose.Schema({
    cep:{
        type:String,
        required:true,
        validate:[cepRegExp,'CEP inválido']
    },
    logradouro:{
        type:String,
        required:true,
        validade:[textoRegExp,'Texto deve conter até 150 caracteres'],
    },
    complemento:{
        type:String,
        required:true,
        validade:[textoRegExp,'Texto deve conter até 150 caracteres'],
    },
    bairro:{
        type:String,
        required:true,
        validade:[textoRegExp,'Texto deve conter até 150 caracteres'],
    },
    localidade:{
        type:String,
        required:true,
        validade:[textoRegExp,'Texto deve conter até 150 caracteres'],
    },
    uf:{
        type:String,
        uppercase:true,
        enum:['AC','AL','AP','AM','BA','CE',
        'DF','ES','GO','MA','MT','MS','MG',
        'PA','PB','PR','PE','PI','RJ','RN',
        'RS','RO','RR','SC','SP','SE','TO'],
        required:true,
    },
    numero:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Endereco = mongoose.model('Endereco', enderecoSchema)

module.exports = {Endereco, enderecoSchema}
