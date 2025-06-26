"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const common_1 = require("@nestjs/common");
const estoque_service_1 = require("./estoque.service");
const estoque_dto_1 = require("./dto/estoque.dto");
let EstoqueController = class EstoqueController {
    constructor(estoqueService) {
        this.estoqueService = estoqueService;
    }
    criarItem(criarEstoqueDto) {
        return this.estoqueService.criarItem(criarEstoqueDto);
    }
    listarTodos() {
        return this.estoqueService.listarTodos();
    }
    buscarPorId(id) {
        return this.estoqueService.buscarPorId(id);
    }
    atualizarItem(id, atualizarEstoqueDto) {
        return this.estoqueService.atualizarItem(id, atualizarEstoqueDto);
    }
    removerItem(id) {
        return this.estoqueService.removerItem(id);
    }
    movimentarEstoque(id, quantidade) {
        return this.estoqueService.movimentarEstoque(id, quantidade);
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estoque_dto_1.CriarEstoqueDto]),
    __metadata("design:returntype", Object)
], EstoqueController.prototype, "criarItem", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], EstoqueController.prototype, "listarTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], EstoqueController.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, estoque_dto_1.AtualizarEstoqueDto]),
    __metadata("design:returntype", Object)
], EstoqueController.prototype, "atualizarItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "removerItem", null);
__decorate([
    (0, common_1.Post)(':id/movimentar'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('quantidade')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Object)
], EstoqueController.prototype, "movimentarEstoque", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, common_1.Controller)('estoque'),
    __metadata("design:paramtypes", [estoque_service_1.EstoqueService])
], EstoqueController);
//# sourceMappingURL=estoque.controller.js.map