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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarEstoqueDto = exports.CriarEstoqueDto = void 0;
const class_validator_1 = require("class-validator");
class CriarEstoqueDto {
}
exports.CriarEstoqueDto = CriarEstoqueDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    __metadata("design:type", String)
], CriarEstoqueDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantidade é obrigatória' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Quantidade deve ser um número' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantidade não pode ser negativa' }),
    __metadata("design:type", Number)
], CriarEstoqueDto.prototype, "quantidade", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Descrição deve ser uma string' }),
    __metadata("design:type", String)
], CriarEstoqueDto.prototype, "descricao", void 0);
class AtualizarEstoqueDto {
}
exports.AtualizarEstoqueDto = AtualizarEstoqueDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    __metadata("design:type", String)
], AtualizarEstoqueDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Quantidade deve ser um número' }),
    (0, class_validator_1.IsPositive)({ message: 'Quantidade não pode ser negativa' }),
    __metadata("design:type", Number)
], AtualizarEstoqueDto.prototype, "quantidade", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Descrição deve ser uma string' }),
    __metadata("design:type", String)
], AtualizarEstoqueDto.prototype, "descricao", void 0);
//# sourceMappingURL=estoque.dto.js.map