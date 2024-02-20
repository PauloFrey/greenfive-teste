import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from './model/perguntas.entity'; // Importe a entidade de Pergunta
import { PerguntaController } from './perguntas.controller';
import { PerguntaService } from './perguntas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pergunta]), // Importe o repositório de perguntas
  ],
  controllers: [PerguntaController],
  providers: [PerguntaService],
  exports: [PerguntaService], // Exporte o serviço se necessário
})
export class PerguntaModule {}
