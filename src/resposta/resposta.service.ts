import { questionario } from 'src/questionario/model/questionario.entity';
import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resposta } from './model/resposta.entity';
import { Pergunta } from 'src/perguntas/model/perguntas.entity';

@Injectable()
export class RespostaService {
    constructor(
        @InjectRepository(Resposta)
        private respostaRepository: Repository<Resposta>,
        @InjectRepository(Pergunta)
        private perguntaRepository: Repository<Pergunta>,
    ) {}

    async findAllByPerguntaId(questionarioId: number, page: number, limit: number): Promise<Resposta[]> {
        const skip = (page - 1) * limit;
        return await this.respostaRepository.find({
            where: { pergunta: { questionarios: {cod: questionarioId} } }, // Busca respostas relacionadas à pergunta com o ID especificado
            skip,
            take: limit,
            relations: ['pergunta'], // Certifique-se de carregar a relação "pergunta"

        });
    }

    async createResposta(perguntaId: number, respostaData: Partial<Resposta>): Promise<Resposta> {
        // Verifica se já existe uma resposta para essa pergunta
        const existingResposta = await this.respostaRepository.findOne({ where: { pergunta: { cod: perguntaId } } });
        if (existingResposta) {
            throw new BadRequestException('Esta pergunta já possui uma resposta.');
        }

        // Cria a resposta associada à pergunta
        const pergunta = await this.perguntaRepository.findOne({where: {cod: perguntaId}});
        if (!pergunta) {
            throw new NotFoundException('Pergunta não encontrada');
        }
        const resposta = this.respostaRepository.create({
            ...respostaData,
            pergunta,
        });
        return await this.respostaRepository.save(resposta);
    }

    async updateResposta(
        perguntaId: number,
        cod: number,
        resposta: Partial<Resposta>
    ): Promise<Resposta> {
        // Verifica se a pergunta associada à resposta existe
        const pergunta = await this.perguntaRepository.findOneOrFail({where: {cod: perguntaId}});

        // Verifica se a resposta a ser atualizada existe
        const existingResposta = await this.respostaRepository.findOne({ where: { cod } });
        if (!existingResposta) {
            throw new NotFoundException('Resposta não encontrada.');
        }

        // Atualiza os campos da resposta e a associa à pergunta
        Object.assign(existingResposta, resposta);
        existingResposta.pergunta = pergunta;

        return await this.respostaRepository.save(existingResposta);
    }

    async deleteResposta(perguntaId: number, respostaId: number): Promise<void> {
        // Verifica se a resposta está associada à pergunta
        const resposta = await this.respostaRepository.findOne({
          where: { pergunta: { cod: perguntaId }, cod: respostaId },
        });
        if (!resposta) {
          throw new NotFoundException('Resposta não encontrada ou não associada à pergunta.');
        }
    
        await this.respostaRepository.delete(respostaId);
      }
}
