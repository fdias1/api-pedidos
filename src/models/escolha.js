const mongoose = require('mongoose')

const validaTexto = tamanho => texto => texto.length <= tamanho

const escolhaSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        validate:[validaTexto(32),'Nome muito longo']
    },
    preco:{
        type:Number,
        required:true,
        min:0,
    },
    tipo:{
        type:String,
        enum:['qtd','lista'],
        required:true,
    },
    qtdMax:{
        type:Number,
        default:99,
        required:true
    },
    qtdMin:{
        type:Number,
        default:0,
        required:true
    },
    vlrMax:{
        type:Number,
        default:99,
        required:true
    },
    vlrMin:{
        type:Number,
        default:0,
        required:true
    },
    listaOpcoes:{
        type:[{
            type:String,
            validate:[validaTexto(32),'Texto muito Grande']
        }],
        default:[],
        required:true
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
