import { Controller, Get,Delete, Param,Query, Body, Post,Put,ParseUUIDPipe,NotFoundException,BadRequestException,InternalServerErrorException,Patch  } from '@nestjs/common';
import { Usuarios } from './model/user.entity';
import { UserService } from './user.service';
import { query } from 'express';

@Controller('usuarios')
export class UserController {
    constructor(private readonly usuarioService: UserService) {}

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Usuarios[]> {
        return await this.usuarioService.findAll(page, limit);
    }

    @Post()
    async create(@Body() usuarioData: Partial<Usuarios>): Promise<Usuarios> {
        return await this.usuarioService.create(usuarioData);
    }

    @Put(':cod')
    async update(
        @Param('cod') cod: number,
        @Body() usuarioData: Partial<Usuarios>
    ): Promise<Usuarios> {
        try {
            if (usuarioData.cod && usuarioData.cod !== cod) {
                throw new BadRequestException('Não é permitido alterar o cod.');
            }
            return await this.usuarioService.update(cod, usuarioData);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Ocorreu um erro inesperado.');
            }
        }
    }

    @Patch(':cod')
    async patch(
        @Param('cod') cod: number,
        @Body() usuarioData: Partial<Usuarios>
    ): Promise<Usuarios> {
        try {
            if (usuarioData.cod && usuarioData.cod !== cod) {
                throw new BadRequestException('Não é permitido alterar o cod.');
            }
            return await this.usuarioService.patch(cod, usuarioData);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Ocorreu um erro inesperado.');
            }
        }
    }

    @Delete(':cod')
    async delete(@Param('cod') cod: number): Promise<void> {
        try {
            return await this.usuarioService.delete(cod);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Ocorreu um erro inesperado.');
            }
        }
    }
}
