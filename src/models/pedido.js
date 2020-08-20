const mongoose = require('mongoose')
const {enderecoSchema} = require('./endereco')
const endereco = require('./endereco')

const enderecoSchema = new mongoose.Schema({
    cliente:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    endereco:{
        type:enderecoSchema,
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
                            escolhas:[{
                                nome:String,
                                preco:Number,  
                            }]
                        }
                    }]
                }
            }]
        }],
        required:true
    },
    total:{
        type:Number,
        required:true
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

const Endereco = mongoose.model('Endereco', enderecoSchema)

module.exports = {Endereco, enderecoSchema}
