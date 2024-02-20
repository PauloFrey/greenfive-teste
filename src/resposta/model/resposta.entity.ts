import { Pergunta } from 'src/perguntas/model/perguntas.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Resposta {
  @PrimaryGeneratedColumn()
  cod: number;

  @Column({ type: 'date', nullable: false })
  data: Date;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @ManyToOne(() => Pergunta, pergunta => pergunta.respostas,{
    onDelete: 'CASCADE', // Configuração para exclusão em cascata

  })
  pergunta: Pergunta;
}
