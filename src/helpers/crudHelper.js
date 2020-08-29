
const criar = (model) => {
    return async ({dados}) => {
        try {
            const objeto = new model(dados)
            await objeto.save()
            return {ok:true,retorno:objeto,mensagem:null}
        } catch (err) {
            return {ok:false,retorno:null,mensagem:err}
        }
    }
}

const ler = (model) => {
    return async ({query}) => {
        try {
            const objetos = await model.find(query)
            return {ok:true,retorno:objetos,mensagem:null}
        } catch (err) {
            return {ok:false,retorno:null,mensagem:err}
        }
    }
}

const editar = (model) => {
    return async ({dados,id}) => {
        try {
            await model.updateOne({_id:id},dados)
            const objeto = await model.findById(id)
            return {ok:true,retorno:objeto,mensagem:null}
        } catch (err) {
            return {ok:false,retorno:null,mensagem:err}
        }
    }
}

const deletar = (model) => {
    return async ({id}) => {
        try {
            const objeto = await model.findById(id)
            await model.deleteOne({_id:id})
            return {ok:true,retorno:objeto,mensagem:null}
        } catch (err) {
            return {ok:false,retorno:null,mensagem:err}
        }
    }
}

const editarRelacao = (model,campo) => {
    return async ({id,query}) => {
        try {
            const objetoAntigo = await model.findById(id)
            var valorCampo = objetoAntigo[campo]
            if(query.acao == 'adicionar') {
                valorCampo.push(query.valor)
            } else if (query.acao == 'remover') {
                valorCampo = valorCampo.filter(valor => valor != query.valor)
            } else {
                throw 'Açao Inválida'
            }
            const funcaoEditar = editar(model)
            const dados = {[campo]:valorCampo}
            await funcaoEditar({
                id,
                dados
            })
            const objeto = await model.findById(id)
            return {ok:true,retorno:objeto,mensagem:null}
        } catch (err) {
            return {ok:false,retorno:null,mensagem:err}
        }
    }
}


const getMiddleweres = (model,...relacoes) => {

    const gerarMiddlewere = funcao => {
        return async (req,res,next) => {
            const resposta = await funcao({
                dados:req.body,
                id:req.params.id,
                user:req.user,
                query:req.query
            })
            if (resposta.ok == true) {
                res.status(200).send(resposta)
            } else {
                res.status(400).send(resposta)
            }
        }
    }

    funcoes = {
        criar:gerarMiddlewere(criar(model)),
        ler:gerarMiddlewere(ler(model)),
        editar:gerarMiddlewere(editar(model)),
        deletar:gerarMiddlewere(deletar(model)),
    }
    relacoes.forEach(relacao => {
        funcoes[`${relacao}Atrelar`] = gerarMiddlewere(editarRelacao(model,relacao))
    })

    return funcoes
}

module.exports =  getMiddleweres