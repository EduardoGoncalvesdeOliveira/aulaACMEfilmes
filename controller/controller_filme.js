// objetivo: Arquivo responsavelpela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de filmes
// data: 30-01-24
// autor: Eduardo Goncalves
// versao: 1.0.1.24

const { filmes } = require("../model/filmes")

// import do arq DAO para manipular dados do banco de dados
const filmesDAO = require('../model/DAO/filme.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para inserir um novo filme do banco de dados
const setInserirNovoFilme = async function() {

}

// funcao para atualizar um filme do banco de dados
const setAtualizarFilme = async function() {

}

// funcao para excluir um filme do banco de dados
const setExcluirFilme = async function(id) {

}

// funcao para retornar todos os filmes do banco de dados
const getListarFilmes = async function() {

    let filmesJSON = {}

    // chama a função do dao para retornar dados no bd
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    // verifica se existem dados
    if (dadosFilmes) {
        // montando o json para retornar para o app
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.lenght
        filmesJSON.status_code = 200
        return filmesJSON
    } else {
        return false
    }
}

// funcao para buscar um filme do banco de dados pelo id
const getBuscarFilme = async function(id) {

    // recebe o id do filme
    let idFilme = id
    let filmeJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosFilmesPorID = await filmesDAO.selectByIdFilme(idFilme)

        // verifica se dados no servidor de banco foram processados
        if (dadosFilmesPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosFilmesPorID.length > 0) {
                // montando o json para retornar para o app
                filmeJSON.filmes = dadosFilmesPorID
                filmeJSON.status_code = 200
                return filmeJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

module.exports = {
    setAtualizarFilme,
    setInserirNovoFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes
}