// usuario.entity.ts
import { questionario } from 'src/questionario/model/questionario.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  cod: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false })
  senha: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  cpf: string;

  @OneToMany(() => questionario, questionario => questionario.usuario)
  questionarios: questionario[];
}
