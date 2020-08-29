const Cliente = require('../models/cliente')
const getController = require('../helpers/controllerHelper')

module.exports = getController(Cliente,'enderecos')
