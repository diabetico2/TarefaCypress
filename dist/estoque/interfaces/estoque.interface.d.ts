export interface Estoque {
    id: number;
    nome: string;
    quantidade: number;
    descricao?: string;
    criadoEm: Date;
    atualizadoEm: Date;
}
