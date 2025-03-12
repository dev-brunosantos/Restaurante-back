import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutosService {

  constructor( private prisma: PrismaService ) { }

  async Criar(createProdutoDto: CreateProdutoDto) {
    const produtoExistente = await this.prisma.produtos.findFirst({
      where: { nome: createProdutoDto.nome }
    })

    if(!produtoExistente) {
      const novoProduto = await this.prisma.produtos.create({
        data: createProdutoDto
      })

      return novoProduto
    }

    throw new HttpException("Erro ao cadastrar um novo produto.", HttpStatus.BAD_REQUEST)
  }

  async Listar() {
    const produtos = await this.prisma.produtos.findMany()

    if(produtos.length > 0) {
      return produtos
    }

    throw new HttpException("Não existe nenhum produto cadastrado no sistema.", HttpStatus.NOT_FOUND)
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
