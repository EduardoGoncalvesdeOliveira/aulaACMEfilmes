// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

const selectAllClassificacoes = async function(dadosFilme) {

    try {

        // sql script para listar todos os filmes existentes
        let sql = 'SELECT * FROM tbl_classificacao ORDER BY id_classificacao DESC'

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao

    } catch (error) {
        return false
    }

}

const insertClassificacao = async function(dadosFilme) {

}

const updateClassificacao = async function(dadosFilme) {

}

const deleteClassificacao = async function(dadosFilme) {

}

const selectByIdClassificacao = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_classificacao WHERE id_classificacao =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllClassificacoes,

    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectByIdClassificacao
}