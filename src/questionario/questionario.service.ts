import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { questionario } from './model/questionario.entity';
import { Pergunta } from 'src/perguntas/model/perguntas.entity'; // Importe a entidade de Pergunta


@Injectable()
export class QuestionarioService {
    constructor(
        @InjectRepository(questionario)
        private readonly questionarioRepository: Repository<questionario>,
        @InjectRepository(Pergunta)
        private readonly perguntaRepository: Repository<Pergunta>, // Injete o repositório de Pergunta
    ) {}

    async findAll(): Promise<questionario[]> {
        return await this.questionarioRepository.find({relations: ['perguntas']});
    }

    async findOne(cod: number): Promise<questionario | undefined> {
        return await this.questionarioRepository.findOne({where: {cod}});
    }

    async create(data: any): Promise<questionario> {
        // Extrair as informações do questionário e das perguntas do corpo da requisição
        const { data: questionarioData, nome, descricao, perguntas } = data;

        // Criar o questionário
        const questionario = this.questionarioRepository.create({
            data: questionarioData,
            nome,
            descricao,
        });

        // Criar e associar as perguntas ao questionário
        questionario.perguntas = await Promise.all(perguntas.map(async (perguntaData: any) => {
            const pergunta = this.perguntaRepository.create(perguntaData);
            return await this.perguntaRepository.save(pergunta);
        }));

        // Salvar o questionário com as perguntas associadas
        return await this.questionarioRepository.save(questionario);
    }

    async update(cod: number, data: any): Promise<questionario> {
        const questionario = await this.questionarioRepository.findOne({ where: { cod } });
        if (!questionario) {
            throw new NotFoundException('Questionário não encontrado.');
        }

        // Atualizar os campos do questionário
        const { questionarioData, nome, descricao, perguntas } = data;
        questionario.data = questionarioData;
        questionario.nome = nome;
        questionario.descricao = descricao;

        // Atualizar as perguntas associadas ao questionário
        if (perguntas && perguntas.length > 0) {
            const novasPerguntas = await Promise.all(perguntas.map(async (perguntaData: any) => {
                if (perguntaData.cod) {
                    // Se a pergunta já existir, atualize-a
                    const perguntaExistente = await this.perguntaRepository.findOne(perguntaData.cod);
                    if (!perguntaExistente) {
                        throw new NotFoundException(`Pergunta com o código ${perguntaData.cod} não encontrada.`);
                    }
                    perguntaExistente.descricao = perguntaData.descricao;
                    return await this.perguntaRepository.save(perguntaExistente);
                } else {
                    // Se a pergunta for nova, crie-a
                    const novaPergunta = this.perguntaRepository.create(perguntaData);
                    return await this.perguntaRepository.save(novaPergunta);
                }
            }));
            questionario.perguntas = novasPerguntas;
        }

        return await this.questionarioRepository.save(questionario);
    }

    async patch(cod: number, data: Partial<questionario>): Promise<questionario> {
        const questionario = await this.questionarioRepository.findOne({where: {cod}});
        if (!questionario) {
          throw new NotFoundException('Questionário não encontrado.');
        }
        Object.assign(questionario, data);
        return await this.questionarioRepository.save(questionario);
    }

    async delete(cod: number): Promise<void> {
        const questionario = await this.questionarioRepository.findOne({where: {cod}});
        if (!questionario) {
            throw new Error('Questionário não encontrado.');
        }
        await this.questionarioRepository.remove(questionario);
    }
}
