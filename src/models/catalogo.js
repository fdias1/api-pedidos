const mongoose = require('mongoose')
const {enderecoSchema} = require('./endereco')

const catalogoSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
    },
    descricao:{
        type:String,
    },
    pathFoto:{
        type:String,
        default:'fotopadrao.jpg'
    },
    endereco:{
        type:enderecoSchema,
        required:true,
    },
    telefone:{
        type:[String],
        required:true,
    },
    whatsapp:{
        type:String,
        required:true,
    },
    destaques:{
        type:[mongoose.Types.ObjectId],
    },
    estilo:{
        textoPri:String,
        textoSec:String,
        fundoPri:String,
        fundoSec:String
    },
    link:{
        type:String,
        required:true,
        unique:true,
        default:Date.now().toString()
    },
    rotina:{
        domingo:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
        segunda:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
        terca:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
        quarta:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
        quinta:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
        sexta:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
        sabado:{
            aberto:String,
            horarioAbertura:String,
            type:String,
        },
    },
    formasEntrega:{
        type:[String],
        enum:['delivery','retirada']
    },
    formasPagamento:{
        type:[String],
        enum:['Dinheiro',
        'Visa crédito',
        'Visa Débito',
        'MasterCard crédito',
        'MasterCard Débito',
        'Ticket Restaurante',
        'Ticket Alimentação',
        'Sodexo',
        'Alelo']
    },
    categorias:{
        type:[mongoose.Types.ObjectId],
        default:[],
    },
    ativo:{
        type:Boolean,
        default:false
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

const Catalogo = mongoose.model('Catalogo', catalogoSchema)

module.exports = Catalogo
