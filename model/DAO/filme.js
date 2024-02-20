// Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Filmes
// Data: 30-01-24
// Autor: Eduardo Goncalves
// Versao: 1.0.1.24

// inserir um novo filme

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

const insertFilme = async function() {

}

// atualizar um filme filrando por id
const updateFilme = async function(id) {

}

// deletar um filme filtrando por id
const deleteFilme = async function(id) {

}

// listar todos os filmes existentes na tabela
const selectAllFilmes = async function() {

    // sql script para listar todos os filmes existentes
    let sql = 'SELECT * FROM tbl_filme'

    // $queryRawUnsafe(sql) --- encaminha apenas a variável
    // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // tratamento de dados para retornar dados ou false
    if (rsFilmes.length > 0)
        return rsFilmes
    else
        return false

}

// listar um filme por id
const selectByIdFilme = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_filme WHERE id =${id}`

        console.log(sql)
            // $queryRawUnsafe(sql) --- encaminha apenas a variável
            // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}