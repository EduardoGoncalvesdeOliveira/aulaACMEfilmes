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
const setInserirNovoFilme = async function(dadosFilme, contentType) {


    try {


        // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            // cia a variavel json
            let resultDadosFilme = {}

            // validação de dados
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 10 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8) {

                return message.ERROR_REQUIRED_FIELDS
            } else {

                // variavel para validar se poderemos chamar o dao para inserirf os dados 
                let dadosValidated = false

                // validação de digitação para a data de relancamento que não é campo obrigatorio
                if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento != "") {
                    if (dadosFilme.data_relancamento.lenght != 10) {
                        return message.ERROR_REQUIRED_FIELDS; // 400 - campos preenchidos incorretamente
                    } else {
                        dadosValidated = true // se a data estiver com exatamnete 10 char
                    }
                } else {
                    dadosValidated = true // se a data não existir nos dados
                }

                // validação para verificar se podemos encarregar os dados para o dao
                if (dadosValidated) {

                    // encaminha dados para o dao inserir no banco de dados
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    // validação dos dados sendo nseridos pelo dao no banco de dados
                    if (novoFilme) {

                        // cria o padrão json ´para o retoro dos dados criados
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        return resultDadosFilme // 201 
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500 erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

// funcao para atualizar um filme do banco de dados
const setAtualizarFilme = async function() {

}

// funcao para excluir um filme do banco de dados
const setExcluirFilme = async function(id) {


    // recebe o id do filme
    let idFilme = id
    let filmeJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await filmesDAO.deleteFilme(idFilme)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                filmeJSON.filmes = deletePorID
                filmeJSON.status_code = 500
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.REQUEST_SUCCEEDED //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }


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