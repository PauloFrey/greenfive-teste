import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PerguntaService } from './perguntas.service';
import { Pergunta } from './model/perguntas.entity';

@Controller('perguntas')
export class PerguntaController {
  constructor(private readonly perguntaService: PerguntaService) {}

  @Get()
  findAll(): Promise<Pergunta[]> {
    return this.perguntaService.findAll();
  }

  @Get(':cod')
  findOne(@Param('cod') cod: number): Promise<Pergunta> {
    return this.perguntaService.findOne(cod);
  }

  @Post()
  create(@Body() pergunta: Pergunta): Promise<Pergunta> {
    return this.perguntaService.create(pergunta);
  }

  @Put(':cod')
  update(@Param('cod') cod: number, @Body() pergunta: Pergunta): Promise<Pergunta> {
    return this.perguntaService.update(cod, pergunta);
  }

  @Delete(':cod')
  remove(@Param('cod') cod: number): Promise<void> {
    return this.perguntaService.remove(cod);
  }
}
