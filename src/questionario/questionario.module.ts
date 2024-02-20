// questionario.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { questionario } from './model/questionario.entity';
import { Pergunta } from '../perguntas/model/perguntas.entity'; // Importe a entidade de Pergunta
import { QuestionarioService } from './questionario.service';
import { QuestionarioController } from './questionario.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([questionario]), // Importe a entidade de Questionario
        TypeOrmModule.forFeature([Pergunta]), // Importe a entidade de Pergunta
    ],
    providers: [QuestionarioService],
    controllers: [QuestionarioController],
})
export class QuestionarioModule {}
