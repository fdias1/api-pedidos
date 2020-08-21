const mongoose = require('mongoose')
const {enderecoSchema} = require('./endereco')

const validaTexto = tamanho => texto => texto.length <= tamanho
const telefoneRegExp = /^[\d]{11}$/
const hexColorRegExp = /^#[\dA-F]{6}$/
const horaRegExp = /^[0-2][\d]:[0-5][\d]$/

const catalogoSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
        validate:[validaTexto(64),'Texto muito longo'],
    },
    descricao:{
        type:String,
        validate:[validaTexto(140),'Texto muito longo'],
        required:true,
        default:'',
    },
    pathFoto:{
        type:String,
        required:true,
        default:'fotopadrao.jpg',
    },
    endereco:{
        type:enderecoSchema,
        required:true,
    },
    telefone:{
        type:[String],
        required:true,
        validate:[telefoneRegExp,'Telefone inválido'],
    },
    whatsapp:{
        type:String,
        required:true,
        validate:[telefoneRegExp,'Telefone inválido'],
    },
    destaques:{
        type:[mongoose.Types.ObjectId],
        required:true,
        default:[],
    },
    estilo:{
        textoPri:{
            type:String,
            validate:[hexColorRegExp,'Cor inválida'],
            default:'#000000',
            upperCase:true,
            required:true
        },
        textoSec:{
            type:String,
            validate:[hexColorRegExp,'Cor inválida'],
            default:'#333333',
            upperCase:true,
            required:true
        },
        fundoPri:{
            type:String,
            validate:[hexColorRegExp,'Cor inválida'],
            default:'#ffffff',
            upperCase:true,
            required:true
        },
        fundoSec:{
            type:String,
            validate:[hexColorRegExp,'Cor inválida'],
            default:'#dddddd',
            upperCase:true,
            required:true
        },
    },
    link:{
        type:String,
        required:true,
        unique:true,
        default:Date.now().toString(),
        validate:[validaTexto(32),'Link muito longo']
    },
    rotina:{
        domingo:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
        segunda:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
        terca:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
        quarta:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
        quinta:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
        sexta:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
        sabado:{
            aberto:{
                type:Boolean,
                required:true,
                default:false
            },
            horarioAbertura:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
            horarioFechamento:{
                type:String,
                required:true,
                default:'00:00',
                validate:[horaRegExp,'Hora inválida']
            },
        },
    },
    delivery:{
        type:Boolean,
        required:true,
        default:false
    },
    entrega:{
        type:Boolean,
        required:true,
        default:false
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
        'Alelo'],
        required:true,
        default:[],
    },
    categorias:{
        type:[mongoose.Types.ObjectId],
        required:true,
        default:[],
    },
    ativo:{
        type:Boolean,
        required:true,
        default:false,
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
