const mongoose = require('mongoose')

const validaTexto = tamanho => texto => texto.length <= tamanho

const produtoSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        validate:[validaTexto(32),'Texto muito longo']
    },
    descricao:{
        type:String,
        required:true,
        validate:[validaTexto(150),'Descrição muito longa']
    },
    pathFoto:{
        type:String,
        required:true,
    },
    preco:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    escolhas:{
        type:[mongoose.Types.ObjectId],
        required:true,
        default:[],
    },
    usuario:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Produto = mongoose.model('Produto', produtoSchema)

module.exports = Produto
