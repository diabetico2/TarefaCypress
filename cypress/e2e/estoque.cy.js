describe('API de Controle de Estoque', () => {
  const baseUrl = 'http://localhost:3000/estoque';

  beforeEach(() => {
    cy.request('GET', baseUrl).then((response) => {
      if (response.body.length > 0) {
        response.body.forEach((item) => {
          cy.request('DELETE', `${baseUrl}/${item.id}`);
        });
      }
    });
  });

  describe('Criar Item de Estoque', () => {
    it('deve criar um item com sucesso', () => {
      const novoItem = {
        nome: 'Produto A',
        quantidade: 100,
        descricao: 'Produto de teste'
      };

      cy.request('POST', baseUrl, novoItem).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.nome).to.eq(novoItem.nome);
        expect(response.body.quantidade).to.eq(novoItem.quantidade);
        expect(response.body.descricao).to.eq(novoItem.descricao);
        expect(response.body).to.have.property('criadoEm');
        expect(response.body).to.have.property('atualizadoEm');
      });
    });

    it('deve falhar ao criar item sem nome', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: { quantidade: 50 },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include('Nome é obrigatório');
      });
    });

    it('deve falhar ao criar item sem quantidade', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: { nome: 'Produto B' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include('Quantidade é obrigatória');
      });
    });

    it('deve falhar ao criar item com quantidade negativa', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: { nome: 'Produto C', quantidade: -5 },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include('Quantidade não pode ser negativa');
      });
    });

    it('deve falhar ao criar item com nome inválido', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: { nome: 123, quantidade: 50 },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include('Nome deve ser uma string');
      });
    });

    it('deve falhar ao criar item com quantidade inválida', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: { nome: 'Produto D', quantidade: 'abc' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include('Quantidade deve ser um número');
      });
    });
  });

  describe('Listar Itens de Estoque', () => {
    it('deve listar todos os itens', () => {
      const item1 = { nome: 'Produto 1', quantidade: 10 };
      const item2 = { nome: 'Produto 2', quantidade: 20 };

      cy.request('POST', baseUrl, item1);
      cy.request('POST', baseUrl, item2);

      cy.request('GET', baseUrl).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(2);
        expect(response.body[0].nome).to.eq(item1.nome);
        expect(response.body[1].nome).to.eq(item2.nome);
      });
    });

    it('deve retornar lista vazia quando não há itens', () => {
      cy.request('GET', baseUrl).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(0);
      });
    });
  });

  describe('Buscar Item por ID', () => {
    it('deve buscar item por ID existente', () => {
      const novoItem = { nome: 'Produto E', quantidade: 30 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request('GET', `${baseUrl}/${itemId}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).to.eq(itemId);
          expect(response.body.nome).to.eq(novoItem.nome);
          expect(response.body.quantidade).to.eq(novoItem.quantidade);
        });
      });
    });

    it('deve falhar ao buscar item por ID inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.include('Item com ID 999 não encontrado');
      });
    });

    it('deve falhar ao buscar item com ID inválido', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/abc`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });

  describe('Atualizar Item de Estoque', () => {
    it('deve atualizar item com sucesso', () => {
      const novoItem = { nome: 'Produto F', quantidade: 40 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;
        const atualizacao = { nome: 'Produto F Atualizado', quantidade: 60 };

        cy.request('PUT', `${baseUrl}/${itemId}`, atualizacao).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.nome).to.eq(atualizacao.nome);
          expect(response.body.quantidade).to.eq(atualizacao.quantidade);
          expect(new Date(response.body.atualizadoEm)).to.be.greaterThan(new Date(response.body.criadoEm));
        });
      });
    });

    it('deve falhar ao atualizar com quantidade negativa', () => {
      const novoItem = { nome: 'Produto G', quantidade: 50 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request({
          method: 'PUT',
          url: `${baseUrl}/${itemId}`,
          body: { quantidade: -10 },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.include('Quantidade não pode ser negativa');
        });
      });
    });

    it('deve falhar ao atualizar item inexistente', () => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/999`,
        body: { nome: 'Produto Inexistente' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.include('Item com ID 999 não encontrado');
      });
    });
  });

  describe('Remover Item de Estoque', () => {
    it('deve remover item com sucesso', () => {
      const novoItem = { nome: 'Produto H', quantidade: 70 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request('DELETE', `${baseUrl}/${itemId}`).then((response) => {
          expect(response.status).to.eq(200);
        });

        cy.request({
          method: 'GET',
          url: `${baseUrl}/${itemId}`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });

    it('deve falhar ao remover item inexistente', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.include('Item com ID 999 não encontrado');
      });
    });
  });

  describe('Movimentação de Estoque', () => {
    it('deve adicionar quantidade ao estoque', () => {
      const novoItem = { nome: 'Produto I', quantidade: 80 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request('POST', `${baseUrl}/${itemId}/movimentar`, { quantidade: 20 }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.quantidade).to.eq(100);
        });
      });
    });

    it('deve remover quantidade do estoque', () => {
      const novoItem = { nome: 'Produto J', quantidade: 90 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request('POST', `${baseUrl}/${itemId}/movimentar`, { quantidade: -30 }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.quantidade).to.eq(60);
        });
      });
    });

    it('deve falhar ao movimentar com quantidade zero', () => {
      const novoItem = { nome: 'Produto K', quantidade: 100 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request({
          method: 'POST',
          url: `${baseUrl}/${itemId}/movimentar`,
          body: { quantidade: 0 },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.include('Quantidade da movimentação não pode ser zero');
        });
      });
    });

    it('deve falhar ao movimentar resultando em quantidade negativa', () => {
      const novoItem = { nome: 'Produto L', quantidade: 10 };

      cy.request('POST', baseUrl, novoItem).then((createResponse) => {
        const itemId = createResponse.body.id;

        cy.request({
          method: 'POST',
          url: `${baseUrl}/${itemId}/movimentar`,
          body: { quantidade: -20 },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.include('Quantidade resultante não pode ser negativa');
        });
      });
    });

    it('deve falhar ao movimentar item inexistente', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/999/movimentar`,
        body: { quantidade: 10 },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.include('Item com ID 999 não encontrado');
      });
    });
  });
});
