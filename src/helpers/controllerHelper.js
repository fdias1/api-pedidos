const getController = (model,...relacoes) => {
    const express = require('express')
    const router = express.Router()
    const getMiddleweres = require('../helpers/crudHelper')
    const middleweres = getMiddleweres(model,...relacoes)

    router.post('/',(req,res,next) => {
        req.body.usuario = req.user._id
        next()
    },middleweres.criar)
    router.get('/',middleweres.ler)
    router.put('/:id',middleweres.editar)
    router.delete('/:id',middleweres.deletar)

    relacoes.forEach(relacao => {
        router.put(`/:id/${relacao}`,middleweres[`${relacao}Atrelar`])
    })

    return router
}

module.exports = getController