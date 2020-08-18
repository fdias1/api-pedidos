const mongoose = require('mongoose')

const escolhaSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    descricao:{
        type:String,
        required:true,
    },
    pathFoto:{
        type:String,
        required:true,
    },
    preco:{
        type:Number,
        required:true,
    },
    escolhas:{
        type:[mongoose.Types.ObjectId],
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

const Escolha = mongoose.model('Escolha', escolhaSchema)


module.exports = Escolha
