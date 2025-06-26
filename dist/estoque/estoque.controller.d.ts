import { EstoqueService } from './estoque.service';
import { CriarEstoqueDto, AtualizarEstoqueDto } from './dto/estoque.dto';
import { Estoque } from './interfaces/estoque.interface';
export declare class EstoqueController {
    private readonly estoqueService;
    constructor(estoqueService: EstoqueService);
    criarItem(criarEstoqueDto: CriarEstoqueDto): Estoque;
    listarTodos(): Estoque[];
    buscarPorId(id: number): Estoque;
    atualizarItem(id: number, atualizarEstoqueDto: AtualizarEstoqueDto): Estoque;
    removerItem(id: number): void;
    movimentarEstoque(id: number, quantidade: number): Estoque;
}
