"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const common_1 = require("@nestjs/common");
let EstoqueService = class EstoqueService {
    constructor() {
        this.estoques = [];
        this.proximoId = 1;
    }
    criarItem(criarEstoqueDto) {
        if (criarEstoqueDto.quantidade < 0) {
            throw new common_1.BadRequestException('Quantidade não pode ser negativa');
        }
        const novoItem = {
            id: this.proximoId++,
            nome: criarEstoqueDto.nome,
            quantidade: criarEstoqueDto.quantidade,
            descricao: criarEstoqueDto.descricao,
            criadoEm: new Date(),
            atualizadoEm: new Date(),
        };
        this.estoques.push(novoItem);
        return novoItem;
    }
    listarTodos() {
        return this.estoques;
    }
    buscarPorId(id) {
        const item = this.estoques.find(estoque => estoque.id === id);
        if (!item) {
            throw new common_1.NotFoundException(`Item com ID ${id} não encontrado`);
        }
        return item;
    }
    atualizarItem(id, atualizarEstoqueDto) {
        const item = this.buscarPorId(id);
        if (atualizarEstoqueDto.quantidade !== undefined && atualizarEstoqueDto.quantidade < 0) {
            throw new common_1.BadRequestException('Quantidade não pode ser negativa');
        }
        Object.assign(item, atualizarEstoqueDto, { atualizadoEm: new Date() });
        return item;
    }
    removerItem(id) {
        const index = this.estoques.findIndex(estoque => estoque.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Item com ID ${id} não encontrado`);
        }
        this.estoques.splice(index, 1);
    }
    movimentarEstoque(id, quantidade) {
        const item = this.buscarPorId(id);
        if (quantidade === 0) {
            throw new common_1.BadRequestException('Quantidade da movimentação não pode ser zero');
        }
        const novaQuantidade = item.quantidade + quantidade;
        if (novaQuantidade < 0) {
            throw new common_1.BadRequestException('Quantidade resultante não pode ser negativa');
        }
        item.quantidade = novaQuantidade;
        item.atualizadoEm = new Date();
        return item;
    }
};
exports.EstoqueService = EstoqueService;
exports.EstoqueService = EstoqueService = __decorate([
    (0, common_1.Injectable)()
], EstoqueService);
//# sourceMappingURL=estoque.service.js.map