import { Injectable,BadRequestException,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './model/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Usuarios)
        private readonly usuarioRepository: Repository<Usuarios>,
    ) {}
    
    async findAll(page: number, limit: number): Promise<Usuarios[]> {
        const skippedItems = (page - 1) * limit;

        return await this.usuarioRepository.find({
            skip: skippedItems,
            take: limit,
        });
    }
    
    async create(usuarioData: Partial<Usuarios>): Promise<Usuarios> {
        try {
            const usuario = this.usuarioRepository.create(usuarioData);
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new BadRequestException('Erro ao criar usuário. Verifique os dados fornecidos.', error.message);
        }
    }

    async update(cod: number, usuarioData: Partial<Usuarios>): Promise<Usuarios> {
        const usuario = await this.usuarioRepository.findOne({where: {cod}});
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        try {
            // Mesclar os dados atualizados do usuário com o usuário existente
            this.usuarioRepository.merge(usuario, usuarioData);

            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new BadRequestException('Erro ao atualizar usuário. Verifique os dados fornecidos.');
        }
    }

    async patch(cod: number, usuarioData: Partial<Usuarios>): Promise<Usuarios> {
        const usuario = await this.usuarioRepository.findOne({where: {cod}});
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        try {
            // Atualiza apenas os campos fornecidos no corpo da requisição
            this.usuarioRepository.merge(usuario, usuarioData);
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new BadRequestException('Erro ao atualizar usuário. Verifique os dados fornecidos.');
        }
    }

    async delete(cod: number): Promise<void> {
        const result = await this.usuarioRepository.delete(cod);
        if (result.affected === 0) {
            throw new NotFoundException('Usuário não encontrado.');
        }
    }
}
