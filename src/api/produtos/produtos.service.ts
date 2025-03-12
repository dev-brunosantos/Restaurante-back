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

  async BuscarPorID(id: number) {
    const produtoID = await this.prisma.produtos.findFirst({
      where: { id }
    })

    if(produtoID) {
      return produtoID
    }

    throw new HttpException("Não existe nenhum produto vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  async Atualizar(id: number, updateProdutoDto: UpdateProdutoDto) {

    const { nome, descricao, preco } = updateProdutoDto;

    const produtoID = await this.prisma.produtos.findFirst({
      where: { id }
    })

    if(produtoID) {
      const atualizacao = await this.prisma.produtos.update({
        where: { id },
        data: {
          nome: nome === "" ? produtoID.nome : nome,
          descricao: descricao === "" ? produtoID.descricao : descricao,
          preco: preco === 0 ? produtoID.preco : preco
        }
      })

      return {
        status: "Atualização realizada com sucesso.",
        dadosAntigo: produtoID,
        dadosAtualizados: atualizacao
      }
    }

    throw new HttpException("Não existe nenhum produto vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
