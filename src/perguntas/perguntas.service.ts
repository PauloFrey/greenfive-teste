import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pergunta } from './model/perguntas.entity';

@Injectable()
export class PerguntaService {
  constructor(
    @InjectRepository(Pergunta)
    private perguntaRepository: Repository<Pergunta>,
  ) {}

  findAll(): Promise<Pergunta[]> {
    return this.perguntaRepository.find();
  }

  findOne(cod: number): Promise<Pergunta> {
    return this.perguntaRepository.findOne({where: {cod}});
  }

  async create(pergunta: Pergunta): Promise<Pergunta> {
    return this.perguntaRepository.save(pergunta);
  }

  async update(cod: number, pergunta: Pergunta): Promise<Pergunta> {
    await this.perguntaRepository.update(cod, pergunta);
    return this.perguntaRepository.findOne({where: {cod}});
  }

  async remove(cod: number): Promise<void> {
    await this.perguntaRepository.delete(cod);
  }
}
