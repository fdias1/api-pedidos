const mongoose = require('mongoose')

const validaTexto = tamanho => texto => texto.length <= tamanho

const categoriaSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        validate:[validaTexto(32),'Nome inválido']
    },
    produtos:{
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

const Categoria = mongoose.model('Categoria', categoriaSchema)

module.exports = Categoria
