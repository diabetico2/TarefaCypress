import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

export class CriarEstoqueDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @IsNumber({}, { message: 'Quantidade deve ser um número' })
  @IsPositive({ message: 'Quantidade não pode ser negativa' })
  quantidade: number;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  descricao?: string;
}

export class AtualizarEstoqueDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  nome?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Quantidade deve ser um número' })
  @IsPositive({ message: 'Quantidade não pode ser negativa' })
  quantidade?: number;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  descricao?: string;
}
