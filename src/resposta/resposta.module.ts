import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resposta } from './model/resposta.entity';
import { RespostaController } from './resposta.controller';
import { RespostaService } from './resposta.service';
import { Pergunta } from 'src/perguntas/model/perguntas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resposta, Pergunta]), // Importe o repositório de respostas
  ],
  controllers: [RespostaController],
  providers: [RespostaService],
})
export class RespostaModule {}
