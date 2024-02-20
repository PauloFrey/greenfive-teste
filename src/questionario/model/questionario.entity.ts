// questionario.entity.ts
import { Pergunta } from 'src/perguntas/model/perguntas.entity';
import { Usuarios } from 'src/user/model/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,JoinTable } from 'typeorm';

@Entity()
export class questionario {
    @PrimaryGeneratedColumn()
    cod: number;

    @Column({ type: 'date', nullable: false })
    data: Date;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'text', nullable: true })
    descricao: string;

    @ManyToOne(() => Usuarios, usuario => usuario.questionarios)
    usuario: Usuarios;

    @OneToMany(() => Pergunta, pergunta => pergunta.questionarios,{
        cascade: true,
    })
    @JoinTable()
    perguntas: Pergunta[];
}
