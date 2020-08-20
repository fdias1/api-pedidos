const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    produtos:{
        type:[mongoose.Types.ObjectId],
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
