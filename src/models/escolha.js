const mongoose = require('mongoose')

const escolhaSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    preco:{
        type:Number,
        required:true,
    },
    tipo:{
        type:String,
        enum:['qtd','lista'],
        required:true,
    },
    qtdMax:{
        type:Number,
        default:99,
    },
    qtdMin:{
        type:Number,
        default:0,
    },
    vlrMax:{
        type:Number,
        default:99,
    },
    vlrMin:{
        type:Number,
        default:0,
    },
    listaOpcoes:{
        type:[String],
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
