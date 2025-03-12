import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  Cadastrar(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.Criar(createProdutoDto);
  }

  @Get()
  Listar() {
    return this.produtosService.Listar();
  }

  @Get(':id')
  FiltrarID(@Param('id') id: string) {
    return this.produtosService.BuscarPorID(+id);
  }

  @Patch(':id')
  Atualizar(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.Atualizar(+id, updateProdutoDto);
  }

  @Delete(':id')
  Apagar(@Param('id') id: string) {
    return this.produtosService.Apagar(+id);
  }
}
