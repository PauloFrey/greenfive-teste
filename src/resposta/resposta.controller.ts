import { Controller, Get, Param, Post, Body, Put, Delete,Query} from '@nestjs/common';
import { RespostaService } from './resposta.service';
import { Resposta } from './model/resposta.entity';

@Controller('questionario/:perguntaId/respostas')
export class RespostaController {
    constructor(private readonly respostaService: RespostaService) {}

    @Get()
    async findAllByPerguntaId(
        @Param('perguntaId') perguntaId: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Resposta[]> {
        return await this.respostaService.findAllByPerguntaId(perguntaId, page, limit);
    }

    @Post()
    async createResposta(
        @Param('questionarioId') questionarioId: number,
        @Body() respostaData: Partial<Resposta>,
    ): Promise<Resposta> {
        return this.respostaService.createResposta(questionarioId, respostaData);
    }

    @Put(':cod')
    async updateResposta(
        @Param('perguntaId') perguntaId: number,
        @Param('cod') cod: number,
        @Body() resposta: Partial<Resposta>
    ): Promise<Resposta> {
        return this.respostaService.updateResposta(perguntaId, cod, resposta);
    }

    @Delete(':respostaId')
    async deleteResposta(
        @Param('perguntaId') perguntaId: number,
        @Param('respostaId') respostaId: number,
    ): Promise<void> {
        return this.respostaService.deleteResposta(perguntaId, respostaId);
    }
}
