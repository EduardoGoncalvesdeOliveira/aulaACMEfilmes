// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de ATORES
// data: 2024-04-16
// autor: Eduardo Goncalves
// versao: 1.0.4.24


const { filmes } = require("../model/filmes")

// import das funcoes que estão em outro arq
var funcoesParaUso = require('./funcoes.js')

// import do arq DAO para manipular dados do banco de dados
const atoresDAO = require('../model/DAO/ator.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os filmes do banco de dados
const getListarAtores = async function() {

    try {

        // chama a função do dao para retornar dados no bd
        let dadosAtores = await atoresDAO.selectAllAtores()

        let atoresJSON = {}

        // verifica se existem dados
        if (dadosAtores) {

            if (dadosAtores.length > 0) {
                // montando o json para retornar para o app
                atoresJSON.atores = dadosAtores
                atoresJSON.quantidade = dadosAtores.length
                atoresJSON.status_code = 200
                return atoresJSON
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

const setInserirNovoAtor = async function() {

}

const setAtualizarAtor = async function() {

}

const setExcluirAtor = async function(id) {

    // recebe o id do filme
    let idAtor = id
    let atorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await atoresDAO.deleteAtor(idAtor)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                atorJSON.filmes = deletePorID
                atorJSON.status_code = 500
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.REQUEST_SUCCEEDED //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const getBuscarAtor = async function(id) {

    // recebe o id do filme
    let idAtor = id
    let atorJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosAtoresPorID = await atoresDAO.selectByIdAtor(idAtor)

        // verifica se dados no servidor de banco foram processados
        if (dadosAtoresPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosAtoresPorID.length > 0) {
                // montando o json para retornar para o app
                atorJSON.atores = dadosAtoresPorID
                atorJSON.status_code = 200
                return atorJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

module.exports = {
    getListarAtores,

    setAtualizarAtor,
    setInserirNovoAtor,
    setExcluirAtor,
    getBuscarAtor
}