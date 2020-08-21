const mongoose = require('mongoose')
const {enderecoSchema} = require('./pedido')

const pedidoSchema = new mongoose.Schema({
    cliente:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    endereco:{
        type:enderecoSchema,
        required:true,
    },
    catalogo:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    itens:{
        type:[{
            categorias:[{
                categoria:{
                    nome:String,
                    produtos:[{
                        produto:{
                            nome:String,
                            preco:Number,
                            observacao:String,
                            escolhas:[{
                                nome:String,
                                preco:Number,  
                            }]
                        }
                    }]
                }
            }]
        }],
        required:true,
        default:[],
    },
    total:{
        type:Number,
        required:true,
        default:0
    },
    formaEntrega:{
        type:String,
        enum:['entrega','retirada'],
        required:true
    },
    dataCriacao:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Pedido = mongoose.model('Pedido', pedidoSchema)

module.exports = {Pedido, pedidoSchema}
