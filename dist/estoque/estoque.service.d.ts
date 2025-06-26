import { Estoque } from './interfaces/estoque.interface';
import { CriarEstoqueDto, AtualizarEstoqueDto } from './dto/estoque.dto';
export declare class EstoqueService {
    private estoques;
    private proximoId;
    criarItem(criarEstoqueDto: CriarEstoqueDto): Estoque;
    listarTodos(): Estoque[];
    buscarPorId(id: number): Estoque;
    atualizarItem(id: number, atualizarEstoqueDto: AtualizarEstoqueDto): Estoque;
    removerItem(id: number): void;
    movimentarEstoque(id: number, quantidade: number): Estoque;
}
