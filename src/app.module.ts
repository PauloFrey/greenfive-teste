import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Usuarios } from './user/model/user.entity';
import { questionario } from './questionario/model/questionario.entity';
import { QuestionarioModule } from './questionario/questionario.module';
import { Pergunta } from './perguntas/model/perguntas.entity';
import { Resposta } from './resposta/model/resposta.entity';
import { RespostaModule } from './resposta/resposta.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'aws-0-sa-east-1.pooler.supabase.com',
            port: 5432,
            username: 'postgres.drywazrzkinkwxrekmvs',
            password: 'greenfivepaulo@2024',
            database: 'postgres',
            // schema: 'testePratico', // Especifica o nome do schema
            entities: [Usuarios, questionario, Pergunta, Resposta],
            synchronize: true,
            logging: true
        }),
        UserModule,
        QuestionarioModule,
        RespostaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
