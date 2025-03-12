import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CargosService {

  constructor(private prisma: PrismaService) {}

  async Criar(createCargoDto: CreateCargoDto) {
    const cargoExistente =  await this.prisma.cargos.findFirst({
      where: { cargo: createCargoDto.cargo }
    })

    if(!cargoExistente) {
      const novoCargo = await this.prisma.cargos.create({
        data: createCargoDto
      })

      return `O cargo ${novoCargo.cargo.toUpperCase()} foi criado com sucesso.`
    }

    throw new HttpException("O cargo informado ja esta cadastrado no banco de dados.", HttpStatus.BAD_REQUEST)
  }

  findAll() {
    return `This action returns all cargos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cargo`;
  }

  update(id: number, updateCargoDto: UpdateCargoDto) {
    return `This action updates a #${id} cargo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cargo`;
  }
}
