// pergunta.entity.ts
import { questionario } from 'src/questionario/model/questionario.entity';
import { Resposta } from 'src/resposta/model/resposta.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne } from 'typeorm';

@Entity()
export class Pergunta {
  @PrimaryGeneratedColumn()
  cod: number;

  @Column({ type: 'text', nullable: false })
  descricao: string;

  @OneToMany(() => Resposta, resposta => resposta.pergunta,{
    cascade: true
  })
  respostas: Resposta[];

  @ManyToOne(() => questionario, questionario => questionario.perguntas,{
    onDelete: 'CASCADE'
  })
  questionarios: questionario[];
}
