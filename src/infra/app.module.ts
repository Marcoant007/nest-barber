import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/infra/env';
import { AccountController } from './http/controller/account/account.controller';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './auth/controller/authenticate.controller';
import { QuestionController } from './http/controller/question/question.controller';
@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }),
    AuthModule,

  ],

  controllers: [AccountController, AuthenticateController, QuestionController],
  providers: [PrismaService],
})
export class AppModule { }
