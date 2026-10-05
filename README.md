# Testes de integração de API com Jest e PactumJS

> Testes de integração do CRUD de produtos da [Restful API](https://restful-api.dev/), usando JestJS e PactumJS.

## GitHub Actions

[![Node.js CI](https://github.com/LucasGasparA/integration-test-jest/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/LucasGasparA/integration-test-jest/actions/workflows/node.js.yml)

## SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=LucasGasparA_integration-test-jest&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=LucasGasparA_integration-test-jest)

## Sobre o projeto

Os testes consomem a API pública `https://api.restful-api.dev`, usando o recurso `/objects` como produto (`name` e `data` com `preco`, `quantidade` e `marca`).

Cenários cobertos em [test/restful_api_produtos.spec.ts](test/restful_api_produtos.spec.ts):

| Grupo | Cenários |
|---|---|
| Cadastro | `POST /objects` cria o produto e valida o formato da resposta |
| Busca | `GET /objects/{id}` retorna o produto; id inexistente retorna 404 |
| Alteração | `PUT` altera o produto inteiro; `PATCH` altera só o nome; `PUT` em id inexistente retorna 404 |
| Exclusão | `DELETE` exclui o produto; excluir de novo retorna 404; `GET` depois da exclusão retorna 404 |

## Como executar

### Pré-requisitos
 - NodeJS `v22`

### Passos

Dentro da pasta do projeto:

 1. `npm install`
 1. `npm test` para rodar todos os testes
 1. `npm run scenario` para rodar só os testes de produtos
 1. `npm run ci` para rodar o fluxo completo (limpeza, formatação, lint e testes)

Depois da execução, a pasta `./output` terá os relatórios em `HTML`.

## Tecnologias
 - [JestJS](https://jestjs.io/)
 - [PactumJS](https://pactumjs.github.io/)
 - [Faker](https://fakerjs.dev/)
 - TypeScript, ESLint e Prettier

## Documentação da API testada
 - [Restful API](https://restful-api.dev/)
