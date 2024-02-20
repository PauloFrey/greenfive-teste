import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Usuarios } from './model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
