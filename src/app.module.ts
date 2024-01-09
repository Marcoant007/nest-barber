import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controller/authenticate.controller';
import { AccountController } from './controller/account.controller';
import { QuestionController } from './controller/question.controller';

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
