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
        data: {
          nome: createProdutoDto.nome,
          descricao: createProdutoDto.descricao,
          preco: createProdutoDto.preco
        }
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

    // const { nome, descricao, preco } = updateProdutoDto;

    const produtoID = await this.prisma.produtos.findFirst({
      where: { id }
    })

    if(produtoID) {
      const atualizacao = await this.prisma.produtos.update({
        where: { id },
        // data: {
        //   nome: updateProdutoDto.nome === "" ? produtoID.nome : updateProdutoDto.nome,
        //   descricao: updateProdutoDto.descricao === "" ? produtoID.descricao : updateProdutoDto.descricao,
        //   preco: updateProdutoDto.preco === 0 ? produtoID.preco : updateProdutoDto.preco
        // }
        data: updateProdutoDto
      })

      return {
        status: "Atualização realizada com sucesso.",
        dadosAntigo: produtoID,
        dadosAtualizados: atualizacao
      }
    }

    throw new HttpException("Não existe nenhum produto vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  async Apagar(id: number) {
    const produtoID = await this.prisma.produtos.findFirst({
      where: { id }
    })

    if(produtoID) {
      await this.prisma.produtos.delete({
        where: { id }
      })

      return `Os dados do produto ${produtoID.nome.toUpperCase()} foram excluídos como solicitado.`
    }

    throw new HttpException("Não existe nenhum produto vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }
}
