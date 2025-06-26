## Como executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar a aplicação
```bash
npm run start:dev
```

### 3. Executar testes Cypress

#### Interface gráfica:
```bash
npm run cypress:open
```

#### Modo headless:
```bash
npm run cypress:run
```

## Resultado dos Testes

✅ **21 cenários Gherkin implementados**
✅ **21 testes Cypress passando (100% de sucesso)**
✅ **Cobertura completa de todas as rotas da API**

Os testes cobrem:
- ✅ Casos de sucesso para todas as operações
- ✅ Validações de entrada (nome obrigatório, quantidade positiva)
- ✅ Tratamento de erros (IDs inexistentes, dados inválidos)
- ✅ Regras de negócio (estoque não pode ficar negativo)

## Validações Implementadas

- Nome é obrigatório e deve ser string
- Quantidade é obrigatória e deve ser número positivo
- Quantidade não pode ser negativa em nenhuma operação
- Movimentações não podem resultar em estoque negativo
- Movimentações não podem ter quantidade zero

## Cenários de Teste

Os cenários de teste em Gherkin estão documentados no arquivo `features/estoque.feature` e incluem:

- Criação de itens com validações
- Listagem de itens
- Busca por ID
- Atualização de itens
- Remoção de itens
- Movimentações de estoque
- Validações de erro
# TarefaCypress
