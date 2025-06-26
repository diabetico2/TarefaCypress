Feature: API de Controle de Estoque
  Como desenvolvedor
  Quero testar as funcionalidades da API de estoque
  Para garantir que todas as operações funcionem corretamente

  Background:
    Given que a API de estoque está rodando
    And o banco de dados está limpo

  Scenario: Criar item de estoque com sucesso
    Given que o usuário está criando um novo item de estoque
    And o nome do item é "Produto A"
    And a quantidade é 100
    And a descrição é "Produto de teste"
    When o usuário envia a requisição para criar o item
    Then o item é criado com sucesso
    And o status da resposta é 201
    And o item retornado contém todos os dados fornecidos

  Scenario: Validar quantidade negativa na criação
    Given que o usuário está criando um novo item de estoque
    And o nome do item é "Produto B"
    And a quantidade está negativa (-5)
    When o usuário tenta salvar o item
    Then é exibida uma mensagem de erro "Quantidade não pode ser negativa"
    And o status da resposta é 400

  Scenario: Validar nome obrigatório na criação
    Given que o usuário está criando um novo item de estoque
    And o nome do item está vazio
    And a quantidade é 50
    When o usuário tenta salvar o item
    Then é exibida uma mensagem de erro "Nome é obrigatório"
    And o status da resposta é 400

  Scenario: Validar quantidade obrigatória na criação
    Given que o usuário está criando um novo item de estoque
    And o nome do item é "Produto C"
    And a quantidade não foi informada
    When o usuário tenta salvar o item
    Then é exibida uma mensagem de erro "Quantidade é obrigatória"
    And o status da resposta é 400

  Scenario: Listar todos os itens de estoque
    Given que existem itens cadastrados no estoque
    When o usuário solicita a listagem de todos os itens
    Then todos os itens são retornados
    And o status da resposta é 200

  Scenario: Buscar item por ID existente
    Given que existe um item de estoque com ID 1
    When o usuário busca pelo item com ID 1
    Then o item é retornado com sucesso
    And o status da resposta é 200
    And os dados do item estão corretos

  Scenario: Buscar item por ID inexistente
    Given que não existe um item de estoque com ID 999
    When o usuário busca pelo item com ID 999
    Then é exibida uma mensagem de erro "Item com ID 999 não encontrado"
    And o status da resposta é 404

  Scenario: Atualizar item de estoque com sucesso
    Given que existe um item de estoque com ID 1
    And o usuário quer atualizar a quantidade para 200
    When o usuário envia a requisição de atualização
    Then o item é atualizado com sucesso
    And o status da resposta é 200
    And a nova quantidade é 200

  Scenario: Validar quantidade negativa na atualização
    Given que existe um item de estoque com ID 1
    And o usuário quer atualizar a quantidade para -10
    When o usuário tenta atualizar o item
    Then é exibida uma mensagem de erro "Quantidade não pode ser negativa"
    And o status da resposta é 400

  Scenario: Remover item de estoque com sucesso
    Given que existe um item de estoque com ID 1
    When o usuário remove o item com ID 1
    Then o item é removido com sucesso
    And o status da resposta é 200

  Scenario: Remover item inexistente
    Given que não existe um item de estoque com ID 999
    When o usuário tenta remover o item com ID 999
    Then é exibida uma mensagem de erro "Item com ID 999 não encontrado"
    And o status da resposta é 404

  Scenario: Movimentar estoque com entrada de produtos
    Given que existe um item de estoque com ID 1
    And a quantidade atual é 50
    And o usuário quer adicionar 30 unidades
    When o usuário faz a movimentação de estoque
    Then a quantidade é atualizada para 80
    And o status da resposta é 200

  Scenario: Movimentar estoque com saída de produtos
    Given que existe um item de estoque com ID 1
    And a quantidade atual é 50
    And o usuário quer remover 20 unidades
    When o usuário faz a movimentação de estoque com -20
    Then a quantidade é atualizada para 30
    And o status da resposta é 200

  Scenario: Validar movimentação com quantidade zero
    Given que existe um item de estoque com ID 1
    And o usuário quer movimentar 0 unidades
    When o usuário tenta fazer a movimentação
    Then é exibida uma mensagem de erro "Quantidade da movimentação não pode ser zero"
    And o status da resposta é 400

  Scenario: Validar movimentação que resultaria em quantidade negativa
    Given que existe um item de estoque com ID 1
    And a quantidade atual é 10
    And o usuário quer remover 20 unidades
    When o usuário tenta fazer a movimentação com -20
    Then é exibida uma mensagem de erro "Quantidade resultante não pode ser negativa"
    And o status da resposta é 400

  Scenario: Validar tipo de dados inválidos
    Given que o usuário está criando um novo item de estoque
    And o nome do item é um número em vez de string
    When o usuário tenta salvar o item
    Then é exibida uma mensagem de erro "Nome deve ser uma string"
    And o status da resposta é 400

  Scenario: Validar ID inválido na busca
    Given que o usuário está buscando um item
    And o ID fornecido não é um número válido
    When o usuário faz a requisição de busca
    Then é exibida uma mensagem de erro de validação
    And o status da resposta é 400
