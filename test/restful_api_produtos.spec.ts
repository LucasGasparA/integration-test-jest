import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Restful API - Produtos', () => {
  let idProduto = '';
  const nomeProduto = faker.commerce.productName();
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.restful-api.dev';

  p.request.setDefaultTimeout(90000);

  beforeAll(() => p.reporter.add(rep));

  describe('Cadastro de produtos', () => {
    it('Cadastra um novo produto', async () => {
      idProduto = await p
        .spec()
        .post(`${baseUrl}/objects`)
        .withJson({
          name: nomeProduto,
          data: {
            preco: 500,
            quantidade: 10,
            marca: faker.company.name()
          }
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(nomeProduto)
        .expectJsonSchema({
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            createdAt: {
              type: 'number'
            }
          },
          required: ['id', 'name', 'createdAt']
        })
        .returns('id');
    });
  });

  describe('Busca de produtos', () => {
    it('Busca o produto cadastrado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/objects/${idProduto}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: idProduto,
          name: nomeProduto,
          data: {
            preco: 500,
            quantidade: 10
          }
        });
    });

    it('Produto não encontrado', async () => {
      await p
        .spec()
        .get(
          `${baseUrl}/objects/${faker.string.hexadecimal({ length: 32, prefix: '' })}`
        )
        .expectStatus(StatusCodes.NOT_FOUND)
        .expectBodyContains('was not found');
    });
  });

  describe('Alteração de produtos', () => {
    it('Altera o produto inteiro com PUT', async () => {
      await p
        .spec()
        .put(`${baseUrl}/objects/${idProduto}`)
        .withJson({
          name: `${nomeProduto} editado`,
          data: {
            preco: 800,
            quantidade: 20
          }
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('updatedAt');
    });

    it('Altera só o nome do produto com PATCH', async () => {
      await p
        .spec()
        .patch(`${baseUrl}/objects/${idProduto}`)
        .withJson({
          name: `${nomeProduto} parcial`
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(`${nomeProduto} parcial`);
    });

    it('Busca o produto alterado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/objects/${idProduto}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          name: `${nomeProduto} parcial`,
          data: {
            preco: 800,
            quantidade: 20
          }
        });
    });

    it('Altera produto que não existe', async () => {
      await p
        .spec()
        .put(
          `${baseUrl}/objects/${faker.string.hexadecimal({ length: 32, prefix: '' })}`
        )
        .withJson({
          name: nomeProduto,
          data: {
            preco: 800
          }
        })
        .expectStatus(StatusCodes.NOT_FOUND);
    });
  });

  describe('Exclusão de produtos', () => {
    it('Exclui o produto cadastrado', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/objects/${idProduto}`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('has been deleted');
    });

    it('Exclui produto que já foi excluído', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/objects/${idProduto}`)
        .expectStatus(StatusCodes.NOT_FOUND)
        .expectBodyContains("doesn't exist");
    });

    it('Busca o produto excluído', async () => {
      await p
        .spec()
        .get(`${baseUrl}/objects/${idProduto}`)
        .expectStatus(StatusCodes.NOT_FOUND);
    });
  });

  afterAll(() => p.reporter.end());
});
