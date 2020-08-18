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
    catalogo:{
        type:mongoose.Types.ObjectId,
    },
    categorias:{
        type:[mongoose.Types.ObjectId],
    },
    produtos:{
        type:[mongoose.Types.ObjectId],
    },
    escolhas:{
        type:[mongoose.Types.ObjectId],
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
