const chai = require('chai')
const http = require('chai-http')
const should = chai.should()

chai.use(http)
describe('// Usuários', () => {
    describe('Criar usuário', () => {
        it('Retornar um json no formato { ok, mensagem, retorno }')
        it('O atributo ok deve ser booleano')
        it('O atributo mensagem deve ser uma string')
        it('O atributo retorno deve ser um objeto')
    })
})
