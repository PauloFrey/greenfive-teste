import { Controller, Get, Post, Put, Patch, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { questionario } from './model/questionario.entity';
import { QuestionarioService } from './questionario.service';

@Controller('questionarios')
export class QuestionarioController {
    constructor(private readonly questionarioService: QuestionarioService) {}

    @Get()
    async findAll(): Promise<questionario[]> {
        return await this.questionarioService.findAll();
    }

    @Get(':cod')
    async findOne(@Param('cod') cod: number): Promise<questionario> {
        const questionario = await this.questionarioService.findOne(cod);
        if (!questionario) {
        throw new NotFoundException('Questionário não encontrado.');
        }
        return questionario;
    }

    @Post()
    async create(@Body() data: any): Promise<questionario> {
        return await this.questionarioService.create(data);
    }

    @Put(':cod')
    async update(@Param('cod') cod: number, @Body() data: any): Promise<questionario> {
        return await this.questionarioService.update(cod, data);
    }

    @Patch(':cod')
    async patch(
        @Param('cod') cod: number,
        @Body() questionarioData: Partial<questionario>,
    ): Promise<questionario> {
        try {
        return await this.questionarioService.patch(cod, questionarioData);
        } catch (error) {
        if (error instanceof NotFoundException) {
            throw new NotFoundException('Questionário não encontrado.');
        } else {
            throw new Error('Erro ao atualizar o questionário.');
        }
        }
    }

    @Delete(':cod')
    async delete(@Param('cod') cod: number): Promise<void> {
        try {
            await this.questionarioService.delete(cod);
        } catch (error) {
        if (error instanceof NotFoundException) {
            throw new NotFoundException('Questionário não encontrado.');
        } else {
            throw new BadRequestException('Erro ao excluir o questionário.', error.message);
        }
        }
    }
}
