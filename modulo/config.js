// arquivo responsavel pelas configs globais de mensagens, valores e conteudos para  o projeto
// 20/02/2024
//Eduardo G de Oliveira
// v: 1.0.2.24

// MENSAGENS DE ERRO

const ERROR_INVALID_ID = { status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!' }

const ERROR_NOT_FOUND = { status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!' }

const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: 'Ocorreram erros internos no servidor de banco de dados, por favor contate o adm do sistema!' }

const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos corretamente!' }

// MENSAGENS DE SUCESSO 

const SUCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item criado com suicidio! ;)' }

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM
}