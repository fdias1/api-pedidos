const mongoose = require('mongoose')

const enderecoSchema = new mongoose.Schema({
    cep:{
        type:String,
        required:true,
    },
    logradouro:{
        type:String,
        required:true,
    },
    complemento:{
        type:String,
        required:true,
    },
    bairro:{
        type:String,
        required:true,
    },
    localidade:{
        type:String,
        required:true,
    },
    uf:{
        type:String,
        uppercase:true,
        enum:['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'],
        required:true,
    },
    numero:{
        type:String,
        required:true,
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Endereco = mongoose.model('Endereco', enderecoSchema)

module.exports = {Endereco, enderecoSchema}