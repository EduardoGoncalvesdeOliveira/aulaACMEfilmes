// Para fazer as integracoes com o banco de dados, precisamos ultilizar uma dependencia
// SEQUELIZE    ORM
// PRISMA       ORM
// FASTFY       ORM

// prisma

// npm install prisma --save
// npm install @prisma/client --save


// npx prisma init


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')
const controllerFilmes = require('./controller/controller_filme.js')
const controllerAtores = require('./controller/controller_ator.js')
const controllerGeneros = require('./controller/controller_genero.js')



const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, SELECT, DELETE, POST')
    app.use(cors)
    next()
})

// cria um obejeto fo tipo json para receber dados via body nas requisições post ou put
const bodyParserJSON = bodyParser.json()

//imports de arquivos e bibliotecas do projeto
// ----------------------------------------------


app.get('/v1/acme/filmes', cors(), function(request, response, next) {

    let controllerFilmes = require('./controller/funcoes.js')

    let filmes = controllerFilmes.getListarFilmes()
    if (filmes) {
        response.json(filmes)
        response.status(200)
    } else {
        response.status(404)
    }
})

// ------------------------------------------------------------------------------------------------

// FILMES

app.get('/v2/acme/filmes', cors(), async function(request, response, next) {

    let dadosFilmes = await controllerFilmes.getListarFilmes();

    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado' })
        response.status(404)
    }
})

app.listen(8080, function() {
    console.log('API Funcionando e aguardando requisições')
})


app.get('/v2/acme/filme/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idFilme = request.params.id

    let dadosFilmesPorID = await controllerFilmes.getBuscarFilme(idFilme);
    response.status(dadosFilmesPorID.status_code)
    response.json(dadosFilmesPorID)
})

// endpint par ainserir novos filmes do banco de dados
// NAO ESQUECER DE COLOCAR O BODY PARSER JSON, QUE É QUEM DEFINE O FORMATO DE CHEGADA DOS DADOS
// ESSE OBJETO FOI CRIADO NO INICIO DO PROJETO
app.post('/v2/acmefilmes/filme/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})


app.delete('/v3/acme/filme/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idFilme = request.params.id

    let deletarFilmesPorID = await controllerFilmes.setExcluirFilme(idFilme);
    response.status(deletarFilmesPorID.status_code)
    response.json(deletarFilmesPorID)
})

// ------------------------------------------------------------------------------------------------

// ATORES


app.get('/v2/acme/atores', cors(), async function(request, response, next) {

    let dadosAtores = await controllerAtores.getListarAtores();
    response.status(dadosAtores.status_code)
    response.json(dadosAtores)
})

app.get('/v2/acme/ator/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idAtor = request.params.id

    let dadosAtoresPorID = await controllerAtores.getBuscarAtor(idAtor);
    response.status(dadosAtoresPorID.status_code)
    response.json(dadosAtoresPorID)
})

app.delete('/v3/acme/ator/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idAtor = request.params.id

    let deletarAtoresPorID = await controllerAtores.setExcluirAtor(idAtor);
    response.status(deletarAtoresPorID.status_code)
    response.json(deletarAtoresPorID)
})

app.post('/v2/acmefilmes/ator/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerAtores.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// ------------------------------------------------------------------------------------------------

// GENEROS

app.get('/v2/acme/generos', cors(), async function(request, response, next) {

    let dadosGeneros = await controllerGeneros.getListarGeneros();
    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})

app.get('/v2/acme/genero/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idGenero = request.params.id

    let dadosGenerosPorID = await controllerGeneros.getBuscarGenero(idGenero);
    response.status(dadosGenerosPorID.status_code)
    response.json(dadosGenerosPorID)
})

app.delete('/v3/acme/genero/delete/:id', cors(), async function(request, response, next) {

    // RECEBE A RRQUISIÇÃO DO ID
    let idGenero = request.params.id

    let deletarGenerosPorID = await controllerGeneros.setExcluirGenero(idGenero);
    response.status(deletarGenerosPorID.status_code)
    response.json(deletarGenerosPorID)
})

app.post('/v2/acmefilmes/generos/', cors(), bodyParserJSON, async function(request, response, next) {

    // 
    let contentType = request.headers['content-type']

    console.log(contentType)

    // recebe os dados encaminhados na requisição do body (json)
    let dadosBody = request.body

    let resultDados = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})