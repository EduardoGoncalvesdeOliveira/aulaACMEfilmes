const { filmes } = require("../model/filmes")

// import das funcoes que estão em outro arq
var funcoesParaUso = require('./funcoes.js')

// import do arq DAO para manipular dados do banco de dados
const ClassificacaoDAO = require('../model/DAO/classificacao')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const getListarClassificacoes = async function() {

    try {

        // chama a função do dao para retornar dados no bd
        let dadosClassificacao = await ClassificacaoDAO.selectAllClassificacoes()

        let ClassificacaoJSON = {}

        // verifica se existem dados
        if (dadosClassificacao) {

            if (dadosClassificacao.length > 0) {
                // montando o json para retornar para o app
                ClassificacaoJSON.classificacao = dadosClassificacao
                ClassificacaoJSON.quantidade = dadosClassificacao.length
                ClassificacaoJSON.status_code = 200
                return ClassificacaoJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getBuscarClassificacao = async function(id) {

    // recebe o id do filme
    let idClassificacao = id
    let classificacaoJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosClassificacaoPorID = await ClassificacaoDAO.selectByIdClassificacao(idClassificacao)

        // verifica se dados no servidor de banco foram processados
        if (dadosClassificacaoPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosClassificacaoPorID.length > 0) {
                // montando o json para retornar para o app
                classificacaoJSON.classificacao = dadosClassificacaoPorID
                classificacaoJSON.status_code = 200
                return classificacaoJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setAtualizarClassificacao = async function() {

}

const setInserirNovaClassificacao = async function() {

}

const setExcluirClassificacao = async function() {

}

module.exports = {
    getListarClassificacoes,

    setAtualizarClassificacao,
    setInserirNovaClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacao
}