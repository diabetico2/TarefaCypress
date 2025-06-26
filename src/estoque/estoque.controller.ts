import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CriarEstoqueDto, AtualizarEstoqueDto } from './dto/estoque.dto';
import { Estoque } from './interfaces/estoque.interface';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  criarItem(@Body() criarEstoqueDto: CriarEstoqueDto): Estoque {
    return this.estoqueService.criarItem(criarEstoqueDto);
  }

  @Get()
  listarTodos(): Estoque[] {
    return this.estoqueService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number): Estoque {
    return this.estoqueService.buscarPorId(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  atualizarItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarEstoqueDto: AtualizarEstoqueDto,
  ): Estoque {
    return this.estoqueService.atualizarItem(id, atualizarEstoqueDto);
  }

  @Delete(':id')
  removerItem(@Param('id', ParseIntPipe) id: number): void {
    return this.estoqueService.removerItem(id);
  }

  @Post(':id/movimentar')
  @UsePipes(new ValidationPipe({ transform: true }))
  movimentarEstoque(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantidade') quantidade: number,
  ): Estoque {
    return this.estoqueService.movimentarEstoque(id, quantidade);
  }
}
