import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './api/produtos/produtos.module';
import { CargosModule } from './api/cargos/cargos.module';

@Module({
  imports: [ProdutosModule, CargosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
