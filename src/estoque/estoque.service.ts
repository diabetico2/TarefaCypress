import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Estoque } from './interfaces/estoque.interface';
import { CriarEstoqueDto, AtualizarEstoqueDto } from './dto/estoque.dto';

@Injectable()
export class EstoqueService {
  private estoques: Estoque[] = [];
  private proximoId = 1;

  criarItem(criarEstoqueDto: CriarEstoqueDto): Estoque {
    if (criarEstoqueDto.quantidade < 0) {
      throw new BadRequestException('Quantidade não pode ser negativa');
    }

    const novoItem: Estoque = {
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

  listarTodos(): Estoque[] {
    return this.estoques;
  }

  buscarPorId(id: number): Estoque {
    const item = this.estoques.find(estoque => estoque.id === id);
    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }
    return item;
  }

  atualizarItem(id: number, atualizarEstoqueDto: AtualizarEstoqueDto): Estoque {
    const item = this.buscarPorId(id);

    if (atualizarEstoqueDto.quantidade !== undefined && atualizarEstoqueDto.quantidade < 0) {
      throw new BadRequestException('Quantidade não pode ser negativa');
    }

    Object.assign(item, atualizarEstoqueDto, { atualizadoEm: new Date() });
    return item;
  }

  removerItem(id: number): void {
    const index = this.estoques.findIndex(estoque => estoque.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }
    this.estoques.splice(index, 1);
  }

  movimentarEstoque(id: number, quantidade: number): Estoque {
    const item = this.buscarPorId(id);
    
    if (quantidade === 0) {
      throw new BadRequestException('Quantidade da movimentação não pode ser zero');
    }

    const novaQuantidade = item.quantidade + quantidade;
    
    if (novaQuantidade < 0) {
      throw new BadRequestException('Quantidade resultante não pode ser negativa');
    }

    item.quantidade = novaQuantidade;
    item.atualizadoEm = new Date();
    
    return item;
  }
}
